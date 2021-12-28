import React, { Component,useState, useEffect, useRef } from 'react';

const Letter=(props)=> {
    const [newLine,setNewLine]=useState(false);
    const ref = useRef(null);
    const [reset,setReset]=useState(false);
    useEffect(()=>{
      
        if(ref.current&&ref.current.offsetWidth==0){
        setNewLine(true);
        props.getData(props.id);}
        return ()=>{
        }
    },[])
        if (props.status==null&&props.pointer==props.id){
            return <span ref={ref} className='letter' style={{color:'white',textDecoration:'underline'}}>
              
                {props.data.value}

            </span>
        }
        else if (props.status==null){
            return <span ref={ref} className='letter' style={{color:'white'}}>
           
                {props.data.value}

            </span>
        }
        else if(props.status=='right'){
            return <span className='letter-correct'>{props.data.value}</span>
        }
        else if(props.status=='wrong'){
            return <span className='letter-incorrect'>{props.data.value}</span>
        }
        else{
            return <span>hi</span>
        }
    



       
    
    
}
 
export default Letter;
