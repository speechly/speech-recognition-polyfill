/**
 * Transcript for the ongoing utterance, including the level of confidence in that transcript
 * @public
 */
export interface SpeechRecognitionAlternative {
  /**
   * Current transcript of the ongoing utterance (the words spoken by the user)
   */
  transcript: string
  /**
   * Level of confidence in the correctness of the transcript (from 0 to 1)
   */
  confidence: number
}

/**
 * Object containing a transcript for the ongoing utterance and an indicator of whether that transcript is final or not
 * @public
 */
export interface SpeechRecognitionResult {
  /**
   * Object containing a transcript for the ongoing utterance (the use of an integer index key is to mimic the
   * structure used in the native {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult | SpeechRecognitionResult spec}),
   * which contains an "array" of alternative transcripts. In the Speechly implementation, there is never more than one
   * alternative, so only the first index is specified in the interface
   */
  0: SpeechRecognitionAlternative
  /**
   * Is this transcript "final"? That is, has the transcription algorithm concluded that the utterance has finished and
   * that the trancript will have no further updates?
   */
  isFinal: boolean
}

/**
 * Data associated with an update to the transcript for the ongoing utterance
 * @public
 */
export interface SpeechRecognitionEvent {
  /**
   * List of speech recognition results, containing all transcripts collected in the current session. This represents the
   * native {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResultList | SpeechRecognitionResultList}.
   * Note that the Speechly implementation currently does not maintain a history of results, only returning the single
   * result for the ongoing utterance
   */
  results: SpeechRecognitionResult[]
  /**
   * Index of the earliest speech recognition result that has changed
   */
  resultIndex: number
}

/**
 * Callback that is invoked whenever the transcript gets updated
 * @param speechRecognitionEvent - Event containing updates to the transcript
 * @public
 */
export type SpeechRecognitionEventCallback = (speechRecognitionEvent: SpeechRecognitionEvent) => void

/**
 * Callback that is invoked when transcription ends
 * @public
 */
export type SpeechEndCallback = () => void

/**
 * Subset of the {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition | W3C SpeechRecognition spec} that
 * can be used for basic transcription
 * @public
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
   * @param speechRecognitionEvent - Event containing updates to the transcript
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
 * @public
 */
export interface SpeechRecognitionClass {
  /**
   * Does the browser support the APIs needed for this polyfill?
   */
  hasBrowserSupport: boolean
  /**
   * Constructor for a SpeechRecognition implementation
   */
  new (): SpeechRecognition
}
