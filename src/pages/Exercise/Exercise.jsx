import React from 'react'
import ExerciseNav from './Nav.tsx'
import ExerciseForm from '../../components/ExerciseForm.jsx'
import ExerciseList from '../../components/ExerciseList.jsx'

function Exercise() {
  return (
    <div className='fle flex- bg-white rounded-[20px] w-full mr-4 mb-4 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
      <ExerciseNav />
      <ExerciseForm />
      <ExerciseList />
    </div>
  )
}

export default Exercise
