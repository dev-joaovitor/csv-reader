import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000/api/v1';
// lteredData: React.Dispatch<React.SetStateAction<never
export default function Search({ setFilteredData, setIsFiltered }: { setFilteredData:  React.Dispatch<React.SetStateAction<never[]>>, setIsFiltered: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        setFilteredData(result.data);
        setIsFiltered(true);
        console.log(result)
    }

    function clearFilter() {
        setIsFiltered(false);
    }

    return (
        <div className="searchContainer">
            <input
              type="text"
              id="csvSearchBar"
              onChange={onSearchChange}
            />

            <button
              id="searchBtn"
              className="btn"
              onClick={searchFile}
            >Search
            </button>

            <button
              id="clearFilterBtn"
              className="btn"
              onClick={clearFilter}
            >Clear Filter
            </button>
        </div>
    )
}
