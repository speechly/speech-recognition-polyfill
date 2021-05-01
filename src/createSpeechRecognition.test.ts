import createSpeechlySpeechRecognition from './createSpeechRecognition';
import TEST_DATA from './testData';

let _callback: any;
const mockOnSegmentChange = jest.fn((callback: any) => {
  _callback = callback;
});
const mockInitialize = jest.fn(() => Promise.resolve());
const mockStartContext = jest.fn(() => Promise.resolve());
const mockStopContext = jest.fn(() => Promise.resolve());
jest.mock('@speechly/browser-client', () => ({
  Client: function () {
    return {
      onSegmentChange: mockOnSegmentChange,
      initialize: mockInitialize,
      startContext: mockStartContext,
      stopContext: mockStopContext,
    };
  }
}));

const speak = () => {
  TEST_DATA.forEach(_callback)
}

describe('createSpeechlySpeechRecognition', () => {
  it('calls initialize and startContext on Speechly client when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();

    await speechRecognition.start();

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(mockStartContext).toHaveBeenCalledTimes(1);
  })

  it('calls given onresult for each interim or final result when transcribing interim results', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speak();

    expect(mockOnResult).toHaveBeenCalledTimes(TEST_DATA.length);
  })

  it('calls given onresult for each interim or final result with expected results when transcribing interim results', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speak();

    expect(mockOnResult).toHaveBeenNthCalledWith(1, { results: [
      {
        0: {
          transcript: 'SENT',
          confidence: 1,
        },
        isFinal: false,
      },
    ], resultIndex: 0})
    expect(mockOnResult).toHaveBeenNthCalledWith(2, { results: [
      {
        0: {
          transcript: 'SENTENCE',
          confidence: 1,
        },
        isFinal: false,
      },
    ], resultIndex: 0})
    for (let i = 3; i < 12; i += 1) {
      expect(mockOnResult).toHaveBeenNthCalledWith(i, { results: [
        {
          0: {
            transcript: 'SENTENCE ONE',
            confidence: 1,
          },
          isFinal: false,
        },
      ], resultIndex: 0})
    }
    expect(mockOnResult).toHaveBeenNthCalledWith(12, { results: [
      {
        0: {
          transcript: 'SENTENCE ONE',
          confidence: 1,
        },
        isFinal: true,
      },
    ], resultIndex: 0})
  })
})
