import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ACTUAL_HREF, IS_DEV } from "../utils/storage-keys";

export default function useDevLocation() {
  const isDev = useMemo(() => {
    return sessionStorage.getItem(IS_DEV) === 'true';
  }, []);

  if (!isDev) return;

  const navigate = useNavigate();
  
  useEffect(() => {
    const href = sessionStorage.getItem(ACTUAL_HREF);
    if (href && href !== location.pathname) {
      navigate(href);
    }
  }, []);
}