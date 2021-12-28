import React, { Component } from 'react';
class TextBox extends React.Component {
    render() { 
        return <div>
            <input ref={(ip) => this.myInp = ip} className='input' autoFocus type='text' id='inputbox' onKeyDown={this.preventBackSpace} onChange={this.props.fn}></input>
        </div>;
    }
    componentDidUpdate(){
        this.myInp.focus();
    }
    preventBackSpace=(e)=>{
        var event = e || window.event;
        if (event) {
            var keyCode = event.charCode || event.keyCode;
            if (keyCode === 8) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        }
    }
}
 
export default TextBox;