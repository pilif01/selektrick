import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function InteractiveHoverButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}: InteractiveHoverButtonProps) {
  const baseClasses = "group relative w-auto cursor-pointer overflow-hidden rounded-full border-2 border-selectrik-blue bg-selectrik-blue text-white px-6 py-3 text-center font-semibold transition-all duration-300";
  
  const secondaryClasses = "group relative w-auto cursor-pointer overflow-hidden rounded-full border-2 border-selectrik-gold bg-transparent text-selectrik-gold px-6 py-3 text-center font-semibold transition-all duration-300";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${variant === 'primary' ? baseClasses : secondaryClasses} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className={`${variant === 'primary' ? 'bg-selectrik-gold' : 'bg-selectrik-dark'} h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]`}></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className={`${variant === 'primary' ? 'text-selectrik-dark' : 'text-selectrik-dark'} absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100`}>
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  );
}