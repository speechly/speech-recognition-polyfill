export interface SpeechRecognitionAlternative {
  transcript: string,
  confidence: number
}

export interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative,
  isFinal: boolean
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[],
  resultIndex: number
}

export type SpeechRecognitionEventCallback = (speechRecognitionEvent: SpeechRecognitionEvent) => void

export type SpeechEndCallback = () => void

export type Class = new() => Object