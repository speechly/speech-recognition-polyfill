[@speechly/speech-recognition-polyfill](../README.md) / SpeechRecognitionEvent

# Interface: SpeechRecognitionEvent

Data associated with an update to the transcript for the ongoing utterance

## Table of contents

### Properties

- [resultIndex](speechrecognitionevent.md#resultindex)
- [results](speechrecognitionevent.md#results)

## Properties

### resultIndex

• **resultIndex**: *number*

Index of the earliest speech recognition result that has changed

Defined in: [types.ts:50](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L50)

___

### results

• **results**: [*SpeechRecognitionResult*](speechrecognitionresult.md)[]

List of speech recognition results, containing all transcripts collected in the current session. This represents the
native [SpeechRecognitionResultList](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResultList).
Note that the Speechly implementation currently does not maintain a history of results, only returning the single
result for the ongoing utterance

Defined in: [types.ts:46](https://github.com/JamesBrill/speech-recognition-polyfill/blob/HEAD/src/types.ts#L46)
