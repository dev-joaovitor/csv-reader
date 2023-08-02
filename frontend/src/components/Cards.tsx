export default function Cards({ data }: { data: never[] }){
    return (
        <>
            {data.map((obj: object, key: number) => {
                const ps = []
                for (const [field, value] of Object.entries(obj)){
                    ps.push(<p>{`${field}: ${value}`}</p>);
                }
                return (
                    <div key={key} className="cards">
                        {...ps}
                    </div>
                )
            })}
        </>
    )
}