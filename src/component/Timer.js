import React, { useEffect } from 'react'

const Timer = ({dispatch, secondsRemaining}) => {

  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(()=> {
     const id = setInterval(()=>{
      dispatch({type:'tick'})
    },1000)

    return () => clearInterval(id)
  },[dispatch])

  return (
    <div className='timer' >{mins<0 && "0"}{mins}:{mins<0 && "0"}{seconds}</div>
  )
}

export default Timer