import React, { Component } from 'react';
function Dashboard(props) {
  
        return <div className='table'>
            {props.data.time==null?null:<div className='subtable'>Time: {props.data.time}s</div>}
            <div className='subtable'>WPM: {props.data.wpm}</div>
            <div className='subtable'>Accuracy: {props.data.accuracy}% </div>
        </div>;
    }

 
export default Dashboard;