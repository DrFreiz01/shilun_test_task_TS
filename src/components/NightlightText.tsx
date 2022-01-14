import React, {FC} from 'react';

interface INightlightText {
    full_name: string,
    valueInSearch: string,
    date: string
}

const NightlightText: FC<INightlightText> = ({ full_name, valueInSearch, date }) => {

    const partsFullName: string[] = full_name.split(new RegExp(`(${valueInSearch})`, 'gi'));

    return (
        <div>
            <span>
                {partsFullName.map((part: string, index: number) =>
                part.toLowerCase() === valueInSearch.toLowerCase()
                    ? <span key={index} style={{color: '#0DCAF0'}}>{part}</span>
                    : part
                )}
                | {date}
            </span>
        </div>
    );
}

export default NightlightText;