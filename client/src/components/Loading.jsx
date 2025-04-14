import React from 'react'
import loading from '../assets/loading.svg'

function Loading() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
      <img src={loading} width={100} alt="" />
    </div>
  )
}

export default Loading