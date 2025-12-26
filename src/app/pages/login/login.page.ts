import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import {
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonSpinner,
  IonButtons
} from "@ionic/angular/standalone"
import { AuthService } from "../../services/auth.service"
import { LoginDTO } from "../../models/login-dto.model"

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonSpinner,
  IonButtons,
  CommonModule,
  FormsModule],
})
export class LoginPage {
  loginData: LoginDTO = {
    email: "",
    password: "",
  }

  showPassword = false
  isLoading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  async onLogin(): Promise<void> {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = "Por favor completa todos los campos"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    this.authService.login(this.loginData).subscribe({
      next: (token) => {
        this.isLoading = false
        this.router.navigate(["/home"])
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = "Email o contraseña incorrectos"
        console.error("Login error:", error)
      },
    })
  }

  goToRegister(): void {
    this.router.navigate(["/register"])
  }

  irAHome() {
    this.router.navigate(["/home"])
  }
}

export default LoginPage
