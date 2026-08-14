import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Search, 
  User, 
  Mic, 
  TrendingUp, 
  ShieldAlert, 
  ChevronDown,
  ChevronRight,
  BarChart2,
  Plus,
  Bell,
  Info,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  LineChart as LineChartIcon,
  Image as ImageIcon,
  MapPin,
  Zap,
  Loader2
} from 'lucide-react';
import OpenAI from 'openai';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  type: 'text' | 'image';
  imageUrl?: string;
  mapLinks?: { uri: string; title: string }[];
}

export function AQEICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Hello! I am your AfriQuant AI. I deliver real-time, institutional-grade financial intelligence across African markets. How can I assist your decision-making today?',
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [isMapsMode, setIsMapsMode] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string, isImageRequest = false) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      type: 'text'
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (isImageRequest) {
        // Image Generation Flow using Pollinations.ai (free, no key required)
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(text + " financial market africa high quality")}?width=${imageSize === '4K' ? 3840 : imageSize === '2K' ? 2560 : 1920}&height=${imageSize === '4K' ? 2160 : imageSize === '2K' ? 1440 : 1080}&nologo=true`;
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: 'Here is the generated market visualization:',
          type: 'image',
          imageUrl
        }]);
      } else {
        // Text Flow
        const openai = new OpenAI({
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '',
          dangerouslyAllowBrowser: true,
        });
        
        // Format history
        const history: any[] = messages.map(m => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.content
        }));
        history.push({ role: 'user', content: text });

        let systemInstruction = "You are AfriQuant AI, an institutional-grade financial intelligence advisor for African markets. Provide concise, data-driven insights. Format your responses using Markdown. Always include a disclaimer that you are an AI and not providing financial advice.";
        
        if (isMapsMode) {
          systemInstruction += " The user has enabled Maps Mode. If they ask about locations, companies, or infrastructure, provide relevant Google Maps URLs formatted as markdown links.";
        }

        history.unshift({ role: 'system', content: systemInstruction });

        let modelName = 'openai/gpt-4o-mini';

        if (isThinkingMode) {
          modelName = 'anthropic/claude-3.5-sonnet'; // Use a more advanced model for thinking mode
        }

        const response = await openai.chat.completions.create({
          model: modelName,
          messages: history,
        });

        const responseText = response.choices[0].message.content || 'No response generated.';

        // Extract markdown links that look like maps
        const mapLinks: { uri: string; title: string }[] = [];
        const urlRegex = /\[([^\]]+)\]\((https:\/\/goo\.gl\/maps\/[^)]+|https:\/\/www\.google\.com\/maps\/[^)]+)\)/g;
        let match;
        while ((match = urlRegex.exec(responseText)) !== null) {
          mapLinks.push({ title: match[1], uri: match[2] });
        }

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: responseText,
          type: 'text',
          mapLinks: mapLinks.length > 0 ? mapLinks : undefined
        }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'I encountered an error while processing your request. Please try again.',
        type: 'text'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] border border-white/[0.08] rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      
      {/* Controls Bar */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between flex-wrap gap-4 z-10">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-8 h-4 rounded-full transition-colors relative ${isThinkingMode ? 'bg-[#0066FF]' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isThinkingMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input type="checkbox" className="hidden" checked={isThinkingMode} onChange={(e) => setIsThinkingMode(e.target.checked)} />
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isThinkingMode ? 'text-[#0066FF]' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              <BrainCircuit className="w-3 h-3" /> Deep Analysis
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-8 h-4 rounded-full transition-colors relative ${isMapsMode ? 'bg-[#00FFB2]' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isMapsMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input type="checkbox" className="hidden" checked={isMapsMode} onChange={(e) => setIsMapsMode(e.target.checked)} />
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isMapsMode ? 'text-[#00FFB2]' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
              <MapPin className="w-3 h-3" /> Maps Grounding
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Image Size:</span>
          <select 
            value={imageSize} 
            onChange={(e) => setImageSize(e.target.value as any)}
            className="bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-[#D4AF37]/50"
          >
            <option value="1K">1K</option>
            <option value="2K">2K</option>
            <option value="4K">4K</option>
          </select>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A7322] flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                  <BrainCircuit className="w-4 h-4 text-[#0A0A0A]" />
                </div>
              )}
              
              <div className={`max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#0044AA] text-white rounded-2xl rounded-tr-none p-4 shadow-[0_0_15px_rgba(0,102,255,0.2)]' 
                  : 'bg-[#0A0A0A] border border-white/10 rounded-2xl rounded-tl-none p-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
              }`}>
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="space-y-4 w-full">
                    {msg.type === 'image' && msg.imageUrl ? (
                      <div className="space-y-3">
                        <p className="text-zinc-200">{msg.content}</p>
                        <img src={msg.imageUrl} alt="Generated Visualization" className="w-full rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                      </div>
                    ) : (
                      <div className="markdown-body text-zinc-200 text-sm leading-relaxed prose prose-invert max-w-none">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    )}
                    
                    {msg.mapLinks && msg.mapLinks.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/5">
                        <h4 className="text-[10px] font-bold text-[#00FFB2] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" /> Location References
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {msg.mapLinks.map((link, i) => (
                            <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] rounded-lg text-xs hover:bg-[#00FFB2]/20 transition-colors flex items-center gap-1 font-bold">
                              {link.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {msg.role === 'model' && msg.type !== 'image' && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2">
                    <ShieldAlert className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                      This is AI-generated insight, not financial advice.
                    </p>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A7322] flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              <BrainCircuit className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-1 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-md z-10">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputValue);
              }}
              placeholder="Ask Africa Markets..." 
              className="w-full bg-white/5 border border-white/[0.1] rounded-xl pl-4 pr-12 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all shadow-inner font-medium"
            />
          </div>
          <button 
            onClick={() => handleSend(inputValue, true)}
            disabled={!inputValue.trim() || isTyping}
            title="Generate Image"
            className="p-4 bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 rounded-xl hover:bg-[#0066FF]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,102,255,0.2)]"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-4 bg-gradient-to-r from-[#D4AF37] to-[#8A7322] text-[#0A0A0A] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {["Best investment opportunities in Africa right now", "Find local brokers in Nairobi", "Generate a concept image of a futuristic African stock exchange"].map((suggestion, i) => (
            <button 
              key={i} 
              onClick={() => setInputValue(suggestion)}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#D4AF37] hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

