import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { RoadmapStage } from '../../types/project';

interface ElectricLineProps {
  className?: string;
  stages: RoadmapStage[];
  cardPositions: { x: number; y: number }[];
}

export const ElectricLine: React.FC<ElectricLineProps> = ({ className = '', stages, cardPositions }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Generate curved path that stays completely in center, away from cards
  const pathData = useMemo(() => {
    if (cardPositions.length < 2) return '';

    let path = `M 0 ${cardPositions[0].y}`;

    for (let i = 0; i < cardPositions.length - 1; i++) {
      const start = cardPositions[i];
      const end = cardPositions[i + 1];
      const distance = end.y - start.y;

      // Control points for S-curve - positioned to stay in center
      const controlPoint1Y = start.y + distance * 0.3;
      const controlPoint2Y = start.y + distance * 0.7;

      // Reduced curve offset to stay well within center gap
      // Cards are at 56% offset = 44% width each side = 12% center gap
      const maxOffset = 80; // Stays within center channel
      const curveOffset = (i % 2 === 0 ? 1 : -1) * maxOffset;

      // S-curve using cubic bezier
      path += ` C ${curveOffset} ${controlPoint1Y}, ${curveOffset} ${controlPoint2Y}, 0 ${end.y}`;
    }

    return path;
  }, [cardPositions]);

  // Calculate dot positions on the curved path at card heights
  const dotPositions = useMemo(() => {
    if (cardPositions.length < 2) return [];

    const dots: { x: number; y: number; status: RoadmapStage['status'] }[] = [];

    for (let i = 0; i < cardPositions.length; i++) {
      const cardY = cardPositions[i].y;

      // For the first card
      if (i === 0) {
        dots.push({ x: 0, y: cardY, status: stages[i].status });
        continue;
      }

      // Calculate x position on the curve at this Y position
      // const prevCardY = cardPositions[i - 1].y;
      // const distance = cardY - prevCardY;
      // const progress = 1; // We're at the end point of this segment

      // Get the curve offset for this segment (alternates)
      // const segmentIndex = i - 1;
      // const maxOffset = 80;
      // const curveOffset = (segmentIndex % 2 === 0 ? 1 : -1) * maxOffset;

      // At the end point of a cubic bezier, we're back at x=0
      dots.push({ x: 0, y: cardY, status: stages[i].status });
    }

    return dots;
  }, [cardPositions, stages]);

  const totalHeight = useMemo(() => {
    if (cardPositions.length === 0) return 0;
    return cardPositions[cardPositions.length - 1].y + 200;
  }, [cardPositions]);

  // Transform scroll progress to reveal the line
  const revealHeight = useTransform(scrollYProgress, [0, 1], [0, totalHeight]);

  if (cardPositions.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none ${className}`}
      style={{ height: totalHeight }}
    >
      <svg
        width="240"
        height={totalHeight}
        viewBox={`-120 0 240 ${totalHeight}`}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Electric gradient - for active portion */}
          <linearGradient id="electricActive" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={totalHeight}>
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7df9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.9" />
          </linearGradient>

          {/* Inactive gradient - gray */}
          <linearGradient id="electricInactive" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={totalHeight}>
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Mask for progressive reveal based on scroll */}
          <mask id="revealMask">
            <motion.rect
              x="-120"
              y="0"
              width="240"
              fill="white"
              style={{
                height: revealHeight
              }}
            />
          </mask>
        </defs>

        {/* Base path - inactive (always visible) */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#electricInactive)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active electric path - revealed by scroll */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#electricActive)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
          mask="url(#revealMask)"
        />

        {/* Dots on the line at each card position */}
        {dotPositions.map((dot, index) => {
          const dotColor = '#E8E683';

          return (
            <g key={index}>
              {/* Outer glow ring */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="12"
                fill="none"
                stroke={dotColor}
                strokeWidth="2"
                opacity="0.2"
              />
              {/* Middle ring */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="8"
                fill="none"
                stroke={dotColor}
                strokeWidth="2"
                opacity="0.4"
              />
              {/* Inner dot */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="5"
                fill={dotColor}
                opacity="0.9"
                filter={dot.status !== 'not_started' ? 'url(#lineGlow)' : undefined}
              />
              {/* Center bright dot */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r="2"
                fill="white"
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* Moving particles along the active line */}
        <motion.g mask="url(#revealMask)">
          <circle r="3" fill="#00ff88" filter="url(#lineGlow)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path={pathData}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0.5"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="3" fill="#7df9ff" filter="url(#lineGlow)">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={pathData}
              begin="2s"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0.5"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </circle>

          <circle r="2.5" fill="#00ff88" opacity="0.6">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path={pathData}
              begin="4s"
            />
          </circle>
        </motion.g>
      </svg>
    </div>
  );
};
