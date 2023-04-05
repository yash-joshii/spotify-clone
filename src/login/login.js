const CLIENT_ID = "8c219004ff2646d7b5a9f85a13725b77";

const scopes =
  "user-top-read user-follow-read playlist-read-private user-library-read";

const REDIRECT_URI = "http://localhost:3001/login/login.html";
const ACCESS_TOKEN_KEY = "accessToken";
const APP_URL = "http://localhost:3001";

const authorizeUser = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
  window.open(url, "login", "width=800,height=600");
};

document.addEventListener("DOMContentLoaded", () => {
  const loginbutton = document.getElementById("login-to-spotify");

  loginbutton.addEventListener("click", authorizeUser);
});
Window.SetItemsLocalStorage = ({ accessToken, expireIn, token_type }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expireIn", expireIn);
  localStorage.setItem("token_type", token_type);
  Window.location.href = APP_URL;


};
Window.addEventListener("load", () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    Window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  }
  if (Window.opener !==null && !Window.opener.closed) {
    Window.focus();
    if (Window.location.href.includes("error")) {
      Window.close();
    }
    const {hash} = Window.location;

    const searchParams = new URLSearchParams(hash);
    
    const accessToken = searchParams.get("#access_token");
    const token_type = searchParams.get("token_type");
    const expireIn = searchParams.get("expire_in");
    if (accessToken) {
      Window.close();

      Window.opener.SetItemsLocalStorage({ accessToken, expireIn, token_type });
    } else {
      Window.close();
    }
  }
});
