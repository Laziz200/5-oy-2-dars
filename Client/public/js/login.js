let socket=io("http://localhost:4000");
username.addEventListener("change",(evt)=>{
    let val = evt.target.value.trim();
    if(!val)return alert("Username required!");
    window.localStorage.setItem("username",val);
    window.location.href="/"
})
