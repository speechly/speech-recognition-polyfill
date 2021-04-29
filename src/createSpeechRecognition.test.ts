import createSpeechlySpeechRecognition from './createSpeechRecognition';
import TEST_DATA from './testData';

let _callback: any;
const mockOnSegmentChange = jest.fn((callback: any) => {
  _callback = async () => TEST_DATA.forEach(callback);
});
const mockInitialize = jest.fn(() => Promise.resolve());
const mockStartContext = jest.fn(() => {
  _callback();
  return Promise.resolve();
});
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

describe('createSpeechlySpeechRecognition', () => {
  it('calls initialize and startContext on Speechly client when starting transcription', async () => {
    const SpeechRecognition = createSpeechlySpeechRecognition('app id');
    const speechRecognition = new SpeechRecognition();
    await speechRecognition.start();

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(mockStartContext).toHaveBeenCalledTimes(1);
  })
})
