// Web Speech API utility tailored for clinical & medical vocabulary pronunciation

export interface SpeechStatus {
  speaking: boolean;
  term: string | null;
}

export const SPEECH_EVENT = 'dmlt-speech-status-changed';

let currentTerm: string | null = null;
let selectedVoice: SpeechSynthesisVoice | null = null;

// Clean and optimize text for medical pronunciation clarity
export function sanitizeForMedicalSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text
    // Replace common abbreviations with clear spoken forms
    .replace(/\bH&E\b/gi, 'H and E')
    .replace(/\bVDRL\b/gi, 'V D R L')
    .replace(/\bRPR\b/gi, 'R P R')
    .replace(/\bTPHA\b/gi, 'T P H A')
    .replace(/\bELISA\b/gi, 'Eliza')
    .replace(/\bGOD-POD\b/gi, 'G O D P O D')
    .replace(/\bAFB\b/gi, 'A F B')
    .replace(/\bPCR\b/gi, 'P C R')
    .replace(/\bEDTA\b/gi, 'E D T A')
    .replace(/\bCSF\b/gi, 'C S F')
    .replace(/\bSGOT\b/gi, 'S G O T')
    .replace(/\bSGPT\b/gi, 'S G P T')
    .replace(/\bAST\b/gi, 'A S T')
    .replace(/\bALT\b/gi, 'A L T')
    .replace(/\bALP\b/gi, 'A L P')
    .replace(/\bBUN\b/gi, 'B U N')
    .replace(/\bPT\b/gi, 'P T')
    .replace(/\bAPTT\b/gi, 'A P T T')
    .replace(/\bINR\b/gi, 'I N R')
    .replace(/\bRhD\b/gi, 'R h D')
    .replace(/\bRh\b/gi, 'R h')
    .replace(/\bABO\b/gi, 'A B O')
    .replace(/\bFUT1\b/gi, 'F U T 1')
    .replace(/\bFUT2\b/gi, 'F U T 2')
    .replace(/\bIgG\b/gi, 'I g G')
    .replace(/\bIgM\b/gi, 'I g M')
    .replace(/\bIgA\b/gi, 'I g A')
    .replace(/\bIgE\b/gi, 'I g E')
    .replace(/\bIgD\b/gi, 'I g D')
    .replace(/\bAHG\b/gi, 'A H G')
    .replace(/\bDAT\b/gi, 'Direct Antiglobulin Test')
    .replace(/\bIAT\b/gi, 'Indirect Antiglobulin Test')
    .replace(/\bHDFN\b/gi, 'Hemolytic Disease of the Fetus and Newborn')
    .replace(/\bHDN\b/gi, 'Hemolytic Disease of the Newborn')
    .replace(/\bHbA1c\b/gi, 'Hemoglobin A 1 c')
    .replace(/\bKOH\b/gi, 'K O H')
    .replace(/\bpH\b/gi, 'p H')
    .replace(/\bmg\/dL\b/gi, 'milligrams per deciliter')
    .replace(/\bg\/dL\b/gi, 'grams per deciliter')
    .replace(/\bIU\/L\b/gi, 'International Units per liter')
    .replace(/\bmL\b/gi, 'milliliters')
    .replace(/\bµm\b/gi, 'micrometers')
    .replace(/A\/G\s+ratio/gi, 'Albumin to Globulin ratio')
    .replace(/anti-([A-Za-z0-9]+)/gi, 'anti $1')
    // Remove brackets, parentheses or trailing punctuation for pure pronunciation
    .replace(/[()[\]{}]/g, ' ')
    .trim();

  return cleaned;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function notifyStatus(speaking: boolean, term: string | null) {
  currentTerm = speaking ? term : null;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(SPEECH_EVENT, {
        detail: { speaking, term: currentTerm }
      })
    );
  }
}

// Load and pick best English voice
function pickVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  if (selectedVoice) return selectedVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Prefer natural English voices
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') ||
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel') ||
        v.name.includes('Karen') ||
        v.name.includes('Serena'))
  );

  selectedVoice = preferred || voices.find((v) => v.lang.startsWith('en')) || voices[0];
  return selectedVoice;
}

// Pre-warm voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    pickVoice();
  };
}

export function stopSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
    notifyStatus(false, null);
  } catch (err) {
    console.error('Failed to cancel speech synthesis', err);
  }
}

export function getCurrentlySpeakingTerm(): string | null {
  return currentTerm;
}

export function speakMedicalTerm(
  rawTerm: string,
  options?: {
    rate?: number; // default 0.86 for clear medical enunciation
    pitch?: number; // default 1.0
    onEnd?: () => void;
  }
): boolean {
  if (!isSpeechSupported()) {
    console.warn('Speech synthesis is not supported in this browser environment.');
    return false;
  }

  try {
    // If already speaking the exact same term, toggle off (stop)
    if (currentTerm === rawTerm && window.speechSynthesis.speaking) {
      stopSpeech();
      return false;
    }

    // Stop any ongoing utterance before starting
    stopSpeech();

    const textToSpeak = sanitizeForMedicalSpeech(rawTerm);
    if (!textToSpeak) return false;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    // Deliberate, clear rate for multi-syllabic medical terms
    utterance.rate = options?.rate ?? 0.86;
    utterance.pitch = options?.pitch ?? 1.0;

    const voice = pickVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      notifyStatus(true, rawTerm);
    };

    utterance.onend = () => {
      notifyStatus(false, null);
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error or interrupted:', e);
      notifyStatus(false, null);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Error in speakMedicalTerm', err);
    notifyStatus(false, null);
    return false;
  }
}
