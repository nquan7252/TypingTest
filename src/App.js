import logo from './logo.svg';
import './App.css';
import React from 'react';
import DisplayBox from './components/DisplayBox';
import TextBox from './components/TextBox';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      words:null,pointer:null
    }
  }
  componentDidMount(){
    let arr=[];
    fetch('https://random-word-api.herokuapp.com/word?number=10').then(data=>data.json()).then(json=>{
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
      this.setState({words:arr,pointer:0,bigarr:testarr})
  })
  }
  render() { 
    if (this.state.bigarr!=null){
    return <div>
       <DisplayBox data={this.state.words} bigarr={this.state.bigarr}></DisplayBox>
    </div>;
  }
  else
  return <span>hi</span>
  }
  
}
 
export default App;
