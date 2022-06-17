import { BrowserClient, BrowserMicrophone, ErrNoAudioConsent, Segment } from '@speechly/browser-client'
import {
  SpeechRecognitionEventCallback,
  SpeechEndCallback,
  SpeechErrorCallback,
  SpeechRecognitionResult,
  SpeechRecognitionClass,
  SpeechRecognition,
  MicrophoneNotAllowedError,
  SpeechRecognitionFailedError,
} from './types'

/**
 * Returns a SpeechRecognition implementation that uses a given Speechly app ID
 * to generate transcriptions using the Speechly API
 *
 * @param appId - Speechly app ID
 * @returns Class that implements the SpeechRecognition interface
 * @public
 */
export const createSpeechlySpeechRecognition = (appId: string): SpeechRecognitionClass => {
  const browserSupportsAudioApis: boolean =
    typeof window !== 'undefined' &&
    window.navigator?.mediaDevices !== undefined &&
    (window.AudioContext !== undefined || window.webkitAudioContext !== undefined)

  return class SpeechlySpeechRecognition implements SpeechRecognition {
    static readonly hasBrowserSupport: boolean = browserSupportsAudioApis

    private readonly client: BrowserClient
    private clientInitialised = false
    private aborted = false
    private transcribing = false

    continuous = false
    interimResults = false
    onresult: SpeechRecognitionEventCallback = () => {}
    onend: SpeechEndCallback = () => {}
    onerror: SpeechErrorCallback = () => {}

    constructor() {
      this.client = new BrowserClient({ appId })
      this.client.onSegmentChange(this.handleResult)
    }

    public start = async (): Promise<void> => {
      try {
        this.aborted = false
        await this.initialise()
        await this.client.start()
        this.transcribing = true
      } catch (e) {
        if (e === ErrNoAudioConsent) {
          this.onerror(MicrophoneNotAllowedError)
        } else {
          this.onerror(SpeechRecognitionFailedError)
        }
      }
    }

    public stop = async (): Promise<void> => {
      await this._stop()
    }

    public abort = async (): Promise<void> => {
      this.aborted = true
      await this._stop()
    }

    private readonly initialise = async (): Promise<void> => {
      if (!this.clientInitialised) {
        const microphone = new BrowserMicrophone()
        await microphone.initialize()
        // TODO: throw?
        if (microphone.mediaStream === undefined) return
        await this.client.attach(microphone.mediaStream)
        this.clientInitialised = true
      }
    }

    private readonly _stop = async (): Promise<void> => {
      if (!this.transcribing) {
        return
      }
      await this.initialise()
      try {
        await this.client.stop()
        this.transcribing = false
        this.onend()
      } catch (e) {
        // swallow errors
      }
    }

    private readonly handleResult = (segment: Segment): void => {
      if (this.aborted) {
        return
      }
      if (!this.interimResults && !segment.isFinal) {
        return
      }
      const transcript = segment.words
        .map(x => x.value)
        .filter(x => x)
        .join(' ')
      const results: SpeechRecognitionResult[] = [
        {
          0: {
            transcript,
            confidence: 1,
          },
          isFinal: segment.isFinal,
        },
      ]
      this.onresult({ results, resultIndex: 0 })
      if (!this.continuous && segment.isFinal) {
        this.abort().catch(() => {}) // swallow errors
      }
    }
  }
}

export default createSpeechlySpeechRecognition
