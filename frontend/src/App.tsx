// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState  } from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import FileInput from './components/FileInput';
import React from 'react';
import './App.css'

function App(): React.JSX.Element {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No data to be showed =(");

  return (
    <main className='mainContainer'>
      <Search
        setFilteredData={setFilteredData}
        setIsFiltered={setIsFiltered}
        setErrorMessage={setErrorMessage}
      />
      
      <FileInput
        setData={setData}
        setIsFiltered={setIsFiltered}
        setErrorMessage={setErrorMessage}
      />

      {isFiltered === true  && filteredData.length > 0 && <Cards data={filteredData} /> ||
       isFiltered === false && data.length > 0         && <Cards data={data} /> ||
       <h1>{errorMessage}</h1>}
    </main>
  )
}

export default App
