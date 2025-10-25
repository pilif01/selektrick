import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { RoadmapStage } from '../../types/project';

interface ElectricLineMobileProps {
  className?: string;
  stages: RoadmapStage[];
  cardPositions: { x: number; y: number }[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const ElectricLineMobile: React.FC<ElectricLineMobileProps> = ({ className = '', stages, cardPositions, containerRef }) => {
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalHeight = useMemo(() => {
    if (cardPositions.length === 0) return 0;
    return cardPositions[cardPositions.length - 1].y + 100;
  }, [cardPositions]);

  // Transform scroll progress to reveal the line
  const revealHeight = useTransform(scrollYProgress, [0, 1], [0, totalHeight]);

  if (cardPositions.length === 0) return null;

  return (
    <div
      className={`absolute top-0 pointer-events-none ${className}`}
      style={{ height: totalHeight, left: '-18px' }}
    >
      <svg
        width="60"
        height={totalHeight}
        viewBox={`0 0 60 ${totalHeight}`}
        className="absolute"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Electric gradient - active */}
          <linearGradient id="electricActiveMobile" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="30" y2={totalHeight}>
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7df9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.9" />
          </linearGradient>

          {/* Inactive gradient - gray */}
          <linearGradient id="electricInactiveMobile" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="30" y2={totalHeight}>
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="lineGlowMobile">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Mask for progressive reveal */}
          <mask id="revealMaskMobile">
            <motion.rect
              x="0"
              y="0"
              width="60"
              fill="white"
              style={{
                height: revealHeight
              }}
            />
          </mask>
        </defs>

        {/* Base line - inactive (always visible) */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={totalHeight}
          stroke="url(#electricInactiveMobile)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Active electric line - revealed by scroll */}
        <motion.line
          x1="30"
          y1="0"
          x2="30"
          y2={totalHeight}
          stroke="url(#electricActiveMobile)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#lineGlowMobile)"
          mask="url(#revealMaskMobile)"
        />

        {/* Dots at each card position */}
        {cardPositions.map((pos, index) => {
          const stage = stages[index];
          const dotColor = '#E8E683';

          return (
            <g key={index}>
              {/* Outer glow ring */}
              <circle
                cx="30"
                cy={pos.y}
                r="10"
                fill="none"
                stroke={dotColor}
                strokeWidth="2"
                opacity="0.2"
              />
              {/* Middle ring */}
              <circle
                cx="30"
                cy={pos.y}
                r="7"
                fill="none"
                stroke={dotColor}
                strokeWidth="1.5"
                opacity="0.4"
              />
              {/* Inner dot */}
              <circle
                cx="30"
                cy={pos.y}
                r="4"
                fill={dotColor}
                opacity="0.9"
                filter={stage.status !== 'not_started' ? 'url(#lineGlowMobile)' : undefined}
              />
              {/* Center bright dot */}
              <circle
                cx="30"
                cy={pos.y}
                r="1.5"
                fill="white"
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* Moving particles */}
        <motion.g mask="url(#revealMaskMobile)">
          <circle cx="30" r="2.5" fill="#00ff88" filter="url(#lineGlowMobile)">
            <animate
              attributeName="cy"
              from="0"
              to={totalHeight}
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="30" r="2.5" fill="#7df9ff" filter="url(#lineGlowMobile)">
            <animate
              attributeName="cy"
              from="0"
              to={totalHeight}
              dur="5s"
              repeatCount="indefinite"
              begin="1.5s"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="5s"
              repeatCount="indefinite"
              begin="1.5s"
            />
          </circle>
        </motion.g>
      </svg>
    </div>
  );
};
