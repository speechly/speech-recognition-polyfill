@speechly/speech-recognition-polyfill

# @speechly/speech-recognition-polyfill

A polyfill (a "[ponyfill](https://ponyfoo.com/articles/polyfills-or-ponyfills)" to be more precise) for the
[SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that uses
[Speechly](https://www.speechly.com/) to implement the transcription functionality

**`remarks`** 
The implementation of the [SpeechRecognition spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
is incomplete, but should enable the majority of use cases

## Table of contents

### Interfaces

- [SpeechRecognition](interfaces/speechrecognition.md)
- [SpeechRecognitionAlternative](interfaces/speechrecognitionalternative.md)
- [SpeechRecognitionClass](interfaces/speechrecognitionclass.md)
- [SpeechRecognitionErrorEvent](interfaces/speechrecognitionerrorevent.md)
- [SpeechRecognitionEvent](interfaces/speechrecognitionevent.md)
- [SpeechRecognitionResult](interfaces/speechrecognitionresult.md)

### Type aliases

- [SpeechEndCallback](README.md#speechendcallback)
- [SpeechErrorCallback](README.md#speecherrorcallback)
- [SpeechRecognitionEventCallback](README.md#speechrecognitioneventcallback)

### Variables

- [MicrophoneNotAllowedError](README.md#microphonenotallowederror)
- [SpeechRecognitionFailedError](README.md#speechrecognitionfailederror)

### Functions

- [createSpeechlySpeechRecognition](README.md#createspeechlyspeechrecognition)

## Type aliases

### SpeechEndCallback

Ƭ **SpeechEndCallback**: () => *void*

Callback that is invoked when transcription ends

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [types.ts:97](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L97)

___

### SpeechErrorCallback

Ƭ **SpeechErrorCallback**: (`speechRecognitionErrorEvent`: [*SpeechRecognitionErrorEvent*](interfaces/speechrecognitionerrorevent.md)) => *void*

Callback that is invoked when an error occurs

#### Type declaration:

▸ (`speechRecognitionErrorEvent`: [*SpeechRecognitionErrorEvent*](interfaces/speechrecognitionerrorevent.md)): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `speechRecognitionErrorEvent` | [*SpeechRecognitionErrorEvent*](interfaces/speechrecognitionerrorevent.md) |

**Returns:** *void*

Defined in: [types.ts:103](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L103)

___

### SpeechRecognitionEventCallback

Ƭ **SpeechRecognitionEventCallback**: (`speechRecognitionEvent`: [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md)) => *void*

Callback that is invoked whenever the transcript gets updated

**`param`** Event containing updates to the transcript

#### Type declaration:

▸ (`speechRecognitionEvent`: [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md)): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `speechRecognitionEvent` | [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md) |

**Returns:** *void*

Defined in: [types.ts:91](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L91)

## Variables

### MicrophoneNotAllowedError

• `Const` **MicrophoneNotAllowedError**: [*SpeechRecognitionErrorEvent*](interfaces/speechrecognitionerrorevent.md)

Error emitted when the user does not give permission to use the microphone

Defined in: [types.ts:72](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L72)

___

### SpeechRecognitionFailedError

• `Const` **SpeechRecognitionFailedError**: [*SpeechRecognitionErrorEvent*](interfaces/speechrecognitionerrorevent.md)

Generic error when speech recognition fails due to an unknown cause

Defined in: [types.ts:81](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L81)

## Functions

### createSpeechlySpeechRecognition

▸ `Const`**createSpeechlySpeechRecognition**(`appId`: *string*): [*SpeechRecognitionClass*](interfaces/speechrecognitionclass.md)

Returns a SpeechRecognition implementation that uses a given Speechly app ID
to generate transcriptions using the Speechly API

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | *string* | Speechly app ID |

**Returns:** [*SpeechRecognitionClass*](interfaces/speechrecognitionclass.md)

Class that implements the SpeechRecognition interface

Defined in: [createSpeechRecognition.ts:21](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/createSpeechRecognition.ts#L21)
