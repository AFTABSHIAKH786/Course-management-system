import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Example = () => {

    const [counts , setCount ] = useState('')

    useEffect(() => {
        async function getCount() {
            const { data } = await axios.get('http://localhost:5000/api/count');
            const value = data[0]
            setCount(value.count)
        }
        getCount();
    }, []);
  return (
    <div>
        {counts}
    </div>
  )
}

export default Example
