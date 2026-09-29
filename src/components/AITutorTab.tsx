import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import mascotImage from '../assets/images/mascot_estudafacil_1790677702421.jpg';

export interface Message {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  time: string;
  isError?: boolean;
}

interface AITutorTabProps {
  initialQuestion?: string;
}

export const AITutorTab: React.FC<AITutorTabProps> = ({ initialQuestion }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('estudafacil_tutor_chat');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar chat salvo:', e);
    }
    return [
      {
        id: 'welcome',
        sender: 'tutor',
        text: 'Olá! 👋 Qual assunto você quer aprender hoje?\n\nEstou aqui para tirar suas dúvidas de Matemática, Português, História, Geografia, Ciências ou Inglês com explicações simples, passo a passo e cheias de exemplos!',
        time: 'Agora'
      }
    ];
  });
  const [inputVal, setInputVal] = useState(initialQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist messages whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('estudafacil_tutor_chat', JSON.stringify(messages));
    } catch (e) {
      console.warn('Erro ao salvar chat:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      setInputVal(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    '📐 Como resolver uma equação de 2º grau passo a passo?',
    '✍️ Qual o macete para nunca mais errar crase?',
    '⚡ O que são as Leis de Newton com exemplos do dia a dia?',
    '🏛️ Quais foram os principais motivos da Revolução Francesa?',
    '🌍 Como funcionam os fusos horários no Brasil?',
    '🇬🇧 Quando usar o Present Continuous em inglês?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputVal).trim();
    if (!question || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      time: currentTime
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newMessages,
          userMessage: question
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro na comunicação com o servidor (${response.status})`);
      }

      const data = await response.json();
      const tutorReplyText = data.reply || 'Não consegui obter uma resposta adequada. Por favor, tente reformular sua dúvida!';

      const tutorMsg: Message = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: tutorReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      console.error('Erro ao consultar o Tutor IA:', err);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: 'tutor',
        text: `⚠️ Ops, tivemos uma dificuldade momentânea para processar sua dúvida: ${err.message || 'Erro de conexão'}.\n\nPor favor, tente novamente ou confira se sua conexão está ativa.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem('estudafacil_tutor_chat');
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'tutor',
        text: 'Olá! 👋 Qual assunto você quer aprender hoje?\n\nA conversa foi reiniciada. Pode perguntar qualquer dúvida sobre suas matérias!',
        time: 'Agora'
      }
    ]);
  };

  // Helper to format basic markdown-like structures (bold, lists)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold tags formatting
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 pl-1">
            <span className="text-emerald-500 font-bold shrink-0 leading-relaxed">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 pl-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              {line.trim().match(/^\d+\./)?.[0]}
            </span>
            <span className="flex-1">{line.trim().replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-4">
      {/* Top Banner / Header of Tutor IA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 shrink-0 shadow-xs">
            <img
              src={mascotImage}
              alt="Mascote Coruja do Tutor IA"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Tutor IA
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online · Gemini 3.8
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              Olá! 👋 Qual assunto você quer aprender hoje?
            </p>
          </div>
        </div>

        {/* Clear Chat Button */}
        <button
          onClick={handleClearChat}
          className="self-end sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Limpar todas as mensagens e recomeçar a conversa"
        >
          <Trash2 className="w-4 h-4" />
          <span>Limpar conversa</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="flex flex-col h-[calc(100vh-17rem)] min-h-[460px] sm:min-h-[520px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => {
            const isTutor = m.sender === 'tutor';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 sm:gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {isTutor && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm ${
                    isTutor
                      ? m.isError
                        ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 rounded-tl-xs'
                        : 'bg-slate-100/90 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                      : 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    {renderFormattedText(m.text)}
                  </div>
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      isTutor ? 'text-slate-400 dark:text-slate-500' : 'text-emerald-100'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>

                {!isTutor && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-xs text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
                <span>O Tutor IA está analisando e preparando uma explicação didática...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Sugestões rápidas de estudo:
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            placeholder="Digite sua dúvida..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-60 transition-all"
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="px-4 sm:px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm shrink-0"
            aria-label="Enviar dúvida para o Tutor IA"
          >
            <span>Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
