import type { Routes } from "@angular/router"
import { authGuard } from "./guard/auth.guard"
import { noAuthGuard } from "./guard/no-auth.guard"
import { AdminGuard } from "./guard/admin.guard"
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [noAuthGuard],
    loadComponent: () => import("./pages/login/login.page").then((m) => m.default),
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./pages/forgot-password/forgot-password.page").then((m) => m.ForgotPasswordPage),
  },
  {
    path: "reset-password",
    loadComponent: () => import("./pages/reset-password/reset-password.page").then((m) => m.ResetPasswordPage),
  },
  {
    path: "register",
    canActivate: [noAuthGuard],
    loadComponent: () => import("./pages/register/register.page").then((m) => m.RegisterPage),
  },
  {
    path: "home",
    loadComponent: () => import("./pages/home/home.page").then((m) => m.HomePage),
  },
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/dashboard/dashboard.page").then((m) => m.DashboardPage),
  },
  {
    path: "crear-recuerdo",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/crear-recuerdo/crear-recuerdo.page").then((m) => m.default),
  },
  {
    path: "recuerdo/:id",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/detalle-recuerdo/detalle-recuerdo.page").then((m) => m.default),
  },
  {
    path: "editar-recuerdo/:id",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/editar-recuerdo/editar-recuerdo.page").then((m) => m.default),
  },
  {
    path: "admin",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/admin/admin.page").then((m) => m.AdminPage),
  }
]

export { routes }
