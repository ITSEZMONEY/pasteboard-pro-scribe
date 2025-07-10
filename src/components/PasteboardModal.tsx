import { useState, useEffect, useCallback } from 'react';
import { X, Copy, RotateCcw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { processWithClaude } from '@/api/claude';

interface PasteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

type ActionType = 'rephrase' | 'summarize' | 'tweetify';

const actionTabs = [
  { id: 'rephrase', label: 'Rephrase', shortcut: '⌘1' },
  { id: 'summarize', label: 'Summarize', shortcut: '⌘2' },
  { id: 'tweetify', label: 'Tweetify', shortcut: '⌘3' },
] as const;

export function PasteboardModal({ isOpen, onClose, initialText = '' }: PasteboardModalProps) {
  const [inputText, setInputText] = useState(initialText);
  const [outputText, setOutputText] = useState('');
  const [activeAction, setActiveAction] = useState<ActionType>('rephrase');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Auto-populate with clipboard content when modal opens
  useEffect(() => {
    if (isOpen && !initialText) {
      navigator.clipboard.readText()
        .then(text => {
          if (text.trim()) {
            setInputText(text);
          }
        })
        .catch(() => {
          toast({
            title: "Clipboard access failed",
            description: "Please paste your text manually or check browser permissions.",
            variant: "destructive"
          });
        });
    }
  }, [isOpen, initialText, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if ((e.metaKey || e.ctrlKey)) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveAction('rephrase');
            break;
          case '2':
            e.preventDefault();
            setActiveAction('summarize');
            break;
          case '3':
            e.preventDefault();
            setActiveAction('tweetify');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleProcess = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const result = await processWithClaude(activeAction, inputText);
      setOutputText(result);
    } catch (error) {
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputText, activeAction, isLoading, toast]);

  const handleCopy = useCallback(async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  }, [outputText, toast, onClose]);

  // Auto-process when action changes or text is initially loaded
  useEffect(() => {
    if (inputText.trim() && isOpen) {
      handleProcess();
    }
  }, [activeAction, inputText, isOpen, handleProcess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-glow">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">Pasteboard Pro</h2>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-white/5 rounded-md">Esc</span>
                    <span>to close</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex h-[600px]">
                {/* Input Section */}
                <div className="flex-1 p-6 border-r border-white/10">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Input</h3>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here or press Cmd+Shift+V to auto-load..."
                    className="w-full h-[500px] bg-transparent border border-white/10 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-muted-foreground"
                  />
                </div>

                {/* Action Tabs */}
                <div className="w-40 p-6 border-r border-white/10">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Actions</h3>
                  <div className="space-y-2">
                    {actionTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAction(tab.id as ActionType)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeAction === tab.id
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="text-sm font-medium">{tab.label}</div>
                        <div className="text-xs text-muted-foreground">{tab.shortcut}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Output</h3>
                  <div className="h-[500px] bg-white/5 border border-white/10 rounded-lg p-4 relative">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Processing with Claude...</span>
                        </div>
                      </div>
                    ) : outputText ? (
                      <>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap h-full overflow-y-auto">
                          {outputText}
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button
                            onClick={handleProcess}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            title="Rerun"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-medium"
                          >
                            <Copy className="w-4 h-4" />
                            Copy
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                        {inputText.trim() ? 'Processing...' : 'Enter text to get started'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}