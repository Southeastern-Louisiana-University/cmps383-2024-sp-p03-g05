import { Link, useRouteError } from "react-router-dom";
import sadFace from "./assets/sad-face-icon.svg";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>This Page has not been Completed Yet</p>
      <img src={sadFace} style={{height: 300}} />
      <h2> <Link to={'/'}> Click Here to Go back Home</Link> </h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}