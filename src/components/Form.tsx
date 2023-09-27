import React, { useEffect, useState } from 'react'
import './Form.css';
import axios from 'axios';
import { count } from 'console';
interface updateCountry {
  pkId: any;
  countryName: string;
}


export default function Form() {
  const token = localStorage.getItem("token") as string
  const [country, setCountry] = useState<any>()

  function handleChange(evt: React.FocusEvent<HTMLInputElement>) {
    // const value = ;
    // const name = 
    setCountry({
      ...country,
      [evt.target.name]: evt.target.value
    });
  }
  useEffect(() => {             // check Usre Login or not
    if (localStorage.getItem('token') === null) window.location.href = '/login/'
  }, [])


  

  const updateCountry = () => {
    
      axios.post(`http://10.37.55.216:5000/api/v1/Country`, {    //Add & Update Country if we pass pkid it will update
        pkId: country.pkId,                                        // else will create new one
        CountryName: country.countryName
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then((responce: any) => {
          responce.data === 1 ? alert('Country table Updated Successfully') : alert('Internal Server Error')
        }).catch((error) => {
          alert(error?.response?.data?.countryName)
        })

  }

  const [selectedOption, setSelectedOption] = useState('update');
  function handle(event: any) {
    setSelectedOption(event.target.value);
  }

  function alertDelete(option: string) {             // Conformation alert 
    let text = `Are you sure you want to ${option} Country?`;
    if (window.confirm(text) == true) {
      updateCountry()
    } else {
      alert('Internal Server Error')
    }
  }
  
  // useEffect(()=>{
  //   console.log("radio change")
  //   setCountry({              
  //    pkId : 111,
  //    countryName : 'bbghd'
  //   })
  // },[selectedOption])



  return (
    <>

      <div className="mainForm">
        <h3>Add/Update Country</h3>
        <div className='radioGroup'>
          <input type="radio" id="add" name="country" value="add" checked={selectedOption === 'add'} onChange={handle} />
          <label htmlFor="age2">ADD</label><br />
          <input type="radio" id="update" name="country" value="update" checked={selectedOption === 'update'} onChange={handle} />
          <label htmlFor="age1">UPDATE</label><br />
        </div>
        <div className="form-group">
          {selectedOption == 'update' && <input type="number" className="form-pkId" name="pkId" id="pkId" placeholder="Enter pkId" onChange={handleChange} required />}
        </div>
        <div className="form-group">
<input type="text" className="form-country" id="country" name='countryName' aria-describedby="emailHelp" placeholder="Enter Country" onChange={handleChange} required />        </div>
        <button type="submit" onClick={() => { alertDelete(selectedOption) }} className="btn btn-primary" style={{ width: "190px" }}>{selectedOption}</button>
      </div>

    </>
  )
}
