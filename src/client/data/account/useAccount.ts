import { useAccountStore } from "@/client/data/account/useAccountStore";

export const useAccount = () => {
  return useAccountStore();
};
