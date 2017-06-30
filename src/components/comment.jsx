import React from 'react';
import Butter from 'buttercms';
import { Helmet } from "react-helmet";
import MainLayout from '../layout/mainlayout.jsx';
import styles from './post.less';


class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { slug } = this.props;
        uyan_config.su = slug ;
        if(window.uyanFrame && window.uyanFrame[ slug ]){
            let frame = document.getElementById("uyan_frame");
            frame.parentNode.replaceChild(window.uyanFrame[ slug ] ,frame );
        }else{
            var script = document.createElement("script");
            script.charset = "utf-8";
            script.src = "http://v2.uyan.cc/code/uyan.js?uid=2137679&k="+Math.random();
            document.body.appendChild(script);
        }
    }

    componentWillUnmount() {
        if(!window.uyanFrame) window.uyanFrame = {};
        let { slug } = this.props;
        window.uyanFrame[ slug ] = document.getElementById("uyan_frame");
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];
            if (s.getAttribute('src') === "http://v2.uyan.cc/code/uyan.js?uid=2137679&k="+Math.random()) {
                s.parentElement.removeChild(s);
            }
        }
    }

    render() {
        return <div  id="uyan_frame"></div>
    }
}

export default Comment ;