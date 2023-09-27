import { useState } from 'react'
import './Calculator.css';


export default function CalCulator() {

    const [display1, setDisplay] = useState<string>('')
    const [btnDissable, setBtnDissable] = useState<any>(false)

    const handleButton = (e: any) => {
        let value = display1+e.target.value
        setDisplay(display1+e.target.value)
        switch (e.target.value) {
            case '+' : 
                
                break;
            case '-' : 
                
                break;
            case 'x' : 
                
                break;
        
            default:
                break;
        }

    }
    const handleRemove = () => {
        setDisplay(display1.substring(0 , display1.length - 1) )

    }
    const handleRemoveAll = () => {
        setDisplay('')
        setBtnDissable(false)

    }
    const handleResult = () => {
       try{
        const result= eval(`${display1}`)
         setDisplay(result)
        // console.log(result)
        if(result == 'Infinity'){
            setBtnDissable(true)
        }

       }catch(e:any){
        setDisplay('ERROR')
        setBtnDissable(true)
       }
    }
    const numericInput = document.getElementById('display');


    numericInput?.addEventListener('keydown', function(event) {
        // Allow numeric keys (0-9), backspace, delete, arrow keys, and home/end keys.
        const allowedKeys = [8, 46, 37, 39, 36, 35];
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || allowedKeys.includes(event.keyCode)) {
          // Allow the input.
        } else {
          // Prevent any other keys from being entered.
          event.preventDefault();
        }
      });

    return (
        <div className='mainDiv'>
            <div className='mainCal'>
                <div>
                    <input type="text" readOnly placeholder='0'  value={display1} className='calDisplay' id='calDisplay display' onChange={(e:any)=>{
                            setDisplay(e.target.value)
                    }}/>
                </div>
                <div className='buttons'>
                    <button id='num1' value={1} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>1</button>
                    <button id='num2' value={2} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>2</button>
                    <button id='num3' value={3} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>3</button>
                    <button value={'+'} onClick={handleButton} disabled={btnDissable} className='btn btn-warning'>+</button>
                    <button id='num4' value={4} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>4</button>
                    <button id='num5' value={5} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>5</button>
                    <button id='num6' value={6} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>6</button>
                    <button value={'-'} onClick={handleButton} disabled={btnDissable} className='btn btn-warning'>-</button>
                    <button id='num7' value={7} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>7</button>
                    <button id='num8' value={8} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>8</button>
                    <button id='num9' value={9} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>9</button>
                    <button value={'*'} onClick={handleButton} disabled={btnDissable} className='btn btn-warning'>x</button>
                    <button onClick={handleRemove} disabled={btnDissable} className='btn btn-success'><img src="backspace.png" alt="" /></button>
                    <button id='num0' value={0} onClick={handleButton} disabled={btnDissable} className='btn btn-primary'>0</button>
                    <button onClick={handleResult} disabled={btnDissable} className='btn btn-success'>=</button>
                    <button onClick={handleRemoveAll} className='btn btn-danger'>C</button>
                </div>
            </div>
        </div>
    )
}
