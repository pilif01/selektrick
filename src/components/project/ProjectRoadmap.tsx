import { useRef, useEffect, useState } from 'react';
import { RoadmapStage } from '../../types/project';
import { RoadmapStageCard } from './RoadmapStageCard';
import { ElectricLine } from './ElectricLine';
import { ElectricLineMobile } from './ElectricLineMobile';

interface ProjectRoadmapProps {
  stages: RoadmapStage[];
}

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({ stages }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const positions = cardRefs.current.map((cardRef) => {
        if (!cardRef) return { x: 0, y: 0 };
        const rect = cardRef.getBoundingClientRect();
        const containerTop = containerRef.current!.getBoundingClientRect().top;

        // Get center of card relative to container
        return {
          x: 0, // Always center for our curved line
          y: rect.top - containerTop + rect.height / 2
        };
      });

      setCardPositions(positions);
    };

    // Initial calculation
    updatePositions();

    // Recalculate on window resize
    window.addEventListener('resize', updatePositions);

    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timeout);
    };
  }, [stages]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-1 md:px-6">
      {/* Electric Line - Desktop (curved) */}
      {cardPositions.length > 0 && (
        <div className="hidden md:block">
          <ElectricLine stages={stages} cardPositions={cardPositions} />
        </div>
      )}

      {/* Electric Line - Mobile (straight vertical) */}
      {cardPositions.length > 0 && (
        <div className="block md:hidden">
          <ElectricLineMobile stages={stages} cardPositions={cardPositions} containerRef={containerRef} />
        </div>
      )}

      {/* Stages */}
      <div className="relative space-y-16 md:space-y-24">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`relative pl-8 md:pl-0 ${
              index % 2 === 0
                ? 'md:pr-[56%]'
                : 'md:pl-[56%]'
            }`}
          >
            <RoadmapStageCard stage={stage} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
