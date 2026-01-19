import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
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
import  { AuthService } from "../../services/auth.service"
import  { RecuerdoTimelineDTO } from "../../models/recuerdo-timeline-dto.model"
import { Visibilidad } from "../../models/visibilidad.enum"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
  standalone: true,
  imports: [
  CommonModule,
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
export class DashboardPage implements OnInit {
  recuerdos: RecuerdoTimelineDTO[] = []
  filtroEtiqueta = ""
  isLoading = false

  // Paginación
  currentPage = 0
  pageSize = 10
  totalPages = 0
  hasMore = true

  // Enum para usar en template
  Visibilidad = Visibilidad

  constructor(
    public recuerdoService: RecuerdoService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarMisRecuerdos()
    this.recuerdoService.recuerdoCreado$.subscribe(()=>{
    this.currentPage = 0;
    this.recuerdos = [];
    this.cargarMisRecuerdos();
    });
  }
  ionViewWillEnter() {
    // Cada vez que vuelves a Home, recarga
    this.currentPage = 0;
    this.recuerdos = [];
    this.cargarMisRecuerdos();
  }

  cargarMisRecuerdos(event?: any) {
    this.isLoading = true

    this.recuerdoService
      .obtenerTimelinePaginado(this.currentPage, this.pageSize, this.filtroEtiqueta || undefined)
      .subscribe({
        next: (response) => {
          if (event) {
            // Infinite scroll
            this.recuerdos = [...this.recuerdos, ...(response.content ?? [])]
            event.target.complete()
          } else {
            // Primera carga o refresh
            this.recuerdos = response.content ?? []
          }
          this.totalPages = response.totalPages
          this.hasMore = this.currentPage < response.totalPages - 1
          this.isLoading = false
          console.log("Esto es recuerdo" + this.recuerdos[0].imagen)
        },
        error: (error) => {
          console.error("Error al cargar mis recuerdos:", error)
          this.isLoading = false
          if (event) {
            event.target.complete()
          }
        },
      })
  }

  loadMore(event: any) {
    this.currentPage++
    this.cargarMisRecuerdos(event)
  }

  filtrarPorEtiqueta(etiqueta: string) {
    this.filtroEtiqueta = etiqueta
    this.currentPage = 0
    this.recuerdos = []
    this.cargarMisRecuerdos()
  }

  limpiarFiltro() {
    this.filtroEtiqueta = ""
    this.currentPage = 0
    this.recuerdos = []
    this.cargarMisRecuerdos()
  }

  verDetalle(id: number) {
    this.router.navigate(["/recuerdo", id])
  }

  editarRecuerdo(id: number, event: Event) {
    event.stopPropagation()
    this.router.navigate(["/editar-recuerdo", id])
  }

  async eliminarRecuerdo(id: number, event: Event) {
    event.stopPropagation()

    const confirmacion = confirm("¿Estás seguro de que quieres eliminar este recuerdo?")
    if (!confirmacion) return

    this.recuerdoService.eliminarRecuerdo(id).subscribe({
      next: () => {
        this.recuerdos = this.recuerdos.filter((r) => r.id !== id)
      },
      error: (error) => {
        console.error("Error al eliminar recuerdo:", error)
        alert("Error al eliminar el recuerdo")
      },
    })
  }

  crearRecuerdo() {
    this.router.navigate(["/crear-recuerdo"])
  }

  doRefresh(event: any) {
    this.currentPage = 0
    this.recuerdos = []
    this.cargarMisRecuerdos()
    setTimeout(() => {
      event.target.complete()
    }, 1000)
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha)
    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("es-ES", opciones)
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  irAHome() {
    this.router.navigate(["/home"])
  }

  esAdmin(): boolean {
  const usuario = this.authService.getUsuarioActual()
  return usuario?.rol === 'ADMIN'
}

  irAAdmin() {
  this.router.navigate(['/admin'])
}
}

export default DashboardPage
