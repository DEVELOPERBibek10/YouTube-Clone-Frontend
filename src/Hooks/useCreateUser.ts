import { registerUser } from "@/API/auth";

import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (credential: FormData) => await registerUser(credential),
  });
};
