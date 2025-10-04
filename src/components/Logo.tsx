interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  const sizes = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-24'
  };

  return (
    <img 
      src="/logo.png" 
      alt="Selectrik Logo" 
      className={`${sizes[size]} w-auto object-contain ${className}`}
    />
  );
};
