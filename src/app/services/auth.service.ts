import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"
import { environment } from "../../environments/environment"
import { RegistroUsuarioDTO } from "../models/registro-usuario-dto.model"
import { LoginDTO } from "../models/login-dto.model"
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../models/usuario.model"

interface JwtPayload {
  sub: string;     // normalmente el email o id del usuario
  nombre?: string; // si en tu token incluyes el nombre
  email?: string;
  exp?: number;
}


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken())
  public token$ = this.tokenSubject.asObservable()

  constructor(private http: HttpClient) {}

  register(dto: RegistroUsuarioDTO): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, dto, { responseType: "text" })
  }

  login(dto: LoginDTO): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, dto, { responseType: "text" }).pipe(
      tap((token) => {
        this.setToken(token)
        this.tokenSubject.next(token)
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("auth_token")
    this.tokenSubject.next(null)
  }

  private setToken(token: string): void {
    localStorage.setItem("auth_token", token)
  }

  getToken(): string | null {
    const token = localStorage.getItem("auth_token");
    return localStorage.getItem("auth_token")
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  getUsuarioActual(): Usuario | null{

    const token = this.getToken();
    if (!token) return null;

    try{
      const decoded = jwtDecode<JwtPayload & {rol?: "USER" | "ADMIN"}> (token);

      if(!decoded || (!decoded.sub && !decoded.nombre)){
        return null;
      }

      if(!decoded.rol){
        return null;
      }
      return {
        id: 0, // El ID no está en el token, asignamos 0 o podrías manejarlo de otra forma
        nombre: decoded.nombre || decoded.sub || "",
        email: decoded.email || "",
        rol: decoded.rol,
        fechaRegistro: "",
        activo: true,
        ultimoAcceso: "", // La fecha de registro no está en el token
      };

    }catch(err){
      console.error("Error al decodificar token", err);
      return null;
    }
  }
}
