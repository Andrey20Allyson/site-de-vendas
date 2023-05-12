import { useAppSelector } from "../app/hooks";
import { userSelector } from "../app/slices/user";

export default function useAuth() {
  return useAppSelector(userSelector);
}