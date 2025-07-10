import { motion } from 'framer-motion';
import { Keyboard, Zap, Copy } from 'lucide-react';

export function AppInstructions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="glass rounded-xl p-4 max-w-sm">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Keyboard className="w-4 h-4" />
          How to use Pasteboard Pro
        </h3>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full" />
            <span>Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">⌘/Ctrl + Shift + V</kbd> anywhere</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full" />
            <span>Choose: Rephrase, Summarize, or Tweetify</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full" />
            <span>Click Copy to replace clipboard</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-muted-foreground">
          💡 <strong>Demo mode:</strong> No Claude API key needed - try the interface!
        </div>
      </div>
    </motion.div>
  );
}