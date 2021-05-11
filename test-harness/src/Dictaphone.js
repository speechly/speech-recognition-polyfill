import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import STYLES from './Dictaphone.module.css'

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
      <div className={STYLES.Dictaphone}>
        <span>Listening: {listening ? 'on' : 'off'}</span>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
      </div>
      <div
        className={STYLES.Dictaphone__holdToTalk}
        onTouchStart={listenContinuously}
        onMouseDown={listenContinuously}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</div>
      <button onClick={listenOnce}>Listen once</button>
      <button onClick={listenContinuously}>Listen continuously</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
    </div>
  )
}
