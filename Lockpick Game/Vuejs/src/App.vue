<template>
    <div id="container" v-if="NuiOpen" :style="position_nui">
        <div id="cont_wrap">
            <div id="wrap">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/collar.png" alt="" id="collar" />
                <div id="cylinder"></div>
                <div id="driver"></div>
                <div id="pin">
                    <div class="top"></div>
                    <div class="bott"></div>
                </div>
            </div>
            <div id="sucess" v-if="sucess>0">
                <img src="img/check.png" v-if="sucess==1">
                <img src="img/clear.png" v-if="sucess==2">
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import {TweenLite, TimelineLite, gsap} from "gsap";

import axios from 'axios'
export default {
    name: "",

    components: {
        //
    },

    data() {
        return {
            NuiOpen: false,
            NameResource: '',
            position_nui: 'width: 100vh; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(1);',
            sucess: 0,
        };
    },

    created: function () {
        window.addEventListener("message", this.receiveLua);
        window.addEventListener('keydown', this.keyPress);
    },

    destroyed: function () {
        window.removeEventListener("message", this.receiveLua);
        window.removeEventListener('keydown', this.keyPress);
    },

    methods: {
        SendToClient: function(to, data){
            axios.post(`https://${this.NameResource}/${to}`, data)
            .catch(msg => console.log(`An error occurred in: ${to} , ${msg}`));
        },

        keyPress: function(event){
            const key = event.key;
            if (key == 'Escape' || key == 'Backspace') {
                this.SendToClient('CloseNui', {});
            }
        },

        receiveLua: function (event) {
            if (!event || !event.data) return;

            const lua = event.data;

            if(lua.ui == "ui") { 
                this.NuiOpen = lua.NuiOpen;
                this.NameResource = lua.NameResource;
                if (lua.NuiOpen) {
                    this.position_nui = 'left: '+lua.x+'; top: '+lua.y+'; transform: translate(-'+lua.x+', -'+lua.y+') scale('+ lua.scale +');';
                    
                    gsap.registerPlugin(TweenLite);
                    gsap.registerPlugin(TimelineLite);
                    setTimeout(function() { 
                        this.MountMinigame();
                    }.bind(this), 100);
                }
            } 
        },

        MountMinigame() {
            var minRot = -90,
            maxRot = 90,
            solveDeg = ( Math.random() * 180 ) - 90,
            solvePadding = 4,
            maxDistFromSolve = 45,
            pinRot = 0,
            cylRot = 0,
            lastMousePos = 0,
            mouseSmoothing = 2,
            keyRepeatRate = 25,
            cylRotSpeed = 3,
            pinDamage = 20,
            pinHealth = 100,
            pinDamageInterval = 150,
            numPins = 2,
            userPushingCyl = false,
            gameOver = false,
            gamePaused = false,
            pin, cyl, driver, cylRotationInterval, pinLastDamaged;

            $(function(){
                //pop vars
                pin = $('#pin');
                cyl = $('#cylinder');
                driver = $('#driver');
                
                $('body').on('mousemove', function(e){
                    if (lastMousePos && !gameOver && !gamePaused) {
                        var pinRotChange = (e.clientX - lastMousePos)/mouseSmoothing;
                        pinRot += pinRotChange;
                        pinRot = clamp(pinRot,maxRot,minRot);
                        pin.css({
                            transform: "rotateZ("+pinRot+"deg)"
                        })
                    }
                    lastMousePos = e.clientX;
                });
                $('body').on('mouseleave', function(){
                    lastMousePos = 0;
                });
                
                $('body').on('keydown', function(e){  
                    if ( (e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39) && !userPushingCyl && !gameOver && !gamePaused) {
                    pushCyl();
                    }
                });
                
                $('body').on('keyup', function(e){
                    if ( (e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 83 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39) && !gameOver) {
                    unpushCyl();
                    }
                });
                
                //TOUCH HANDLERS
                $('body').on('touchstart', function(e){
                    // console.log('touchStart',e)
                    if ( !e.touchList ) {
                        //
                    }
                    else if (e.touchList) {
                        //
                    }
                })
            }); //docready
  
            //CYL INTERACTIVITY EVENTS
            function pushCyl() {
                var distFromSolve, cylRotationAllowance;
                clearInterval(cylRotationInterval);
                userPushingCyl = true;
                //set an interval based on keyrepeat that will rotate the cyl forward, and if cyl is at or past maxCylRotation based on pick distance from solve, display "bounce" anim and do damage to pick. If pick is within sweet spot params, allow pick to rotate to maxRot and trigger solve functionality
                
                //SO...to calculate max rotation, we need to create a linear scale from solveDeg+padding to maxDistFromSolve - if the user is more than X degrees away from solve zone, they are maximally distant and the cylinder cannot travel at all. Let's start with 45deg. So...we need to create a scale and do a linear conversion. If user is at or beyond max, return 0. If user is within padding zone, return 100. Cyl may travel that percentage of maxRot before hitting the damage zone.
                
                distFromSolve = Math.abs(pinRot - solveDeg) - solvePadding;
                distFromSolve = clamp(distFromSolve, maxDistFromSolve, 0);
                
                cylRotationAllowance = convertRanges(distFromSolve, 0, maxDistFromSolve, 1, 0.02); //oldval is distfromsolve, oldmin is....0? oldMax is maxDistFromSolve, newMin is 100 (we are at solve, so cyl may travel 100% of maxRot), newMax is 0 (we are at or beyond max dist from solve, so cyl may not travel at all - UPDATE - must give cyl just a teensy bit of travel so user isn't hammered);
                cylRotationAllowance = cylRotationAllowance * maxRot;
                
                cylRotationInterval = setInterval(function(){
                    cylRot += cylRotSpeed;
                    if (cylRot >= maxRot) {
                    cylRot = maxRot;
                    // do happy solvey stuff
                    clearInterval(cylRotationInterval);
                    unlock();
                    }
                    else if (cylRot >= cylRotationAllowance) {
                    cylRot = cylRotationAllowance;
                    // do sad pin-hurty stuff
                    damagePin();
                    }
                    
                    cyl.css({
                    transform: "rotateZ("+cylRot+"deg)"
                    });
                    driver.css({
                    transform: "rotateZ("+cylRot+"deg)"
                    });
                },keyRepeatRate);
            }

            function unpushCyl(){
                userPushingCyl = false;
                //set an interval based on keyrepeat that will rotate the cyl backward, and if cyl is at or past origin, set to origin and stop.
                clearInterval(cylRotationInterval);
                cylRotationInterval = setInterval(function(){
                    cylRot -= cylRotSpeed;
                    cylRot = Math.max(cylRot,0);
                    cyl.css({
                        transform: "rotateZ("+cylRot+"deg)"
                    })
                    driver.css({
                        transform: "rotateZ("+cylRot+"deg)"
                    })
                    if (cylRot <= 0) {
                        cylRot = 0;
                        clearInterval(cylRotationInterval);
                    }
                }, keyRepeatRate);
            }

            //PIN AND SOLVE EVENTS

            function damagePin() {
                if ( !pinLastDamaged || Date.now() - pinLastDamaged > pinDamageInterval) {
                    var tl = new TimelineLite();
                    pinHealth -= pinDamage;
                    // console.log('damagePin, pinHealth=',pinHealth)
                    pinLastDamaged = Date.now()
                    
                    //pin damage/lock jiggle animation
                    tl.to(pin, (pinDamageInterval/4)/1000, {
                        rotationZ: pinRot - 2
                    });
                    tl.to(pin, (pinDamageInterval/4)/1000, {
                        rotationZ: pinRot
                    });
                    if (pinHealth <= 0) {
                        breakPin();
                    }
                }
            }

            function breakPin() {
                var tl, pinTop,pinBott;
                gamePaused = true;
                clearInterval(cylRotationInterval);
                numPins--;
            $('span').text(numPins)
                pinTop = pin.find('.top');
                pinBott = pin.find('.bott');
                tl = new TimelineLite();
                tl.to(pinTop, 0.7, {
                        rotationZ: -400,
                        x: -200,
                        y: -100,
                        opacity: 0
                        });
                tl.to(pinBott, 0.7, {
                    rotationZ: 400,
                    x: 200,
                    y: 100,
                    opacity: 0,
                    onComplete: function(){
                        if (numPins > 0) {
                            gamePaused = false; 
                            reset();
                        }
                        else {
                            outOfPins();
                        }
                    }
                }, 0)
                tl.play();       
            }

            function reset() {
                //solveDeg = ( Math.random() * 180 ) - 90;
                cylRot = 0;
                pinHealth = 100;
                pinRot = 0;
                pin.css({
                    transform: "rotateZ("+pinRot+"deg)"
                })  
                cyl.css({
                    transform: "rotateZ("+cylRot+"deg)"
                })  
                driver.css({
                    transform: "rotateZ("+cylRot+"deg)"
                })  
                TweenLite.to(pin.find('.top'),0,{
                    rotationZ: 0,
                    x: 0,
                    y: 0,
                    opacity: 1
                });
                TweenLite.to(pin.find('.bott'),0,{
                    rotationZ: 0,
                    x: 0,
                    y: 0,
                    opacity: 1
                });
            }

            const outOfPins = () => {
                gameOver = true;
                this.sucess = 2;

                setTimeout(function() { 
                    this.sucess = 0;
                    this.SendToClient('CloseNui', {});
                }.bind(this), 1000);
            }

            const unlock = () => {
                gameOver = true;
                this.sucess = 1;
                
                setTimeout(function() { 
                    this.sucess = 0;
                    this.SendToClient('sucess', {});
                }.bind(this), 1000);
            }

            //UTIL
    
            function clamp(val,max,min) {
                return Math.min(Math.max(val, min), max);
            }
            function convertRanges(OldValue, OldMin, OldMax, NewMin, NewMax) {
                return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
            }
        },
    },

    // mounted() {
    //     gsap.registerPlugin(TweenLite);
    //     gsap.registerPlugin(TimelineLite);
    //     setTimeout(function() { 
    //         this.MountMinigame();
    //     }.bind(this), 100);
	// },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-weight: bold;
}

body {
    user-select: none;
}

#container {
    position:absolute;
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: hidden;
}

#cont_wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40vh;
    overflow: hidden;
}

#wrap {
    display: block;
    position: relative;
    width: 12%;
    margin: 0% auto;
    overflow: visible;
}

#collar {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
}
#cylinder {
    display: block;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/cylinder.png');
    background-size: cover;
    width: 69.914%;
    height: 69.914%;
    position: absolute;
    top: 14.9%;
    left: 15%;
}
#driver {
    display: block;
    width: 172.1739%;
    height: 84%;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/driver.png');
    background-size: cover;
    position: absolute;
    top: 57%;
    left: 46%;
    transform-origin: 3% -3%;
}
#pin {
    display: block;
    background-size: cover;
    width: 7.1304%;
    height: 146.4347%;
    position: absolute;
    left: 47.4%;
    top: -98%;
    transform-origin: 50% 99%;
}
#pin .top {
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/pinTop.png');
    background-size: cover;
}
#pin .bott {
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/pinBott.png');
    background-size: cover;
}
#sucess {
    text-align: center;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

div #sucess {
    margin-top: 15%;
    display: inline-block;
}

#sucess img{
    width: 10vh;
}

</style>

