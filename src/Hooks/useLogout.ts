import { logoutUser } from "@/API/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["current-user"] });
    },
  });
};
