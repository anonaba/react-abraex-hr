import { useState, useEffect , useCallback} from "react";
import swal from "sweetalert2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useLogOut = (isLogout: boolean) => {
    const [logOut, setLogOut] = useState<boolean>(isLogout);
    const [errMessage, setErrMessage] = useState<string>("");
    const LogoutFunc = useCallback(
        async () => {
        cookies.remove("token", { path: "/" });
        setLogOut(!logOut);
        swal.fire({
            icon: "warning",
            text:  errMessage ,
        }).then  (() => {
            window.location.href = "/login";
        });
        },
        [logOut, errMessage]
    )
    // const LogoutFunc = async () => {
    //     cookies.remove("token", { path: "/" });
    //     setLogOut(!logOut);
    //     swal.fire({
    //         icon: "warning",
    //         text:  errMessage ,
    //     }).then  (() => {
    //         window.location.href = "/login";
    //     });
    // };
    useEffect(() => {
        if (logOut) {
            LogoutFunc();
        }
    }, [logOut, LogoutFunc])
  
    return [setLogOut,setErrMessage] as const;
};

export default useLogOut;
