(this["webpackJsonplink-in.bio"]=this["webpackJsonplink-in.bio"]||[]).push([[0],{25:function(e,t,a){e.exports=a.p+"static/media/loading.ef474d09.gif"},46:function(e,t,a){e.exports=a(76)},51:function(e,t,a){},52:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),i=a.n(l),o=(a(51),a(4)),c=a(5),s=a(7),u=a(6),d=(a(52),a(16)),m=a(45),p=function(e){var t=e.component,a=Object(m.a)(e,["component"]);return r.a.createElement(d.b,Object.assign({},a,{render:function(){return localStorage.getItem("token")?r.a.createElement(t,null):r.a.createElement(d.a,{to:"/failedlogin"})}}))},h=a(9),g=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Link-In.bio/"),r.a.createElement("div",{className:"signupcards"},r.a.createElement(h.b,{to:"/register",style:{textDecoration:"none",color:"black"}},r.a.createElement("div",{className:"signup"},r.a.createElement("h3",null,"I'm here for my own LinkList"),r.a.createElement("p",null,"Let's Begin - Register - "))),r.a.createElement(h.b,{to:"/login",style:{textDecoration:"none",color:"black"}},r.a.createElement("div",{className:"signup"},r.a.createElement("h3",null,"I already have an account"),r.a.createElement("p",null,"I want to modify my LinkList")))))},E=a(18),f=a.n(E),b=a(24),L=a(13),I=a(19),S=a(41),y=a.n(S),k=a(8),v=a(3),R=a.n(v);function C(e){return function(t){return t({type:"GET_LIST_ID_START"}),R.a.get("https://link-in-bio.limited/l/".concat(e)).then((function(e){t({type:"GET_LIST_ID_SUCCESS",payload:e.data})})).catch((function(e){t({type:"GET_LIST_ID_FAILED",payload:e})}))}}var T=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleChange2=function(e){e.preventDefault(),n.setState(Object(L.a)({},e.target.name,e.target.value))},n.handleSubmit=function(){var e=Object(b.a)(f.a.mark((function e(t){var a,r,l,i,o,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!n.state.isVerified){e.next=15;break}return a=n.state,r=a.email,l=a.password,i=a.firstName,o=a.lastName,c=a.profilePictureURL,e.prev=3,n.setState({email:"",password:"",firstName:"",lastName:"",profilePictureURL:""}),e.next=7,n.props.register(r,l,i,o,c);case 7:n.props.history.push("./dashboard"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),alert(e.t0.message);case 13:e.next=16;break;case 15:alert("Please check the box to indicate you are a human!");case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}(),n.recaptchaLoaded=n.recaptchaLoaded.bind(Object(I.a)(n)),n.verifyCallback=n.verifyCallback.bind(Object(I.a)(n)),n.state={email:"",password:"",firstName:"",lastName:"",profilePictureURL:"",isVerified:!1},n}return Object(c.a)(a,[{key:"recaptchaLoaded",value:function(){console.log("catcha successfully loaded")}},{key:"verifyCallback",value:function(e){e&&this.setState({isVerified:!0})}},{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.firstName,l=e.lastName,i=e.profilePictureURL;return r.a.createElement("div",null,r.a.createElement("div",{className:"signupheader"},r.a.createElement("h1",null,"LinkList Sign Up"),r.a.createElement("p",null,"Thanks for your interest!")),r.a.createElement("form",{id:"registrationForm",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"email",placeholder:"Email",value:t,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:a,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"firstName",placeholder:"First Name",value:n,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"lastName",placeholder:"Last Name",value:l,onChange:this.handleChange2,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"profilePictureURL",placeholder:"Profile Picture URL",value:i,onChange:this.handleChange2}),r.a.createElement("br",null),r.a.createElement(y.a,{sitekey:"6Lf5n-cUAAAAACjg7VIXj2fUkfGK-zkeQ2mSXNGX",render:"explicit",onloadCallback:this.recaptchaLoaded,verifyCallback:this.verifyCallback}),r.a.createElement("br",null),r.a.createElement("button",{className:"abutton",type:"submit"},"Sign Up")))}}]),a}(r.a.Component),U={register:function(e,t,a,n,r){return function(l){return l({type:"REGISTER_USER_START"}),R.a.post("https://link-in-bio.limited/auth/register",{email:e,password:t,firstName:a,lastName:n,profilePictureURL:r}).then((function(e){var t=e.data;return console.log("registration payload",t),localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.userId),localStorage.setItem("email",e.data.email),localStorage.setItem("firstName",e.data.firstName),localStorage.setItem("profilePictureURL",e.data.profilePictureURL),R.a.post("https://link-in-bio.limited/l/new",{userId:e.data.userId,backColor:"#ffffff",txtColor:"#000000",fontSelection:"Roboto"}).then((function(e){console.log("res after create list after register",e),localStorage.setItem("listId",e.data.listId),console.log("getting saved item?",localStorage.getItem("listId")),console.log("listId",e.data.listId),console.log("typeof listId",typeof e.data.listId),alert("User Registration Complete, Try Logging in now!"),l({type:"REGISTER_USER_SUCCESS",payload:t}),console.log("end of code")})).catch((function(e){l({type:"REGISTER_USER_FAILED",payload:e})}))})).catch((function(e){l({type:"REGISTER_USER_FAILED",payload:e})}))}}},O=Object(d.g)(Object(k.b)(null,U)(T)),_=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleChange=function(t){t.preventDefault(),e.setState(Object(L.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.email,r=a.password;e.props.login(n,r).then((function(){e.props.history.push("./dashboard")})).catch((function(e){console.error(e)}))},e.state={email:"",password:""},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=this.props.isLoading;return r.a.createElement("div",null,r.a.createElement("h1",null,"Log In"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"email",placeholder:"email",value:t,onChange:this.handleChange}),r.a.createElement("br",null),r.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:a,onChange:this.handleChange}),r.a.createElement("br",null),n?r.a.createElement("p",null,"Logging in..."):r.a.createElement("button",{type:"submit"},"Log In")))}}]),a}(r.a.Component),j={login:function(e,t){return function(a){return a({type:"LOGIN_USER_START"}),R.a.post("https://link-in-bio.limited/auth/login",{email:e,password:t}).then((function(e){var t=e.data;localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.userId),localStorage.setItem("email",e.data.email),localStorage.setItem("firstName",e.data.firstName),a({type:"LOGIN_USER_SUCCESS",payload:t})})).catch((function(e){var t=e.response?e.response.data:e;a({type:"LOGIN_USER_FAILED",payload:t}),console.log(e,"LOG IS HERE <---")}))}}},N=Object(d.g)(Object(k.b)((function(e){return{isLoading:e.isLoading,errorMessage:e.errorMessage}}),j)(_)),D=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Your login attempt failed. Please go back and try again."))},x=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleChange=function(t){t.preventDefault(),e.setState(Object(L.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.userId,r=a.backColor,l=a.txtColor,i=a.fontSelection;e.props.createList(n,r,l,i),e.setState({userId:"",backColor:"",txtColor:"",fontSelection:""})},e.state={userId:localStorage.getItem("userId"),backColor:"#ffffff",txtColor:"#000000",fontSelection:"sans-serif"},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this.state,t=e.userId,a=e.backColor,n=e.txtColor,l=e.fontSelection;return r.a.createElement("div",null,r.a.createElement("h1",{className:"newpickupheader"},"Create A List"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"userId",value:t,placeholder:localStorage.getItem("userId"),onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"backColor",value:a,placeholder:"Set Background Color",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"txtColor",value:n,placeholder:"Set Text Color",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"fontSelection",value:l,placeholder:"Set Font",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"abutton2"},"Create List")))}}]),a}(r.a.Component),w={createList:function(e,t,a,n){return function(r){return r({type:"CREATE_LIST_START"}),R.a.post("https://link-in-bio.limited/l/new",{userId:e,backColor:t,txtColor:a,fontSelection:n}).then((function(e){localStorage.setItem("listId",e.data.listId),r({type:"CREATE_LIST_SUCCESS",payload:e.data})})).catch((function(e){r({type:"CREATE_LIST_FAILED",payload:e})}))}}},A=Object(k.b)(null,w)(x),Y=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleChange=function(t){t.preventDefault(),e.setState(Object(L.a)({},t.target.name,t.target.value))},e.handleSubmit=function(){var t=Object(b.a)(f.a.mark((function t(a){var n,r,l,i,o,c,s;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n=e.state,r=n.userId,l=n.listId,i=n.referencingURL,o=n.description,c=n.linkTitle,s=n.imgURL,t.prev=2,e.setState({userId:localStorage.getItem("userId"),listId:"",referencingURL:"",description:"",linkTitle:"",imgURL:""}),t.next=6,e.props.addEntry(r,l,i,o,c,s);case 6:e.props.history.push("./dashboard"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),alert(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}(),e.state={userId:localStorage.getItem("userId"),listId:localStorage.getItem("listId"),referencingURL:"",description:"",linkTitle:"",imgURL:""},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this.state,t=(e.userId,e.listId,e.referencingURL),a=e.description,n=e.linkTitle,l=e.imgURL;return r.a.createElement("div",null,r.a.createElement("h1",{className:"newpickupheader"},"Add a Link to Your List"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("p",{className:"addEntryText"},"Add a URL in the form http://.../ "),r.a.createElement("p",{className:"addEntryText"},"Or in the form https://.../ "),r.a.createElement("p",{className:"addEntryText"},"(starting with http or https and ending in a slash)"),r.a.createElement("p",{className:"addEntryText"},"Add an Image URL in the form http://.../...jpg "),r.a.createElement("p",{className:"addEntryText"},"Or in the form https://.../...bmp "),r.a.createElement("p",{className:"addEntryText"},"(starting with http or https)"),r.a.createElement("p",{className:"addEntryText"},"(and ending in the file extension of the linked image)"),r.a.createElement("input",{type:"text",name:"referencingURL",value:t,placeholder:"Link URL",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"linkTitle",value:n,placeholder:"Link Title",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"description",value:a,placeholder:"Link Description",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"imgURL",value:l,placeholder:"Image URL",onChange:this.handleChange}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"abutton2"},"Add Link to List")))}}]),a}(r.a.Component),F={addEntry:function(e,t,a,n,r,l){return function(i){return i({type:"ADD_ENTRY_START"}),R.a.post("https://link-in-bio.limited/e/new",{userId:e,listId:t,referencingURL:a,description:n,linkTitle:r,imgURL:l}).then((function(e){console.log("addEntry res.data.message",e.data.message),console.log("addEntry res.data",e.data);var t="https://link-in-bio.limited/s/?eid=".concat(e.data.result[0].entryId,"&ref=").concat(e.data.result[0].referencingURL,"&red=f");return R.a.get(t).then((function(e){console.log("statsRes",e),alert("Entry added successfully, Try Returning to Your Dashboard and Refreshing the Page"),i({type:"ADD_ENTRY_SUCCESS",payload:e.data})}))})).catch((function(e){i({type:"ADD_ENTRY_FAILED",payload:e})}))}}},P=Object(d.g)(Object(k.b)(null,F)(Y)),G=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).handleClick2=function(e){e.preventDefault(),C(localStorage.getItem("userId"))},e.handleSubmit=function(t){t.preventDefault();var a=e.state,n=a.userId,r=a.backColor,l=a.txtColor,i=a.fontSelection;e.props.createList(n,r,l,i),e.setState({userId:"",backColor:"",txtColor:"",fontSelection:""})},e.state={userId:localStorage.getItem("userId"),listId:""},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Your List Id:"),r.a.createElement("button",{type:"submit"},"Click Here"))}}]),a}(r.a.Component),M={getListId:C},V=(Object(k.b)(null,M)(G),a(25)),q=a.n(V),B=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleChange=function(e){e.preventDefault(),n.setState(Object(L.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.entryId,r=t.referencingURL,l=t.description,i=t.linkTitle,o=t.imgURL;console.log(i,l,r,a,o),n.props.editEntry(a,r,l,i,o),n.setState({referencingURL:"",description:"",linkTitle:"",imgURL:""})},n.state={isLoading:!1,entryId:"",referencingURL:"",description:"",linkTitle:"",imgURL:""},n}return Object(c.a)(a,[{key:"UNSAFE_componentWillMount",value:function(e){var t=this,a="https://link-in-bio.limited/e".concat(this.props.match.url);return R.a.get(a).then((function(e){console.log("response",e),t.setState({userId:e.data[0].userId}),t.setState({entryId:e.data[0].entryId}),t.setState({referencingURL:e.data[0].referencingURL}),t.setState({description:e.data[0].description}),t.setState({linkTitle:e.data[0].linkTitle}),t.setState({imgURL:e.data[0].imgURL})}))}},{key:"render",value:function(e){var t=this.state,a=(t.entryId,t.referencingURL),n=t.description,l=t.linkTitle,i=t.imgURL;return r.a.createElement("div",null,r.a.createElement("h1",{className:"newpickupheader"},"Edit an Entry"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("p",null,"Link URL:"),r.a.createElement("input",{type:"text",name:"referencingURL",value:a,placeholder:"Link URL",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("p",null,"Link Title:"),r.a.createElement("input",{type:"text",name:"linkTitle",value:l,placeholder:"Link Title",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("p",null,"Link Description:"),r.a.createElement("input",{type:"text",name:"description",value:n,placeholder:"Link Description",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("p",null,"Link Image URL:"),r.a.createElement("input",{type:"text",name:"imgURL",value:i,placeholder:"Link Image URL",onChange:this.handleChange,required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"abutton2"},"Submit Changes to Link")),r.a.createElement(h.b,{to:"/dashboard"},r.a.createElement("span",{className:"abutton"},"Back")))}}]),a}(r.a.Component),W={editEntry:function(e,t,a,n,r){return function(l){return l({type:"EDIT_ENTRY_START"}),R.a.put("https://link-in-bio.limited/e/replaceEntry",{entryId:e,referencingURL:t,description:a,linkTitle:n,imgURL:r}).then((function(e){console.log("editEntry res.data",e.data),alert("Entry Edited Successfully"),l({type:"EDIT_ENTRY_SUCCESS",payload:e.data})})).catch((function(e){l({type:"EDIT_ENTRY_FAILED",payload:e})}))}}},X=Object(k.b)(null,W)(B),H=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={links:[],isLoading:!0,goodId:null,counts:[],isLoadingListId:!0},n}return Object(c.a)(a,[{key:"deleteEntry",value:function(e){console.log("entryId",e);return R.a.post("https://link-in-bio.limited/e/deleteEntry/",{entryId:e}).then((function(e){console.log(e),alert("Entry successfully deleted"),window.location.reload(!1)}))}},{key:"UNSAFE_componentWillMount",value:function(e){var t=this,a="https://link-in-bio.limited/s/aio/".concat(localStorage.getItem("userId"));return R.a.get(a).then((function(e){return e})).then((function(e){console.log("data",e),t.setState({isLoading:!1});var a=e.data.filter((function(e){return e.hasOwnProperty("linkTitle")}));console.log("dataNoEmpties",a);var n=a.map((function(e){return r.a.createElement("div",{className:"signup",key:e.referencingURL},r.a.createElement("a",{className:"linkTitle",href:"".concat(e.referencingURL)},r.a.createElement("img",{className:"image",src:e.imgURL,alt:e.imgURL})," ",r.a.createElement("br",null)," ",r.a.createElement("br",null),e.linkTitle)," ",r.a.createElement("br",null),r.a.createElement("p",null,e.description),r.a.createElement("br",null),r.a.createElement("p",null,"View Count: ",e.count),r.a.createElement("br",null),r.a.createElement(h.b,{to:"/editEntry/".concat(e.entryId)},r.a.createElement("span",{className:"abutton"},"Edit Entry")),r.a.createElement("button",{className:"abutton",onClick:function(){t.deleteEntry(e.entryId)}},"Delete Entry"))}));t.setState({links:n})}))}},{key:"render",value:function(){return!0===this.state.isLoading?r.a.createElement("img",{src:q.a,style:{width:"200px"}}):r.a.createElement("div",{className:"linkList"},r.a.createElement("div",null,this.state.links))}}]),a}(r.a.Component),J=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={listId:null,isLoadingListId:!0,isLoadingListViews:!0,listViews:null},n}return Object(c.a)(a,[{key:"logout",value:function(){localStorage.removeItem("listId"),localStorage.removeItem("email"),localStorage.removeItem("firstName"),localStorage.removeItem("userId"),localStorage.removeItem("token")}},{key:"componentDidMount",value:function(e){var t=this,a="https://link-in-bio.limited/l/list4user/".concat(localStorage.getItem("userId"));return R.a.get(a).then((function(e){console.log("dashboard cdm",e.data),t.setState({isLoadingListId:!1}),localStorage.setItem("listId",e.data[0].listId),t.setState({listId:e.data[0].listId})})).then((function(e){console.log("stuff",e);var a=localStorage.getItem("listId"),n="https://link-in-bio.limited/s/listViews/".concat(a);return R.a.get(n).then((function(e){console.log("successfully viewing listViews"),console.log("response.data",e.data.listViews),t.setState({listViews:e.data.listViews}),t.setState({isLoadingListViews:!1}),console.log("listViews updated"),console.log("this.state",t.state)})).catch((function(e){return console.log(e)}))}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Dashboard"),r.a.createElement("p",null,"Welcome ",localStorage.getItem("firstName"),"!"),r.a.createElement("p",null,"Your User Id is ",localStorage.getItem("userId")),r.a.createElement("p",null,"Your List Id is ",localStorage.getItem("listId")),r.a.createElement("p",null,"Your List Views is ",this.state.isLoadingListViews?r.a.createElement("span",null," Loading..."):this.state.listViews),r.a.createElement("p",null,"To get started, create a list, then add your entries!"),r.a.createElement("p",null,"Your LinkList will be hosted at: ",r.a.createElement("a",{alt:"Your LinkList",href:"http://link-in.bio/".concat(localStorage.getItem("userId"))},"http://link-in.bio/",localStorage.getItem("userId"))),r.a.createElement("br",null),r.a.createElement("a",{href:"#neworder3",className:"abutton",role:"button",id:"createNewEntry"},"Create a New Entry"),r.a.createElement("div",{className:"modal",id:"neworder3"},r.a.createElement("div",{className:"modal-container"},r.a.createElement(P,null),r.a.createElement("a",{href:"#",className:"abutton2",role:"button"},"Close"))),r.a.createElement("div",null,r.a.createElement(H,null)),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(h.b,{onClick:this.logout,to:"/"},r.a.createElement("span",{className:"abutton"},"Log Out")),r.a.createElement("h4",null,"\xa92020 Link-In.bio/"))}}]),a}(r.a.Component),z=Object(d.g)(Object(k.b)((function(e){return{loggedUser:e.loggedUser}}))(J)),K=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={links:[],rawLinks:null,isLoading:!0,goodId:null,listId:null,profilePictureURL:null,displayingUserInfo:null,userFirstLastName:null},n}return Object(c.a)(a,[{key:"UNSAFE_componentWillMount",value:function(e){var t=this,a="https://link-in-bio.herokuapp.com".concat(this.props.match.url);return R.a.get(a).then((function(e){return e})).then((function(e){console.log("data",e),t.setState({isLoading:!1}),console.log("data.data.listid",e.data[0].listId);var a=e.data[0].listId,n="".concat(e.data[0].firstName," ").concat(e.data[0].lastName[0].slice(0,1),"."),l="".concat(e.data[0].profilePictureURL);t.setState({listId:a}),t.setState({profilePictureURL:l}),t.setState({userFirstLastName:n}),console.log("this.state",t.state);var i=e.data.map((function(e){return r.a.createElement("div",{className:"signup",key:e.entryId},r.a.createElement("a",{className:"linkTitle",href:"http://link-in-bio.herokuapp.com/s/?eid=".concat(e.entryId,"&ref=").concat(e.referencingURL)},r.a.createElement("img",{className:"image",src:e.imgURL,alt:e.imgURL})," ",r.a.createElement("br",null)," ",r.a.createElement("br",null),e.linkTitle)," ",r.a.createElement("br",null),r.a.createElement("p",null,e.description))}));t.setState({links:i});var o="https://link-in-bio.limited/s/ili/".concat(t.state.listId);return R.a.get(o).then((function(e){console.log("response",e),console.log("list visit successfully logged")})).catch((function(e){return console.log(e)}))}))}},{key:"render",value:function(){return!0===this.state.isLoading?r.a.createElement("img",{src:q.a,alt:"Loading...",style:{width:"200px"}}):r.a.createElement("div",{className:"linkList"},r.a.createElement("div",null,this.state.links),r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement("img",{src:this.state.profilePictureURL,alt:this.state.profilePictureURL,style:{width:"200px"}}),r.a.createElement("br",null),this.state.userFirstLastName),r.a.createElement("p",null,"~List Creator~")),r.a.createElement("h4",null,"\xa92020 ",r.a.createElement("a",{href:"http://link-in.bio/"},"Link-In.bio/")))}}]),a}(r.a.Component),Q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:g}),r.a.createElement(d.b,{exact:!0,path:"/register",render:function(t){return r.a.createElement(O,Object.assign({},t,{history:e.props.history}))}}),r.a.createElement(d.b,{exact:!0,path:"/login",component:N}),r.a.createElement(d.b,{exact:!0,path:"/failedlogin",component:D}),r.a.createElement(d.b,{exact:!0,path:"/listdisplay",component:K}),r.a.createElement(p,{exact:!0,path:"/dashboard",component:z}),r.a.createElement(p,{exact:!0,path:"/createlist",component:A}),r.a.createElement(p,{exact:!0,path:"/addentry",component:P}),r.a.createElement(d.b,{path:"/editEntry/:entryId",render:function(e){return r.a.createElement(X,e)}}),r.a.createElement(d.b,{path:"/:id",render:function(e){return r.a.createElement(K,e)}})))}}]),a}(r.a.Component),Z=a(21),$=a(43),ee=a(44),te=a.n(ee),ae=a(2),ne={},re=Object(Z.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REGISTER_USER_START":return Object(ae.a)({},e,{isLoading:!0});case"REGISTER_USER_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,payload:t.payload,errorMessage:null});case"REGISTER_USER_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"LOGIN_USER_START":return Object(ae.a)({},e,{isLoading:!0});case"LOGIN_USER_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,payload:t.payload,errorMessage:null,loggedUser:t.payload});case"LOGIN_USER_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"CREATE_LIST_START":return Object(ae.a)({},e,{isLoading:!0});case"CREATE_LIST_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,errorMessage:null});case"CREATE_LIST_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"ADD_ENTRY_START":return Object(ae.a)({},e,{isLoading:!0});case"ADD_ENTRY_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,errorMessage:null});case"ADD_ENTRY_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"EDIT_ENTRY_START":return Object(ae.a)({},e,{isLoading:!0});case"EDIT_ENTRY_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,errorMessage:null,successMessage:t.payload});case"EDIT_ENTRY_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"UPDATE_ENTRY_START":return Object(ae.a)({},e,{isLoading:!0});case"UPDATE_ENTRY_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,errorMessage:null,successMessage:t.payload});case"UPDATE_ENTRY_FAILED":return Object(ae.a)({},e,{isLoading:!1,errorMessage:t.payload});case"DELETE_ENTRY_START":return Object(ae.a)({},e,{isLoading:!0});case"DELETE_ENTRY_SUCCESS":return Object(ae.a)({},e,{isLoading:!1});case"DELETE_ENTRY_FAILED":return Object(ae.a)({},e,{isLoading:!1,error:t.payload});case"GET_LIST_ID_START":return Object(ae.a)({},e,{isLoading:!0});case"GET_LIST_ID_SUCCESS":return Object(ae.a)({},e,{isLoading:!1,payload:t.payload});case"GET_LIST_ID_FAILED":return Object(ae.a)({},e,{isLoading:!1,error:t.payload});default:return e}}),Object(Z.a)($.a,te.a));i.a.render(r.a.createElement(k.a,{store:re},r.a.createElement(h.a,null,r.a.createElement(d.d,null,r.a.createElement(Q,null)))),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.11b3e279.chunk.js.map