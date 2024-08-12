import React, { useState, useEffect } from 'react';
import './App.css';
import RepoList from './components/RepoList';
import { useGetRepositoriesQuery } from './store';
import RepoDescription from './components/RepoDescription';
import Pages from './components/Pages';


function App() {

  const [activeRepo, setActiveRepo] = useState(null)

  const [inputValue, setInputValue] = useState('')
  const [q, setQ] = useState('');
  const [per_page, setPer_page] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');


  const { data, error, isLoading, refetch } = useGetRepositoriesQuery({ q, per_page, page, sort });

  useEffect(() => {
    refetch()
  }, [q, per_page, page, sort])

  useEffect(() => {
    console.log(data, 'data');
  }, [data])

  // поменять тип
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(q);
    //per_page=2 для количества элементов на странице
    //const response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=2`);
    setQ(inputValue);
  }
  // поменять тип
  const handleChange = (e:any) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="container">
      <header>
        <form onSubmit={handleSubmit} action="">
          <input onChange={handleChange} value={inputValue} name='search' type="text" placeholder='Введите поисковый запрос' required/>
          <button type='submit' className='search-btn'>
            ИСКАТЬ
          </button>
        </form>
      </header>
        {!data 
        ? <div className="greeting">
            <h1>Добро пожаловать</h1>
          </div>
        : <main>
            <div className="list-container">
              <RepoList data={data} setActiveRepo={setActiveRepo}/>
              <Pages 
                setPer_page={setPer_page}
                data={data}
                setPage={setPage}
              />
            </div>
            <RepoDescription activeRepo={activeRepo}/>
          </main>
        }
        
      
      <footer></footer>
    </div>
  );
}

export default App;
