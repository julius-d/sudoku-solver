(this["webpackJsonpsudoku-solver"]=this["webpackJsonpsudoku-solver"]||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a,o=n(0),r=n.n(o),c=n(4),i=n.n(c),l=(n(16),n(1)),u=n(5),s=n(6),d=n(9),m=n(7),f=n(2),_=n(10),b=(n(17),n(8)),h=n.n(b);!function(e){e[e.CANT_BE=0]="CANT_BE",e[e.NUMBER_FOUND=1]="NUMBER_FOUND"}(a||(a={}));var v=a;var p=r.a.memo((function(e){var t=e.rowNumber,n=e.colNumber,a=e.foundNumber,o=e.cantBes,c=e.handleChange,i=e.fieldName,l=e.numberFoundBy,u=function(e,t){var n="";return e%3===0&&(n+="strong-border-top "),(e+1)%3===0&&(n+="strong-border-bottom "),(t+1)%3===0&&(n+="strong-border-right "),t%3===0&&(n+="strong-border-left "),n}(t,n),s="USER"===l;return r.a.createElement("td",{className:"tg-0lax ".concat(u," ").concat(a&&!s?"highlight":"")},a?r.a.createElement("div",{style:{fontSize:24,fontWeight:s?"bold":"normal"}},a):r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{type:"text",pattern:"[0-9]*",inputMode:"numeric",maxLength:1,size:1,name:i,value:"",onChange:c,autoComplete:"sudoku"}),r.a.createElement("br",null),r.a.createElement("s",null,o.join(" "))))})),g=function(e){function t(e){var n;Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){var e=Object(f.a)(n);n.worker=new h.a,n.worker.onmessage=function(t){console.log("Message received from worker",t);var n=t.data.position.xCoordinate,a=t.data.position.yCoordinate,o=t.data.number,r=t.data.type;if(r===v.CANT_BE){var c="field_".concat(n,"_").concat(a,"_not");e.setState((function(e){var t,n=e[c];return t=n.includes(o)?n:n.concat([o]).sort(),Object(l.a)({},c,t)}))}else if(r===v.NUMBER_FOUND){var i="field_".concat(n,"_").concat(a);if(!e.state[i]){var u,s="field_".concat(n,"_").concat(a,"_found_by");e.setState((u={},Object(l.a)(u,i,o),Object(l.a)(u,s,t.data.from),u))}}}},n.state={};for(var a=0;a<9;a++)for(var o=0;o<9;o++){var r="field_".concat(a,"_").concat(o,"_not");n.state[r]=[]}return n.handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(_.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){var t,n=e.target,a=parseInt(n.value,10),o=n.name,r=o+"_found_by";a>=1&&a<=9&&(this.state[o+"_not"].includes(a)||(this.setState((t={},Object(l.a)(t,o,a),Object(l.a)(t,r,"USER"),t)),this.worker.postMessage({eventType:"NUMBER_PROVIDED",value:a,field:o.replace("field_","").split("_").map((function(e){return parseInt(e)}))})))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("table",{className:"tg"},r.a.createElement("tbody",null,[0,1,2,3,4,5,6,7,8].map((function(t){return r.a.createElement("tr",{key:"row_".concat(t)},[0,1,2,3,4,5,6,7,8].map((function(n){return r.a.createElement(p,{key:"field_".concat(t,"_").concat(n),rowNumber:t,colNumber:n,cantBes:e.state["field_".concat(t,"_").concat(n,"_not")],foundNumber:e.state["field_".concat(t,"_").concat(n)],fieldName:"field_".concat(t,"_").concat(n),numberFoundBy:e.state["field_".concat(t,"_").concat(n,"_found_by")],handleChange:e.handleChange})})))})))))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports=function(){return new Worker(n.p+"f8b40c5e6003c6e4cc36.worker.js")}}},[[11,1,2]]]);
//# sourceMappingURL=main.95e57885.chunk.js.map