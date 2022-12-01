[@speechly/speech-recognition-polyfill](../README.md) / SpeechRecognitionResult

# Interface: SpeechRecognitionResult

Object containing a transcript for the ongoing utterance and an indicator of whether that transcript is final or not

## Table of contents

### Properties

- [0](speechrecognitionresult.md#0)
- [isFinal](speechrecognitionresult.md#isfinal)

## Properties

### 0

• **0**: [*SpeechRecognitionAlternative*](speechrecognitionalternative.md)

Object containing a transcript for the ongoing utterance (the use of an integer index key is to mimic the
structure used in the native [SpeechRecognitionResult spec](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult)),
which contains an "array" of alternative transcripts. In the Speechly implementation, there is never more than one
alternative, so only the first index is specified in the interface

Defined in: [types.ts:20](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L20)

___

### isFinal

• **isFinal**: *boolean*

Is this transcript "final"? That is, has the transcription algorithm concluded that the utterance has finished and
that the trancript will have no further updates?

Defined in: [types.ts:32](https://github.com/speechly/speech-recognition-polyfill/blob/HEAD/src/types.ts#L32)
