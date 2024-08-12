import React, { useState } from 'react';
import './App.css';

function App() {

  const [value, setValue] = useState('');

  // поменять тип
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(value);
    //per_page=2 для количества элементов на странице
    const response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=2`);
    const res = await response.json()
    console.log(res);
  }
  // поменять тип
  const handleChange = (e:any) => {
    setValue(e.target.value)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} action="">
        <input onChange={handleChange} value={value} name='search' type="text" />
        <button type='submit'>
          Поиск
        </button>
      </form>

    </div>
  );
}

export default App;
