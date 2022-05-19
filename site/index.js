import{a as u,b as c,c as _,d as v,e as g,f as w,g as U,h as S,i as F,j as O}from"./chunk-XIKEZXWT.js";var Y,m,W,V=0,Z=[],B=u.__b,j=u.__r,z=u.diffed,q=u.__c,G=u.unmount;function me(e,t){u.__h&&u.__h(m,e,V||t),V=0;var r=m.__H||(m.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function N(e,t){var r=me(Y++,3);!u.__s&&ge(r.__H,t)&&(r.__=e,r.__H=t,m.__H.__h.push(r))}function ve(){for(var e;e=Z.shift();)if(e.__P)try{e.__H.__h.forEach(A),e.__H.__h.forEach(M),e.__H.__h=[]}catch(t){e.__H.__h=[],u.__e(t,e.__v)}}u.__b=function(e){m=null,B&&B(e)},u.__r=function(e){j&&j(e),Y=0;var t=(m=e.__c).__H;t&&(t.__h.forEach(A),t.__h.forEach(M),t.__h=[])},u.diffed=function(e){z&&z(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(Z.push(t)!==1&&W===u.requestAnimationFrame||((W=u.requestAnimationFrame)||function(r){var n,i=function(){clearTimeout(o),K&&cancelAnimationFrame(n),setTimeout(r)},o=setTimeout(i,100);K&&(n=requestAnimationFrame(i))})(ve)),m=null},u.__c=function(e,t){t.some(function(r){try{r.__h.forEach(A),r.__h=r.__h.filter(function(n){return!n.__||M(n)})}catch(n){t.some(function(i){i.__h&&(i.__h=[])}),t=[],u.__e(n,r.__v)}}),q&&q(e,t)},u.unmount=function(e){G&&G(e);var t,r=e.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{A(n)}catch(i){t=i}}),t&&u.__e(t,r.__v))};var K=typeof requestAnimationFrame=="function";function A(e){var t=m,r=e.__c;typeof r=="function"&&(e.__c=void 0,r()),m=t}function M(e){var t=m;e.__c=e.__(),m=t}function ge(e,t){return!e||e.length!==t.length||t.some(function(r,n){return r!==e[n]})}var Ce={};function H(e,t){for(var r in t)e[r]=t[r];return e}function xe(e,t,r){var n,i=/(?:\?([^#]*))?(#.*)?$/,o=e.match(i),a={};if(o&&o[1])for(var s=o[1].split("&"),d=0;d<s.length;d++){var h=s[d].split("=");a[decodeURIComponent(h[0])]=decodeURIComponent(h.slice(1).join("="))}e=L(e.replace(i,"")),t=L(t||"");for(var k=Math.max(e.length,t.length),p=0;p<k;p++)if(t[p]&&t[p].charAt(0)===":"){var l=t[p].replace(/(^:|[+*?]+$)/g,""),b=(t[p].match(/[+*?]+$/)||Ce)[0]||"",C=~b.indexOf("+"),R=~b.indexOf("*"),$=e[p]||"";if(!$&&!R&&(b.indexOf("?")<0||C)){n=!1;break}if(a[l]=decodeURIComponent($),C||R){a[l]=e.slice(p).map(decodeURIComponent).join("/");break}}else if(t[p]!==e[p]){n=!1;break}return(r.default===!0||n!==!1)&&a}function Ee(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function ke(e,t){return e.index=t,e.rank=function(r){return r.props.default?0:L(r.props.path).map(Re).join("")}(e),e.props}function L(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function Re(e){return e.charAt(0)==":"?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var Se={},y=[],J=[],f=null,X={url:D()},Oe=S(X);function D(){var e;return""+((e=f&&f.location?f.location:f&&f.getCurrentLocation?f.getCurrentLocation():typeof location<"u"?location:Se).pathname||"")+(e.search||"")}function Ae(e,t){return t===void 0&&(t=!1),typeof e!="string"&&e.url&&(t=e.replace,e=e.url),function(r){for(var n=y.length;n--;)if(y[n].canRoute(r))return!0;return!1}(e)&&function(r,n){n===void 0&&(n="push"),f&&f[n]?f[n](r):typeof history<"u"&&history[n+"State"]&&history[n+"State"](null,null,r)}(e,t?"replace":"push"),ee(e)}function ee(e){for(var t=!1,r=0;r<y.length;r++)y[r].routeTo(e)&&(t=!0);return t}function Ne(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),r=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!r||r.match(/^_?self$/i)))return Ae(t)}}function He(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}function Pe(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do if(t.localName==="a"&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(Ne(t))return He(e)}while(t=t.parentNode)}}var Q=!1;function I(e){e.history&&(f=e.history),this.state={url:e.url||D()}}H(I.prototype=new v,{shouldComponentUpdate:function(e){return e.static!==!0||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=g(this.props.children);return this.g(t,e)!==void 0},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;Q||(Q=!0,f||addEventListener("popstate",function(){ee(D())}),addEventListener("click",Pe)),y.push(this),f&&(this.u=f.listen(function(t){var r=t.location||t;e.routeTo(""+(r.pathname||"")+(r.search||""))})),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),y.splice(y.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(ke).sort(Ee);for(var r=0;r<e.length;r++){var n=e[r],i=xe(t,n.props.path,n.props);if(i)return[n,i]}},render:function(e,t){var r,n,i=e.onChange,o=t.url,a=this.c,s=this.g(g(e.children),o);if(s&&(n=U(s[0],H(H({url:o,matches:r=s[1]},r),{key:void 0,ref:void 0}))),o!==(a&&a.url)){H(X,a=this.c={url:o,previous:a&&a.url,current:n,path:n?n.props.path:null,matches:r}),a.router=this,a.active=n?[n]:[];for(var d=J.length;d--;)J[d]({});typeof i=="function"&&i(a)}return c(Oe.Provider,{value:a},n)}});var te=function(e){return c(e.component,e)};function Ue(e,t){for(var r in t)e[r]=t[r];return e}function re(e,t){for(var r in e)if(r!=="__source"&&!(r in t))return!0;for(var n in t)if(n!=="__source"&&e[n]!==t[n])return!0;return!1}function ne(e){this.props=e}(ne.prototype=new v).isPureReactComponent=!0,ne.prototype.shouldComponentUpdate=function(e,t){return re(this.props,e)||re(this.state,t)};var oe=u.__b;u.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),oe&&oe(e)};var pt=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;var Me=u.__e;u.__e=function(e,t,r,n){if(e.then){for(var i,o=t;o=o.__;)if((i=o.__c)&&i.__c)return t.__e==null&&(t.__e=r.__e,t.__k=r.__k),i.__c(e,t)}Me(e,t,r,n)};var ae=u.unmount;function x(){this.__u=0,this.t=null,this.__b=null}function _e(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function T(e){var t,r,n;function i(o){if(t||(t=e()).then(function(a){r=a.default||a},function(a){n=a}),n)throw n;if(!r)throw t;return c(r,o)}return i.displayName="Lazy",i.__f=!0,i}function P(){this.u=null,this.o=null}u.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&e.__h===!0&&(e.type=null),ae&&ae(e)},(x.prototype=new v).__c=function(e,t){var r=t.__c,n=this;n.t==null&&(n.t=[]),n.t.push(r);var i=_e(n.__v),o=!1,a=function(){o||(o=!0,r.__R=null,i?i(s):s())};r.__R=a;var s=function(){if(!--n.__u){if(n.state.__e){var h=n.state.__e;n.__v.__k[0]=function p(l,b,C){return l&&(l.__v=null,l.__k=l.__k&&l.__k.map(function(R){return p(R,b,C)}),l.__c&&l.__c.__P===b&&(l.__e&&C.insertBefore(l.__e,l.__d),l.__c.__e=!0,l.__c.__P=C)),l}(h,h.__c.__P,h.__c.__O)}var k;for(n.setState({__e:n.__b=null});k=n.t.pop();)k.forceUpdate()}},d=t.__h===!0;n.__u++||d||n.setState({__e:n.__b=n.__v.__k[0]}),e.then(a,a)},x.prototype.componentWillUnmount=function(){this.t=[]},x.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),n=this.__v.__k[0].__c;this.__v.__k[0]=function o(a,s,d){return a&&(a.__c&&a.__c.__H&&(a.__c.__H.__.forEach(function(h){typeof h.__c=="function"&&h.__c()}),a.__c.__H=null),(a=Ue({},a)).__c!=null&&(a.__c.__P===d&&(a.__c.__P=s),a.__c=null),a.__k=a.__k&&a.__k.map(function(h){return o(h,s,d)})),a}(this.__b,r,n.__O=n.__P)}this.__b=null}var i=t.__e&&c(_,null,e.fallback);return i&&(i.__h=null),[c(_,null,t.__e?null:e.children),i]};var ie=function(e,t,r){if(++r[1]===r[0]&&e.o.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(r=e.u;r;){for(;r.length>3;)r.pop()();if(r[1]<r[0])break;e.u=r=r[2]}};(P.prototype=new v).__e=function(e){var t=this,r=_e(t.__v),n=t.o.get(e);return n[0]++,function(i){var o=function(){t.props.revealOrder?(n.push(i),ie(t,e,n)):i()};r?r(o):o()}},P.prototype.render=function(e){this.u=null,this.o=new Map;var t=g(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var r=t.length;r--;)this.o.set(t[r],this.u=[1,0,this.u]);return e.children},P.prototype.componentDidUpdate=P.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(t,r){ie(e,r,t)})};var Le=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,De=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ie=typeof document<"u",Te=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/i:/fil|che|ra/i).test(e)};v.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(v.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var ue=u.event;function $e(){}function Fe(){return this.cancelBubble}function We(){return this.defaultPrevented}u.event=function(e){return ue&&(e=ue(e)),e.persist=$e,e.isPropagationStopped=Fe,e.isDefaultPrevented=We,e.nativeEvent=e};var Ve,ce={configurable:!0,get:function(){return this.class}},se=u.vnode;u.vnode=function(e){var t=e.type,r=e.props,n=r;if(typeof t=="string"){var i=t.indexOf("-")===-1;for(var o in n={},r){var a=r[o];Ie&&o==="children"&&t==="noscript"||o==="value"&&"defaultValue"in r&&a==null||(o==="defaultValue"&&"value"in r&&r.value==null?o="value":o==="download"&&a===!0?a="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!Te(r.type)?o="oninput":/^onfocus$/i.test(o)?o="onfocusin":/^onblur$/i.test(o)?o="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)?o=o.toLowerCase():i&&De.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():a===null&&(a=void 0),n[o]=a)}t=="select"&&n.multiple&&Array.isArray(n.value)&&(n.value=g(r.children).forEach(function(s){s.props.selected=n.value.indexOf(s.props.value)!=-1})),t=="select"&&n.defaultValue!=null&&(n.value=g(r.children).forEach(function(s){s.props.selected=n.multiple?n.defaultValue.indexOf(s.props.value)!=-1:n.defaultValue==s.props.value})),e.props=n,r.class!=r.className&&(ce.enumerable="className"in r,r.className!=null&&(n.class=r.className),Object.defineProperty(n,"className",ce))}e.$$typeof=Le,se&&se(e)};var le=u.__r;u.__r=function(e){le&&le(e),Ve=e.__c};var Be=()=>c("div",null,"404 :("),fe=Be;var je=()=>(N(()=>{F`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html {
        /* Custom properties etc. */
      }
      body {
        background-color: hsl(180, 10%, 10%);
        color: hsl(180, 93%, 95%);
        font-family: Montserrat, sans-serif;
        font-size: 16px;
        margin: 0;
        padding: 0;
      }
      #app {
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
      }
    `},[]),null),pe=je;var ze=O`
  --top-pad: 12px;
  --side-pad: calc(var(--top-pad) * 2);
  --bottom-pad: calc(var(--top-pad) + 2px);

  --bg-angle: 135deg;
  --bg-stripe-start: 85%;
  --bg-stripe-width: 2.5%;
  --bg-stripe-blend: 0%;

  align-items: center;
  background-color: hsl(0 0% 0%);
  background-image: linear-gradient(
    var(--bg-angle),
    hsl(0, 0%, 0%) 0%,
    hsl(0, 0%, 0%) calc(var(--bg-stripe-start) - var(--bg-stripe-blend)),
    hsl(180, 93%, 20%) var(--bg-stripe-start)
  );
  column-gap: 24px;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: var(--top-pad) var(--side-pad) var(--bottom-pad);
`,qe=O`
  --border-width: 4px;
  --img-height: 32px;

  background-color: hsl(180, 93%, 85%);
  border-radius: 50%;
  border: var(--border-width) solid hsl(180, 93%, 20%);
  height: calc(var(--img-height) + (var(--border-width) * 2));

  img {
    border-radius: 50%;
    border: 2px solid hsl(0 0% 0%);
    height: var(--img-height);
  }
`,Ge=O`
  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    transition: 120ms color ease-in-out;

    &:hover {
      color: hsl(180, 93%, 50%);
    }
  }
`,Ke=()=>c("header",{class:ze},c("a",{class:qe,href:E.HOME},c("img",{alt:"Bot",src:E.BOT_IMAGE})),c("nav",{class:Ge},c("a",{href:E.COMMANDS},"Commands"))),de=Ke;var Ye=T(()=>import("./HomePage-7B4ORUVP.js")),Ze=T(()=>import("./CommandsPage-EDZMV2IP.js")),E=(()=>{let t=window.location.hostname==="localhost"?"/":"/kindaokaybot";return{BOT_IMAGE:"./src/img/kindaokaybot.png",COMMANDS:`${t}/commands`.replace("//","/"),HOME:t}})(),Je=()=>c(_,null,c(pe,null),c(de,null),c("main",null,c(I,null,c(x,{fallback:"Loading...",path:E.HOME},c(Ye,null)),c(x,{fallback:"Loading commands...",path:E.COMMANDS},c(Ze,null)),c(te,{component:fe,default:!0})))),he=Je;w(c(he,null),document.querySelector("#app"));
