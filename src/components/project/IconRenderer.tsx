import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  iconName: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, size = 24, className = '', style }) => {
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[iconName];

  // Fallback to a default icon if not found
  if (!IconComponent) {
    const FallbackIcon = LucideIcons.HelpCircle;
    return <FallbackIcon size={size} className={className} style={style} />;
  }

  return <IconComponent size={size} className={className} style={style} />;
};
