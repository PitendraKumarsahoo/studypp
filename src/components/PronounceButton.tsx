import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import {
  speakMedicalTerm,
  stopSpeech,
  getCurrentlySpeakingTerm,
  SPEECH_EVENT,
  isSpeechSupported
} from '../utils/speech';

interface PronounceButtonProps {
  term: string;
  phonetic?: string;
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  label?: string;
  variant?: 'default' | 'subtle' | 'pill';
  className?: string;
}

export const PronounceButton: React.FC<PronounceButtonProps> = ({
  term,
  phonetic,
  size = 'sm',
  showLabel = false,
  label = 'Pronounce',
  variant = 'default',
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const supported = isSpeechSupported();

  useEffect(() => {
    const handleSpeechChange = (e: Event) => {
      const custom = e as CustomEvent<{ speaking: boolean; term: string | null }>;
      if (custom.detail) {
        setIsSpeaking(custom.detail.speaking && custom.detail.term === term);
      } else {
        const cur = getCurrentlySpeakingTerm();
        setIsSpeaking(cur === term);
      }
    };

    window.addEventListener(SPEECH_EVENT, handleSpeechChange);
    return () => window.removeEventListener(SPEECH_EVENT, handleSpeechChange);
  }, [term]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakMedicalTerm(term);
    }
  };

  if (!supported) return null;

  // Sizing definitions
  const sizeClasses = {
    xs: 'p-1 text-[11px] rounded-md gap-1',
    sm: 'p-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-2.5 py-1.5 text-xs rounded-xl gap-2 font-bold'
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4'
  }[size];

  // Variant styling
  const variantClasses = {
    default: isSpeaking
      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40'
      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 hover:border-indigo-300',
    subtle: isSpeaking
      ? 'bg-emerald-100 text-emerald-800'
      : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-100',
    pill: isSpeaking
      ? 'bg-emerald-600 text-white shadow-xs'
      : 'bg-white hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300'
  }[variant];

  return (
    <button
      type="button"
      id={`btn-tts-${term.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      onClick={handleClick}
      title={
        isSpeaking
          ? `Stop pronunciation of ${term}`
          : phonetic
          ? `Listen to pronunciation: ${term} [${phonetic}]`
          : `Listen to pronunciation: ${term}`
      }
      aria-label={isSpeaking ? `Stop pronunciation` : `Pronounce ${term}`}
      className={`inline-flex items-center justify-center font-semibold transition-all shrink-0 active:scale-95 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {isSpeaking ? (
        <span className="relative flex items-center justify-center">
          <VolumeX className={`${iconSizes} animate-pulse`} />
          <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </span>
      ) : (
        <Volume2 className={`${iconSizes} text-indigo-600`} />
      )}

      {showLabel && (
        <span className="whitespace-nowrap">
          {isSpeaking ? 'Speaking...' : label}
        </span>
      )}
    </button>
  );
};
