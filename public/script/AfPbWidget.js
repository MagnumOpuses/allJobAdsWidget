!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(3),n(4);const a=n(1);!function(e,t){let n=!1;const i=function(){let e=t.currentScript||t.querySelector('script[src*="AfPbWidget.js"]');return c("loaded script:"+e.src),e.src}().split("script/AfPbWidget.js")[0]+"/css/";let o,l;const s=2e3,r="https://open-api.dev.services.jtech.se/";function c(e){if(n){let t;try{throw new Error("")}catch(e){t=e.stack||""}(t=t.split("\n").map(function(e){return e.trim()})).push(function(e,t){let n="",a=0;do{a++,n+=e}while(a<t);return n}("-",e.length)),t.push(e),t.reverse(),console.log(t.slice(0,-2))}}function d(e){let n=t.createElement("link");n.href=e,n.rel="stylesheet";let a=t.getElementsByTagName("head")[0],i=!1;n.onload=n.onreadystatechange=function(){i||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(i=!0,c("loaded css:"+e),n.onload=n.onreadystatechange=null)},a.appendChild(n)}function u(e,t){let n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){try{var e=JSON.parse(n.responseText)}catch(e){return void console.log(e.message+" in "+n.responseText)}t(e)}},n.open("GET",e,!0),e.search("open-api.dev")>1||e.search("/vf/")>1?(c("AfJobs headers set for:"+e),n.setRequestHeader("api-key","am9idGVjaGNvbW11bml0eUBnbWFpbC5jb20")):(c("AllJobs headers set for: "+e),n.setRequestHeader("api-key","am9ic2Nhbm5lckBqdGVjaC5zZQo")),n.send()}function f(e){for(var t=f.db[f.locale][e.join("")],n=[t.t[0]],a=1,i=t.t.length;a<i;a++)n[a]=arguments[1+t.v[a-1]]+t.t[a];return n.join("")}function p(e,n="",a=""){let i=t.createElement(e);return i.className=n,i.innerHTML=a,i}async function h(e,t,n){let a=5,i=0,o=!1,l="",s="",c=r;if("all"==e.dataset.source){}if(t>1&&(i=t*a-a),e.dataset.limit&&(a=e.dataset.limit),e.dataset.showexpired&&(o=e.dataset.showexpired),e.dataset.q&&(l=e.dataset.q),"all"!=e.dataset.source){if(e.dataset.places){const t=e.dataset.places.split(",").map(y);Promise.all(t).then(e=>{e=e.join("&municipality="),n(c+="search?q="+l+"&municipality="+e+"&offset="+i+"&limit="+a)})}}else e.dataset.places&&(s=e.dataset.places.split(",").join("&place="),n(c+="search?show-expired="+o+"&q="+l+"&place="+s+"&offset="+i+"&limit="+a))}function m(n,a){[].forEach.call(t.querySelectorAll(n),function(t){t.addEventListener("click",function(n){n.preventDefault(),function(t,...n){let a="string"==typeof t?e[t]:t;"function"==typeof a?a(...n):console.error(`${t} is Not a function!`)}(a,t)},!1)})}function g(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(/\b"+ c +"\b/g,"")}function y(e){const t=r+"taxonomy/search?offset=0&limit=10&type=municipality&show-count=false&q="+e;return new Promise(e=>u(t,function(t){let n=[];t.result.forEach(function(e){n.push(e.id)}),e(n)}))}function v(e){return c(e),null!=e.total.value?e.total.value:e.total}f.locale="sv",f.db={},f.set=e=>(t,...n)=>{const a=t.join("");let i=f.db[e]||(f.db[e]={});i[a]={t:t.slice(),v:n.map((e,t)=>t)};const o={for:e=>(t,...l)=>((i=f.db[e]||(f.db[e]={}))[a]={t:t.slice(),v:l.map((e,t)=>n.indexOf(e))},o)};return o},f.set("en")`Apply`.for("sv")`Ansök`,t.addEventListener("DOMContentLoaded",function(e){if(null!=t.getElementById("afModalWrapper"))return!1;if(c("document loaded"),null==(o=t.getElementById("afWidgetContainer")))throw new Error("can't find container for widget");d(i+"AfPbWidget.css"),d("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,800");const n=t.getElementById("afJobCount");if(null!=n){let e=n;null==n.dataset.q&&null==n.dataset.showexpired&&null==n.dataset.places&&(e=o),h(e,0,function(e){u(e,function(e){let t=v(e).toString().split("");n.innerHTML="",t.forEach(function(e){let t=p("span","letter",e);n.appendChild(t)})})})}const a=p("div");a.id="afModalWrapper",a.innerHTML='<div id=\'afModal\' class=\'afmodal\' style=\'display: none\'>\n        <a href="#close-modal" class="close-modal ">Close</a>\n        <div id="afmodalContent">\n          <div class=\'afmodal-header afRow\'>\n              <h2>Här har du jobben</h2>\n          </div>\n          <div class=\'afRow\' >\n              <div id=\'afListContent\' class="afListContent">\n                  <div class="afTable">\n                      <div id="afAnnonsTableBody" >\n                          \x3c!-- generated rows will go here--\x3e\n                      </div>\n                  </div>\n              </div>\n              <div class="afPaginationWrapper">\n                  <div class="afPagination"></div>\n              </div>\n          </div>\n        </div>\n      </div>',t.body.appendChild(a);let l=t.querySelector("#afmodalContent h2");if(l.innerText="Jobbannonser ",o.dataset.q){let e=t.createElement("span");e.className="afSelected",e.innerText=o.dataset.q,l.innerHTML="Annonser för ",l.appendChild(e)}if(o.dataset.places){let e=t.createElement("span");e.className="afSelected",e.innerText=o.dataset.places,l.innerHTML+=" att söka i ",l.appendChild(e)}o.onclick=function(e){e.preventDefault(),function(e,t){e.classList?e.classList.add(t):(arr=e.className.split(" "),-1==arr.indexOf(t)&&(e.className+=" "+t))}(a,"blocker"),a.firstChild.setAttribute("style","display: inline-block"),C(1)},m(".close-modal",function(e){g(a,"blocker"),a.firstChild.setAttribute("style","display: none")})});let b=function(e){"all"!=o.dataset.source&&(e.header=e.headline,e.location="",e.workplace_address.postcode&&(e.location+=e.workplace_address.postcode),e.workplace_address.municipality&&e.location.search(e.workplace_address.municipality)<1&&(e.location.length>0&&(e.location+=", "),e.location+=e.workplace_address.municipality),e.application={},e.application_details.email&&(e.application.url="mailto:"+e.application_details.email),e.application_details.url&&(e.application.url=e.application_details.url),e.application_deadline&&(e.application.deadline=e.application_deadline),e.markup=e.description.text),c(e);let t=p("div","afTableRow");t.id=e.id;let n=p("div","afTableCell"),a=p("div","afRow"),i=p("h3","",e.header),l=p("div","afJobplace");if(null!=e.employer.name&&(l.innerHTML=e.employer.name+", "),l.innerHTML+=e.location,a.appendChild(i),null!=e.application.deadline){let t=p("span","afDeadline","Sista ansökningsdagen: "+new Date(e.application.deadline).toLocaleDateString(void 0,{day:"2-digit",month:"2-digit",year:"numeric"}));a.appendChild(t)}if(a.appendChild(l),e.employer.logoUrl){let t=function(e){return e.replace("http:","https:")}(e.employer.logoUrl);s=t,r=function(e){if(1==e){let e=p("img","afListlogo");e.src=t,a.prepend(e)}},(d=new Image).onload=function(){r(!0)},d.onerror=function(){r(!1)},d.src=s}var s,r,d;let u=p("div","afReadMore"),h=p("a","afAdClose","Stäng");h.title="Stäng",u.appendChild(h);let m=p("article","afAdText",e.markup);u.appendChild(m);let g="";if(e.application.url?g=e.application.url:null!=e.sources&&e.sources[0].url&&(g=e.sources[0].url),g.length>1){let e=p("a","afApply");e.href=g,e.text=f`Apply`,g.search("mailto")<0&&(e.target="_blank"),u.appendChild(e)}return e.sista_ansokningsdag&&left.appendChild(dateElement),n.appendChild(a),n.appendChild(u),t.appendChild(n),t};async function C(n){h(o,n,function(n){u(n,function(n){let i=v(n);i>s&&(i=s),null==l&&(c("pagination inizialised"),(l=new a(t.getElementsByClassName("afPagination")[0],{currentPage:1,totalItems:i,itemsPerPage:o.dataset.limit,step:2,onInit:C})).onPageChanged(C));let r=t.getElementById("afAnnonsTableBody");r.innerHTML="";let d={};d=n.hits?n.hits:n.platsannonser,function(n,a=200,i="linear",o){const l={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e*e:(4-2*e)*e-1,easeInCubic:e=>e*e*e,easeOutCubic:e=>--e*e*e+1,easeInOutCubic:e=>e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e*e*e*e,easeOutQuart:e=>1- --e*e*e*e,easeInOutQuart:e=>e<.5?8*e*e*e*e:1-8*--e*e*e*e,easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>1+--e*e*e*e*e,easeInOutQuint:e=>e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},s=e.pageYOffset,r="now"in e.performance?performance.now():(new Date).getTime(),c=Math.max(t.body.scrollHeight,t.body.offsetHeight,t.documentElement.clientHeight,t.documentElement.scrollHeight,t.documentElement.offsetHeight),d=e.innerHeight||t.documentElement.clientHeight||t.getElementsByTagName("body")[0].clientHeight,u="number"==typeof n?n:n.offsetTop,f=Math.round(c-u<d?c-d:u);"requestAnimationFrame"in e!=0?function t(){const n="now"in e.performance?performance.now():(new Date).getTime(),c=Math.min(1,(n-r)/a),d=l[i](c);e.scroll(0,Math.ceil(d*(f-s)+s)),e.pageYOffset!==f?requestAnimationFrame(t):o&&o()}():o&&o()}(r,1e3),d.forEach(function(e){r.appendChild(b(e))}),m(".afTableRow h3",function(e){t.querySelectorAll(".afTableCell").forEach(function(e){g(e,"opened")}),e.parentNode.parentNode.className+=" opened"}),m(".afAdClose",function(){t.querySelectorAll(".afTableCell").forEach(function(e){g(e,"opened")})})})})}}(window,document)},function(e,t,n){var a=n(2);e.exports=function(e,t){var n,i=new a,o=t.currentPage||1,l=t.itemsPerPage||30,s=t.step||3,r=Math.ceil(t.totalItems/l);"function"==typeof t.onInit&&i.on("init",t.onInit),"function"==typeof t.onPageChanged&&i.on("pageChanged",t.onPageChanged);var c=r,d=!0;this.onPageChanged=function(e){return i.on("pageChanged",e),this},this.getCurrentPage=function(){return o},this.getPrevPage=function(){return o>1&&o--},this.getNextPage=function(){return o<c&&o++};var u=function(e){o>1&&(o--,p(e))},f=function(e){o<c&&(o++,p(e))},p=function(e){0==d&&i.fire("pageChanged",[o]),1==d&&(d=!1);var t=e.getElementsByTagName("span")[0];t.innerHTML=m(),h(e,t.getElementsByTagName("a"))},h=function(e,t){for(var n=0;n<t.length;n++)t[n].addEventListener("click",function(){o=this.innerText,p(e)},!1)},m=function(){var e="",t=2*s,n=function(t,n){for(var a=t;a<=n;++a)e+=a==o?'<a class="current pagNumber">'+a+"</a>":'<a class="pagNumber">'+a+"</a>"},a=function(){e+='<a class="pagNumber">1</a><i class="pagDots">...</i>'},i=function(){e+='<i class="pagDots">...</i><a class="pagNumber">'+c+"</a>"};return t>=c?n(1,c):o<t?(n(1,t),i()):o>c-t?(a(),n(c-t,c)):(a(),n(o-s,parseInt(o)+parseInt(s)),i()),e};!function(e){!function(e){e.innerHTML=['<a class="arrowLeft">&#9668;</a>',"<span></span>",'<a class="arrowRight">&#9658;</a>'].join("")}(e),function(e){(n=e.getElementsByTagName("a"))[0].addEventListener("click",function(){u(e)},!1),n[1].addEventListener("click",function(){f(e)},!1)}(e),p(e)}(e),i.fire("init",o)}},function(e,t){e.exports=function(){var e={},t={};this.on=function(n,a){if("function"!=typeof a)throw new Error("Callback must be function.");Array.isArray(n)||(n=[n]);for(var i=0;i<n.length;i++){var o=n[i];if(!this.isSuspended(o))return this.isActive(o)||(e[o]=[]),e[o].push(a),this;t[o].push(a)}},this.isRegistered=function(e){return this.isActive(e)||this.isSuspended(e)},this.isSuspended=function(e){return void 0!==t[e]},this.isActive=function(t){return void 0!==e[t]},this.remove=function(n){return this.isSuspended(n)?(delete t[n],!0):!!this.isActive(n)&&(delete e[n],!0)},this.suspend=function(n){return!!this.isActive(n)&&(t[n]=e[n],delete e[n],!0)},this.unsuspend=function(n){return!!this.isSuspended(n)&&(e[n]=t[n],delete t[n],!0)},this.fire=function(t,n){Array.isArray(n)||(n=[n]),Array.isArray(t)||(t=[t]);for(var a=0;a<t.length;a++){var i=t[a];if(this.isActive(i))for(var o=0;o<e[i].length;o++)e[i][o].apply(null,n)}return this}}},function(e,t,n){},function(e,t,n){}]);