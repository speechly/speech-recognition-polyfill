import { Client, Segment } from '@speechly/browser-client'
import {
  SpeechRecognitionEventCallback,
  SpeechEndCallback,
  SpeechRecognitionResult,
  SpeechRecognitionClass,
  SpeechRecognition,
} from './types'

/**
 * Returns a SpeechRecognition implementation that uses a given Speechly app ID
 * to generate transcriptions using the Speechly API
 *
 * @param appId - Speechly app ID
 * @returns Class that implements the SpeechRecognition interface
 * @alpha
 */
export const createSpeechlySpeechRecognition = (appId: string): SpeechRecognitionClass => {
  return class SpeechlySpeechRecognition implements SpeechRecognition {
    private readonly client: Client
    private clientInitialised = false
    private aborted = false
    private transcribing = false

    continuous = false
    interimResults = false
    onresult: SpeechRecognitionEventCallback = () => {}
    onend: SpeechEndCallback = () => {}

    constructor() {
      this.client = new Client({ appId })
      this.client.onSegmentChange(this.handleResult)
    }

    public start = async (): Promise<void> => {
      this.aborted = false
      await this.initialise()
      await this.client.startContext()
      this.transcribing = true
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
        await this.client.initialize()
        this.clientInitialised = true
      }
    }

    private readonly _stop = async (): Promise<void> => {
      if (!this.transcribing) {
        return
      }
      await this.initialise()
      try {
        await this.client.stopContext()
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
