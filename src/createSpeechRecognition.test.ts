import createSpeechlySpeechRecognition from './createSpeechRecognition';
import TEST_DATA from './testData';

const { SENTENCE_ONE, SENTENCE_TWO } = TEST_DATA;

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

const speak = (sentence: any) => {
  sentence.forEach(_callback)
}

const expectSentenceToBeTranscribedWithFinalResult = (sentence: any, mockOnResult: any, startIndex = 1) => {
  const secondWord = sentence === SENTENCE_ONE ? 'ONE': 'TWO';
  expect(mockOnResult).toHaveBeenNthCalledWith(startIndex, { results: [
    {
      0: {
        transcript: `SENTENCE ${secondWord}`,
        confidence: 1,
      },
      isFinal: true,
    },
  ], resultIndex: 0})
}

const expectSentenceToBeTranscribedWithInterimAndFinalResults = (sentence: any, mockOnResult: any, startIndex = 1) => {
  const secondWord = sentence === SENTENCE_ONE ? 'ONE': 'TWO';
  expect(mockOnResult).toHaveBeenNthCalledWith(startIndex, { results: [
    {
      0: {
        transcript: 'SENT',
        confidence: 1,
      },
      isFinal: false,
    },
  ], resultIndex: 0})
  expect(mockOnResult).toHaveBeenNthCalledWith(startIndex + 1, { results: [
    {
      0: {
        transcript: 'SENTENCE',
        confidence: 1,
      },
      isFinal: false,
    },
  ], resultIndex: 0})
  for (let i = startIndex + 2; i < startIndex + sentence.length - 1; i += 1) {
    expect(mockOnResult).toHaveBeenNthCalledWith(i, { results: [
      {
        0: {
          transcript: `SENTENCE ${secondWord}`,
          confidence: 1,
        },
        isFinal: false,
      },
    ], resultIndex: 0})
  }
  expect(mockOnResult).toHaveBeenNthCalledWith(startIndex + sentence.length - 1, { results: [
    {
      0: {
        transcript: `SENTENCE ${secondWord}`,
        confidence: 1,
      },
      isFinal: true,
    },
  ], resultIndex: 0})
}

describe('createSpeechlySpeechRecognition', () => {
  beforeEach(() => {
    mockInitialize.mockClear();
    mockStartContext.mockClear();
    mockStopContext.mockClear();
    mockOnSegmentChange.mockClear();
  });

  it('calls initialize and startContext on Speechly client when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();

    await speechRecognition.start();

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(mockStartContext).toHaveBeenCalledTimes(1);
  })

  it('calls given onresult for only the final result (interimResults: false)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;

    await speechRecognition.start();
    speak(SENTENCE_ONE);

    expect(mockOnResult).toHaveBeenCalledTimes(1);
    expectSentenceToBeTranscribedWithFinalResult(SENTENCE_ONE, mockOnResult);
  })

  it('calls given onresult for each interim or final result (interimResults: true)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speak(SENTENCE_ONE);

    expect(mockOnResult).toHaveBeenCalledTimes(SENTENCE_ONE.length);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_ONE, mockOnResult);
  })

  it('transcribes two utterances when continuous is turned on (interimResults: false)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.continuous = true;

    await speechRecognition.start();
    speak(SENTENCE_ONE);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(2);
    expectSentenceToBeTranscribedWithFinalResult(SENTENCE_ONE, mockOnResult);
    expectSentenceToBeTranscribedWithFinalResult(SENTENCE_TWO, mockOnResult, 2);
  })

  it('transcribes only one of two utterances when continuous is turned off (interimResults: false)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;

    await speechRecognition.start();
    speak(SENTENCE_ONE);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(1);
    expectSentenceToBeTranscribedWithFinalResult(SENTENCE_ONE, mockOnResult);
  })

  it('transcribes two utterances when continuous is turned on (interimResults: true)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.interimResults = true;
    speechRecognition.continuous = true;

    await speechRecognition.start();
    speak(SENTENCE_ONE);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(SENTENCE_ONE.length + SENTENCE_TWO.length);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_ONE, mockOnResult);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_TWO, mockOnResult, SENTENCE_ONE.length + 1);
  })

  it('transcribes only one of two utterances when continuous is turned off (interimResults: true)', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speak(SENTENCE_ONE);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(SENTENCE_ONE.length);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_ONE, mockOnResult);
  })

  it('does not call initialize, stopContext or onend when stopping a transcription that was never started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.stop();

    expect(mockInitialize).toHaveBeenCalledTimes(0);
    expect(mockStopContext).toHaveBeenCalledTimes(0);
    expect(mockOnEnd).toHaveBeenCalledTimes(0);
  })

  it('calls initialize, stopContext or onend when stopping a transcription that has been started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.stop();

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(mockStopContext).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })

  it('does not call initialize, stopContext or onend a second time when stopping a transcription that was already stopped', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.stop();
    await speechRecognition.stop();

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(mockStopContext).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })
})
