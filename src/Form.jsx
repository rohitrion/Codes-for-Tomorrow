import React, { useState } from 'react'

const Form = ({setOpen}) => {

    const [name, setname] = useState()

    const [add, setadd] = useState()

    const [number, setnumber] = useState()

    const [country, setcountry] = useState()



    function handlesubmit() {

        if (!name || !add || !number || !country) {
            alert('please fill all details')
            return
        }

        console.log(name, add, number, country)
      
        setcountry('')
        setname('')
        setnumber('')
        setadd('')
        setOpen(false)
    
    }

    return (
        <div className='form'>
 
 <h1>Feedback form</h1>
            <label>name</label>
            <input value={name} onChange={(e) => setname(e.target.value)} />

            <label>Address</label>
            <input value={add} onChange={(e) => setadd(e.target.value)} />


            <label>Number</label>
            <input value={number} onChange={(e) => setnumber(e.target.value)} />
            <label>country</label>
            <input value={country} onChange={(e) => setcountry(e.target.value)} />


            <button onClick={handlesubmit} >Submit</button>
        </div>
    )
}

export default Form