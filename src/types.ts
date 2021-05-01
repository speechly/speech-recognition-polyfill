/**
 * Transcript for the ongoing utterance, including the level of confidence in that transcript
 * @alpha
 */
export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

/**
 * Object containing a transcript for the ongoing utterance and an indicator of whether that transcript is final or not
 * @alpha
 */
export interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative
  isFinal: boolean
}

/**
 * Data associated with an update to the transcript for the ongoing utterance
 * @alpha
 */
export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[]
  resultIndex: number
}

/**
 * Callback that is invoked whenever the transcript gets updated
 * @alpha
 */
export type SpeechRecognitionEventCallback = (speechRecognitionEvent: SpeechRecognitionEvent) => void

/**
 * Callback that is invoked when transcription ends
 * @alpha
 */
export type SpeechEndCallback = () => void

/**
 * Subset of the {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition | W3C SpeechRecognition spec} that
 * can be used for basic transcription
 * @alpha
 */
export interface SpeechRecognition {
  /**
   * Should the microphone listen continuously (true) or should it stop after the first utterance (false)?
   */
  continuous: boolean
  /**
   * Should interim results be emitted? These are parts of an ongoing utterance for which transcription hasn't
   * completed yet
   */
  interimResults: boolean
  /**
   * Callback that is invoked whenever the transcript updates
   */
  onresult: SpeechRecognitionEventCallback
  /**
   * Callback that is invoked when transcription ends
   */
  onend: SpeechEndCallback
  /**
   * Start transcribing utterances received from the microphone
   */
  start: () => Promise<void>
  /**
   * Stop transcribing utterances received from the microphone, but finish processing the current utterance
   */
  stop: () => Promise<void>
  /**
   * Stop transcribing utterances received from the microphone, and cut off the current utterance
   */
  abort: () => Promise<void>
}

/**
 * Class that implements the SpeechRecognition interface
 * @alpha
 */
export type SpeechRecognitionClass = new () => SpeechRecognition
