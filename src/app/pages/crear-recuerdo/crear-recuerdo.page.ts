import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import {
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonText,
  IonBadge
} from "@ionic/angular/standalone"
import  { Router } from "@angular/router"
import  { RecuerdoService } from "../../services/recuerdo.service"
import { Visibilidad } from "../../models/visibilidad.enum"

@Component({
  selector: "app-crear-recuerdo",
  templateUrl: "./crear-recuerdo.page.html",
  styleUrls: ["./crear-recuerdo.page.scss"],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonText,
  IonBadge],
})
export default class CrearRecuerdoPage {
  texto = ""
  etiquetasInput = ""
  imagenFile: File | null = null
  imagenPreview: string | null = null
  isLoading = false
  errorMessage = ""
  visibilidad: Visibilidad = Visibilidad.PRIVADO

  Visibilidad = Visibilidad

  constructor(
    private recuerdoService: RecuerdoService,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.resetFormulario();
  }

  resetFormulario() {
    this.texto = "";
    this.etiquetasInput = "";
    this.imagenFile = null;
    this.imagenPreview = null;
    this.isLoading = false;
    this.errorMessage = "";
    this.visibilidad = Visibilidad.PRIVADO;
  }

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

    this.recuerdoService
      .crearRecuerdoConImagen(this.texto, etiquetas, this.visibilidad, this.imagenFile || undefined)
      .subscribe({
        next: () => {
          this.isLoading = false
          this.resetFormulario();
          this.router.navigate(["/dashboard"])
        },
        error: (error) => {
          console.error("Error al crear recuerdo:", error)
          this.errorMessage = "Error al crear el recuerdo. Intenta de nuevo."
          this.isLoading = false
        },
      })
  }

  volver() {
    this.router.navigate(["/dashboard"])
  }
}
