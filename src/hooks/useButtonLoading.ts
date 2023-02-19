import { useState } from "react";

const useButtonLoading = (initialState: boolean) => {
  const [loading, setLoading] = useState(initialState);

  const reset = (loading: boolean) => {
    setLoading(loading);
  };

  return [loading, reset] as const;
};

export default useButtonLoading;
