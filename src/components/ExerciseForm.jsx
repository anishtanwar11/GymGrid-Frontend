// ExerciseForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ExerciseForm = () => {
  const [exerciseData, setExerciseData] = useState({
    name: '',
    sets: 0,
    reps: 0,
    weight: 0,
    day: '', // You can set this value dynamically based on user selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/exercises/details', exerciseData);
      // Optionally, you can reset the form after submission
      setExerciseData({
        name: '',
        sets: 0,
        reps: 0,
        weight: 0,
        day: '',
      });
    } catch (error) {
      console.error('Error creating exercise:', error);
    }
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label> Name:
        <input
          type="text"
          name="name"
          value={exerciseData.name}
          onChange={handleChange}
          placeholder="Exercise Name"
          required
        />
        </label>
        <label> Sets:
        <input
          type="number"
          name="sets"
          value={exerciseData.sets}
          onChange={handleChange}
          placeholder="Sets"
          required
        />
        </label>
        <label> Reps:
        <input
          type="number"
          name="reps"
          value={exerciseData.reps}
          onChange={handleChange}
          placeholder="Reps"
          required
        />
        </label>
        <label> Weight:
        <input
          type="number"
          name="weight"
          value={exerciseData.weight}
          onChange={handleChange}
          placeholder="Weight (lbs)"
          required
        />
        </label>
        {/* You can add a select dropdown for selecting the day */}
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
