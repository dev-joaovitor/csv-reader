// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState  } from 'react';
// import { useSearchParams } from "react-router-dom";
import Cards from './components/Cards';
import Search from './components/Search';
import FileInput from './components/FileInput';
// import './App.css'

function App(): JSX.Element {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  return (
    <>
      <Search
        setFilteredData={setFilteredData}
        setIsFiltered={setIsFiltered}
      />
      
      <FileInput
        setData={setData}
        setIsFiltered={setIsFiltered}
      />

      {isFiltered === true  && filteredData.length > 0 && <Cards data={filteredData} /> ||
       isFiltered === false && data.length > 0         && <Cards data={data} /> ||
       <h1>No data to be showed =(</h1>
       }
    </>
  )
}

export default App
