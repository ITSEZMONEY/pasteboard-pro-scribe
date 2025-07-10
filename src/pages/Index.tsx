import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Zap, Sparkles, Clock } from 'lucide-react';
import { PasteboardModal } from '@/components/PasteboardModal';
import { HotkeyIndicator } from '@/components/HotkeyIndicator';
import { AppInstructions } from '@/components/AppInstructions';
import { useHotkeys } from '@/hooks/useHotkeys';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Global hotkey handler
  useHotkeys(['cmd', 'shift', 'v'], () => {
    setIsModalOpen(true);
  });

  useHotkeys(['ctrl', 'shift', 'v'], () => {
    setIsModalOpen(true);
  });

  const features = [
    {
      icon: Zap,
      title: "One-hotkey modal",
      description: "Zero friction, stay in deep work.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Sparkles,
      title: "Claude-powered tones",
      description: "Sounds like you, only better.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Clock,
      title: "3-second processing",
      description: "Faster than you can blink.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Copy,
      title: "Auto-copy results",
      description: "Seamless clipboard integration.",
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Clipboard in, <span className="text-accent">perfect copy</span> out.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pasteboard Pro transforms any snippet you paste in <strong>&lt;3 seconds</strong>. No tabs, no lag — just flow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <span className="relative z-10">Try Pasteboard Pro</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                <HotkeyIndicator 
                  keys={['⌘', 'Shift', 'V']} 
                  description="Global hotkey" 
                />
                <span className="hidden sm:block">•</span>
                <span>AES-256 encryption • 30-day money-back guarantee</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Demo glass card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-8 shadow-glow">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Input</h3>
                  <div className="bg-white/5 rounded-lg p-4 text-sm text-left">
                    "Hey, I wanted to reach out about the quarterly results that came out yesterday..."
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Output</h3>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm text-left">
                    "Quick question about yesterday's Q4 results — would love to discuss the highlights with you."
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Features built for flow</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every detail crafted to keep you in your creative zone
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-6 group hover:shadow-glow transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-12"
            >
              <h2 className="text-4xl font-bold mb-6">Paste smarter, ship faster.</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join 800+ indie teams who've reclaimed their flow state
              </p>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                Get Free Beta Access
              </button>
              
              <p className="text-sm text-muted-foreground mt-4">
                842 / 1000 beta seats filled — lock pricing now.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Instructions */}
      <AppInstructions />

      {/* Pasteboard Modal */}
      <PasteboardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
