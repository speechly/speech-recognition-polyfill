import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()
  useEffect(() => {
    if (interimTranscript !== '') {
      console.log('Got interim result:', interimTranscript)
    }
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript]);
  const listenContinuously = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'en-GB'
  })
  const listenOnce = () => SpeechRecognition.startListening({ continuous: false })

  if (!browserSupportsSpeechRecognition) {
    return <span>No browser support</span>
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Listening: {listening ? 'on' : 'off'}</span>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
      </div>
      <button onClick={listenOnce}>Listen once</button>
      <button onClick={listenContinuously}>Listen continuously</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={SpeechRecognition.abortListening}>Abort</button>
    </div>
  )
}
