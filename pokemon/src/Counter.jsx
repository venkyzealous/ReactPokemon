import React, { useState} from 'react'



function Counter(props) {

    const [count,setCount] = useState(props.initialValue ?? 6)

    return (
    <>
        <button onClick={p => setCount(x => x + 1)}>+</button>
        <span> {props.name} {count}</span>
        <button onClick={p => setCount(x => x - 1)}>-</button>


    </>
    )
}



export default Counter