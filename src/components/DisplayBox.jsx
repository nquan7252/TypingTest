import React, { Component } from 'react';
import TextBox from './TextBox';
import Word from './Word';
import Letter from './Letter';
import Dashboard from './Dashboard';
class DisplayBox extends React.Component {
   constructor(){
       super();
       this.state={
        pointer:0,status:null,
        end:false,
        elapsedTime:null,
        countVar:"",
       }
   }

    render() {
        if(this.state.end==false){ 
        return <div>
            <div className='displaybox'>{this.getWords()}</div>
            <TextBox fn={this.getChange}></TextBox>
            <div className='restart-btn-container'>
            <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
            </div>
        </div>;
        }
        else
        return <div>
            <Dashboard data={this.getResult()}></Dashboard>
            <div className='restart-btn-container'>
            <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
            </div>
            </div>
    }
    restart=()=>{
       
        this.stopCounting();
        this.props.onRestart();
        this.setState({pointer:0,status:null,
            end:false,
            elapsedTime:null,
            countVar:""})
        
    }

    
    getWords=()=>{
       return this.props.bigarr==null?'j':this.props.bigarr.map((single,index)=>
        { if (index<=this.state.pointer-1)
            return <Letter id={index} getData={this.getData} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>

        else 
        return <Letter id={index} getData={this.getData} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
    })
}
    getData=()=>{

    }
    getResult=()=>{
        var wpm=Math.floor(30/(this.state.elapsedTime/60))
        var time=this.state.elapsedTime;
        var accuracy =Math.floor((this.props.bigarr.filter(e=>e.status=='right').length/this.props.bigarr.length)*100);
        return {wpm:wpm,time:time,accuracy:accuracy}
    }
    getChange=(e)=>{
        let newArr=[...this.props.bigarr];
        if (this.state.pointer==newArr.length-1){
            this.stopCounting();
            this.setState({pointer:this.state.pointer+1,status:'right',bigarr:newArr,end:true})
        }
        else if(e.target.value==this.props.bigarr[this.state.pointer].value){
            if(this.state.pointer==0){
            this.startCounting();
            }
            newArr[this.state.pointer].status='right'
        this.setState({pointer:this.state.pointer+1,status:'right',bigarr:newArr,end:false,elapsedTime:this.state.elapsedTime,countVar:this.state.countVar})}
        else{
            if(this.state.pointer==0){
            this.startCounting();
            }
            newArr[this.state.pointer].status='wrong'
            this.setState({pointer:this.state.pointer+1,status:'wrong',bigarr:newArr,end:false,elapsedTime:this.state.elapsedTime,countVar:this.state.countVar})
        }
       
        e.target.value='';
        
    

    }
    stopCounting=()=>{
        clearInterval(this.state.countVar);
    }
    getWordKey=()=>{
        return this.state.wordkey++;
    }
    startCounting() {
         var countVar=setInterval(()=>{
            this.setState({elapsedTime:this.state.elapsedTime+1,countVar:countVar})}, 1000);
      }
}
     
export default DisplayBox;