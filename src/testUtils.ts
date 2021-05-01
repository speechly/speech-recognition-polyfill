import TEST_DATA from './testData';

const { SENTENCE_ONE } = TEST_DATA;

let _callback: any;
export const mockOnSegmentChange = jest.fn((callback: any) => {
  _callback = callback;
});
export const mockInitialize = jest.fn(() => Promise.resolve());
export const mockStartContext = jest.fn(() => Promise.resolve());
export const mockStopContext = jest.fn(() => Promise.resolve());
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

export const speak = (sentence: any) => {
  sentence.forEach(_callback)
}

export const speakAndInterrupt = (sentence: any, interrupt: Function) => {
  _callback(sentence[0]);
  interrupt();
  sentence.slice(1).forEach(_callback);
}

export const expectSentenceToBeTranscribedWithFirstInitialResult = (sentence: any, mockOnResult: any) => {
  expect(mockOnResult).toHaveBeenNthCalledWith(1, { results: [
    {
      0: {
        transcript: 'SENT',
        confidence: 1,
      },
      isFinal: false,
    },
  ], resultIndex: 0})
}

export const expectSentenceToBeTranscribedWithFinalResult = (sentence: any, mockOnResult: any, startIndex = 1) => {
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

export const expectSentenceToBeTranscribedWithInterimAndFinalResults = (sentence: any, mockOnResult: any, startIndex = 1) => {
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