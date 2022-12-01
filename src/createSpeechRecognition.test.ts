import { mocked } from 'ts-jest/utils';
import { BrowserMicrophone, ErrNoAudioConsent } from '@speechly/browser-client'
import createSpeechlySpeechRecognition from './createSpeechRecognition';
import { MicrophoneNotAllowedError, SpeechRecognitionFailedError } from './types';
import {
  mockUndefinedWindow,
  mockUndefinedNavigator,
  mockMediaDevices,
  mockUndefinedMediaDevices,
  mockAudioContext,
  mockWebkitAudioContext,
  mockUndefinedAudioContext,
  mockUndefinedWebkitAudioContext,
  expectSentenceToBeTranscribedWithFinalResult,
  expectSentenceToBeTranscribedWithInterimAndFinalResults,
  expectSentenceToBeTranscribedWithFirstInitialResult,
} from './testUtils';
import TEST_DATA from './testData';

const { SENTENCE_ONE, SENTENCE_TWO } = TEST_DATA;

let _callback: any;
const mockOnSegmentChange = jest.fn((callback) => {
  _callback = callback;
});
const mockMicrophoneInitialize = jest.fn(() => Promise.resolve());
const mockStart = jest.fn(() => Promise.resolve());
const mockStop = jest.fn(() => Promise.resolve());
const mockAttach = jest.fn(() => Promise.resolve());
const mockMediaStream = { data: 'mockData' };
const MockBrowserMicrophone = mocked(BrowserMicrophone, true);

const mockBrowserMicrophone = ({ mediaStream }: { mediaStream: typeof mockMediaStream | null }) => {
  MockBrowserMicrophone.mockImplementation(function () {
    return {
      initialize: mockMicrophoneInitialize,
      close: jest.fn(),
      mediaStream,
    } as any;
  });
};

jest.mock('@speechly/browser-client', () => ({
  BrowserClient: function () {
    return {
      onSegmentChange: mockOnSegmentChange,
      start: mockStart,
      stop: mockStop,
      attach: mockAttach,
      detach: jest.fn(),
    };
  },
  BrowserMicrophone: jest.fn(),
  ErrNoAudioConsent: jest.fn(),
}));

const speak = (sentence: any) => {
  sentence.forEach(_callback)
}

const speakAndInterrupt = (sentence: any, interrupt: any) => {
  _callback(sentence[0]);
  interrupt();
  sentence.slice(1).forEach(_callback);
}

