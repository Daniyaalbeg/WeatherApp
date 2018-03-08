export default function VerticalSnapper(element, pageSize = 1, snapTime = 30){
    this.snapping = false;
    this.snappingTime = 0;
    this.element = element;
    this.stopSnapping = false;
    this.from = 0;
    this.isTouchDown = false;
    this.pageSize = pageSize;
    this.snapTime = snapTime;

    function snap(){
        if(this.snapping){
            //Already snapping
            if(this.stopSnapping){
                //Something asked us to stop snapping, must obey
                this.snappingTime = 0;
                this.snapping = false;
                this.stopSnapping = false;
            }else{
                //Continue snapping :D
                this.snappingTime++;
                let progress = this.snappingTime/this.snapTime;
                let bounds = this.element.getBoundingClientRect();
                let to = Math.round(this.element.scrollTop/(bounds.height*this.pageSize))*bounds.height*this.pageSize;
                let diff = to - this.from;
                let target = this.from + diff*(-Math.cos(progress*Math.PI)+1)/2;
                this.element.scrollTop = Math.round(target);
                console.log({elem: this.element, progress, bounds, to, diff, target});
                if(this.snappingTime >= this.snapTime){
                    //Finished snapping, tell ourselves to stop!
                    this.stopSnapping = true;
                }
                //Done for now...
                window.requestAnimationFrame(snap.bind(this));
            }
        }else{
            //Not yet snapping, start
            this.snapping = true;
            this.from = this.element.scrollTop;
            console.log({element : this.element, from: this.from});
            window.requestAnimationFrame(snap.bind(this));
        }
    }

    function onScroll(event){
        if(!this.isTouchDown){
            if(this.timer){
                clearInterval(this.timer);
            }
            this.timer = window.setTimeout(snap.bind(this), 100);
        }
    }

    function onTouch(event){
        this.isTouchDown = true;
        if(this.timer){
            clearInterval(this.timer);
        }
        if(this.snapping){
            this.stopSnapping = true;
        }
    }

    function onTouchStop(event){
        this.isTouchDown = false;
        this.timer = window.setTimeout(snap.bind(this), 100);
    }

    console.log("Binding listeners");

    this.element.addEventListener('scroll', onScroll.bind(this));
    this.element.addEventListener('touchstart', onTouch.bind(this));
    this.element.addEventListener('touchend', onTouchStop.bind(this));

    console.log("Bound!");
}
