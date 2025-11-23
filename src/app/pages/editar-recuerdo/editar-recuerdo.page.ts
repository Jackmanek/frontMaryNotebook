import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule,  AlertController } from "@ionic/angular"
import  { ActivatedRoute, Router } from "@angular/router"
import  { RecuerdoService } from "../../services/recuerdo.service"
import { Visibilidad } from "../../models/visibilidad.enum"

@Component({
  selector: "app-editar-recuerdo",
  templateUrl: "./editar-recuerdo.page.html",
  styleUrls: ["./editar-recuerdo.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export default class EditarRecuerdoPage implements OnInit {
  recuerdoId = 0
  texto = ""
  etiquetasInput = ""
  imagenFile: File | null = null
  imagenPreview: string | null = null
  imagenActual: string | null = null
  isLoading = false
  errorMessage = ""
  visibilidad: Visibilidad = Visibilidad.PRIVADO

  Visibilidad = Visibilidad

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recuerdoService: RecuerdoService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.recuerdoId = Number.parseInt(id, 10)
      this.cargarRecuerdo()
    }
  }

  cargarRecuerdo() {
    this.isLoading = true
    this.recuerdoService.obtenerRecuerdo(this.recuerdoId).subscribe({
      next: (recuerdo) => {
        this.texto = recuerdo.texto
        this.etiquetasInput = recuerdo.etiquetas.map((e) => e.nombre).join(", ")
        this.imagenActual = recuerdo.imagen || null
        this.imagenPreview = recuerdo.imagen || null
        this.visibilidad = recuerdo.visibilidad
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error al cargar recuerdo:", error)
        this.isLoading = false
        this.router.navigate(["/dashboard"])
      },
    })
  }

  onImageSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.imagenFile = file

      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  async confirmarEliminarImagen() {
    const alert = await this.alertController.create({
      header: "¿Eliminar imagen?",
      message: "Esta acción no se puede deshacer.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          role: "destructive",
          handler: () => {
            this.eliminarImagen()
          },
        },
      ],
    })

    await alert.present()
  }

  eliminarImagen() {
    if (this.imagenActual) {
      this.recuerdoService.eliminarImagen(this.recuerdoId).subscribe({
        next: () => {
          this.imagenActual = null
          this.imagenPreview = null
          this.imagenFile = null
        },
        error: (error) => {
          console.error("Error al eliminar imagen:", error)
        },
      })
    } else {
      this.imagenFile = null
      this.imagenPreview = null
    }
  }

actualizarRecuerdo() {
  if (!this.texto.trim()) {
    this.errorMessage = "El texto del recuerdo es obligatorio";
    return;
  }

  if (this.texto.length > 2000) {
    this.errorMessage = "El texto no puede superar los 2000 caracteres";
    return;
  }

  this.isLoading = true;
  this.errorMessage = "";

  let etiquetas: string[] | null;

  // 🔹 Si el usuario escribió algo → procesar etiquetas
  if (this.etiquetasInput.trim().length > 0) {
    etiquetas = this.etiquetasInput
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
  }

  // 🔹 Si no escribió nada → NO modificar etiquetas existentes
  else if (this.etiquetasInput === "") {
    etiquetas = null;
  }

  // 🔹 Si el input existe pero vacío explícitamente (usuario borró todo)
  else {
    etiquetas = [];
  }

  this.recuerdoService
    .actualizarRecuerdo(
      this.recuerdoId,
      this.texto,
      etiquetas,
      this.visibilidad,
      this.imagenFile || undefined
    )
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/recuerdo", this.recuerdoId]);
      },
      error: (error) => {
        console.error("Error al actualizar recuerdo:", error);
        this.errorMessage = "Error al actualizar el recuerdo. Intenta de nuevo.";
        this.isLoading = false;
      },
    });
}


  volver() {
    this.router.navigate(["/recuerdo", this.recuerdoId])
  }
}
