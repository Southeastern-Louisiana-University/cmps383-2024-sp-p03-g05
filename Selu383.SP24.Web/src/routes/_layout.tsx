import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { useFetch } from "use-http";
import NavBar from "../elements/NavigationBar";
import Footer from "../elements/footer";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);

  useFetch(
    "/api/authentication/me",
    {
      onNewData: (_, x) => {
        console.log(x);
        if (typeof x === "object") {
          setCurrentUser(x);
        } else {
          setCurrentUser(null);
        }
      },
    },
    []
  );

  useEffect(() => {
    console.log("layout loaded");
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
        <NavBar />
        <Outlet />
        <Footer />
      </AuthContext.Provider>
    </>
  );
}