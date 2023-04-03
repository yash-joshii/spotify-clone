import './style.css';

document.addEventListener("DOMContentLoaded",()=>{
  if(localStorage.getItem("accesstoken")){
    window.location.href = "dashboard/dashboard.html"
  }else{
    window.location.href = "login/login.html"
  }
})



