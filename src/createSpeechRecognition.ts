import { Client, Segment } from '@speechly/browser-client'

interface SpeechRecognitionAlternative {
  transcript: string,
  confidence: number
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative,
  isFinal: boolean
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[],
  resultIndex: number
}

type SpeechRecognitionEventCallback = (speechRecognitionEvent: SpeechRecognitionEvent) => void

const createSpeechlySpeechRecognition = (appId: string) => {
  return class SpeechlySpeechRecognition {
    client = new Client({ appId })
    clientInitialised = false
    aborted = false
    continuous = false
    onresult: SpeechRecognitionEventCallback = () => {}
    onend = () => {}

    constructor() {
      this.client.onSegmentChange(this.handleResult)
    }
    
    initialise = async () => {
      if (!this.clientInitialised) {
        await this.client.initialize()
        this.clientInitialised = true
      }
    }

    start = async () => {
      this.aborted = false
      await this.initialise()
      await this.client.startContext()
    }

    stop = async () => {
      await this._stop()
    }

    abort = async () => {
      this.aborted = true
      await this._stop()
    }

    handleResult = (segment: Segment) => {
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

    _stop = async () => {
      await this.initialise()
      try {
        await this.client.stopContext()
        this.onend()
      } catch (e) {
        // swallow
      }
    }
  }
}

export default createSpeechlySpeechRecognition