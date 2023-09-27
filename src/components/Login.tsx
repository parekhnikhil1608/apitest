import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Login.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Login() {
  const MySwal = withReactContent(Swal)

  const [user, setUser] = useState<any>({
    uname: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(true);
  const [showPassword, setShowPassword] = React.useState(false);

  function handleCheck(e: React.FocusEvent<HTMLInputElement>) {
    setShowPassword(e.target.checked);
  }

  function handleChange(evt: React.FocusEvent<HTMLInputElement>) {
    const value = evt.target.value;
    const name = evt.target.name
    setUser({
      ...user,
      [name]: value
    });
  }

  useEffect(() => {
    (user.uname !== '' && user.password !== '') ? setLoading(false) : setLoading(true)
  }, [user.uname, user.password])

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      window.location.href = "/";
    }
  })

  const handleSubmit = async () => {
    // debugger
    console.log("axios")
    await axios?.post("http://10.37.55.216:5000/api/v1/Auth/UserLogin", {   // Call UserLogin API
      "username": user.uname,
      "password": user.password
    }).then((responce: any) => {
      const result = responce.data.result
      if (result === "Success") {
        const token = responce.data.data.token
        console.log('tokan', token)
        localStorage.setItem('token', JSON.stringify(token));
        window.location.href = "/";

        alert(result);
      } else {
        alert(result);
      }
    }).catch((error) => {
      // handle error
      console.log(error);
    })
  }


  return (
    <>
      <div className='mainContainer'>
        <div className='loginForm'>
          <h3>Login</h3>
          <div className="form-group">
            <input type="text" className="form-pkId" name="uname" id="uname" placeholder="Enter Username" value={user.uname} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type={showPassword ? 'text' : 'password'} className="form-country" id="password" name='password' value={user.password} aria-describedby="emailHelp" autoComplete='current-password' placeholder="Enter Password" onChange={handleChange} />
          </div>
          <div className='checkPass'>
            <input type="checkbox" name="readPass" id="readPass" placeholder="" onChange={handleCheck} />
            <label> Show Password</label><br />
          </div>
          <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleSubmit} disabled={loading} className='btn btn-primary' style={{ width: "195px" }} />
        </div>
      </div>
    </>
  )
}
