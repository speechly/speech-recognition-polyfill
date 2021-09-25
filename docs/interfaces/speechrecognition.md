[@speechly/speech-recognition-polyfill](../README.md) / SpeechRecognition

# Interface: SpeechRecognition

Subset of the [W3C SpeechRecognition spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that
can be used for basic transcription

## Table of contents

### Properties

- [abort](speechrecognition.md#abort)
- [continuous](speechrecognition.md#continuous)
- [interimResults](speechrecognition.md#interimresults)
- [onend](speechrecognition.md#onend)
- [onerror](speechrecognition.md#onerror)
- [onresult](speechrecognition.md#onresult)
- [start](speechrecognition.md#start)
- [stop](speechrecognition.md#stop)

## Properties

### abort

• **abort**: () => *Promise*<void\>

Stop transcribing utterances received from the microphone, and cut off the current utterance

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [types.ts:145](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L145)

Defined in: [types.ts:145](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L145)

___

### continuous

• **continuous**: *boolean*

Should the microphone listen continuously (true) or should it stop after the first utterance (false)?

Defined in: [types.ts:114](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L114)

___

### interimResults

• **interimResults**: *boolean*

Should interim results be emitted? These are parts of an ongoing utterance for which transcription hasn't
completed yet

Defined in: [types.ts:119](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L119)

___

### onend

• **onend**: [*SpeechEndCallback*](../README.md#speechendcallback)

Callback that is invoked when transcription ends

**`param`** Event containing updates to the transcript

Defined in: [types.ts:128](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L128)

___

### onerror

• **onerror**: [*SpeechErrorCallback*](../README.md#speecherrorcallback)

Callback that is invoked when an error occurs

**`param`** Event containing details of the error

Defined in: [types.ts:133](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L133)

___

### onresult

• **onresult**: [*SpeechRecognitionEventCallback*](../README.md#speechrecognitioneventcallback)

Callback that is invoked whenever the transcript updates

Defined in: [types.ts:123](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L123)

___

### start

• **start**: () => *Promise*<void\>

Start transcribing utterances received from the microphone

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [types.ts:137](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L137)

Defined in: [types.ts:137](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L137)

___

### stop

• **stop**: () => *Promise*<void\>

Stop transcribing utterances received from the microphone, but finish processing the current utterance

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [types.ts:141](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L141)

Defined in: [types.ts:141](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L141)
