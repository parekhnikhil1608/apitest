import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './State.css';
import { Alert } from 'react-bootstrap';


export default function State() {

    const token = localStorage.getItem("token") as string                  // token...........
    const [selectedCountry, setSelectedCountry] = useState<any>(null)
    const [selectedState, setSelectedState] = useState<any>(null)
    const [apiData, setApiData] = useState<any>()
    const [stateData, setStateData] = useState<any>()
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertData, setAlertData] = useState<any>({
        type: 'success',
        message: 'this is success message'
    })


    const handleState = (e: any) => {
        setSelectedState(e.target.value)
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {  // Check userlogin or not
            // window.location.href = "/";
            axios?.get(`http://10.37.55.216:5000/api/v1/Country/GetCountryList`, {  // Call Country API
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            })
                ?.then((res) => {
                    setApiData(res?.data)
                })
        } else {
            window.location.href = '/login'
        }

    }, [])   // render first time only


    const showAlert = (type: String, message: String) => {
        setAlertData({
            type: type,
            message: message
        })
        setVisibleAlert(true)
        window.setTimeout(function () {
            setVisibleAlert(false)
        }, 1500);
    }



    const handleCountry = (e:any) => {
        const data = (e?.target?.value)
        setSelectedCountry(data)
        setSelectedState(null)                                      // Call State API
        axios.get(`http://10.37.55.216:5000/api/v1/State/Search?Page=1&PageSize=10&countryPKID=${data}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        }).then((responce: any) => {
            setStateData(responce?.data?.data)
            console.log(responce?.data?.data)
        }).catch((error) => {
            // handle error
            console.log(error);
        })
    }

    const submit = () => {
        selectedCountry !== null && selectedState !== null ? showAlert('success', 'State selected successfully and the selected state is : ' + selectedState) : showAlert('danger', 'Please Select Country/State')
    }

    return (
        <>
            <div className='alertBox'>
                {visibleAlert && <Alert variant={alertData.type}>
                    {alertData.message}
                </Alert>}
            </div>
            <div className='formMain'>
                <div className="myform">
                    <h3>State</h3>
                    <select name="country" onChange={handleCountry} id="country" defaultValue={'Select Country'} >
                        <option disabled>Select Country</option>
                        {apiData?.map((item: any, index: any) => { return (<option key={index} value={item?.value}  >{item?.name}</option>) })}
                    </select><br />
                    <select name="state" id="state" onChange={handleState} defaultValue={'Select State'} >
                        <option disabled>Select State</option>
                        {stateData?.map((item: any, index: any) => { return (<option key={index} value={item?.value} >{item?.stateName}</option>) })}
                    </select><br />
                    <input type="button" value="SUBMIT" onClick={submit} className='btn btn-primary' />
                </div>
            </div>
        </>
    )
}
