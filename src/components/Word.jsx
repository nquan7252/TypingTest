import React, { Component } from 'react';
import Letter from './Letter';
class Word extends React.Component {
    state={letterkey:0}
    render() { 
        return <span>
           {this.getLetter()}
        </span>;
    }
    getLetter=()=>{
        return (this.props.data==null?'':this.props.data.map((single,index)=>{return <Letter data={single} key={index} pointer={this.props.pointer} status={this.props.status}></Letter>
        }))
    }

}
 
export default Word;