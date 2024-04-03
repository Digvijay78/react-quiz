import React from 'react'

const Progress = ({numQuestions, index, points ,maxPoints, answer}) => {
  return (
    <header className='progress' >

         <progress max={numQuestions} value={index + Number(answer !== null) } />               
        <p>Question {index + 1} / {numQuestions} </p>

        <p> <strong>{points} / {maxPoints} </strong> </p>
       
    </header>
  )
}

export default Progress