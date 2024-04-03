import React from 'react'

const Finished = ({maxPoints, points, highScore, dispatch}) => {
    const percentage = points/maxPoints * 100
  return (
    <>
    <p className='result' > You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong> ({Math.ceil(percentage)}%) </p>
    <p className='highscore' > High Score is : {highScore}  </p>
    <button className='btn btn-ui' onClick = {()=> dispatch({type : "restart"})}  >Restart</button>
    </>
  )
}

export default Finished