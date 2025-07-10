import { motion } from 'framer-motion';

interface HotkeyIndicatorProps {
  keys: string[];
  description: string;
  className?: string;
}

export function HotkeyIndicator({ keys, description, className = '' }: HotkeyIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
    >
      <span>{description}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, index) => (
          <span key={index}>
            <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono">
              {key}
            </kbd>
            {index < keys.length - 1 && <span className="mx-1">+</span>}
          </span>
        ))}
      </div>
    </motion.div>
  );
}