import React, { Component } from 'react';
class Social extends React.Component {
    render() { 
        return  <ul className="social">
            <li><a href="https://nquan7252.github.io/Miwawebsite/" target="_blank"><img src={require("../assets/www.png")} className="social-icon" alt=""/></a></li>
        </ul>

    }
}
 
export default Social;
