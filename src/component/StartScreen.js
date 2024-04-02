import React from 'react'

const StartScreen = ({numQuestions , dispatch}) => {

  const handleStatus = () => {
    dispatch({type : 'active'})
  }

  return (
    <div className = 'start' >
        <h2>Welcome To The React Quiz!</h2>
        <h3> {numQuestions} question to test your React mastery </h3>
        <button className='btn btn-ui' onClick={handleStatus} >Let's Start</button>
    </div>
  )
}

export default StartScreen
