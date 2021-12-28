import React, { Component } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import App2 from './App2';
import App1 from './App1'
import Logo from './components/Logo';
function Big (){
   const [value,setValue]=useState('');
   const[app1,setApp1]=useState(false);
   const [app2,setApp2]=useState(false);
   const handleSelect=(e)=>{
    console.log(e);
    setValue(e);
    }
    const start=()=>{
        if (value=='Countdown'){
            setApp1(true)
        }
        else if (value=='Paragraph'){
            setApp2(true);
        }
    }

     return  ( app1==false&&app2==false?<div className='select-menu'>
         <Logo></Logo>
        <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
          {value==''?'Pick a mode':value}
        </Dropdown.Toggle>
        <Dropdown.Menu >
          <Dropdown.Item eventKey={"Countdown"}>Countdown</Dropdown.Item>
          <Dropdown.Item eventKey={"Paragraph"}>Paragraph</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {value==''?'': <Button onClick={start} id='start-btn' variant="success">Start</Button>}
      </div>:(app1==true?<App1></App1>:<App2></App2>)
     )
}

    
 
export default Big;