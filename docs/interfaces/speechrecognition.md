[@speechly/speech-recognition-polyfill](../README.md) / SpeechRecognition

# Interface: SpeechRecognition

Subset of the [W3C SpeechRecognition spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that
can be used for basic transcription

## Table of contents

### Properties

- [abort](SpeechRecognition.md#abort)
- [continuous](SpeechRecognition.md#continuous)
- [interimResults](SpeechRecognition.md#interimresults)
- [onend](SpeechRecognition.md#onend)
- [onerror](SpeechRecognition.md#onerror)
- [onresult](SpeechRecognition.md#onresult)
- [start](SpeechRecognition.md#start)
- [stop](SpeechRecognition.md#stop)

## Properties

### abort

• **abort**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Stop transcribing utterances received from the microphone, and cut off the current utterance

##### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:145](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L145)

___

### continuous

• **continuous**: `boolean`

Should the microphone listen continuously (true) or should it stop after the first utterance (false)?

#### Defined in

[types.ts:114](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L114)

___

### interimResults

• **interimResults**: `boolean`

Should interim results be emitted? These are parts of an ongoing utterance for which transcription hasn't
completed yet

#### Defined in

[types.ts:119](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L119)

___

### onend

• **onend**: [`SpeechEndCallback`](../README.md#speechendcallback)

Callback that is invoked when transcription ends

**`Param`**

Event containing updates to the transcript

#### Defined in

[types.ts:128](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L128)

___

### onerror

• **onerror**: [`SpeechErrorCallback`](../README.md#speecherrorcallback)

Callback that is invoked when an error occurs

**`Param`**

Event containing details of the error

#### Defined in

[types.ts:133](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L133)

___

### onresult

• **onresult**: [`SpeechRecognitionEventCallback`](../README.md#speechrecognitioneventcallback)

Callback that is invoked whenever the transcript updates

#### Defined in

[types.ts:123](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L123)

___

### start

• **start**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Start transcribing utterances received from the microphone

##### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:137](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L137)

___

### stop

• **stop**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Stop transcribing utterances received from the microphone, but finish processing the current utterance

##### Returns

`Promise`<`void`\>

#### Defined in

[types.ts:141](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L141)
