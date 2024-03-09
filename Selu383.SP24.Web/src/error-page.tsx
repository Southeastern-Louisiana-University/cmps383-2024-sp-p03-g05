import {useRouteError } from "react-router-dom";
import sadFace from "./assets/sad-face-icon.svg";
import Footer from "./elements/footer";
import NavigationBar from "./elements/NavigationBar";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <NavigationBar/>
      <center>
        <h1>Oops!</h1>
      <p>Something When Wrong</p>
      <img src={sadFace} style={{height: 300}} />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      </center>
      <Footer/>
    </div>
  );
}