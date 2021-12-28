import React, { Component } from 'react';
import TextBox from './TextBox';
import Word from './Word';
import Letter from './Letter';
import Dashboard from './Dashboard';
class DisplayBoxCountDown extends React.Component {
    constructor() {
        super();
        this.test=false;
        this.count = 0;
        this.found = false;
        this.getData = this.getData.bind(this)
        this.state = {
            pointer: 0, status: null,
            end: false,
            elapsedTime: 30,
            countVar: "",
            breakline: [{value:0,reached:true}],started:false
        }
    }

    render() {
        if (this.state.elapsedTime != 0) {
            return <div>
                <div id='timer'>{this.state.elapsedTime}</div>
                <div className='displaybox limited-display'>{this.getWords()}
                <TextBox fn={this.getChange}></TextBox>
                </div>
                <div className='restart-btn-container'>
                    <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
                </div>
            </div>;
        }
        else {
            this.stopCounting();
            return <div>
                <Dashboard data={this.getResult()}></Dashboard>
                <div className='restart-btn-container'>
                <span id='restart-btn' onClick={this.restart}><img src={require("../assets/refresh.png")} alt="name" /></span>
                </div>
                </div>
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
            
            return this.props.bigarr == null ? 'j' : this.props.bigarr.map((single, index) => {
                if (index <= this.state.pointer - 1)
                    return <Letter getData={this.getData} id={single.indice} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer} reset={true}></Letter>

                else
                    return <Letter getData={this.getData} id={single.indice} status={null} data={single} key={index} pointer={this.state.pointer} reset={true}></Letter>

            })



        }
        else {
            
            let temparr = [...this.props.bigarr];
            if (this.state.breakline.find(e=>(e.value==this.state.pointer-1&&e.reached==false))) {
                this.state.breakline.find((element,index)=>element.value==this.state.pointer-1).reached=true;
                this.count++;
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
            //         if (index <= this.state.pointer - 1)
            //             return <Letter getData={this.getData} id={index} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>

            //         else
            //             return <Letter getData={this.getData} id={index} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
                    
            //     }




            //     else if(this.state.pointer>=0&&this.state.pointer<=this.state.breakline[0]){
            //         if (index <= this.state.pointer - 1)
            //             return <Letter getData={this.getData} id={index} status={this.state.bigarr[index].status} data={single} key={index} pointer={this.state.pointer}></Letter>
            //         else
            //             return <Letter getData={this.getData} id={index} status={null} data={single} key={index} pointer={this.state.pointer}></Letter>
            //     }
                
            //     }
            // })
        
    }
    getResult = () => {
        let sum=0;
        let tempsum=0;
        for (let i=0;i<this.props.data.length;i++){
            sum=i;
            tempsum=tempsum+this.props.data[i].length
            if (tempsum>=this.state.pointer)
            break;
        }


        var wpm = sum*2;
        var accuracy =Math.floor((this.props.bigarr.filter(e=>e.status=='right').length/this.state.pointer)*100);
        return {wpm:wpm,accuracy:accuracy}
    }
    getChange = (e) => {
        let newArr = [...this.props.bigarr];
        if (this.state.elapsedTime == 0) {
            this.stopCounting();
            this.setState({ pointer: this.state.pointer + 1, status: 'right', bigarr: newArr, end: true, elapsedTime: this.state.elapsedTime, countVar: this.state.countVar, breakline: this.state.breakline })
        }
        else if (e.target.value == this.props.bigarr[this.state.pointer].value) {
            if (this.state.pointer == 0) {
                this.startCounting();
            }
            newArr[this.state.pointer].status = 'right'
            this.setState({ pointer: this.state.pointer + 1, status: 'right', bigarr: newArr, end: false, elapsedTime: this.state.elapsedTime, countVar: this.state.countVar, breakline: this.state.breakline,started:true })
        }
        else {
            if (this.state.pointer == 0) {
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
            this.setState({ elapsedTime: this.state.elapsedTime - 1, countVar: countVar })
        }, 1000);
    }
    getData = (data) => {
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