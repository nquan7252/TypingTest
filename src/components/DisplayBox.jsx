import React, { Component } from 'react';
import TextBox from './TextBox';
import Word from './Word';
import Letter from './Letter';
class DisplayBox extends React.Component {
   constructor(){
       super();
       this.state={
        pointer:0,status:null,
  
       }
   }

    render() { 
        return <div>
            <div className='displaybox'>{this.getWords()}</div>
            <TextBox fn={this.getChange}></TextBox>
        </div>;
    }
    getWords=()=>{
       return this.props.bigarr==null?'j':this.props.bigarr.map((single,index)=>
        { if (index<=this.state.pointer-1)
            return <Letter id={index} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>

        else 
        return <Letter id={index} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
    })

        
}
    getChange=(e)=>{
        let newArr=[...this.props.bigarr];
        if(e.target.value==this.props.bigarr[this.state.pointer].value){
            console.log('right');
            newArr[this.state.pointer].status='right'
        this.setState({pointer:this.state.pointer+1,status:'right',bigarr:newArr})}
        else{
            newArr[this.state.pointer].status='wrong'
            this.setState({pointer:this.state.pointer+1,status:'wrong',bigarr:newArr})
        }
       
        e.target.value='';
        
        

    }
    getWordKey=()=>{
        return this.state.wordkey++;
    }
}
     
export default DisplayBox;