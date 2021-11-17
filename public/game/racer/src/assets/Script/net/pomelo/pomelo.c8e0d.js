function require(e,o,r){var t=require.resolve(e);if(null==t){r=r||e,o=o||"root";var n=new Error('Failed to require "'+r+'" from "'+o+'"');throw n.path=r,n.parent=o,n.require=!0,n}var i=require.modules[t];if(!i._resolving&&!i.exports){var s={exports:{}};s.client=s.component=!0,i._resolving=!0,i.call(this,s.exports,require.relative(t),s),delete i._resolving,i.exports=s.exports}return i.exports}require.modules={},require.aliases={},require.resolve=function(e){"/"===e.charAt(0)&&(e=e.slice(1));for(var o=[e,e+".js",e+".json",e+"/index.js",e+"/index.json"],r=0;r<o.length;r++){e=o[r];if(require.modules.hasOwnProperty(e))return e;if(require.aliases.hasOwnProperty(e))return require.aliases[e]}},require.normalize=function(e,o){var r=[];if("."!=o.charAt(0))return o;e=e.split("/"),o=o.split("/");for(var t=0;t<o.length;++t)".."==o[t]?e.pop():"."!=o[t]&&""!=o[t]&&r.push(o[t]);return e.concat(r).join("/")},require.register=function(e,o){require.modules[e]=o},require.alias=function(e,o){if(!require.modules.hasOwnProperty(e))throw new Error('Failed to alias "'+e+'", it does not exist');require.aliases[o]=e},require.relative=function(e){var o=require.normalize(e,"..");function r(e,o){for(var r=e.length;r--;)if(e[r]===o)return r;return-1}function t(o){return require(t.resolve(o),e,o)}return t.resolve=function(t){var n=t.charAt(0);if("/"==n)return t.slice(1);if("."==n)return require.normalize(o,t);var i=e.split("/"),s=r(i,"deps")+1;return s||(s=0),t=i.slice(0,s+1).join("/")+"/deps/"+t},t.exists=function(e){return require.modules.hasOwnProperty(t.resolve(e))},t},require.register("component-emitter/index.js",function(e,o,r){function t(e){if(e)return n(e)}function n(e){for(var o in t.prototype)e[o]=t.prototype[o];return e}r.exports=t,t.prototype.on=t.prototype.addEventListener=function(e,o){return this._callbacks=this._callbacks||{},(this._callbacks[e]=this._callbacks[e]||[]).push(o),this},t.prototype.once=function(e,o){var r=this;function t(){r.off(e,t),o.apply(this,arguments)}return this._callbacks=this._callbacks||{},t.fn=o,this.on(e,t),this},t.prototype.off=t.prototype.removeListener=t.prototype.removeAllListeners=t.prototype.removeEventListener=function(e,o){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r,t=this._callbacks[e];if(!t)return this;if(1==arguments.length)return delete this._callbacks[e],this;for(var n=0;n<t.length;n++)if((r=t[n])===o||r.fn===o){t.splice(n,1);break}return this},t.prototype.emit=function(e){this._callbacks=this._callbacks||{};var o=[].slice.call(arguments,1),r=this._callbacks[e];if(r)for(var t=0,n=(r=r.slice(0)).length;t<n;++t)r[t].apply(this,o);return this},t.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[e]||[]},t.prototype.hasListeners=function(e){return!!this.listeners(e).length}}),require.register("NetEase-pomelo-protocol/lib/protocol.js",function(e,o,r){(function(e,o,t){var n=e,i=n.Package={},s=n.Message={};i.TYPE_HANDSHAKE=1,i.TYPE_HANDSHAKE_ACK=2,i.TYPE_HEARTBEAT=3,i.TYPE_DATA=4,i.TYPE_KICK=5,s.TYPE_REQUEST=0,s.TYPE_NOTIFY=1,s.TYPE_RESPONSE=2,s.TYPE_PUSH=3,n.strencode=function(e){for(var r=new o(3*e.length),t=0,n=0;n<e.length;n++){var i=e.charCodeAt(n),s=null;s=i<=127?[i]:i<=2047?[192|i>>6,128|63&i]:[224|i>>12,128|(4032&i)>>6,128|63&i];for(var c=0;c<s.length;c++)r[t]=s[c],++t}var u=new o(t);return l(u,0,r,0,t),u},n.strdecode=function(e){for(var r=new o(e),t=[],n=0,i=0,s=r.length;n<s;)r[n]<128?(i=r[n],n+=1):r[n]<224?(i=((63&r[n])<<6)+(63&r[n+1]),n+=2):(i=((15&r[n])<<12)+((63&r[n+1])<<6)+(63&r[n+2]),n+=3),t.push(i);return String.fromCharCode.apply(null,t)},i.encode=function(e,r){var t=r?r.length:0,n=new o(4+t),i=0;return n[i++]=255&e,n[i++]=t>>16&255,n[i++]=t>>8&255,n[i++]=255&t,r&&l(n,i,r,0,t),n},i.decode=function(e){for(var r=0,t=new o(e),n=0,i=[];r<t.length;){var s=t[r++],c=(n=(t[r++]<<16|t[r++]<<8|t[r++])>>>0)?new o(n):null;l(c,0,t,r,n),r+=n,i.push({type:s,body:c})}return 1===i.length?i[0]:i},s.encode=function(e,r,t,i,s){var l=1+(c(r)?a(e):0);if(u(r))if(t){if("number"!=typeof i)throw new Error("error flag for number route!");l+=2}else if(l+=1,i){if((i=n.strencode(i)).length>255)throw new Error("route maxlength is overflow");l+=i.length}s&&(l+=s.length);var h=new o(l),b=0;return b=f(r,t,h,b),c(r)&&(b=d(e,h,b)),u(r)&&(b=p(t,i,h,b)),s&&(b=v(s,h,b)),h},s.decode=function(e){var r=new o(e),t=r.length||r.byteLength,i=0,s=0,a=null,f=r[i++],d=1&f,p=f>>1&7;if(c(p)){var v=parseInt(r[i]),h=0;do{s+=(127&(v=parseInt(r[i])))*Math.pow(2,7*h),i++,h++}while(v>=128)}if(u(p))if(d)a=r[i++]<<8|r[i++];else{var b=r[i++];b?(a=new o(b),l(a,0,r,i,b),a=n.strdecode(a)):a="",i+=b}var w=t-i,y=new o(w);return l(y,0,r,i,w),{id:s,type:p,compressRoute:d,route:a,body:y}};var l=function(e,o,r,t,n){if("function"==typeof r.copy)r.copy(e,o,t,t+n);else for(var i=0;i<n;i++)e[o++]=r[t++]},c=function(e){return e===s.TYPE_REQUEST||e===s.TYPE_RESPONSE},u=function(e){return e===s.TYPE_REQUEST||e===s.TYPE_NOTIFY||e===s.TYPE_PUSH},a=function(e){var o=0;do{o+=1,e>>=7}while(e>0);return o},f=function(e,o,r,t){if(e!==s.TYPE_REQUEST&&e!==s.TYPE_NOTIFY&&e!==s.TYPE_RESPONSE&&e!==s.TYPE_PUSH)throw new Error("unkonw message type: "+e);return r[t]=e<<1|(o?1:0),t+1},d=function(e,o,r){do{var t=e%128,n=Math.floor(e/128);0!==n&&(t+=128),o[r++]=t,e=n}while(0!==e);return r},p=function(e,o,r,t){if(e){if(o>65535)throw new Error("route number is overflow");r[t++]=o>>8&255,r[t++]=255&o}else o?(r[t++]=255&o.length,l(r,t,o,0,o.length),t+=o.length):r[t++]=0;return t},v=function(e,o,r){return l(o,r,e,0,e.length),r+e.length};r.exports=n,"undefined"!=typeof window&&(window.Protocol=n)})("undefined"==typeof window?r.exports:e,"undefined"==typeof window?Buffer:Uint8Array)}),require.register("pomelonode-pomelo-protobuf/lib/client/protobuf.js",function(e,o,r){(function(e,o){var t=e;t.init=function(e){t.encoder.init(e.encoderProtos),t.decoder.init(e.decoderProtos)},t.encode=function(e,o){return t.encoder.encode(e,o)},t.decode=function(e,o){return t.decoder.decode(e,o)},r.exports=t,"undefined"!=typeof window&&(window.protobuf=t)})("undefined"==typeof window?r.exports:e),(("undefined"!=typeof protobuf?protobuf:r.exports).constants={}).TYPES={uInt32:0,sInt32:0,int32:0,double:1,string:2,message:2,float:5},(("undefined"!=typeof protobuf?protobuf:r.exports).util={}).isSimpleType=function(e){return"uInt32"===e||"sInt32"===e||"int32"===e||"uInt64"===e||"sInt64"===e||"float"===e||"double"===e},function(e,o){var t=("undefined"!==typeof protobuf?protobuf:r.exports).codec={},n=new ArrayBuffer(8),i=new Float32Array(n),s=new Float64Array(n),l=new Uint8Array(n);function c(e){return e<=127?[e]:e<=2047?[192|e>>6,128|63&e]:[224|e>>12,128|(4032&e)>>6,128|63&e]}function u(e){return e<=127?1:e<=2047?2:3}t.encodeUInt32=function(e){e=parseInt(e);if(isNaN(e)||e<0)return null;var o=[];do{var r=e%128,t=Math.floor(e/128);0!==t&&(r+=128),o.push(r),e=t}while(0!==e);return o},t.encodeSInt32=function(e){e=parseInt(e);return isNaN(e)?null:(e=e<0?2*Math.abs(e)-1:2*e,t.encodeUInt32(e))},t.decodeUInt32=function(e){for(var o=0,r=0;r<e.length;r++){var t=parseInt(e[r]);if(o+=(127&t)*Math.pow(2,7*r),t<128)return o}return o},t.decodeSInt32=function(e){var o=this.decodeUInt32(e);return o=(o%2+o)/2*(o%2==1?-1:1)},t.encodeFloat=function(e){return i[0]=e,l},t.decodeFloat=function(e,o){if(!e||e.length<o+4)return null;for(var r=0;r<4;r++)l[r]=e[o+r];return i[0]},t.encodeDouble=function(e){return s[0]=e,l.subarray(0,8)},t.decodeDouble=function(e,o){if(!e||e.length<o+8)return null;for(var r=0;r<8;r++)l[r]=e[o+r];return s[0]},t.encodeStr=function(e,o,r){for(var t=0;t<r.length;t++)for(var n=c(r.charCodeAt(t)),i=0;i<n.length;i++)e[o]=n[i],o++;return o},t.decodeStr=function(e,o,r){for(var t=[],n=o+r;o<n;){var i=0;e[o]<128?(i=e[o],o+=1):e[o]<224?(i=((63&e[o])<<6)+(63&e[o+1]),o+=2):(i=((15&e[o])<<12)+((63&e[o+1])<<6)+(63&e[o+2]),o+=3),t.push(i)}for(var s="",l=0;l<t.length;)s+=String.fromCharCode.apply(null,t.slice(l,l+1e4)),l+=1e4;return s},t.byteLength=function(e){if("string"!=typeof e)return-1;for(var o=0,r=0;r<e.length;r++){o+=u(e.charCodeAt(r))}return o}}(),function(e,o){var r=e,t=e.encoder={},n=r.codec,i=r.constants,s=r.util;function l(e,o){if(!o)return!1;for(var r in o){var n=o[r];switch(n.option){case"required":if(void 0===e[r])return console.warn("no property exist for required! name: %j, proto: %j, msg: %j",r,n,e),!1;case"optional":if(void 0!==e[r])if((i=o.__messages[n.type]||t.protos["message "+n.type])&&!l(e[r],i))return console.warn("inner proto error! name: %j, proto: %j, msg: %j",r,n,e),!1;break;case"repeated":var i=o.__messages[n.type]||t.protos["message "+n.type];if(e[r]&&i)for(var s=0;s<e[r].length;s++)if(!l(e[r][s],i))return!1}}return!0}function c(e,o,r,t){for(var n in t)if(r[n]){var i=r[n];switch(i.option){case"required":case"optional":o=f(e,o,d(i.type,i.tag)),o=u(t[n],i.type,o,e,r);break;case"repeated":t[n].length>0&&(o=a(t[n],i,o,e,r))}}return o}function u(e,o,r,i,s){switch(o){case"uInt32":r=f(i,r,n.encodeUInt32(e));break;case"int32":case"sInt32":r=f(i,r,n.encodeSInt32(e));break;case"float":f(i,r,n.encodeFloat(e)),r+=4;break;case"double":f(i,r,n.encodeDouble(e)),r+=8;break;case"string":var l=n.byteLength(e);r=f(i,r,n.encodeUInt32(l)),n.encodeStr(i,r,e),r+=l;break;default:var u=s.__messages[o]||t.protos["message "+o];if(u){var a=new ArrayBuffer(2*n.byteLength(JSON.stringify(e)));l=c(a,l=0,u,e),r=f(i,r,n.encodeUInt32(l));for(var d=0;d<l;d++)i[r]=a[d],r++}}return r}function a(e,o,r,t,i){var l=0;if(s.isSimpleType(o.type))for(r=f(t,r=f(t,r,d(o.type,o.tag)),n.encodeUInt32(e.length)),l=0;l<e.length;l++)r=u(e[l],o.type,r,t);else for(l=0;l<e.length;l++)r=f(t,r,d(o.type,o.tag)),r=u(e[l],o.type,r,t,i);return r}function f(e,o,r){for(var t=0;t<r.length;t++,o++)e[o]=r[t];return o}function d(e,o){var r=i.TYPES[e]||2;return n.encodeUInt32(o<<3|r)}t.init=function(e){this.protos=e||{}},t.encode=function(e,o){var r=this.protos[e];if(!l(o,r))return null;var t=n.byteLength(JSON.stringify(o)),i=new ArrayBuffer(t),s=new Uint8Array(i),u=0;return r&&(u=c(s,u,r,o))>0?s.subarray(0,u):null}}("undefined"!=typeof protobuf?protobuf:r.exports),function(e,o){var r,t=e,n=e.decoder={},i=t.codec,s=t.util,l=0;function c(e,o,r){for(;l<r;){var t=u(),n=(t.type,t.tag),i=o.__tags[n];switch(o[i].option){case"optional":case"required":e[i]=a(o[i].type,o);break;case"repeated":e[i]||(e[i]=[]),f(e[i],o[i].type,o)}}return e}function u(){var e=i.decodeUInt32(d());return{type:7&e,tag:e>>3}}function a(e,o){switch(e){case"uInt32":return i.decodeUInt32(d());case"int32":case"sInt32":return i.decodeSInt32(d());case"float":var t=i.decodeFloat(r,l);return l+=4,t;case"double":var s=i.decodeDouble(r,l);return l+=8,s;case"string":var u=i.decodeUInt32(d()),a=i.decodeStr(r,l,u);return l+=u,a;default:var f=o&&(o.__messages[e]||n.protos["message "+e]);if(f){u=i.decodeUInt32(d());var p={};return c(p,f,l+u),p}}}function f(e,o,r){if(s.isSimpleType(o))for(var t=i.decodeUInt32(d()),n=0;n<t;n++)e.push(a(o));else e.push(a(o,r))}function d(e){var o,t=[],n=l;e=e||!1;do{o=r[n],t.push(o),n++}while(o>=128);return e||(l=n),t}n.init=function(e){this.protos=e||{}},n.setProtos=function(e){e&&(this.protos=e)},n.decode=function(e,o){var t=this.protos[e];return r=o,l=0,t?c({},t,r.length):null}}("undefined"!=typeof protobuf?protobuf:r.exports)}),require.register("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js",function(e,o,r){(function(){var e=window.Protocol,o=window.protobuf,t=window.decodeIO_protobuf,n=null,i=null,s=e.Package,l=e.Message,c=window.EventEmitter,u=window.rsa;"undefined"!=typeof window&&"undefined"!=typeof sys&&sys.localStorage&&(window.localStorage=sys.localStorage);"function"!=typeof Object.create&&(Object.create=function(e){function o(){}return o.prototype=e,new o});var a=window,f=Object.create(c.prototype);a.pomelo=f;var d,p=null,v=0,h={},b={},w={},y={},m={},g={},E={},_=0,T=0,S=0,j=0,P=null,k=null,q=null,I=null,A=null,x=!1,Y=null,N=null,O=0,U=5e3,H={sys:{type:"js-websocket",version:"0.0.1",rsa:{}},user:{}},D=null;f.init=function(e,o){D=o;var r=e.host,t=e.port,n=e.ssl;A=e.encode||R,I=e.decode||J;var i=(n?"wss://":"ws://")+r;if(t&&(i+=":"+t),H.user=e.user,e.encrypt){d=!0,u.generate(1024,"10001");var s={rsa_n:u.n.toString(16),rsa_e:u.e};H.sys.rsa=s}q=e.handshakeCallback,C(e,i,o)};var J=f.decode=function(e){var o=l.decode(e);if(!(o.id>0)||(o.route=w[o.id],delete w[o.id],o.route))return o.body=z(o),o},R=f.encode=function(r,t,i){var s=r?l.TYPE_REQUEST:l.TYPE_NOTIFY;if(o&&E[t])i=o.encode(t,i);else if(n&&n.lookup(t)){i=new(n.build(t))(i).encodeNB()}else i=e.strencode(JSON.stringify(i));var c=0;return y&&y[t]&&(t=y[t],c=1),l.encode(r,s,c,t,i)},C=function(r,l,c){console.log("connect to "+l);var u=(r=r||{}).maxReconnectAttempts||10;if(N=l,window.localStorage&&window.localStorage.getItem("protos")&&0===_){var a=JSON.parse(window.localStorage.getItem("protos"));_=a.version||0,g=a.server||{},E=a.client||{},o&&o.init({encoderProtos:E,decoderProtos:g}),t&&(n=t.loadJson(E),i=t.loadJson(g))}H.sys.protoVersion=_;(p=new WebSocket(l)).binaryType="arraybuffer",p.onopen=function(o){x&&f.emit("reconnect"),F();var r=s.encode(s.TYPE_HANDSHAKE,e.strencode(JSON.stringify(H)));L(r)},p.onmessage=function(e){M(s.decode(e.data),c),S&&(j=Date.now()+S)},p.onerror=function(e){f.emit("io-error",e),console.error("socket error: ",e)},p.onclose=function(e){f.emit("close",e),f.emit("disconnect",e),console.error("socket close: ",e),r.reconnect&&O<u&&(x=!0,O++,Y=setTimeout(function(){C(r,N,c)},U),U*=2)}};f.disconnect=function(){p&&(p.disconnect&&p.disconnect(),p.close&&p.close(),console.log("disconnect"),p=null),P&&(clearTimeout(P),P=null),k&&(clearTimeout(k),k=null)};var F=function(){x=!1,U=5e3,O=0,clearTimeout(Y)};f.request=function(e,o,r){2===arguments.length&&"function"==typeof o?(r=o,o={}):o=o||{},(e=e||o.route)&&(K(++v,e,o),h[v]=r,w[v]=e)},f.notify=function(e,o){K(0,e,o=o||{})};var K=function(e,o,r){if(d){r=JSON.stringify(r);var t=u.signString(r,"sha256");(r=JSON.parse(r)).__crypto__=t}A&&(r=A(e,o,r));var n=s.encode(s.TYPE_DATA,r);L(n)},L=function(e){p.send(e.buffer)},B=function(){var e=j-Date.now();e>100?k=setTimeout(B,e):(console.error("server heartbeat timeout"),f.emit("heartbeat timeout"),f.disconnect())};b[s.TYPE_HANDSHAKE]=function(o){if(501!==(o=JSON.parse(e.strdecode(o))).code)if(200===o.code){V(o);var r=s.encode(s.TYPE_HANDSHAKE_ACK);L(r),D&&D(p)}else f.emit("error","handshake fail");else f.emit("error","client version not fullfill")},b[s.TYPE_HEARTBEAT]=function(e){if(T){var o=s.encode(s.TYPE_HEARTBEAT);k&&(clearTimeout(k),k=null),P||(P=setTimeout(function(){P=null,L(o),j=Date.now()+S,k=setTimeout(B,S)},T))}},b[s.TYPE_DATA]=function(e){var o=e;I&&(o=I(o)),Q(f,o)},b[s.TYPE_KICK]=function(o){o=JSON.parse(e.strdecode(o)),f.emit("onKick",o)};var M=function(e){if(Array.isArray(e))for(var o=0;o<e.length;o++){var r=e[o];b[r.type](r.body)}else b[e.type](e.body)},Q=function(e,o){if(o.id){var r=h[o.id];delete h[o.id],"function"==typeof r&&r(o.body)}else e.emit(o.route,o.body)},z=function(r){var t=r.route;if(r.compressRoute){if(!m[t])return{};t=r.route=m[t]}return o&&g[t]?o.decode(t,r.body):i&&i.lookup(t)?i.build(t).decode(r.body):JSON.parse(e.strdecode(r.body))},V=function(e){e.sys&&e.sys.heartbeat?(T=1e3*e.sys.heartbeat,S=2*T):(T=0,S=0),W(e),"function"==typeof q&&q(e.user)},W=function(e){if(e&&e.sys){y=e.sys.dict;var r=e.sys.protos;if(y)for(var s in m={},y=y)m[y[s]]=s;r&&(_=r.version||0,g=r.server||{},E=r.client||{},window.localStorage.setItem("protos",JSON.stringify(r)),o&&o.init({encoderProtos:r.client,decoderProtos:r.server}),t&&(n=t.loadJson(E),i=t.loadJson(g)))}};r.exports=f})()}),require.register("boot/index.js",function(e,o,r){var t=o("emitter");window.EventEmitter||(window.EventEmitter=t);var n=o("pomelo-protocol");window.Protocol||(window.Protocol=n);var i=o("pomelo-protobuf");window.protobuf||(window.protobuf=i);var s=o("pomelo-jsclient-websocket");window.pomelo||(window.pomelo=s)}),require.alias("boot/index.js","pomelo-client/deps/boot/index.js"),require.alias("boot/index.js","boot/index.js"),require.alias("component-emitter/index.js","boot/deps/emitter/index.js"),require.alias("NetEase-pomelo-protocol/lib/protocol.js","boot/deps/pomelo-protocol/lib/protocol.js"),require.alias("NetEase-pomelo-protocol/lib/protocol.js","boot/deps/pomelo-protocol/index.js"),require.alias("NetEase-pomelo-protocol/lib/protocol.js","NetEase-pomelo-protocol/index.js"),require.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js","boot/deps/pomelo-protobuf/lib/client/protobuf.js"),require.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js","boot/deps/pomelo-protobuf/index.js"),require.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js","pomelonode-pomelo-protobuf/index.js"),require.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js","boot/deps/pomelo-jsclient-websocket/lib/pomelo-client.js"),require.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js","boot/deps/pomelo-jsclient-websocket/index.js"),require.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js","pomelonode-pomelo-jsclient-websocket/index.js"),require("boot/index.js");