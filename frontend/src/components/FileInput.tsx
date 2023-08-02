import React, { ChangeEvent, MouseEvent, useState  } from 'react';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export default function FileInput({ setData, setIsFiltered, setErrorMessage }: {
    setData: React.Dispatch<React.SetStateAction<never[]>>,
    setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element 
  {
    const [file, setFile] = useState(null as unknown as File);

    function onFileChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
    
        setFile(files[0]);
    }
    
    async function uploadFile(e: MouseEvent) {
        e.preventDefault();
    
        if (file === null) return;
    
        const body = new FormData();
    
        body.append(file.name, file);
    
        const response = await fetch(`${API_BASE_URL}/uploadFile`, {
          method: "post",
          body
        });
    
        const result = await response?.json();
        
        setData(result?.data ?? []);

        if (result.status !== 200){
            return setErrorMessage(result.message);
          }

        setIsFiltered(false);
        setErrorMessage("No data to be showed =(");
        console.log(result);
    }

    return (
        <form className='fileContainer'>
            <label id='inputFile'>
                Upload your .csv
                <input
                  type="file"
                  id="csvInput"
                  accept='.csv'
                  onChange={onFileChange}
                />
            </label>
            <button className='btn' onClick={uploadFile} type="button" disabled={file ? false : true}>Load data</button>
        </form>
    )
}
