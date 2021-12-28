import React, { Component } from 'react';
class Social extends React.Component {
    render() { 
        return  <ul className="social">
            <li><a href="https://www.instagram.com/_mquannn_/" target="_blank"><img src={require("../assets/instagram.png")} className="social-icon"alt =""/></a></li>
            <li><a href="https://miwa.sbs/" target="_blank"><img src={require("../assets/www.png")} className="social-icon" alt=""/></a></li>
            <li><a href="https://www.linkedin.com/in/nguyen-quan-299a3a224/" target="_blank"><img src={require("../assets/linkedin.png")} className="social-icon" alt=""/></a></li>
        </ul>

    }
}
 
export default Social;