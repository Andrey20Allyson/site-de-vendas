import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REDIRECT_PATH } from "../utils/storage-keys";

export default function useRedirectPath() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = sessionStorage.getItem(REDIRECT_PATH);
    sessionStorage.removeItem(REDIRECT_PATH);
    if (path && path !== location.pathname) {
      navigate(path);
    }
  }, []);
}