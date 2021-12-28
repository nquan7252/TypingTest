import React, { Component } from 'react';
import TextBox from './TextBox';
import Word from './Word';
import Letter from './Letter';
class DisplayBoxCountDown extends React.Component {
    constructor() {
        super();
        this.test=false;
        this.count = 0;
        this.found = false;
        this.getData = this.getData.bind(this)
        console.log('constructor called')
        this.state = {
            pointer: 0, status: null,
            end: false,
            elapsedTime: 30,
            countVar: "",
            breakline: [{value:0,reached:true}],started:false
        }
    }

    render() {
        console.log('render')
        if (this.state.elapsedTime != 0) {
            return <div>
                <div id='timer'>{this.state.elapsedTime}</div>
                <div className='displaybox limited-display'>{this.getWords()}</div>
                <TextBox fn={this.getChange}></TextBox>
                <div className='restart-btn-container'>
                    <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
                </div>
            </div>;
        }
        else {
            this.stopCounting();
            return <div>
                <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
                {this.getResult()}</div>
        }
    }
    restart = () => {
        this.test=!this.test;
        this.count=0;
        this.getData = this.getData.bind(this)
        this.stopCounting();
        this.props.onRestart();
        this.setState({
            pointer: 0,
            status: null,
            end: false,
            elapsedTime: 30,
            countVar: "",
            breakline: [{value:0,reached:true}],started:false
        })

    }


    getWords = () => {
        if (this.state.breakline.length == 0||this.state.started==false) {
            
            console.log('first state')
            return this.props.bigarr == null ? 'j' : this.props.bigarr.map((single, index) => {
                if (index <= this.state.pointer - 1)
                    return <Letter getData={this.getData} id={single.indice} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer} reset={true}></Letter>

                else
                    return <Letter getData={this.getData} id={single.indice} status={null} data={single} key={index} pointer={this.state.pointer} reset={true}></Letter>

            })



        }
        else {
            console.log('second state')
            
            let temparr = [...this.props.bigarr];
            if (this.state.breakline.find(e=>(e.value==this.state.pointer-1&&e.reached==false))) {
                this.state.breakline.find((element,index)=>element.value==this.state.pointer-1).reached=true;
                this.count++;
                console.log('foundd')
            }
            return this.props.bigarr == null ? 'j' : this.props.bigarr.filter((element,index)=>element.indice>=this.state.breakline[this.count].value).map(
                (single, index) => {
                    if (index <= this.state.pointer - 1)
                         return <Letter getData={this.getData} id={single.indice} status={this.state.bigarr[single.indice].status} data={single} key={single.indice} pointer={this.state.pointer} reset={true}></Letter>

                     else
                        return <Letter getData={this.getData} id={single.indice} status={null} data={single} key={single.indice} pointer={this.state.pointer} reset={true}></Letter>
                    
                }
            )
                
        }
            
            
            
            // this.props.bigarr.map((single, index) => {
            //     //fix this
            //     for (let i=this.state.breakline.length-1;i>=0;i--){
            //     if (index >=this.state.breakline[i] && this.state.pointer >= this.state.breakline[i]) {
            //         console.log('here1',i)
            //         if (index <= this.state.pointer - 1)
            //             return <Letter getData={this.getData} id={index} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>

            //         else
            //             return <Letter getData={this.getData} id={index} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
                    
            //     }




            //     else if(this.state.pointer>=0&&this.state.pointer<=this.state.breakline[0]){
            //         console.log('here2')
            //         if (index <= this.state.pointer - 1)
            //             return <Letter getData={this.getData} id={index} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>
            //         else
            //             return <Letter getData={this.getData} id={index} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
            //     }
                
            //     }
            // })
        
    }
    getResult = () => {
        var wpm = 100 / (this.state.elapsedTime / 60)
        return <span>wpm is {Math.ceil(wpm)}</span>
    }
    getChange = (e) => {
        let newArr = [...this.props.bigarr];
        if (this.state.elapsedTime == 0) {
            console.log('end');
            this.stopCounting();
            this.setState({ pointer: this.state.pointer + 1, status: 'right', bigarr: newArr, end: true, elapsedTime: this.state.elapsedTime, countVar: this.state.countVar, breakline: this.state.breakline })
        }
        else if (e.target.value == this.props.bigarr[this.state.pointer].value) {
            if (this.state.pointer == 0) {
                console.log('start timer')
                this.startCounting();
            }
            console.log('right');
            newArr[this.state.pointer].status = 'right'
            this.setState({ pointer: this.state.pointer + 1, status: 'right', bigarr: newArr, end: false, elapsedTime: this.state.elapsedTime, countVar: this.state.countVar, breakline: this.state.breakline,started:true })
        }
        else {
            if (this.state.pointer == 0) {
                console.log('start timer')
                this.startCounting();
            }
            newArr[this.state.pointer].status = 'wrong'
            this.setState({ pointer: this.state.pointer + 1, status: 'wrong', bigarr: newArr, end: false, elapsedTime: this.state.elapsedTime, countVar: this.state.countVar, breakline: this.state.breakline })
        }

        e.target.value = '';



    }
    stopCounting = () => {
        clearInterval(this.state.countVar);
    }
    getWordKey = () => {
        return this.state.wordkey++;
    }
    startCounting() {
        var countVar = setInterval(() => {
            console.log(this.state.elapsedTime)
            this.setState({ elapsedTime: this.state.elapsedTime - 1, countVar: countVar })
        }, 1000);
    }
    getData = (data) => {
        console.log(data);
        let temp={value:data,reached:false}
        this.state.breakline.push(temp);
        let tempArr = [...this.state.breakline];
        tempArr.push(data);
        this.setState({
            pointer: this.state.pointer, status: this.state.status,
            end: this.state.end,
            elapsedTime: this.state.elapsedTime,
            countVar: this.state.countVar,
            breakline: tempArr
        })
    }
}

export default DisplayBoxCountDown;