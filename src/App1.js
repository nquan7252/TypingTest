import React, { Component } from 'react';
import DisplayBox from './components/DisplayBox';
import DisplayBoxCountDown from './components/DisplayBoxCountDown';
import Logo from './components/Logo';
import Social from './components/Social';
class App2 extends React.Component {
    constructor(){
        super();
        this.state={
          words:null,pointer:null
        }
      }
      componentDidMount(){
        let arr=[];
        fetch('https://random-word-api.herokuapp.com/word?number=300&swear=0').then(data=>data.json()).then(json=>{
          for (let i=0;i<json.length;i++){
            if (i!=json.length-1) json[i]=json[i]+" "
            arr[i]=json[i].split('');
          }
          let bigarr=Array.prototype.concat(...arr)
          let testarr=[];
          for (let i=0;i<bigarr.length;i++){
            let single={value:bigarr[i],indice:i}
            testarr.push(single);
          }
          this.setState({words:arr,pointer:0,bigarr:testarr,end:false})
      })
      }
      render() { 
      
        if (this.state.bigarr!=null){
        return <div>
          <Logo></Logo>
          <DisplayBoxCountDown data={this.state.words} bigarr={this.state.bigarr} onRestart={this.restart} end={this.state.end} ></DisplayBoxCountDown>
          <Social></Social>
        </div>;
      }
      else
      return <span>Loading...</span>
      }
      getTime=()=>{

      }
      restart=()=>{
        this.setState({
            words:null,pointer:null,bigarr:null
        })
        this.componentDidMount();
        
      }
    }
export default App2;