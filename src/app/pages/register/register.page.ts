import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { IonicModule } from "@ionic/angular"
import { AuthService } from "../../services/auth.service"
import { RegistroUsuarioDTO } from "../../models/registro-usuario-dto.model"

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage {
  registerData: RegistroUsuarioDTO = {
    nombre: "",
    email: "",
    password: "",
  }

  confirmPassword = ""
  showPassword = false
  showConfirmPassword = false
  isLoading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword
  }

  async onRegister(): Promise<void> {
    if (!this.registerData.nombre || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = "Por favor completa todos los campos"
      return
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden"
      return
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false
        this.router.navigate(["/login"])
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = "Error al crear la cuenta. El email podría estar en uso."
        console.error("Register error:", error)
      },
    })
  }

  goToLogin(): void {
    this.router.navigate(["/login"])
  }
}

export default RegisterPage
