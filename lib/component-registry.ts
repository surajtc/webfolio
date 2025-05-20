import { Index } from "@/components/demo";
import LoginForm from "@/components/demo/login/login-form";
import DashboardPage from "@/components/demo/dashboard/dashboard-page";
// import { LoginForm } from "@/components/login";
// Add more imports as needed

export const ComponentRegistry = {
  demo: Index,
  login: LoginForm,
  dashboard: DashboardPage,
  // login: LoginForm,
  // ...
};

export type ComponentKey = keyof typeof ComponentRegistry;
