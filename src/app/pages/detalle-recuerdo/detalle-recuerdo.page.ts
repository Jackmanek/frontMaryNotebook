import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule,  AlertController } from "@ionic/angular"
import { ActivatedRoute, Router } from "@angular/router"
import { RecuerdoService } from "../../services/recuerdo.service"
import { Recuerdo } from "../../models/recuerdo.model"

@Component({
  selector: "app-detalle-recuerdo",
  templateUrl: "./detalle-recuerdo.page.html",
  styleUrls: ["./detalle-recuerdo.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export default class DetalleRecuerdoPage implements OnInit {
  recuerdo: Recuerdo | null = null
  isLoading = true
  recuerdoId = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public recuerdoService: RecuerdoService,
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
        this.recuerdo = recuerdo
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error al cargar recuerdo:", error)
        this.isLoading = false
        this.router.navigate(["/home"])
      },
    })
  }

  editarRecuerdo() {
    this.router.navigate(["/editar-recuerdo", this.recuerdoId])
  }

  async confirmarEliminar() {
    const alert = await this.alertController.create({
      header: "¿Eliminar recuerdo?",
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
            this.eliminarRecuerdo()
          },
        },
      ],
    })

    await alert.present()
  }

  eliminarRecuerdo() {
    this.recuerdoService.eliminarRecuerdo(this.recuerdoId).subscribe({
      next: () => {
        this.router.navigate(["/home"])
      },
      error: (error) => {
        console.error("Error al eliminar recuerdo:", error)
      },
    })
  }

  volver() {
    this.router.navigate(["/home"])
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha)
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return date.toLocaleDateString("es-ES", opciones)
  }
}
