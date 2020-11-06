import React, { useEffect, useState } from 'react'

import KeyDuration from './utils/keyDuration'
import { morseCodeMappings } from './constants/morseCode'

import styled, { keyframes } from 'styled-components'


const Short = styled.div`
  width: 10px;
  height: 10px;
  margin: 10px 5px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor || 'black'};
`


const Long = styled.div`
  width: 20px;
  height: 3px;
  margin: 10px 5px;
  background-color: ${props => props.backgroundColor || 'black'};
`


const Filler = styled.div`
  width: 30px;
  height: 30px;
`


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: 10vh auto;
  padding: 30px;
  box-shadow: 2px 3px 8px -3px rgba(0, 0, 0, 0.55);
  border-radius: 3px;
  height: 50vh;

  @media only screen and (max-width: 700px){
      width: 90vw;
  }
`


const MorseValueDisplay = styled.h3`
  text-transform: uppercase;
  font-size: 10rem;
  font-weight: 100;
  margin-bottom: 3rem;
`


const AnswerContainer = styled.div`
  margin: 50px 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Fadeout = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const Toast = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  padding: 2rem 5rem;
  box-shadow: 2px 3px 8px -3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  animation: ${Fadeout} 3.5s ease-in;
  opacity: 0;
`


const MorseTapper = styled.div`
  width: 20rem;
  height: 20rem;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin: 0 auto 2rem;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 4.5rem;
  font-weight: 100;
  display: none;
  cursor: pointer;
  user-select: none;

  @media only screen and (max-width: 700px){
    display: flex;
  }
`


const App = () => {

  const randomMorseCode = () => {
    const morseKeys = Object.keys(morseCodeMappings)

    const randomIndex = Math.random() * morseKeys.length | 0;

    return {
      morseCode: morseCodeMappings[morseKeys[randomIndex]],
      morseValue: morseKeys[randomIndex]
    }
  }

  const [state, setState] = useState([])

  const [answer, setAnswer] = useState(randomMorseCode())

  const [feedback, setFeedback] = useState(null)

  const keyDuration = new KeyDuration(100, setState)

  useEffect(() => {
    keyDuration.startListening(setState)
  }, [])

  useEffect(() => {
    if (state.join() === answer.morseCode.join()) {
      setFeedback('green')
      setTimeout(() => {
        setAnswer(randomMorseCode())
        setState([])
        setFeedback(null)
      }, 200)
    } else if (state.length >= answer.morseCode.length || state.length >= 5) {
      setFeedback('red')
      setTimeout(() => {
        setState([])
        setFeedback(null)
      }, 200)
    }
  }, [state])


  return (
    <React.Fragment>
      <Container>
        <Toast>
          Press spacebar to tap morse code
      </Toast>

        <MorseValueDisplay>
          {
            answer.morseValue
          }
        </MorseValueDisplay>

        <AnswerContainer>
          {
            state.length === 0 && <Filler />
          }

          {
            state.map((i, index) => i
              ? <Short key={index}
                backgroundColor={feedback} />

              : <Long key={index}
                backgroundColor={feedback} />
            )
          }
        </AnswerContainer>
      </Container>

      <MorseTapper
        onMouseDown={() => keyDuration.buttonPress()}
        onMouseUp={() => keyDuration.buttonRelease()}>
        Tap me
      </MorseTapper>
    </React.Fragment>
  )
}

export default App