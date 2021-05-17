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
- [SpeechRecognitionEvent](interfaces/speechrecognitionevent.md)
- [SpeechRecognitionResult](interfaces/speechrecognitionresult.md)

### Type aliases

- [SpeechEndCallback](README.md#speechendcallback)
- [SpeechRecognitionClass](README.md#speechrecognitionclass)
- [SpeechRecognitionEventCallback](README.md#speechrecognitioneventcallback)

### Functions

- [createSpeechlySpeechRecognition](README.md#createspeechlyspeechrecognition)

## Type aliases

### SpeechEndCallback

Ƭ **SpeechEndCallback**: () => *void*

Callback that is invoked when transcription ends

**`alpha`** 

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [types.ts:64](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L64)

___

### SpeechRecognitionClass

Ƭ **SpeechRecognitionClass**: () => [*SpeechRecognition*](interfaces/speechrecognition.md)

Class that implements the SpeechRecognition interface

**`alpha`** 

#### Type declaration:

\+ (): [*SpeechRecognition*](interfaces/speechrecognition.md)

**Returns:** [*SpeechRecognition*](interfaces/speechrecognition.md)

Defined in: [types.ts:108](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L108)

___

### SpeechRecognitionEventCallback

Ƭ **SpeechRecognitionEventCallback**: (`speechRecognitionEvent`: [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md)) => *void*

Callback that is invoked whenever the transcript gets updated

**`param`** Event containing updates to the transcript

**`alpha`** 

#### Type declaration:

▸ (`speechRecognitionEvent`: [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md)): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `speechRecognitionEvent` | [*SpeechRecognitionEvent*](interfaces/speechrecognitionevent.md) |

**Returns:** *void*

Defined in: [types.ts:58](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L58)

## Functions

### createSpeechlySpeechRecognition

▸ `Const`**createSpeechlySpeechRecognition**(`appId`: *string*): [*SpeechRecognitionClass*](README.md#speechrecognitionclass)

Returns a SpeechRecognition implementation that uses a given Speechly app ID
to generate transcriptions using the Speechly API

**`alpha`** 

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | *string* | Speechly app ID |

**Returns:** [*SpeechRecognitionClass*](README.md#speechrecognitionclass)

Class that implements the SpeechRecognition interface

Defined in: [createSpeechRecognition.ts:18](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/createSpeechRecognition.ts#L18)
