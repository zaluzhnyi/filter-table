import React from 'react';
import './highlight.scss'
type Props={
    text:string
    filter:string
}
function Highlight({text,filter}:Props):JSX.Element {
    if(!filter)return <>{text}</>;
    const regexp = new RegExp(filter,'g')
    const matchValue = text.match(regexp)
    if(matchValue){
        return (
            <>
                {text.split(regexp).map((s,i,array)=>{
                    if(i<array.length-1){
                        const match =matchValue.shift()
                        return <>{s}<span className='highlight-color'>{match}</span></>
                    }
                    return <>{s}</>
                })}
            </>
        )
    }
    return <>{text}</>

}

export default Highlight;