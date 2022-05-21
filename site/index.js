import{a as l,b as f,c as n,d as p,e as g,f as y,g as M,h as L,i as O,j as w,l as P,m as N,n as H,o as v,r as z}from"./chunk-SHVHH5ET.js";l();w();l();l();w();N();var pe={};function A(e,t){for(var o in t)e[o]=t[o];return e}function fe(e,t,o){var r,s=/(?:\?([^#]*))?(#.*)?$/,a=e.match(s),i={};if(a&&a[1])for(var u=a[1].split("&"),m=0;m<u.length;m++){var h=u[m].split("=");i[decodeURIComponent(h[0])]=decodeURIComponent(h.slice(1).join("="))}e=D(e.replace(s,"")),t=D(t||"");for(var R=Math.max(e.length,t.length),_=0;_<R;_++)if(t[_]&&t[_].charAt(0)===":"){var c=t[_].replace(/(^:|[+*?]+$)/g,""),x=(t[_].match(/[+*?]+$/)||pe)[0]||"",C=~x.indexOf("+"),S=~x.indexOf("*"),W=e[_]||"";if(!W&&!S&&(x.indexOf("?")<0||C)){r=!1;break}if(i[c]=decodeURIComponent(W),C||S){i[c]=e.slice(_).map(decodeURIComponent).join("/");break}}else if(t[_]!==e[_]){r=!1;break}return(o.default===!0||r!==!1)&&i}function de(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function _e(e,t){return e.index=t,e.rank=function(o){return o.props.default?0:D(o.props.path).map(me).join("")}(e),e.props}function D(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function me(e){return e.charAt(0)==":"?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var he={},b=[],B=[],d=null,j={url:I()},ve=O(j);function I(){var e;return""+((e=d&&d.location?d.location:d&&d.getCurrentLocation?d.getCurrentLocation():typeof location<"u"?location:he).pathname||"")+(e.search||"")}function ge(e,t){return t===void 0&&(t=!1),typeof e!="string"&&e.url&&(t=e.replace,e=e.url),function(o){for(var r=b.length;r--;)if(b[r].canRoute(o))return!0;return!1}(e)&&function(o,r){r===void 0&&(r="push"),d&&d[r]?d[r](o):typeof history<"u"&&history[r+"State"]&&history[r+"State"](null,null,o)}(e,t?"replace":"push"),V(e)}function V(e){for(var t=!1,o=0;o<b.length;o++)b[o].routeTo(e)&&(t=!0);return t}function ye(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),o=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!o||o.match(/^_?self$/i)))return ge(t)}}function be(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}function xe(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do if(t.localName==="a"&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(ye(t))return be(e)}while(t=t.parentNode)}}var F=!1;function $(e){e.history&&(d=e.history),this.state={url:e.url||I()}}A($.prototype=new g,{shouldComponentUpdate:function(e){return e.static!==!0||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=y(this.props.children);return this.g(t,e)!==void 0},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;F||(F=!0,d||addEventListener("popstate",function(){V(I())}),addEventListener("click",xe)),b.push(this),d&&(this.u=d.listen(function(t){var o=t.location||t;e.routeTo(""+(o.pathname||"")+(o.search||""))})),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),b.splice(b.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(_e).sort(de);for(var o=0;o<e.length;o++){var r=e[o],s=fe(t,r.props.path,r.props);if(s)return[r,s]}},render:function(e,t){var o,r,s=e.onChange,a=t.url,i=this.c,u=this.g(y(e.children),a);if(u&&(r=L(u[0],A(A({url:a,matches:o=u[1]},o),{key:void 0,ref:void 0}))),a!==(i&&i.url)){A(j,i=this.c={url:a,previous:i&&i.url,current:r,path:r?r.props.path:null,matches:o}),i.router=this,i.active=r?[r]:[];for(var m=B.length;m--;)B[m]({});typeof s=="function"&&s(i)}return n(ve.Provider,{value:i},r)}});var T=function(e){return n(e.component,e)};l();N();N();w();w();function ke(e,t){for(var o in t)e[o]=t[o];return e}function G(e,t){for(var o in e)if(o!=="__source"&&!(o in t))return!0;for(var r in t)if(r!=="__source"&&e[r]!==t[r])return!0;return!1}function K(e){this.props=e}(K.prototype=new g).isPureReactComponent=!0,K.prototype.shouldComponentUpdate=function(e,t){return G(this.props,e)||G(this.state,t)};var Y=f.__b;f.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),Y&&Y(e)};var at=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;var Ee=f.__e;f.__e=function(e,t,o,r){if(e.then){for(var s,a=t;a=a.__;)if((s=a.__c)&&s.__c)return t.__e==null&&(t.__e=o.__e,t.__k=o.__k),s.__c(e,t)}Ee(e,t,o,r)};var Z=f.unmount;function E(){this.__u=0,this.t=null,this.__b=null}function te(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function oe(e){var t,o,r;function s(a){if(t||(t=e()).then(function(i){o=i.default||i},function(i){r=i}),r)throw r;if(!o)throw t;return n(o,a)}return s.displayName="Lazy",s.__f=!0,s}function U(){this.u=null,this.o=null}f.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&e.__h===!0&&(e.type=null),Z&&Z(e)},(E.prototype=new g).__c=function(e,t){var o=t.__c,r=this;r.t==null&&(r.t=[]),r.t.push(o);var s=te(r.__v),a=!1,i=function(){a||(a=!0,o.__R=null,s?s(u):u())};o.__R=i;var u=function(){if(!--r.__u){if(r.state.__e){var h=r.state.__e;r.__v.__k[0]=function _(c,x,C){return c&&(c.__v=null,c.__k=c.__k&&c.__k.map(function(S){return _(S,x,C)}),c.__c&&c.__c.__P===x&&(c.__e&&C.insertBefore(c.__e,c.__d),c.__c.__e=!0,c.__c.__P=C)),c}(h,h.__c.__P,h.__c.__O)}var R;for(r.setState({__e:r.__b=null});R=r.t.pop();)R.forceUpdate()}},m=t.__h===!0;r.__u++||m||r.setState({__e:r.__b=r.__v.__k[0]}),e.then(i,i)},E.prototype.componentWillUnmount=function(){this.t=[]},E.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var o=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function a(i,u,m){return i&&(i.__c&&i.__c.__H&&(i.__c.__H.__.forEach(function(h){typeof h.__c=="function"&&h.__c()}),i.__c.__H=null),(i=ke({},i)).__c!=null&&(i.__c.__P===m&&(i.__c.__P=u),i.__c=null),i.__k=i.__k&&i.__k.map(function(h){return a(h,u,m)})),i}(this.__b,o,r.__O=r.__P)}this.__b=null}var s=t.__e&&n(p,null,e.fallback);return s&&(s.__h=null),[n(p,null,t.__e?null:e.children),s]};var q=function(e,t,o){if(++o[1]===o[0]&&e.o.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(o=e.u;o;){for(;o.length>3;)o.pop()();if(o[1]<o[0])break;e.u=o=o[2]}};(U.prototype=new g).__e=function(e){var t=this,o=te(t.__v),r=t.o.get(e);return r[0]++,function(s){var a=function(){t.props.revealOrder?(r.push(s),q(t,e,r)):s()};o?o(a):a()}},U.prototype.render=function(e){this.u=null,this.o=new Map;var t=y(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var o=t.length;o--;)this.o.set(t[o],this.u=[1,0,this.u]);return e.children},U.prototype.componentDidUpdate=U.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(t,o){q(e,o,t)})};var Re=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Se=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Oe=typeof document<"u",we=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/i:/fil|che|ra/i).test(e)};g.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(g.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var J=f.event;function Pe(){}function Ne(){return this.cancelBubble}function Ae(){return this.defaultPrevented}f.event=function(e){return J&&(e=J(e)),e.persist=Pe,e.isPropagationStopped=Ne,e.isDefaultPrevented=Ae,e.nativeEvent=e};var Ue,Q={configurable:!0,get:function(){return this.class}},X=f.vnode;f.vnode=function(e){var t=e.type,o=e.props,r=o;if(typeof t=="string"){var s=t.indexOf("-")===-1;for(var a in r={},o){var i=o[a];Oe&&a==="children"&&t==="noscript"||a==="value"&&"defaultValue"in o&&i==null||(a==="defaultValue"&&"value"in o&&o.value==null?a="value":a==="download"&&i===!0?i="":/ondoubleclick/i.test(a)?a="ondblclick":/^onchange(textarea|input)/i.test(a+t)&&!we(o.type)?a="oninput":/^onfocus$/i.test(a)?a="onfocusin":/^onblur$/i.test(a)?a="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(a)?a=a.toLowerCase():s&&Se.test(a)?a=a.replace(/[A-Z0-9]/,"-$&").toLowerCase():i===null&&(i=void 0),r[a]=i)}t=="select"&&r.multiple&&Array.isArray(r.value)&&(r.value=y(o.children).forEach(function(u){u.props.selected=r.value.indexOf(u.props.value)!=-1})),t=="select"&&r.defaultValue!=null&&(r.value=y(o.children).forEach(function(u){u.props.selected=r.multiple?r.defaultValue.indexOf(u.props.value)!=-1:r.defaultValue==u.props.value})),e.props=r,o.class!=o.className&&(Q.enumerable="className"in o,o.className!=null&&(r.class=o.className),Object.defineProperty(r,"className",Q))}e.$$typeof=Re,X&&X(e)};var ee=f.__r;f.__r=function(e){ee&&ee(e),Ue=e.__c};l();N();var Me=()=>(P(()=>{H`
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
    `},[]),null),re=Me;l();var Le=v`
  display: grid;
  height: 100%;
  place-content: center;
  row-gap: 16px;
  text-align: center;

  * {
    margin: 0;
  }

  h1 {
    font-family: Righteous, inherit;
    font-size: 4rem;
  }

  p {
    font-style: italic;
  }
`,De=()=>n("div",{class:Le},n("h1",null,"404"),n("p",null,"Page not found")),ne=De;l();var Ie=v`
  display: grid;
  font-family: Righteous, sans-serif;
  font-size: 3rem;
  height: 100%;
  place-items: center;
`,$e=()=>n("div",{class:Ie},"Beep boop"),ie=$e;l();var Te=new Date().getFullYear(),We=v`
  align-items: center;
  background-color: hsl(180, 0%, 0%);
  display: grid;
  font-size: small;
  gap: 12px;
  justify-content: space-between;
  padding: 12px 8px;

  ul {
    align-content: center;
    column-gap: 16px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;

    &:focus-visible {
      border-radius: 1px;
      outline-offset: 8px;
      outline: 2px solid hsl(180, 93%, 50%);
    }
  }

  @media (min-width: 512px) {
    grid-template-columns: auto 1fr;
    padding: 16px;

    ul {
      padding-inline: 16px;
    }
  }
`,He=()=>n("footer",{class:We},n("span",null,"\xA9\xA0",`${Te} VeryGoodDev`),n("nav",null,n("ul",null,n("li",null,n("a",{href:"https://github.com/verygooddev/kindaokaybot"},"Source")),n("li",null,"Icons by"," ",n("a",{href:"https://phosphoricons.com"},"Phosphor")),n("li",null,n("a",{href:"https://twitter.com/_verygooddev"},"Contact Dev"))))),ae=He;l();var ze=v`
  --top-pad: 12px;
  --side-pad: calc(var(--top-pad) * 2);
  --bottom-pad: calc(var(--top-pad) + 2px);

  --bg-angle: 135deg;
  --bg-stripe-start: 85%;

  align-items: center;
  background-color: hsl(180, 0%, 0%);
  background-image: linear-gradient(
    var(--bg-angle),
    hsl(180, 0%, 0%) 0%,
    hsl(180, 0%, 0%) var(--bg-stripe-start),
    hsl(180, 93%, 20%) var(--bg-stripe-start)
  );
  column-gap: 24px;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: var(--top-pad) var(--side-pad) var(--bottom-pad);
`,Be=v`
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

  &:focus-visible {
    border-radius: 50%;
    outline-offset: 4px;
    outline: 2px solid hsl(180, 93%, 50%);
  }
`,Fe=v`
  display: grid;
  justify-content: start;

  a {
    align-items: center;
    color: inherit;
    column-gap: 4px;
    display: inline-grid;
    font-weight: bold;
    grid-template-columns: auto 1fr;
    text-decoration: none;
    text-transform: uppercase;
    transition: 120ms color ease-in-out;

    &:focus-visible {
      border-radius: 1px;
      outline-offset: 8px;
      outline: 2px solid hsl(180, 93%, 50%);
    }

    &:hover {
      color: hsl(180, 93%, 50%);
    }
  }
`,je=()=>n("header",{class:ze},n("a",{class:Be,href:k.HOME},n("img",{alt:"Bot",src:k.BOT_IMAGE})),n("nav",{class:Fe},n("a",{href:k.COMMANDS},n(z,{color:"currentColor",size:24}),n("span",null,"Commands")))),se=je;var Ve=oe(()=>import("./CommandsPage-3MWNAZOM.js")),k=(()=>{let t=window.location.hostname==="localhost"?"/":"/kindaokaybot";return{BOT_IMAGE:"./src/img/kindaokaybot.png",COMMANDS:`${t}/commands`.replace("//","/"),HOME:t}})(),Ge=()=>n(p,null,n(re,null),n(se,null),n("main",null,n($,null,n(T,{component:ie,path:k.HOME}),n(E,{fallback:"Loading commands...",path:k.COMMANDS},n(Ve,null)),n(T,{component:ne,default:!0}))),n(ae,null)),ue=Ge;M(n(ue,null),document.querySelector("#app"));
