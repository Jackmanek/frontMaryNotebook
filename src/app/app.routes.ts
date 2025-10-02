import type { Routes } from "@angular/router"
import { authGuard } from "./guard/auth.guard"
import { noAuthGuard } from "./guard/no-auth.guard"

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [noAuthGuard],
    loadComponent: () => import("./pages/login/login.page").then((m) => m.default),
  },
  {
    path: "register",
    canActivate: [noAuthGuard],
    loadComponent: () => import("./pages/register/register.page").then((m) => m.default),
  },
  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/home/home.page").then((m) => m.default),
  },
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./pages/dashboard/dashboard.page").then((m) => m.default),
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
]

export { routes }
