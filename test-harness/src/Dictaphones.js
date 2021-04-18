import React, { useState } from 'react'
import { DictaphoneWidgetA, DictaphoneWidgetB } from './Dictaphone'
import SpeechRecognition from 'react-speech-recognition'

export default () => {
  const [showFirstWidget, setShowFirstWidget] = useState(true)
  const toggleShowFirstWidget = () => setShowFirstWidget(!showFirstWidget)

  const listenContinuously = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'en-GB'
  })
  const listenOnce = () => SpeechRecognition.startListening({ continuous: false })

  return (
    <div>
      {showFirstWidget && <DictaphoneWidgetA />}
      <DictaphoneWidgetB />
      <button onClick={listenOnce}>Listen once</button>
      <button onClick={listenContinuously}>Listen continuously</button>
      <button onClick={toggleShowFirstWidget}>Toggle first widget</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
    </div>
  )
}
