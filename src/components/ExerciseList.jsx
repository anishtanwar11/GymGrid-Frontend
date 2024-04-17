import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExerciseList = ({ selectedDay }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`/api/exercises/${selectedDay}`);
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [selectedDay]);

  return (
    <div>
      <h2>{selectedDay} Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight} lbs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
