// @ts-nocheck
import TEST_DATA from './testData';

const { SENTENCE_ONE } = TEST_DATA;

export const mockUndefinedWindow = () => {
  delete global.window;
}

export const mockUndefinedNavigator = () => {
  global.navigator = undefined;
}

export const mockMediaDevices = () => {
  global.navigator.mediaDevices = jest.fn();
}

export const mockUndefinedMediaDevices = () => {
  global.navigator.mediaDevices = undefined;
}

export const mockAudioContext = () => {
  global.AudioContext = jest.fn();
}

export const mockWebkitAudioContext = () => {
  global.webkitAudioContext = jest.fn();
}

export const mockUndefinedAudioContext = () => {
  global.AudioContext = undefined;
}

export const mockUndefinedWebkitAudioContext = () => {
  global.webkitAudioContext = undefined;
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