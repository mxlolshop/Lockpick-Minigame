(function(t){function e(e){for(var o,s,a=e[0],c=e[1],u=e[2],f=0,l=[];f<a.length;f++)s=a[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&l.push(r[s][0]),r[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);d&&d(e);while(l.length)l.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},r={app:0},i=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.NuiOpen?n("div",{style:t.position_nui,attrs:{id:"container"}},[n("div",{attrs:{id:"cont_wrap"}},[t._m(0),t.sucess>0?n("div",{attrs:{id:"sucess"}},[1==t.sucess?n("img",{attrs:{src:"img/check.png"}}):t._e(),2==t.sucess?n("img",{attrs:{src:"img/clear.png"}}):t._e()]):t._e()])]):t._e()},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"wrap"}},[n("img",{attrs:{src:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/collar.png",alt:"",id:"collar"}}),n("div",{attrs:{id:"cylinder"}}),n("div",{attrs:{id:"driver"}}),n("div",{attrs:{id:"pin"}},[n("div",{staticClass:"top"}),n("div",{staticClass:"bott"})])])}],s=(n("99af"),n("7db0"),n("1157")),a=n.n(s),c=(n("5b52"),n("cffa")),u=n("a5cf"),d=n("bc3a"),f=n.n(d),l={name:"",components:{},data:function(){return{NuiOpen:!1,NameResource:"",position_nui:"width: 100vh; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(1);",sucess:0}},created:function(){window.addEventListener("message",this.receiveLua),window.addEventListener("keydown",this.keyPress)},destroyed:function(){window.removeEventListener("message",this.receiveLua),window.removeEventListener("keydown",this.keyPress)},methods:{SendToClient:function(t,e){f.a.post("https://".concat(this.NameResource,"/").concat(t),e).catch((function(e){return console.log("An error occurred in: ".concat(t," , ").concat(e))}))},keyPress:function(t){var e=t.key;"Escape"!=e&&"Backspace"!=e||this.SendToClient("CloseNui",{})},receiveLua:function(t){if(t&&t.data){var e=t.data;"ui"==e.ui&&(this.NuiOpen=e.NuiOpen,this.NameResource=e.NameResource,e.NuiOpen&&(this.position_nui="left: "+e.x+"; top: "+e.y+"; transform: translate(-"+e.x+", -"+e.y+") scale("+e.scale+");",c["a"].registerPlugin(u["d"]),c["a"].registerPlugin(u["c"]),setTimeout(function(){this.MountMinigame()}.bind(this),100)))}},MountMinigame:function(){var t,e,n,o,r,i=this,s=-90,c=90,d=180*Math.random()-90,f=4,l=45,p=0,v=0,y=0,m=2,h=25,g=3,b=20,w=100,k=150,C=2,_=!1,O=!1,x=!1;function Z(){var t,r;clearInterval(o),_=!0,t=Math.abs(p-d)-f,t=S(t,l,0),r=E(t,0,l,1,.02),r*=c,o=setInterval((function(){v+=g,v>=c?(v=c,clearInterval(o),L()):v>=r&&(v=r,P()),e.css({transform:"rotateZ("+v+"deg)"}),n.css({transform:"rotateZ("+v+"deg)"})}),h)}function M(){_=!1,clearInterval(o),o=setInterval((function(){v-=g,v=Math.max(v,0),e.css({transform:"rotateZ("+v+"deg)"}),n.css({transform:"rotateZ("+v+"deg)"}),v<=0&&(v=0,clearInterval(o))}),h)}function P(){if(!r||Date.now()-r>k){var e=new u["c"];w-=b,r=Date.now(),e.to(t,k/4/1e3,{rotationZ:p-2}),e.to(t,k/4/1e3,{rotationZ:p}),w<=0&&N()}}function N(){var e,n,r;x=!0,clearInterval(o),C--,a()("span").text(C),n=t.find(".top"),r=t.find(".bott"),e=new u["c"],e.to(n,.7,{rotationZ:-400,x:-200,y:-100,opacity:0}),e.to(r,.7,{rotationZ:400,x:200,y:100,opacity:0,onComplete:function(){C>0?(x=!1,j()):T()}},0),e.play()}function j(){v=0,w=100,p=0,t.css({transform:"rotateZ("+p+"deg)"}),e.css({transform:"rotateZ("+v+"deg)"}),n.css({transform:"rotateZ("+v+"deg)"}),u["d"].to(t.find(".top"),0,{rotationZ:0,x:0,y:0,opacity:1}),u["d"].to(t.find(".bott"),0,{rotationZ:0,x:0,y:0,opacity:1})}a()((function(){t=a()("#pin"),e=a()("#cylinder"),n=a()("#driver"),a()("body").on("mousemove",(function(e){if(y&&!O&&!x){var n=(e.clientX-y)/m;p+=n,p=S(p,c,s),t.css({transform:"rotateZ("+p+"deg)"})}y=e.clientX})),a()("body").on("mouseleave",(function(){y=0})),a()("body").on("keydown",(function(t){87!=t.keyCode&&65!=t.keyCode&&83!=t.keyCode&&68!=t.keyCode&&37!=t.keyCode&&39!=t.keyCode||_||O||x||Z()})),a()("body").on("keyup",(function(t){87!=t.keyCode&&65!=t.keyCode&&83!=t.keyCode&&68!=t.keyCode&&37!=t.keyCode&&39!=t.keyCode||O||M()})),a()("body").on("touchstart",(function(t){t.touchList&&t.touchList}))}));var T=function(){O=!0,i.sucess=2,setTimeout(function(){this.sucess=0,this.SendToClient("CloseNui",{})}.bind(i),1e3)},L=function(){O=!0,i.sucess=1,setTimeout(function(){this.sucess=0,this.SendToClient("sucess",{})}.bind(i),1e3)};function S(t,e,n){return Math.min(Math.max(t,n),e)}function E(t,e,n,o,r){return(t-e)*(r-o)/(n-e)+o}}}},p=l,v=(n("034f"),n("2877")),y=Object(v["a"])(p,r,i,!1,null,null,null),m=y.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(m)}}).$mount("#app")},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.77ca0b9c.js.map