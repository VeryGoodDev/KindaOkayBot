import{a,c as n,k as C,l as R,m as I,o as l,p as P,q as E}from"./chunk-SHVHH5ET.js";a();I();a();a();var p=(e,t)=>{let o=e;for(let[i,h]of Object.entries(t))o=o.replace(`{{${i}}}`,h);return o.trim()},T=["amazing","awesome","fantastic","magnificent","phenomenal","stupendous","talented","wonderful"],g="{{displayName}} gave {{interaction}} to {{recipient}} {{emote}}";a();a();var y=e=>{if(e.length===0)return"";if(e.length===1)return e[0];if(e.length===2)return`${e[0]} and ${e[1]}`;let[t]=e.slice(-1);return`${e.slice(0,-1).map(i=>i.replace(/,$/,"")).join(", ")}, and ${t}`};var U=e=>JSON.stringify(e,null,2);var O=(e,t,o=!1)=>{if(e>t)throw new RangeError("The min value must always be larger than the max value");if(!Number.isInteger(e)||!Number.isInteger(t))throw new TypeError("The min and max values must both be integers");return e+Math.floor(Math.random()*(t-e+(o?1:0)))},m=e=>{let t=O(0,e.length);return e[t]};var f=e=>typeof e.username=="string"?e.username.toLowerCase():(console.warn("[chatbot/util] Couldn't find a username for the following user state:"),console.warn(U(e)),"<NO_NAME_FOUND>");var s=e=>typeof e["display-name"]=="string"?e["display-name"]:f(e);var r={ALL:"ALL",MOD:"MOD",USER_SET:"USER_SET",VIP:"VIP"};var k={"!bot":{description:"Provides a little info about KindaOkayBot",getResponse(){return"Dev decided to write his own bot. Still a work in progress. Bugs happening during stream always a distinct possibility. Written in TypeScript, running on NodeJS"}},"!bytes":{description:"Provides a little info about Dev's channel points",getResponse(){return"Dev's channel points are called bytes. There aren't a lot of custom ones right now, so if you have any cool ideas, feel free to share in chat for Dev to consider!"}},"!commands":{description:"Provides a link to this page",getResponse(){return"Coming soon (feel free to ask Dev if you're looking for anything specific)"}},"!discord":{description:"Provides an invite link for Dev's Discord server",getResponse(){return"https://discord.gg/XqSQaC3"}},"!schedule":{description:"Provides info about Dev's streaming schedule",getResponse(){return m(["Schedule lmao LUL","3-4 times a week for several months, then once every seven months for a year and a half","There are currently no set days or times that Dev consistently streams, but he hopes to do 1-2 a week for the time being"])}},"!twitter":{description:"Provides a link to Dev's Twitter account and some mild sass towards the person who has the username Dev wanted",getResponse(){return"https://twitter.com/_verygooddev (the username without an underscore was already taken by someone who hasn't even tweeted since 2011 :/)"}}},c={"!creepylurk":{description:"Use to declare your intent to lurk in the creepiest way possible",getResponse(e){let t=s(e);return`${t} is lurking. Not like a normal lurk though, no no no. Instead, ${t} is up in a tree, hiding behind the branches and leaves, and watching from the distance through binoculars while chuckling quietly at their frankly disturbing lurking behavior. Thanks for the lurk?`}},"!dishwashinglurk":{description:"Use to declare your intent to lurk while washing some dishes",getResponse(e){return`${s(e)} has some dishes that they need to wash, but is still leaving the stream up in lurk mode. May your dishes be easy to clean, and thanks for the lurk!`}},"!drivelurk":{description:"Use to declare your intent to lurk while you're driving",getResponse(e){let t=s(e);return`${t} has to drive somewhere, but is keeping the stream up as a lurker. KEEP YOUR EYES ON THE GODDAMN ROAD ${t.toUpperCase()}!!! (and thanks for the lurk)`}},"!gamelurk":{description:"Use to declare your intent to lurk while playing a game. You can optionally specify the game you're going to play if you want, e.g. `!gamelurk stardew valley`",getResponse(e,...t){let o=t.length>0?t.join(" "):"a super dope game";return`${s(e)} wants to chill in the stream, but they also want to play ${o}. Both? Yeah, both is good. Have fun with your game, and thanks for the lurk!`}},"!lurk":{description:"Use to declare your intent to go into lurker mode",getResponse(e){return`${s(e)} is lurking in the shadows, still in chat but now from a distance. Thanks for the lurk!`}},"!movielurk":{description:"Use to declare your intent to lurk while watching a movie (or TV show). You can optionally specify what you'll be watching if you want, e.g. `!movielurk the last jedi`",getResponse(e,...t){let o=t.length>0?t.join(" "):"a sick-ass movie or TV show";return`${f(e)} wants to chill in the stream, but they're also in the mood to watch ${o}. Both? Both. Enjoy whatever it is you're watching, and thanks for the lurk!`}},"!sleepylurk":{description:"Use to declare your intent to go to bed, but still have the stream up as a lurker",getResponse(e){return`As ${s(e)} lays down to sleep / Within the stream they stay to creep. Have a good sleep HahaSleep thanks for the lurk!`}},"!sortalurk":{description:"Use to declare your intent to still be in and out of chat, but not quite fully lurking",getResponse(e){return`${s(e)} needs to direct some attention away from the stream, but is also planning to pop in and out of chat whenever they please. Sorta thanks for the sorta lurk!`}},"!stilllurking":{description:"Use to check in on the stream while lurking, but before you're able to completely come out of lurk mode",getResponse(e){return`${s(e)} has been lurking and is just popping in to provide an update: they are still lurking. We appreciate this important update`}},"!unlurk":{description:"Use to declare that your lurk is done and you're hanging out in chat again",getResponse(e){return`${s(e)} has left the shadows and is out of lurk mode. Thanks for lurking and welcome back!`}},"!worklurk":{description:"Use to declare your intent to lurk while working",getResponse(e){return`${s(e)} has to work, but decided that they wanted to stop by the stream first and have it in the background while they're working. May your time spent working go well, and thanks for the lurk!`}}},A=["!stilllurking","!unlurk"],M=Object.keys(c).filter(e=>!A.includes(e));c["!randomLurk"]={description:"Use to let KindaOkayBot decide which lurk command you should use",getResponse(){let e=m(["Why not try the {{chosenLurk}} command?","I wholeheartedly recommend the {{chosenLurk}} command","In my opinion the {{chosenLurk}} command is a fine choice","Definitely the {{chosenLurk}} command, it's one of my favorites","Based on my extremely precise mathematical calculations, the best option for you at this time is the {{chosenLurk}} command","You want the {{chosenLurk}} command. This is the way.","BOT_ERROR 69420 --- UNABLE TO READ SUBJECT'S MIND TO DETERMINE WHICH LURK COMMAND TO USE. PLEASE REMOVE ANY MIND-READER-BLOCKING APPARATUS OR DEVICES AND TRY AGAIN. BEEP BOOP"]),t=m(M);return p(e,{chosenLurk:t})}};var w={"!grouphug":{description:"Use to give a virtual group hug to everyone in chat",getResponse(e){return`${s(e)} gave a big ol group hug to the entire chat! <3`}},"!highfive":{description:"Use to give a high five to one or more people in chat",getResponse(e,...t){let o=t.length>0?y(t):"a random person in chat";return p(g,{displayName:s(e),emote:":D",interaction:"a perfect high five",recipient:o})}},"!hug":{description:"Use to give a virtual hug to one or more people in chat",getResponse(e,...t){let o=t.length>0?y(t):"a random person in chat";return p(g,{displayName:s(e),emote:"<3",interaction:"a hug",recipient:o})}},"!so":{description:"Use to put a shoutout in chat for a fellow streamer",getResponse(e,t){if(!t)return"";let o=t.replace(/^@/,"");return`Shout out to the ${m(T)} ${o}! Go show them some love at https://twitch.tv/${o.toLowerCase()}`},restrictUsage:"MOD"}},N={"!incagbreto":{description:"",getResponse(){return"You have now gone incagbreto, any actions you make may not be private and will be recorded by brevil mod"},permittedUsers:["angelicbre"],restrictUsage:"USER_SET"}},b={},v={},ne={...k,...c,...w,...N,...b,...v},L={"!calendar":"!schedule","!calender":"!schedule","!channelpoints":"!bytes","!creeperlurk":"!creepylurk","!creeplurk":"!creepylurk","!disheslurk":"!dishwashinglurk","!dishwasherlurk":"!dishwashinglurk","!points":"!bytes","!shoutout":"!so","!sleeplurk":"!sleepylurk","!stillurking":"!stilllurking","!tvlurk":"!movielurk","!werklurk":"!worklurk","!wurklurk":"!worklurk"};a();var $={[r.ALL]:"Everyone",[r.MOD]:"Mods",[r.VIP]:"VIPs"},B={[r.ALL]:()=>null,[r.MOD]:e=>n(E,{...e}),[r.VIP]:e=>n(P,{...e})},_=l`
  border-radius: 20px;
  color: hsl(180, 0%, 0%);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  text-transform: uppercase;

  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 2px;

  &[data-group='${r.ALL}'] {
    background-color: hsl(180, 93%, 85%);
  }

  &[data-group='${r.MOD}'] {
    background-color: hsl(150, 75%, 50%);
  }

  &[data-group='${r.VIP}'] {
    background-color: hsl(310, 93%, 50%);
  }
`,j=({group:e})=>{let t=B[e];return n("span",{class:_,"data-group":e},n(t,{size:16,weight:"bold"}),$[e])},D=j;var H={...k,...c,...w,...b,...v},S=(()=>{let e={};for(let[t,o]of Object.entries(L))o in e||(e[o]=[]),e[o].push(t);return e})(),G=Object.entries(H),V=G.reduce((e,[t,{description:o,restrictUsage:i}])=>{let h=t in S?S[t]:[],u=[];Array.isArray(i)?u.push(...i):i&&i!==r.USER_SET?u.push(i):u.push(r.ALL);let x={aliases:h,allowedUsers:u,command:t,description:o};return[...e,x]},[]),Y=l`
  border-collapse: collapse;
  margin: auto;
  max-width: 700px;
  width: 100%;

  th,
  td {
    padding: 16px;
    text-align: left;
  }

  thead {
    background-color: hsl(180, 5%, 2.5%);
    font-family: Righteous;
    font-size: larger;
    position: sticky;
    top: 0;
  }

  tbody tr {
    background-color: hsl(180, 93%, var(--row-lightness));

    &:nth-child(odd) {
      --row-lightness: 10%;
    }

    &:nth-child(even) {
      --row-lightness: 15%;
    }
  }
`,z=e=>[...e].sort(({command:t},{command:o})=>t<o?-1:t>o?1:0),W=l`
  display: grid;
  row-gap: 8px;

  code {
    background-color: hsl(180, 5%, 30%);
    border-radius: 4px;
    font-family: 'Source Code Pro', monospace;
    padding: 0px 4px 2px;
  }
`,K=l`
  column-gap: 8px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
`,J=({commandData:e})=>{let t=e.aliases.length>0?n("div",null,n("i",null,"Aliases:")," ",n("code",null,e.aliases.join(", "))):null;return n("div",{class:W},n("div",{class:K},e.allowedUsers.map(o=>n(D,{key:o,group:o}))),n("div",{dangerouslySetInnerHTML:{__html:e.description.replace(/`(?<command>.+?)`/g,"<code>$<command></code>")}}),t)},q=()=>{let[e,t]=C(V);return R(()=>{t(o=>z(o))},[]),n("table",{class:Y},n("thead",null,n("th",null,"Command"),n("th",null,"Info")),n("tbody",null,e.map(o=>n("tr",{key:o.command},n("td",null,o.command),n("td",null,n(J,{commandData:o}))))))},pe=q;export{pe as default};
