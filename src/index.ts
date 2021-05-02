/**
 * A polyfill (a "{@link https://ponyfoo.com/articles/polyfills-or-ponyfills | ponyfill}" to be more precise) for the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition | SpeechRecognition API} that uses
 * {@link https://www.speechly.com/ | Speechly} to implement the transcription functionality
 *
 * @remarks
 * The implementation of the {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition | SpeechRecognition spec}
 * is incomplete, but should enable the majority of use cases
 *
 * @packageDocumentation
 */

export * from './createSpeechRecognition'
export * from './types'
