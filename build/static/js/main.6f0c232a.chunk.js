(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(15),o=n.n(u),c=n(16),l=n(2),i=function(e){var t=e.value,n=e.setter;return r.a.createElement("input",{value:t,onChange:function(e){return n(e.target.value)}})},m=function(e){var t=e.submitHandler,n=e.newNameState,a=e.newNumState;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Add Person"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"name: ",r.a.createElement(i,{value:n.value,setter:n.updater})),r.a.createElement("div",null,"number: ",r.a.createElement(i,{value:a.value,setter:a.updater})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},s=n(4),d=n.n(s),f="api/persons",b=function(){return d.a.get(f).then((function(e){return e.data}))},p=b,h=function(e){return d.a.post(f,e).then((function(e){return e.data}))},v=function(e,t){return d.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data})).catch((function(e){return console.log(e.response.status),e.response}))},E=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(){return b()}))},g=function(e){var t=e.id,n=e.name,a=e.number,u=e.deleteFunc;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,n," ",a),r.a.createElement("button",{onClick:function(){return u(t)}},"delete"))},w=function(e){var t=e.persons,n=e.deleteFunc;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Numbers"),t.map((function(e){var t=e.id,a=e.name,u=e.number;return r.a.createElement(g,{key:t,id:t,name:a,number:u,deleteFunc:n})})))},S=function(e){var t=e.input,n=e.handler;return r.a.createElement(r.a.Fragment,null,r.a.createElement("strong",null,"Search: "),r.a.createElement("input",{value:t,onChange:n}))},j=function(e){var t=e.message,n=e.error;if(null===t)return null;var a=n?{backgroundColor:"#86868F",border:"solid #F20505",borderRadius:30,fontStyle:"italic",fontSize:"20px",padding:"10px",marginBottom:"10px"}:{backgroundColor:"#86868F",border:"solid #31C423",borderRadius:30,fontStyle:"italic",fontSize:"20px",padding:"10px",marginBottom:"10px"};return r.a.createElement("div",{style:a},t)},O=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],u=t[1],o=Object(a.useState)(""),i=Object(l.a)(o,2),s=i[0],d=i[1],f=Object(a.useState)(""),b=Object(l.a)(f,2),g=b[0],O=b[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),F=y[0],C=y[1],x=Object(a.useState)(!0),N=Object(l.a)(x,2),B=N[0],R=N[1],T=Object(a.useState)(null),z=Object(l.a)(T,2),A=z[0],H=z[1],J=Object(a.useState)(!1),L=Object(l.a)(J,2),P=L[0],D=L[1],I=B?n:n.filter((function(e){return e.name.toLowerCase().includes(F.toLowerCase())}));return Object(a.useEffect)((function(){p().then((function(e){u(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(j,{message:A,error:P}),r.a.createElement(S,{input:F,handler:function(e){R(""===e.target.value),C(e.target.value)}}),r.a.createElement(m,{submitHandler:function(e){e.preventDefault();var t={id:s,name:s,number:g},a=n.find((function(e){return e.name===s}));a?window.confirm("".concat(s," is already in the phonebook. Replace old number with a new one?"))&&v(a.id,t).then((function(e){404===e.status?(D(!0),H(e.data.error),setTimeout((function(){H(null),D(!1)}),3e3)):(u(n.map((function(t){return t.id===s?e.data:t}))),H("".concat(s," was successfully updated in phonebook")),d(""),O(""),setTimeout((function(){H(null)}),3e3))})):h(t).then((function(e){u([].concat(Object(c.a)(n),[e])),H("".concat(s," was successfully added to phonebook")),d(""),O(""),setTimeout((function(){H(null)}),3e3)}))},newNameState:{value:s,updater:d},newNumState:{value:g,updater:O}}),r.a.createElement(w,{persons:I,deleteFunc:function(e){window.confirm("Are you sure you want to delete ".concat(e," from the phonebook?"))&&E(e).then((function(e){u(e)}))}}))};o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.6f0c232a.chunk.js.map