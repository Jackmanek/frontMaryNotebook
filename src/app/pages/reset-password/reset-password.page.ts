import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
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
import { AuthService, ResetPasswordDTO } from "../../services/auth.service"

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.page.html",
  styleUrls: ["./reset-password.page.scss"],
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
export class ResetPasswordPage implements OnInit {
  token = ""
  nuevaPassword = ""
  confirmarPassword = ""
  showPassword = false
  showConfirmPassword = false
  isLoading = false
  errorMessage = ""
  successMessage = ""
  resetComplete = false
  tokenInvalid = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtener el token de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || ""
      if (!this.token) {
        this.tokenInvalid = true
        this.errorMessage = "No se encontró el token de recuperación. Por favor solicita un nuevo enlace."
      }
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  async onSubmit(): Promise<void> {
    // Validaciones
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.errorMessage = "Por favor completa todos los campos"
      return
    }

    if (this.nuevaPassword.length < 6) {
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
      return
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorMessage = "Las contraseñas no coinciden"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const dto: ResetPasswordDTO = {
      token: this.token,
      nuevaPassword: this.nuevaPassword
    }

    this.authService.resetPassword(dto).subscribe({
      next: (response) => {
        this.isLoading = false
        this.resetComplete = true
        this.successMessage = response
      },
      error: (error) => {
        this.isLoading = false
        if (error.status === 400) {
          this.errorMessage = "El enlace ha expirado o es inválido. Por favor solicita uno nuevo."
        } else {
          this.errorMessage = "Ocurrió un error. Por favor intenta nuevamente."
        }
        console.error("Reset password error:", error)
      },
    })
  }

  goToLogin(): void {
    this.router.navigate(["/login"])
  }

  goToForgotPassword(): void {
    this.router.navigate(["/forgot-password"])
  }
}

export default ResetPasswordPage
