@speechly/speech-recognition-polyfill

# @speechly/speech-recognition-polyfill

A polyfill (a "[ponyfill](https://ponyfoo.com/articles/polyfills-or-ponyfills)" to be more precise) for the
[SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that uses
[Speechly](https://www.speechly.com/) to implement the transcription functionality

**`Remarks`**

The implementation of the [SpeechRecognition spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
is incomplete, but should enable the majority of use cases

## Table of contents

### Interfaces

- [SpeechRecognition](interfaces/SpeechRecognition.md)
- [SpeechRecognitionAlternative](interfaces/SpeechRecognitionAlternative.md)
- [SpeechRecognitionClass](interfaces/SpeechRecognitionClass.md)
- [SpeechRecognitionErrorEvent](interfaces/SpeechRecognitionErrorEvent.md)
- [SpeechRecognitionEvent](interfaces/SpeechRecognitionEvent.md)
- [SpeechRecognitionResult](interfaces/SpeechRecognitionResult.md)

### Type Aliases

- [SpeechEndCallback](README.md#speechendcallback)
- [SpeechErrorCallback](README.md#speecherrorcallback)
- [SpeechRecognitionEventCallback](README.md#speechrecognitioneventcallback)

### Variables

- [MicrophoneNotAllowedError](README.md#microphonenotallowederror)
- [SpeechRecognitionFailedError](README.md#speechrecognitionfailederror)

### Functions

- [createSpeechlySpeechRecognition](README.md#createspeechlyspeechrecognition)

## Type Aliases

### SpeechEndCallback

Ƭ **SpeechEndCallback**: () => `void`

#### Type declaration

▸ (): `void`

Callback that is invoked when transcription ends

##### Returns

`void`

#### Defined in

[types.ts:97](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L97)

___

### SpeechErrorCallback

Ƭ **SpeechErrorCallback**: (`speechRecognitionErrorEvent`: [`SpeechRecognitionErrorEvent`](interfaces/SpeechRecognitionErrorEvent.md)) => `void`

#### Type declaration

▸ (`speechRecognitionErrorEvent`): `void`

Callback that is invoked when an error occurs

##### Parameters

| Name | Type |
| :------ | :------ |
| `speechRecognitionErrorEvent` | [`SpeechRecognitionErrorEvent`](interfaces/SpeechRecognitionErrorEvent.md) |

##### Returns

`void`

#### Defined in

[types.ts:103](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L103)

___

### SpeechRecognitionEventCallback

Ƭ **SpeechRecognitionEventCallback**: (`speechRecognitionEvent`: [`SpeechRecognitionEvent`](interfaces/SpeechRecognitionEvent.md)) => `void`

#### Type declaration

▸ (`speechRecognitionEvent`): `void`

Callback that is invoked whenever the transcript gets updated

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `speechRecognitionEvent` | [`SpeechRecognitionEvent`](interfaces/SpeechRecognitionEvent.md) | Event containing updates to the transcript |

##### Returns

`void`

#### Defined in

[types.ts:91](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L91)

## Variables

### MicrophoneNotAllowedError

• `Const` **MicrophoneNotAllowedError**: [`SpeechRecognitionErrorEvent`](interfaces/SpeechRecognitionErrorEvent.md)

Error emitted when the user does not give permission to use the microphone

#### Defined in

[types.ts:72](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L72)

___

### SpeechRecognitionFailedError

• `Const` **SpeechRecognitionFailedError**: [`SpeechRecognitionErrorEvent`](interfaces/SpeechRecognitionErrorEvent.md)

Generic error when speech recognition fails due to an unknown cause

#### Defined in

[types.ts:81](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L81)

## Functions

### createSpeechlySpeechRecognition

▸ **createSpeechlySpeechRecognition**(`appId`): [`SpeechRecognitionClass`](interfaces/SpeechRecognitionClass.md)

Returns a SpeechRecognition implementation that uses a given Speechly app ID
to generate transcriptions using the Speechly API

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appId` | `string` | Speechly app ID |

#### Returns

[`SpeechRecognitionClass`](interfaces/SpeechRecognitionClass.md)

Class that implements the SpeechRecognition interface

#### Defined in

[createSpeechRecognition.ts:27](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/createSpeechRecognition.ts#L27)
