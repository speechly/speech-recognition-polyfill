export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative
  isFinal: boolean
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[]
  resultIndex: number
}

export type SpeechRecognitionEventCallback = (speechRecognitionEvent: SpeechRecognitionEvent) => void

export type SpeechEndCallback = () => void

export interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  onresult: SpeechRecognitionEventCallback
  onend: SpeechEndCallback
  start: () => Promise<void>
  stop: () => Promise<void>
  abort: () => Promise<void>
}

export type SpeechRecognitionClass = new () => SpeechRecognition
