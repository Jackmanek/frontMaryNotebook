import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"
import { environment } from "../../environments/environment"
import { RegistroUsuarioDTO } from "../models/registro-usuario-dto.model"
import { LoginDTO } from "../models/login-dto.model"

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
    console.log("JWT token:", token); // Para confirmar que existe
    return localStorage.getItem("auth_token")
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}
