/*!
 * Very Good Security
 * Show.js version 1.3
 * 1616175340951
 */!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=42)}({0:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},1:function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},2:function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},3:function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},4:function(t,e){function r(){return t.exports=r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},r.apply(this,arguments)}t.exports=r},42:function(t,e,r){"use strict";r.r(e);var n=r(5);Object(n.a)({tntmfo8fafa:"https://tntmfo8fafa.live.verygoodproxy.com",tntc4x4iymh:"https://tntc4x4iymh.sandbox.verygoodproxy.com",tnt0e7blhtx:"https://tnt0e7blhtx.sandbox.verygoodproxy.com"})},5:function(t,e,r){"use strict";r.d(e,"a",(function(){return U}));var n=r(4),o=r.n(n),a=r(1),i=r.n(a),s=r(0),c=r.n(s),u=r(2),f=r.n(u),l=r(3),p=r.n(l);function d(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"randomId",e=(new Date).getDate(),r="".concat(Math.random()).replace(/[^\w\d]/,"");return[t,e,r].join("")}function m(t,e){return Object.keys(t).filter((function(t){return e.indexOf(t)>=0})).reduce((function(e,r){return e[r]=t[r],e}),{})}function h(t,e){return Object.keys(t).filter((function(t){return-1===e.indexOf(t)})).reduce((function(e,r){return e[r]=t[r],e}),{})}var y=function(t){try{return btoa(t)}catch(t){throw"Unable to convert value to base64"}},b=function(t){var e,r,n=-1==(e=t.replace(/^https?:\/\//,"")).indexOf("verygoodproxy.");try{r=n?"cname":e.split(".")[1]}catch(t){r="unknown"}return r};function v(t){return"".concat("https://js.verygoodvault.com/vgs-show/1.3/lib","/index.html?").concat(function(t){var e="";function r(t,r){e.length>0&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(r)}return Object.keys(t).sort().forEach((function(e){var n=t[e];Array.isArray(n)?n.forEach((function(t){return r(e,t)})):r(e,n)})),e}(t))}var O=["formId","iframeId","name","env","vaultId","method","path","payload","headers","jsonPathSelector","responseDataType","htmlWrapper","decodeFromBase64","displayBase64Image","decodeDataFrom","xhrResponseType","text","serializers"];function g(t,e){var r,n=function(t){var e=document.createElement("iframe");return e.setAttribute("title","Secure Show.js frame"),e.setAttribute("src",v(t)),e.setAttribute("frameborder","0"),e.setAttribute("scrolling","0"),e.setAttribute("allowtransparency","true"),e.setAttribute("id",t.iframeId),e.setAttribute("name",t.name),e}(e);return("string"==typeof(r=t)||r instanceof String?document.querySelector(t):t).appendChild(n),n}function j(t,e){function r(r){r.data.messageName===t&&e(r.data.payload)}return window.addEventListener("message",r),r}function w(t,e){return j(t,(function(t){e(t)}))}function x(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function I(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?x(Object(r),!0).forEach((function(e){i()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var P={requests:{}},S=function(t){throw"Please specify ".concat(t,". This param is required.")},k={htmlWrapper:["image","text"],xhrResponseType:["arraybuffer","json"],decodeDataFrom:["base64"]},E=function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(k,e)&&-1===k[e].indexOf(t[e]))throw"Available values for ".concat(e,": ").concat(k[e]);return m(t,O)},A=function(t,e){var r=m(e,["method","path","payload","xhrResponseType"]),n=Object.keys(P.requests).filter((function(t){return function t(e,r){if(e===r)return!0;if(!("object"==c()(e)&&null!=e&&"object"==c()(r)&&null!=r)||Object.keys(e).length!==Object.keys(r).length)return!1;var n=!0;for(var o in e)Object.prototype.hasOwnProperty.call(r,o)&&t(e[o],r[o])||(n=!1);return n}(h(P.requests[t],["jsonPathSelector"]),r)}));if(n.length)return n[0];P.requests[t]=r},D=function(){function t(e){var r=this;f()(this,t),this.iframe=null,this.frames=[],this.iframeId=d(),this.params=e,j("frameReady",(function(t){t.iframeId===r.iframeId&&r._postMessage({messageName:"setProperties",params:r.params})}))}return p()(t,[{key:"render",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.params,n=r.formId,o=r.name,a=r.vaultId,i=r.vaultUrl,s=r.type,u=this.params.serializers;if(e&&"object"!==c()(e))throw"styles argument should be type of Object!";if(u)try{u=window.btoa(JSON.stringify(u))}catch(t){throw new Error("Unable to parse serializers")}var f={formId:n,name:o,serializers:u,type:s,iframeId:this.iframeId,vaultId:y(a),env:y(b(i))},l=A(this.iframeId,this.params);return l&&(f.dependsOn=l),Object.keys(f).forEach((function(t){return void 0===f[t]&&delete f[t]})),this.params=I({},this.params,{styles:e}),this.iframe=g(t,f),this.frames.push(this.iframe),this}},{key:"_postMessage",value:function(t){this.iframe.contentWindow.postMessage(t,"*")}}]),t}(),T=function(){function t(e,r,n){var a=this;f()(this,t),this.vaultUrl=r,this.vaultId=e,this.formId=d(),this.state={},this.frames=[],this.SERIALIZERS={replace:function(t,e,r){return{name:"replace",options:{old:t,new:e,count:r}}}},function(t){j("update",t)}((function(t){t.formId===a.formId&&(t=h(t,"formId"),a.state=o()({},a.state,i()({},t.name,t)),n&&n(a.state))}))}return p()(t,[{key:"request",value:function(t){var e=t,r=e.method,n=void 0===r?S("method"):r,o=e.path,a=void 0===o?S("path"):o,i=e.name,s=void 0===i?S("name"):i;if(t.responseDataType&&(t.htmlWrapper=t.responseDataType),t.decodeFromBase64&&(t.displayBase64Image=t.decodeFromBase64),t.htmlWrapper=t.htmlWrapper||"text",t=E(t),n&&a&&s)return new D(I({},t,{vaultUrl:this.vaultUrl,vaultId:this.vaultId,formId:this.formId}))}},{key:"copyFrom",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{text:"Copy",serializers:!1},r=arguments.length>2?arguments[2]:void 0,n="";if(!t)throw new Error("Please specify target field for the copy button.");if("text"!==t.params.htmlWrapper)throw new Error("Copy option available only for the text content.");if(r&&w(n=d("copyCallback"),r),e=E(e),t.params.formId===this.formId)return new D(I({},e,{name:"show-js-copy-button",type:"copy-button",htmlWrapper:"button",callbackId:n,targetId:t.iframeId,vaultUrl:this.vaultUrl,vaultId:this.vaultId,formId:this.formId}))}}]),t}();function U(t){window.VGSShow={create:function(e,r){if(-1===Object.keys(t).indexOf(e))throw"Environment '".concat(e,"' does not exist. Valid choices are: ").concat(Object.keys(t).join(","));return new T(e,t[e],r)}}}}});