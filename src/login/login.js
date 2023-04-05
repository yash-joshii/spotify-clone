// import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

//Defining the Essentials
const CLIENT_ID = "8c219004ff2646d7b5a9f85a13725b77";

const scopes =
  "user-top-read user-follow-read playlist-read-private user-library-read";

const REDIRECT_URI = "http://localhost:3000/login/login.html";
const ACCESS_TOKEN_KEY = "accessToken";
const App_Url = "http://localhost:3000";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Autherizing the User
const AutherizeUser = () => {
  // const url = `https://accounts.spotify.com/authorize?client_id=${Client_ID}&response_type=token&redirect_uri=${Redirect_Uri}&scope=${Scope}&show_dialog=true`;

  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;

  window.open(url, "login", "width=800,height=800");
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Login Button function
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-to-spotify");
  loginButton.addEventListener("click", AutherizeUser);
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Stroing the Essentials we get back from Spotify in LocalStorages .
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("tokenType", tokenType);
  localStorage.setItem("tokenType", Date.now() + tokenType * 1000);
  console.log(accessToken, expiresIn, tokenType);
  window.location.href = App_Url;
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//On Loading : KAfter the verification or account creation closing the popup window..
// check for errors..
// if no error then, confirming the login and re directing to Dashboard
// getting the accessCode ,tokentype, expiresIn (Link expiry) credential provided by spotify on succesfull login>

window.addEventListener("load", () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY); //Storing the AccessTokenKey
  if (accessToken) {
    window.location.href = `${App_Url}/dashboard/dashboard.html`;
  }
  //chekcing wheather the windoew is closed?
  if (window.opener !== null && !window.opener.closed) {
    window.focus();

    if (window.location.href.includes("error")) {
      window.close();
    }
    //Accessing and Storing the Data provided in AccessTokenKey
    const { hash } = window.location;

    console.log(hash);
    const searchParams = new URLSearchParams(hash);
    const accessToken = searchParams.get("#access_token");
    const tokenType = searchParams.get("token_type");
    const expiresIn = searchParams.get("expires_in");

    //PAssing the Data to setIteminlocalStorage to set these above values.
    if (accessToken) {
      window.close();

      window.opener.setItemsInLocalStorage({
        accessToken,
        tokenType,
        expiresIn,
      });
    } else {
      window.close();
    }
  }
});
