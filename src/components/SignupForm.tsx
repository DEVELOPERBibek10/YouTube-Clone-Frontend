import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { CirclePlay, Eye, EyeClosed } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/lib/Zod/schema";
import { Link, useNavigate } from "react-router-dom";
import { defaultRegisterUser } from "@/constants/auth.constants.ts";
import UploadAvatar from "./shared/uploadAvatar";
import { useState } from "react";
import { useCreateUser } from "@/Hooks/useCreateUser";
import { useLogin } from "@/Hooks/useLogin";

import type { RegisterUserData } from "@/types";

function convertToFormData(obj: RegisterUserData) {
  const formData = new FormData();
  if (obj.avatar && obj.avatar.length > 0) {
    formData.append("avatar", obj.avatar[0]);
  }
  formData.append("fullName", obj.fullName);
  formData.append("username", obj.username);
  formData.append("email", obj.email);
  formData.append("password", obj.password);

  return formData;
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  const { mutateAsync: loginUser, isPending: isLoggingIn } = useLogin();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: defaultRegisterUser,
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    try {
      const multipartFormData = convertToFormData(values);
      const user = await createUser(multipartFormData);
      if (!user || !user.data.success || user.status === 204) {
        throw new Error(
          user.data.message || "Error occured while creating user!"
        );
      }

      const loggedInUser = await loginUser({
        email: values.email,
        password: values.password,
      });

      if (
        !loggedInUser ||
        !loggedInUser.data.success ||
        loggedInUser.status === 204
      ) {
        throw new Error(
          loggedInUser.data.message || "Error occured while creating user!"
        );
      }
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }
      console.error(error);
    }
    form.reset();
  };

  return (
    <Card className="w-full max-w-lg bg-white border-0 rounded-sm flex flex-col gap-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]">
      <CardHeader>
        <div className="flex w-full gap-1.5 items-center justify-center mb-1.5">
          <CirclePlay size={50} color="#0000FF" />
          <div>
            <span className="text-2xl font-semibold">Vid</span>
            <span className="text-2xl font-semibold text-primary">Tube</span>
          </div>
        </div>
        <CardTitle className="w-full text-center text-xl">
          Sign up for an account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col justify-center gap-3">
              <>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <UploadAvatar fieldChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 border rounded-lg border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2">Username</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 border rounded-lg border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-2">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 border rounded-lg border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-2">Password</FormLabel>
                    <FormControl>
                      <div className="w-full relative">
                        <Input
                          className="h-12 border rounded-lg border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(false)}
                            className="absolute right-4 top-3 cursor-pointer"
                            color="gray"
                          />
                        ) : (
                          <EyeClosed
                            onClick={() => setShowPassword(true)}
                            className="absolute right-4 top-3 cursor-pointer"
                            color="gray"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer mt-5">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <p>
          Already have an account ?
          <Link to="/sign-in" className="text-primary text-base ml-1 underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
