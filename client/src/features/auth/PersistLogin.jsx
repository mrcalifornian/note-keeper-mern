import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");

        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // console.log("no persists");
    content = <Outlet />;
  } else if (isLoading) {
    // console.log("loading");
    content = <PulseLoader color="FFF" />;
  } else if (isError) {
    // console.log("error");
    content = (
      <p className="errmsg">
        {error?.data?.message}
        {"  "}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }
  // else {
  //   console.log(persist, isLoading, isSuccess, trueSuccess, error);
  // }

  return content;
};

export default PersistLogin;
