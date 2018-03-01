import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

var scrolling = true;

window.addEventListener('scroll', function(e){
    if(scrolling){
        scrolling = true;
        var snip = Math.round(window.pageYOffset/window.innerHeight);
        if(Math.floor(window.pageYOffset/window.innerHeight) == snip){
            console.log(snip+1);
        }else{
            console.log(snip-1);
        }
    }
    ReactDOM.render(<App />, document.getElementById('root'));
});
