import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

var scrollTime = 45;
var scrolling = false;
var scrollingTime = 0;
var from;
var snip;

function animateScrollTo(){
    scrollingTime += 1;
    var progress = scrollingTime/scrollTime;
    var fromPos = from*window.innerHeight;
    var toPos = snip*window.innerHeight;
    var diff = toPos - fromPos;
    var target = fromPos + diff*(-Math.cos(progress*Math.PI)+1)/2;
    window.scrollTo(0, target);
    //console.log(scrollingTime + " " + scrolling + " " + from + " " + window.pageYOffset + " " + target);
    if(scrollingTime === scrollTime){
        //finished
    }else{
        window.requestAnimationFrame(animateScrollTo);
    }
}

function scrollTo(fromP, snipP){
    from = fromP;
    snip = snipP;
    window.requestAnimationFrame(animateScrollTo);
}

window.addEventListener('scroll', function(e){
    //console.log(scrolling);
    if(!scrolling){
        scrolling = true;
        var snip = Math.round(window.pageYOffset/window.innerHeight);
        if(Math.floor(window.pageYOffset/window.innerHeight) === snip){
            // console.log(snip+1);
            scrollTo(snip, snip+1);
        }else{
            scrollTo(snip, snip-1);
        }
    }
    if(scrollingTime === scrollTime){
        //finished
        scrolling=false;
        scrollingTime = 0;
    }
    ReactDOM.render(<App />, document.getElementById('root'));
});
