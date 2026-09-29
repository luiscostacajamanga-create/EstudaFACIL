import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, Share } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'card' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'card' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // If already running in standalone mode (already installed app)
  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-100 block">
                Aplicativo Instalado
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Você já está usando o EstudaFácil como aplicativo nativo.
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  // If neither installable nor iOS Safari, or dismissed
  if (!isInstallable && !isIOS) {
    return null;
  }

  // 1. Variant: Header (compact button in top bar)
  if (variant === 'header') {
    if (isInstallable) {
      return (
        <button
          onClick={install}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          title="Instalar EstudaFácil no seu dispositivo"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Instalar App</span>
        </button>
      );
    }

    if (isIOS) {
      return (
        <>
          <button
            onClick={() => setShowIOSGuide(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Instalar EstudaFácil no iPhone / iPad"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar App</span>
          </button>

          {showIOSGuide && (
            <IOSGuideModal onClose={() => setShowIOSGuide(false)} />
          )}
        </>
      );
    }
  }

  // 2. Variant: Card (prominent in Profile Tab or Home Tab)
  if (variant === 'card') {
    return (
      <>
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Instale o EstudaFácil no seu dispositivo
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Acesso rápido direto da tela de início, sem precisar abrir o navegador!
              </p>
            </div>
          </div>

          <button
            onClick={isIOS ? () => setShowIOSGuide(true) : install}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Instalar EstudaFácil</span>
          </button>
        </div>

        {showIOSGuide && (
          <IOSGuideModal onClose={() => setShowIOSGuide(false)} />
        )}
      </>
    );
  }

  // 3. Variant: Banner (floating dismissible banner)
  if (variant === 'banner' && !bannerDismissed) {
    return (
      <>
        <div className="fixed top-17 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/80 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                Instale o EstudaFácil
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                Aplicativo inteligente para seus estudos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={isIOS ? () => setShowIOSGuide(true) : install}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Instalar
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Dispensar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showIOSGuide && (
          <IOSGuideModal onClose={() => setShowIOSGuide(false)} />
        )}
      </>
    );
  }

  return null;
};

// Modal with clear iOS Safari instructions
const IOSGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instalar no iPhone / iPad
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p className="leading-relaxed">
            No Safari do iOS, você pode instalar o EstudaFácil em 2 passos rápidos:
          </p>

          <ol className="space-y-2.5 list-decimal list-inside bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 font-medium">
            <li className="leading-relaxed">
              Toque no botão <strong className="text-slate-900 dark:text-white inline-flex items-center gap-1 mx-1"><Share className="w-3.5 h-3.5 text-blue-500" /> Compartilhar</strong> na barra inferior do Safari.
            </li>
            <li className="leading-relaxed">
              Role a lista para baixo e toque em <strong className="text-slate-900 dark:text-white">"Adicionar à Tela de Início"</strong>.
            </li>
          </ol>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};
