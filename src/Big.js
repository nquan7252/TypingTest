import React, { Component } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import App2 from './App2';
import App1 from './App1'
import Logo from './components/Logo';
import Social from './components/Social';
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
      {value==''?'': <div style={{width:"100%",marginBottom:"30px"}}><Button onClick={start} id='start-btn' variant="success">Start</Button></div>}
      <span style={{color:'white'}}>*Since this app uses online API resource to generate random words, it might potentially contain inappropriate words and I'm currently working on a personal random word API to fix this. Sorry for the inconvenience and thank you for understanding.</span>
      <Social></Social>
      </div>:(app1==true?<App1></App1>:<App2></App2>)
     )
}

    
 
export default Big;