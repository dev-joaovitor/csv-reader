import React, { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000/api/v1';

export default function Search({ setFilteredData, setIsFiltered, setErrorMessage }: {
  setFilteredData:  React.Dispatch<React.SetStateAction<never[]>>,
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element 
  {
    const [searchParams, setSearchParams] = useSearchParams();

    function onSearchChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
    
        searchParams.set("q", value);
        setSearchParams(searchParams);
    }

    async function searchFile() {
        const path = `${API_BASE_URL}/searchOnCsv?${searchParams}`;
    
        const response = await fetch(path);
        
        const result = await response.json();
        
        setFilteredData(result?.data || []);
        setIsFiltered(true);

        if (result.status !== 200){
          return setErrorMessage(result.message);
        }

        setErrorMessage("No data to be showed =(");
        console.log(result)
    }

    function clearFilter() {
        setIsFiltered(false);
    }

    return (
        <div className="searchContainer">
            <label id="searchBarLabel">
              Search for any parameter in the file:
              <input
                type="text"
                id="csvSearchBar"
                placeholder="Ex.: Brazil"
                onChange={onSearchChange}
              />
            </label>

            <button
              id="searchBtn"
              className="btn"
              type="button"
              onClick={searchFile}
            >Search
            </button>

            <button
              id="clearFilterBtn"
              className="btn"
              type="button"
              onClick={clearFilter}
            >Clear Filter
            </button>
        </div>
    )
}
