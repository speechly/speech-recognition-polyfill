# speech-recognition-polyfill

Polyfill for the [SpeechRecognition](https://wicg.github.io/speech-api/#speechreco-section) standard on web, using [Speechly](https://www.speechly.com/) as the underlying API. The primary use of this library is to enable speech recognition on browsers that would not normally support it natively.

# Quickstart

## Installation

```
npm install --save speech-recognition-polyfill
```

## Basic usage

First, you need a Speechly app ID. Speechly offers a free tier with a generous usage limit. You can find guidance on how to create a Speechly application and obtain an app ID [here](https://docs.speechly.com/quick-start/).

Once you have an app ID, you can use it to create a recognition object that can start transcribing anything the user speaks into the microphone:

```
import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill';

const APP_ID = '<your_speechly-app-id>';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
const speechRecognition = new SpeechlySpeechRecognition();
```

Before you start using `speechRecognition` to start transcribing, you should provide a callback to process any transcripts that get generated. A common use case is to match the transcript against a list of commands and perform an action when you detect a match. Alternatively, you may want to display the transcript in the UI. Here's how to set the callback:

```
speechRecognition.onresult = ({ results }) => {
  const transcript = results[0][0].transcript;
  // Process the transcript
};
```

You may also want to configure the recognition object:

```
// Keep transcribing, even if the user stops speaking
speechRecognition.continuous = true;

// Get transcripts while the user is speaking, not just when they've finished
speechRecognition.interimResults = true;
```

With your recognition object configured, you're ready to start transcribing by using the `start()` method. To comply with rules set by browsers, this _must_ be triggered by a user action such as a button click. For example, in a React component this could look like:

```
const startTranscribing = () => {
  speechRecognition.start();
};

// When rendering component
<button onClick={startTranscribing}>Push to talk</button>
```

After calling `start()`, the microphone will be turned on and the recognition object will start passing transcripts to the callback you assigned to `onresult`. If you want to stop transcribing, you can call the following:

```
speechRecognition.stop();
```