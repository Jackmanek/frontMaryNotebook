import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { Router } from "@angular/router"
import { RecuerdoService } from "../../services/recuerdo.service"

@Component({
  selector: "app-crear-recuerdo",
  templateUrl: "./crear-recuerdo.page.html",
  styleUrls: ["./crear-recuerdo.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export default class CrearRecuerdoPage {
  texto = ""
  etiquetasInput = ""
  imagenFile: File | null = null
  imagenPreview: string | null = null
  isLoading = false
  errorMessage = ""

  constructor(
    private recuerdoService: RecuerdoService,
    private router: Router,
  ) {}

  onImageSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.imagenFile = file

      // Crear preview
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  eliminarImagen() {
    this.imagenFile = null
    this.imagenPreview = null
  }

  crearRecuerdo() {
    if (!this.texto.trim()) {
      this.errorMessage = "El texto del recuerdo es obligatorio"
      return
    }

    if (this.texto.length > 2000) {
      this.errorMessage = "El texto no puede superar los 2000 caracteres"
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const etiquetas = this.etiquetasInput
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0)

    this.recuerdoService.crearRecuerdoConImagen(this.texto, etiquetas, this.imagenFile || undefined).subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(["/home"])
      },
      error: (error) => {
        console.error("Error al crear recuerdo:", error)
        this.errorMessage = "Error al crear el recuerdo. Intenta de nuevo."
        this.isLoading = false
      },
    })
  }

  volver() {
    this.router.navigate(["/home"])
  }
}
