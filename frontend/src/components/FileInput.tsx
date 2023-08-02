import { ChangeEvent, MouseEvent, useState  } from 'react';

export default function FileInput({ setData, setIsFiltered }: { setData: React.Dispatch<React.SetStateAction<never[]>>, setIsFiltered: React.Dispatch<React.SetStateAction<boolean>> }) {
    const API_BASE_URL = 'http://localhost:3000/api/v1';

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
        setIsFiltered(false);
        console.log(result);
    }


    return (
        <form>
            <input
              type="file"
              id="csvInput"
              accept='.csv'
              onChange={onFileChange}
            />
            <button onClick={uploadFile} disabled={file ? false : true}>Send</button>
        </form>
    )
}
