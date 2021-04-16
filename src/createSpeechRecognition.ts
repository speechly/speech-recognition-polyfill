import { Client, Segment } from '@speechly/browser-client'
import { SpeechRecognitionEventCallback, SpeechEndCallback, SpeechRecognitionResult, Class } from './types'

const createSpeechlySpeechRecognition = (appId: string): Class => {
  return class SpeechlySpeechRecognition {
    private client = new Client({ appId })
    private clientInitialised = false
    private aborted = false
    private continuous = false

    onresult: SpeechRecognitionEventCallback = () => {}
    onend: SpeechEndCallback = () => {}

    constructor() {
      this.client = new Client({ appId })
      this.client.onSegmentChange(this.handleResult)
    }

    public start = async(): Promise<void> => {
      this.aborted = false
      await this.initialise()
      await this.client.startContext()
    }

    public stop = async(): Promise<void>  => {
      await this._stop()
    }

    public abort = async(): Promise<void>  => {
      this.aborted = true
      await this._stop()
    }

    private initialise = async(): Promise<void>  => {
      if (!this.clientInitialised) {
        await this.client.initialize()
        this.clientInitialised = true
      }
    }

    private _stop = async(): Promise<void>  => {
      await this.initialise()
      try {
        await this.client.stopContext()
        this.onend()
      } catch (e) {
        // swallow
      }
    }

    private handleResult = (segment: Segment): void => {
      if (this.aborted) {
        return
      }
      const transcript = segment.words.map(x => x.value).filter(x => x).join(' ')
      const results: SpeechRecognitionResult[] = [{
        0: {
          transcript,
          confidence: 1
        },
        isFinal: segment.isFinal
      }]
      this.onresult({ results, resultIndex: 0 })
      if (!this.continuous && segment.isFinal) {
        this.abort()
      }
    }
  }
}

export default createSpeechlySpeechRecognition