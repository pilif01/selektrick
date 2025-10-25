import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { RoadmapStage } from '../../types/project';

interface RoadmapStageCardProps {
  stage: RoadmapStage;
  index: number;
}

export const RoadmapStageCard: React.FC<RoadmapStageCardProps> = ({ stage, index }) => {
  const IconComponent = (Icons as any)[stage.icon] || Icons.Circle;
  const goldColor = '#E8E683';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative bg-selectrik-dark/60 backdrop-blur-sm border-2 border-selectrik-gold/40 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-selectrik-gold/50 transition-all duration-300 group shadow-lg h-full"
      style={{
        boxShadow: `0 0 20px ${goldColor}20`
      }}
    >
      {/* Icon & Title */}
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${goldColor}20, ${goldColor}10)`,
            border: `2px solid ${goldColor}40`
          }}
        >
          <IconComponent className="w-6 h-6 md:w-7 md:h-7" style={{ color: goldColor }} />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-selectrik-gold transition-colors break-words leading-tight flex-1">
          {stage.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-300 leading-relaxed break-words">
        {stage.description}
      </p>
    </motion.div>
  );
};
