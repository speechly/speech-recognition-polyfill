<h1 align="center">
<a href="https://www.speechly.com/?utm_source=github&utm_medium=browser-client&utm_campaign=header"><img src="https://www.speechly.com/images/logo.png" height="100" alt="Speechly"></a>
</h1>
<h2 align="center">
Complete your touch user interface with voice
</h2>

[Speechly website](https://www.speechly.com/?utm_source=github&utm_medium=browser-client&utm_campaign=header)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Docs](https://www.speechly.com/docs/?utm_source=github&utm_medium=browser-client&utm_campaign=headere)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Blog](https://www.speechly.com/blog/?utm_source=github&utm_medium=browser-client&utm_campaign=header)

# speech-recognition-polyfill

Polyfill for the [SpeechRecognition](https://wicg.github.io/speech-api/#speechreco-section) standard on web, using [Speechly](https://www.speechly.com/) as the underlying API. The primary use of this library is to enable speech recognition on browsers that would not normally support it natively.

Speechly offers a free tier for its speech recognition API with a generous usage limit.

# Useful links

* [Quickstart](#quickstart)
* [Examples](#examples)
* [Integrating with react-speech-recognition](#integrating-with-react-speech-recognition)
* [Limitations](#limitations)
* [Type docs](docs/README.md)
* [Contributing](#contributing)
* [About Speechly](#about-speechly)

# Quickstart

## Installation

```
npm install --save @speechly/speech-recognition-polyfill
```

## Basic usage

First, you need a Speechly app ID. To get this, you can follow [this guide](https://docs.speechly.com/quick-start/). Note that you can leave the configuration empty - for now, you just need to deploy a Speechly application and copy the app ID from your Speechly dashboard.

Once you have an app ID, you can use it to create a recognition object that can start transcribing anything the user speaks into the microphone:

```
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

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
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

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
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

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
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

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

# Limitations

While this polyfill is intended to enable most use cases for voice-driven web apps, it does not implement the full [W3C specification](https://wicg.github.io/speech-api/#speechreco-section) for `SpeechRecognition`, only a subset:
* `start()` method
* `stop()` method
* `abort()` method
* `continuous` property
* `interimResults` property
* `onresult` property
* `onend` property - a callback that is fired when `stop()` or `abort()` is called

Some notable limitations:
* The `lang` property is currently unsupported, defaulting to English transcription
* `onresult` will only receive the most recent speech recognition result (the utterance that the user is in the process of saying or has just finished saying) and does not store a history of all transcripts. This can easily be resolved by either managing your own transcript state (see the [Displaying a transcript](#displaying-a-transcript) example above) or using `react-speech-recognition` to do that for you
* Transcripts are generated in uppercase letters without punctuation. If needed, you can transform them using [toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

# Contributing

For a guide on how to develop `speech-recognition-polyfill` and contribute changes, see [CONTRIBUTING.md](CONTRIBUTING.md).

# About Speechly

Speechly is a developer tool for building real-time multimodal voice user interfaces. It enables developers and designers to enhance their current touch user interface with voice functionalities for better user experience. Speechly key features:

## Speechly key features

- Fully streaming API
- Multi modal from the ground up
- Easy to configure for any use case
- Fast to integrate to any touch screen application
- Supports natural corrections such as "Show me red – i mean blue t-shirts"
- Real time visual feedback encourages users to go on with their voice

|                  Example application                  | Description                                                                                                                                                                                                                                                                                                                               |
| :---------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://i.imgur.com/v9o1JHf.gif" width=50%> | Instead of using buttons, input fields and dropdowns, Speechly enables users to interact with the application by using voice. <br />User gets real-time visual feedback on the form as they speak and are encouraged to go on. If there's an error, the user can either correct it by using traditional touch user interface or by voice. |