describe('createSpeechlySpeechRecognition', () => {
  beforeEach(() => {
    MockBrowserMicrophone.mockClear();
    mockBrowserMicrophone({ mediaStream: mockMediaStream });
    mockMicrophoneInitialize.mockClear();
    mockStart.mockClear();
    mockStop.mockClear();
    mockOnSegmentChange.mockClear();
    mockAttach.mockClear();
  });

  it('calls initialize on browser microphone when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();

    await speechRecognition.start();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(1);
  })

  it('calls attach on Speechly client with browser microphone media stream when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();

    await speechRecognition.start();

    expect(mockAttach).toHaveBeenCalledTimes(1);
    expect(mockAttach).toHaveBeenCalledWith(mockMediaStream);
  })

  it('calls start on Speechly client when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();

    await speechRecognition.start();

    expect(mockStart).toHaveBeenCalledTimes(1);
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

  it('does not call initialize, stop or onend when stopping a transcription that was never started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.stop();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(0);
    expect(mockStop).toHaveBeenCalledTimes(0);
    expect(mockOnEnd).toHaveBeenCalledTimes(0);
  })

  it('calls initialize, stop or onend when stopping a transcription that has been started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.stop();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(1);
    expect(mockStop).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })

  it('does not call initialize, stop or onend a second time when stopping a transcription that was already stopped', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.stop();
    await speechRecognition.stop();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(1);
    expect(mockStop).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })

  it('does not call initialize, stop or onend when aborting a transcription that was never started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.abort();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(0);
    expect(mockStop).toHaveBeenCalledTimes(0);
    expect(mockOnEnd).toHaveBeenCalledTimes(0);
  })

  it('calls initialize, stop or onend when aborting a transcription that has been started', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.abort();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(1);
    expect(mockStop).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })

  it('does not call initialize, stop or onend a second time when aborting a transcription that was already aborted', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;

    await speechRecognition.start();
    await speechRecognition.abort();
    await speechRecognition.abort();

    expect(mockMicrophoneInitialize).toHaveBeenCalledTimes(1);
    expect(mockStop).toHaveBeenCalledTimes(1);
    expect(mockOnEnd).toHaveBeenCalledTimes(1);
  })

  it('calling stop does not prevent ongoing utterance from being transcribed', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speakAndInterrupt(SENTENCE_ONE, speechRecognition.stop);

    expect(mockOnResult).toHaveBeenCalledTimes(SENTENCE_ONE.length);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_ONE, mockOnResult);
  })

  it('calling abort prevents ongoing utterance from being transcribed', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speakAndInterrupt(SENTENCE_ONE, speechRecognition.abort);

    expect(mockOnResult).toHaveBeenCalledTimes(1);
    expectSentenceToBeTranscribedWithFirstInitialResult(SENTENCE_ONE, mockOnResult);
  })

  it('calling stop prevents subsequent utterances from being transcribed', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speakAndInterrupt(SENTENCE_ONE, speechRecognition.stop);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(SENTENCE_ONE.length);
    expectSentenceToBeTranscribedWithInterimAndFinalResults(SENTENCE_ONE, mockOnResult);
  })

  it('calling abort prevents subsequent utterances from being transcribed', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnResult = jest.fn();
    speechRecognition.onresult = mockOnResult;
    const mockOnEnd = jest.fn();
    speechRecognition.onend = mockOnEnd;
    speechRecognition.interimResults = true;

    await speechRecognition.start();
    speakAndInterrupt(SENTENCE_ONE, speechRecognition.abort);
    speak(SENTENCE_TWO);

    expect(mockOnResult).toHaveBeenCalledTimes(1);
    expectSentenceToBeTranscribedWithFirstInitialResult(SENTENCE_ONE, mockOnResult);
  })

  it('sets hasBrowserSupport to true when required APIs are defined (non-WebKit)', async () => {
    mockAudioContext();
    mockUndefinedWebkitAudioContext();
    mockMediaDevices();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(true);
  })

  it('sets hasBrowserSupport to true when required APIs are defined (WebKit)', async () => {
    mockUndefinedAudioContext();
    mockWebkitAudioContext();
    mockMediaDevices();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(true);
  })

  it('sets hasBrowserSupport to false when all AudioContext APIs are undefined', async () => {
    mockUndefinedAudioContext();
    mockUndefinedWebkitAudioContext();
    mockMediaDevices();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(false);
  })

  it('sets hasBrowserSupport to false when MediaDevices API is undefined', async () => {
    mockAudioContext();
    mockUndefinedMediaDevices();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(false);
  })

  it('sets hasBrowserSupport to false when Navigator API is undefined', async () => {
    mockAudioContext();
    mockUndefinedNavigator();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(false);
  })

  it('sets hasBrowserSupport to false when window is undefined', async () => {
    mockUndefinedWindow();

    const SpeechRecognition = createSpeechlySpeechRecognition('app id');

    expect(SpeechRecognition.hasBrowserSupport).toEqual(false);
  })

  it('calls onerror with MicrophoneNotAllowedError error when no microphone permission given on start', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnError = jest.fn();
    speechRecognition.onerror = mockOnError;
    mockMicrophoneInitialize.mockImplementationOnce(() => Promise.reject(ErrNoAudioConsent))

    await speechRecognition.start();

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(MicrophoneNotAllowedError);
  })

  it('calls onerror with SpeechRecognitionFailedError error when speech recognition fails on start', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnError = jest.fn();
    speechRecognition.onerror = mockOnError;
    mockMicrophoneInitialize.mockImplementationOnce(() => Promise.reject(new Error('generic failure')))

    await speechRecognition.start();

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(SpeechRecognitionFailedError);
  })

  it('calls onerror with SpeechRecognitionFailedError error when speech recognition fails on attach', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnError = jest.fn();
    speechRecognition.onerror = mockOnError;
    mockAttach.mockImplementationOnce(() => Promise.reject(new Error('generic failure')))

    await speechRecognition.start();

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(SpeechRecognitionFailedError);
  })

  it('calls onerror with SpeechRecognitionFailedError error when browser microphone media stream is falsey', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    const mockOnError = jest.fn();
    speechRecognition.onerror = mockOnError;
    mockBrowserMicrophone({ mediaStream: null });

    await speechRecognition.start();

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(SpeechRecognitionFailedError);
  })
})