import React from "react";

export default function Cards({ data }: { data: object[] }): React.JSX.Element {
    return (
        <div className="cardsContainer">
            {data.map((obj: object, key: number) => {
                const ps: any = []
                for (const [field, value] of Object.entries(obj)){
                    ps.push(<p className="cardData">{`${field}: ${value}`}</p>);
                }
                return (
                    <div key={key} className="cards">
                        {...ps}
                    </div>
                )
            })}
        </div>
    )
}