import logo from './logo.svg';
import './App.css';
import React from 'react';
import DisplayBox from './components/DisplayBox';
import TextBox from './components/TextBox';
import Logo from './components/Logo';
class App2 extends React.Component {
  constructor(){
    super();
    this.state={
      words:null,pointer:null
    }
  }
  componentDidMount(){
    let arr=[];
    fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0').then(data=>data.json()).then(json=>{
      for (let i=0;i<json.length;i++){
        if (i!=json.length-1) json[i]=json[i]+" "
        arr[i]=json[i].split('');
      }
      let bigarr=Array.prototype.concat(...arr)
      let testarr=[];
      for (let i=0;i<bigarr.length;i++){
        let single={value:bigarr[i]}
        testarr.push(single);
      }
      console.log(testarr)
      this.setState({words:arr,pointer:0,bigarr:testarr,end:false})
  })
  }
  render() { 
  
    if (this.state.bigarr!=null){
    return <div>
      <Logo></Logo>
       <DisplayBox data={this.state.words} bigarr={this.state.bigarr} onRestart={this.restart} end={this.state.end}></DisplayBox>
    </div>;
  }
  else
  return <span>Loading...</span>
  }
  restart=()=>{
    console.log('restart clicked')
    this.componentDidMount();
  }
  
}
 
export default App2;
