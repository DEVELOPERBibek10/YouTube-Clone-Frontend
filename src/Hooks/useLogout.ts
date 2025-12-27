import { logoutUser } from "@/API/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Add this
  return useMutation({
    mutationFn: () => logoutUser(),
    onSettled: () => {
      queryClient.clear();
      queryClient.setQueryData(["current-user"], null);
      navigate("/sign-in", { replace: true });
    },
  });
};
