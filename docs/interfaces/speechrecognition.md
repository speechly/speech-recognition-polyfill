[@speechly/speech-recognition-polyfill](../README.md) / SpeechRecognition

# Interface: SpeechRecognition

Subset of the [W3C SpeechRecognition spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) that
can be used for basic transcription

**`alpha`** 

## Table of contents

### Properties

- [abort](speechrecognition.md#abort)
- [continuous](speechrecognition.md#continuous)
- [interimResults](speechrecognition.md#interimresults)
- [onend](speechrecognition.md#onend)
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

Defined in: [types.ts:101](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L101)

Defined in: [types.ts:101](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L101)

___

### continuous

• **continuous**: *boolean*

Should the microphone listen continuously (true) or should it stop after the first utterance (false)?

Defined in: [types.ts:75](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L75)

___

### interimResults

• **interimResults**: *boolean*

Should interim results be emitted? These are parts of an ongoing utterance for which transcription hasn't
completed yet

Defined in: [types.ts:80](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L80)

___

### onend

• **onend**: [*SpeechEndCallback*](../README.md#speechendcallback)

Callback that is invoked when transcription ends

**`param`** Event containing updates to the transcript

Defined in: [types.ts:89](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L89)

___

### onresult

• **onresult**: [*SpeechRecognitionEventCallback*](../README.md#speechrecognitioneventcallback)

Callback that is invoked whenever the transcript updates

Defined in: [types.ts:84](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L84)

___

### start

• **start**: () => *Promise*<void\>

Start transcribing utterances received from the microphone

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [types.ts:93](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L93)

Defined in: [types.ts:93](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L93)

___

### stop

• **stop**: () => *Promise*<void\>

Stop transcribing utterances received from the microphone, but finish processing the current utterance

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [types.ts:97](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L97)

Defined in: [types.ts:97](https://github.com/JamesBrill/speech-recognition-polyfill/blob/a3993a8/src/types.ts#L97)
