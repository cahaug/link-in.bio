(this["webpackJsonplink-in.bio"]=this["webpackJsonplink-in.bio"]||[]).push([[0],{43:function(e,t,a){e.exports=a(72)},48:function(e,t,a){},49:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),o=a.n(l),c=(a(48),a(3)),i=a(4),s=a(7),u=a(5),d=a(8),m=(a(49),a(19)),p=a(42),h=function(e){var t=e.component,a=Object(p.a)(e,["component"]);return r.a.createElement(m.b,Object.assign({},a,{render:function(){return localStorage.getItem("token")?r.a.createElement(t,null):r.a.createElement(m.a,{to:"/failedlogin"})}}))},g=a(14),E=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Link-In.bio/"),r.a.createElement("div",{className:"signupcards"},r.a.createElement(g.b,{to:"/register",style:{textDecoration:"none",color:"black"}},r.a.createElement("div",{className:"signup"},r.a.createElement("h3",null,"I'm here for my own LinkList"),r.a.createElement("p",null,"Let's Begin - Register - "))),r.a.createElement(g.b,{to:"/login",style:{textDecoration:"none",color:"black"}},r.a.createElement("div",{className:"signup"},r.a.createElement("h3",null,"I already have an account"),r.a.createElement("p",null,"I want to modify my LinkList")))))},b=a(15),f=a(6),S=a(18),I=a.n(S),L="REGISTER_USER_START",y="REGISTER_USER_SUCCESS",v="REGISTER_USER_FAILED",C="LOGIN_USER_START",O="LOGIN_USER_SUCCESS",j="LOGIN_USER_FAILED",k="CREATE_LIST_START",T="CREATE_LIST_SUCCESS",N="CREATE_LIST_FAILED",_="ADD_ENTRY_START",R="ADD_ENTRY_SUCCESS",D="ADD_ENTRY_FAILED",x="GET_LIST_ID_START",w="GET_LIST_ID_SUCCESS",U="GET_LIST_ID_FAILED";function A(e){return function(t){return t({type:x}),I.a.get("https://link-in-bio.herokuapp.com/l/".concat(e)).then((function(e){t({type:w,payload:e.data})})).catch((function(e){t({type:U,payload:e})}))}}var Y=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleChange2=function(t){t.preventDefault(),e.setState(Object(b.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.email,r=a.password,l=a.firstName,o=a.lastName;e.props.register(n,r,l,o),e.setState({email:"",password:"",firstName:"",lastName:""}),e.props.history.push("./dashboard")},e.state={email:"",password:"",firstName:"",lastName:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.firstName,l=e.lastName;return r.a.createElement("div",null,r.a.createElement("div",{className:"signupheader"},r.a.createElement("h1",null,"LinkList Sign Up"),r.a.createElement("p",null,"Thanks for your interest!")),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"email",placeholder:"Email",value:t,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:a,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"firstName",placeholder:"First Name",value:n,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"lastName",placeholder:"Last Name",value:l,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Sign Up")))}}]),t}(r.a.Component),q={register:function(e,t,a,n){return function(r){return r({type:L}),I.a.post("https://link-in-bio.herokuapp.com/auth/register",{email:e,password:t,firstName:a,lastName:n}).then((function(e){var t=e.data;localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.userId),localStorage.setItem("email",e.data.email),localStorage.setItem("firstName",e.data.firstName),r({type:y,payload:t})})).catch((function(e){r({type:v,payload:e})}))}}},M=Object(f.b)(null,q)(Y),G=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){t.preventDefault(),e.setState(Object(b.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.email,r=a.password;e.props.login(n,r).then((function(){e.props.history.push("./dashboard")})).catch((function(e){console.error(e)}))},e.state={email:"",password:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=this.props.isLoading;return r.a.createElement("div",null,r.a.createElement("h1",null,"Log In"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"email",placeholder:"email",value:t,onChange:this.handleChange}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:a,onChange:this.handleChange}),r.a.createElement("br",null),n?r.a.createElement("p",null,"Logging in..."):r.a.createElement("button",{type:"submit"},"Log In")))}}]),t}(r.a.Component),F={login:function(e,t){return function(a){return a({type:C}),I.a.post("https://link-in-bio.herokuapp.com/auth/login",{email:e,password:t}).then((function(e){var t=e.data;localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.userId),localStorage.setItem("email",e.data.email),localStorage.setItem("firstName",e.data.firstName),a({type:O,payload:t})})).catch((function(e){var t=e.response?e.response.data:e;a({type:j,payload:t}),console.log(e,"LOG IS HERE <---")}))}}},P=Object(m.g)(Object(f.b)((function(e){return{isLoading:e.isLoading,errorMessage:e.errorMessage}}),F)(G)),B=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Your login attempt failed. Please go back and try again."))},H=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){t.preventDefault(),e.setState(Object(b.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.userId,r=a.backColor,l=a.txtColor,o=a.fontSelection;e.props.createList(n,r,l,o),e.setState({userId:"",backColor:"",txtColor:"",fontSelection:""})},e.state={userId:localStorage.getItem("userId"),backColor:"#ffffff",txtColor:"#000000",fontSelection:"sans-serif"},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.userId,a=e.backColor,n=e.txtColor,l=e.fontSelection;return r.a.createElement("div",null,r.a.createElement("h1",{className:"newpickupheader"},"Create A List"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"userId",value:t,placeholder:localStorage.getItem("userId"),onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"backColor",value:a,placeholder:"Set Background Color",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"txtColor",value:n,placeholder:"Set Text Color",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"fontSelection",value:l,placeholder:"Set Font",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"abutton2"},"Create List")))}}]),t}(r.a.Component),J={createList:function(e,t,a,n){return function(r){return r({type:k}),I.a.post("https://link-in-bio.herokuapp.com/l/new",{userId:e,backColor:t,txtColor:a,fontSelection:n}).then((function(e){localStorage.setItem("listId",e.data.listId),r({type:T,payload:e.data})})).catch((function(e){r({type:N,payload:e})}))}}},W=Object(f.b)(null,J)(H),z=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){t.preventDefault(),e.setState(Object(b.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.userId,r=a.listId,l=a.referencingURL,o=a.description,c=a.linkTitle;e.props.addEntry(n,r,l,o,c),e.setState({userId:localStorage.getItem("userId"),listId:"",referencingURL:"",description:"",linkTitle:""})},e.state={userId:localStorage.getItem("userId"),listId:"",referencingURL:"",description:"",linkTitle:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.userId,a=e.listId,n=e.referencingURL,l=e.description,o=e.linkTitle;return r.a.createElement("div",null,r.a.createElement("h1",{className:"newpickupheader"},"Add a Link to Your List"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"userId",value:t,placeholder:"Your User Id",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"listId",value:a,placeholder:"Your List Id",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"referencingURL",value:n,placeholder:"URL to Link",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"description",value:l,placeholder:"Link Description",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"linkTitle",value:o,placeholder:"Add A Title for Your Link",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"abutton2"},"Add Link to List")))}}]),t}(r.a.Component),K={addEntry:function(e,t,a,n,r){return function(l){return l({type:_}),I.a.post("https://link-in-bio.herokuapp.com/e/new",{userId:e,listId:t,referencingURL:a,description:n,linkTitle:r}).then((function(e){console.log("addEntry res.data.message",e.data.message),l({type:R,payload:e.data})})).catch((function(e){l({type:D,payload:e})}))}}},Q=Object(f.b)(null,K)(z),V=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleClick2=function(e){e.preventDefault(),A(localStorage.getItem("userId"))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.userId,r=a.backColor,l=a.txtColor,o=a.fontSelection;e.props.createList(n,r,l,o),e.setState({userId:"",backColor:"",txtColor:"",fontSelection:""})},e.state={userId:localStorage.getItem("userId"),listId:""},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Your List Id:"),r.a.createElement("button",{type:"submit"},"Click Here"))}}]),t}(r.a.Component),X={getListId:A},Z=(Object(f.b)(null,X)(V),Object(m.g)(Object(f.b)((function(e){return{loggedUser:e.loggedUser}}))((function(e){return r.a.createElement("div",null,r.a.createElement("h1",null,"Dashboard"),r.a.createElement("p",null,"Welcome ",localStorage.getItem("firstName"),"!"),r.a.createElement("p",null,"Your User Id is ",localStorage.getItem("userId")),r.a.createElement("p",null,"Your List Id is ",localStorage.getItem("listId")),r.a.createElement("p",null,"To get started, create a list, then add your entries!"),r.a.createElement("p",null,"Your LinkList will be hosted at: ",r.a.createElement("a",{alt:"Your LinkList",href:"https://link-in.bio/"},"https://link-in.bio/",localStorage.getItem("userId"))),r.a.createElement("a",{href:"#neworder",className:"abutton",role:"button"},"Create a New List"),r.a.createElement("div",{className:"modal",id:"neworder"},r.a.createElement("div",{className:"modal-container"},r.a.createElement(W,null),r.a.createElement("a",{href:"#",className:"abutton2",role:"button"},"Close"))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{href:"#neworder3",className:"abutton",role:"button"},"Create a New Entry"),r.a.createElement("div",{className:"modal",id:"neworder3"},r.a.createElement("div",{className:"modal-container"},r.a.createElement(Q,null),r.a.createElement("a",{href:"#",className:"abutton2",role:"button"},"Close"))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(g.b,{to:"/"},r.a.createElement("span",{className:"abutton"},"Log Out")))})))),$=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={links:[],isLoading:!0,goodId:null},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(e){var t=this;return I.a.get("https:/link-in-bio.herokuapp.com".concat(this.props.match.url)).then((function(e){return console.log("response",e),e.data})).then((function(e){console.log("data",e),console.log(t.state),t.setState({isLoading:!1}),console.log(t.state);var a=e.map((function(e){return r.a.createElement("div",{className:"signup",key:e.linkTitle},r.a.createElement("a",{href:"".concat(e.referencingURL)},e.linkTitle),r.a.createElement("p",null,e.description))}));console.log("state",t.state),console.log("links",a),t.setState({links:a})}))}},{key:"render",value:function(){return!0===this.state.isLoading?r.a.createElement("h1",null,"Loading..."):r.a.createElement("div",null,r.a.createElement("div",null,this.state.links))}}]),t}(r.a.Component),ee=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m.b,{exact:!0,path:"/",component:E}),r.a.createElement(m.b,{exact:!0,path:"/:id",render:function(e){return r.a.createElement($,e)}}),r.a.createElement(m.b,{exact:!0,path:"/register",component:M}),r.a.createElement(m.b,{exact:!0,path:"/login",component:P}),r.a.createElement(m.b,{exact:!0,path:"/failedlogin",component:B}),r.a.createElement(m.b,{exact:!0,path:"/listdisplay",component:$}),r.a.createElement(h,{exact:!0,path:"/dashboard",component:Z}),r.a.createElement(h,{exact:!0,path:"/createlist",component:W}),r.a.createElement(h,{exact:!0,path:"/addentry",component:Q}))}}]),t}(r.a.Component),te=a(21),ae=a(40),ne=a(41),re=a.n(ne),le=a(2),oe={},ce=Object(te.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:return Object(le.a)({},e,{isLoading:!0});case y:return Object(le.a)({},e,{isLoading:!1,payload:t.payload,errorMessage:null});case v:return Object(le.a)({},e,{isLoading:!1,errorMessage:t.payload});case C:return Object(le.a)({},e,{isLoading:!0});case O:return Object(le.a)({},e,{isLoading:!1,payload:t.payload,errorMessage:null,loggedUser:t.payload});case j:return Object(le.a)({},e,{isLoading:!1,errorMessage:t.payload});case k:return Object(le.a)({},e,{isLoading:!0});case T:return Object(le.a)({},e,{isLoading:!1,errorMessage:null});case N:return Object(le.a)({},e,{isLoading:!1,errorMessage:t.payload});case _:return Object(le.a)({},e,{isLoading:!0});case R:return Object(le.a)({},e,{isLoading:!1,errorMessage:null});case D:return Object(le.a)({},e,{isLoading:!1,errorMessage:t.payload});case"UPDATE_ENTRY_START":return Object(le.a)({},e,{isLoading:!0});case"UPDATE_ENTRY_SUCCESS":return Object(le.a)({},e,{isLoading:!1,errorMessage:null});case"UPDATE_ENTRY_FAILED":return Object(le.a)({},e,{isLoading:!1,errorMessage:t.payload});case"DELETE_ENTRY_START":return Object(le.a)({},e,{isLoading:!0});case"DELETE_ENTRY_SUCCESS":return Object(le.a)({},e,{isLoading:!1});case"DELETE_ENTRY_FAILED":return Object(le.a)({},e,{isLoading:!1,error:t.payload});case x:return Object(le.a)({},e,{isLoading:!0});case w:return Object(le.a)({},e,{isLoading:!1,payload:t.payload});case U:return Object(le.a)({},e,{isLoading:!1,error:t.payload});default:return e}}),Object(te.a)(ae.a,re.a));o.a.render(r.a.createElement(f.a,{store:ce},r.a.createElement(g.a,null,r.a.createElement(m.d,null,r.a.createElement(ee,null)))),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.640e495a.chunk.js.map