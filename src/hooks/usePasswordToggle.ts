import { useState } from "react";

const usePasswordToggle = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [showConfirmPwd, setConfirmPwd] = useState<boolean>(false);

  const togglePwdVisiblity = () => {
    setShowPwd(!showPwd);
  };

  const toggleConfirmPwdVisiblity = () => {
    setConfirmPwd(!showConfirmPwd);
  };

  // const togglePwdVisiblity = useCallback(() => {
  //   setShowPwd(!showPwd);
  // }, [showPwd]);

  // const toggleConfirmPwdVisiblity = useCallback(() => {
  //   setConfirmPwd(!showConfirmPwd);
  // }, [showConfirmPwd]);

  return [
    showPwd,
    showConfirmPwd,
    togglePwdVisiblity,
    toggleConfirmPwdVisiblity,
  ] as const;
};

export default usePasswordToggle;
