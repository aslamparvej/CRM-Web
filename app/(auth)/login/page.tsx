import LoginForm from "@/components/form/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your AFS Desk workspace.",
};

const Login = () => {

  return <LoginForm />
};

export default Login;
