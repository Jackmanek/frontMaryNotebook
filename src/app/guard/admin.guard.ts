import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = this.authService.getUsuarioActual()

    // Verificar si el usuario está autenticado y es admin
    if (usuario && usuario.rol === 'ADMIN') {
      return true
    }

    // Redirigir al dashboard si no es admin
    return this.router.createUrlTree(['/dashboard'])
  }
}
