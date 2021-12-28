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
        var evt = e || window.event;
        if (evt) {
            var keyCode = evt.charCode || evt.keyCode;
            if (keyCode === 8) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false;
                }
            }
        }
    }
}
 
export default TextBox;