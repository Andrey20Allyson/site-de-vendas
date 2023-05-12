import { useAppSelector } from "../app/hooks";
import { userIdSelector } from "../app/slices/user";

export default function useUserId() {
  return useAppSelector(userIdSelector);
}