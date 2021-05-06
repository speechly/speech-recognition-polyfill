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

# Examples

The following examples use React to demonstrate how this polyfill can be used in real web components.

## Matching commands

A common use case is to enable the user to control a web app using their voice. The following example has a "hold to talk" button that enables transcription while held down. It provides a list of commands that, when matched by anything the user says, will be displayed. In practice, these matched commands could be used to perform actions.

```
import React, { useState, useEffect } from 'react';
import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill';

const appId = '<your_speechly-app-id>';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
const speechRecognition = new SpeechlySpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;

const COMMANDS = ['PLAY', 'PAUSE', 'REWIND'];

export default () => {
  const [ matchedCommand, setMatchedCommand] = useState('');

  const handleResult = ({ results }) => {
    const { transcript } = results[0][0];
    COMMANDS.forEach(command => {
      if (transcript.indexOf(command) !== -1) {
        setMatchedCommand(command);
      }
    });
  };

  useEffect(() => {
    speechRecognition.onresult = handleResult;
  });

  return (
    <div>
      <div
        onTouchStart={speechRecognition.start}
        onMouseDown={speechRecognition.start}
        onTouchEnd={speechRecognition.stop}
        onMouseUp={speechRecognition.stop}
        >Hold to talk</div>
      <span>{matchedCommand}</span>
    </div>
  );
};
```

## Displaying a transcript

You may want to simply display everything the user says as text, for composing a message for example. This example uses the same button as before. The transcripts are combined and collected in a local state, which is displayed as one piece of text.

```
import React, { useState, useEffect, useCallback } from 'react';
import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill';

const appId = '<your_speechly-app-id>';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
const speechRecognition = new SpeechlySpeechRecognition();
speechRecognition.continuous = true;

export default () => {
  const [ transcript, setTranscript] = useState('');

  const handleResult = useCallback(({ results }) => {
    const newTranscript = [transcript, results[0][0].transcript].join(' ');
    setTranscript(newTranscript);
  }, [transcript]);

  useEffect(() => {
    speechRecognition.onresult = handleResult;
  });

  return (
    <div>
      <div
        onTouchStart={speechRecognition.start}
        onMouseDown={speechRecognition.start}
        onTouchEnd={speechRecognition.stop}
        onMouseUp={speechRecognition.stop}
        >Hold to talk</div>
      <span>{transcript}</span>
    </div>
  );
};
```

# Integrating with react-speech-recognition

This polyfill is compatible with `react-speech-recognition`, a React hook that manages the transcript for you and allows you to provide more powerful commands. For React web apps, we recommend you combine these libraries. See its [README](https://github.com/JamesBrill/react-speech-recognition) for full guidance on how to use `react-speech-recognition`. It can be installed with:

```
npm install --save react-speech-recognition
```

Below is an example with more complex commands, which print a message in response to each command matched. For example, saying "Bob is my name" will result in the message "Hi Bob!".

```
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill';

const appId = '<your_speechly-app-id>';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default () => {
  const [message, setMessage] = useState('');
  const commands = [
    {
      command: '* is my name',
      callback: (name) => setMessage(`Hi ${name}!`),
      matchInterim: true
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Goodbye',
      callback: () => setMessage('So long!'),
      matchInterim: true
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    }
  ];
  const { transcript, listening } = useSpeechRecognition({ commands });
  const listenContinuously = () => SpeechRecognition.startListening({ continuous: true });

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div
        onTouchStart={listenContinuously}
        onMouseDown={listenContinuously}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</div>
      <p>{transcript}</p>
      <p>{message}</p>
    </div>
  );
};
```