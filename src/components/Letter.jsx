import React, { Component, useEffect, useRef } from 'react';

const Letter=(props)=> {
    const ref = useRef(null);
    useEffect(() => {
      console.log('width', ref.current ? ref.current.offsetWidth : 0);
    }, [ref.current]);
        if (props.status==null&&props.pointer==props.id){
            return <span  className='letter' style={{color:'white',textDecoration:'underline'}}>
      
                {props.data.value}

            </span>
        }
        else if (props.status==null){
            return <span  className='letter' style={{color:'white'}}>
           
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
