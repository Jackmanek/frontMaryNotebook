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
import { AuthService, ForgotPasswordDTO } from "../../services/auth.service"

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
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
    FormsModule
  ],
})
export class ForgotPasswordPage {
  email = ""
  isLoading = false
  errorMessage = ""
  successMessage = ""
  emailSent = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.email) {
      this.errorMessage = "Por favor ingresa tu email"
      return
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      this.errorMessage = "Por favor ingresa un email válido"
      return
    }

    this.isLoading = true
    this.errorMessage = ""
    this.successMessage = ""

    const dto: ForgotPasswordDTO = { email: this.email }

    this.authService.forgotPassword(dto).subscribe({
      next: (response) => {
        this.isLoading = false
        this.emailSent = true
        this.successMessage = response
      },
      error: (error) => {
        this.isLoading = false
        // Por seguridad, mostramos el mismo mensaje aunque falle
        this.emailSent = true
        this.successMessage = "Si el email existe, recibirás un enlace de recuperación."
        console.error("Forgot password error:", error)
      },
    })
  }

  goToLogin(): void {
    this.router.navigate(["/login"])
  }

  irAHome(): void {
    this.router.navigate(["/home"])
  }
}

export default ForgotPasswordPage
