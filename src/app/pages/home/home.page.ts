import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"
import  { Router } from "@angular/router"
import  { RecuerdoService } from "../../services/recuerdo.service"
import  { AuthService } from "../../services/auth.service"
import  { RecuerdoTimelineDTO } from "../../models/recuerdo-timeline-dto.model"

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  recuerdos: RecuerdoTimelineDTO[] = []
  filtroEtiqueta = ""
  isLoading = false

  // Paginación
  currentPage = 0
  pageSize = 10
  totalPages = 0
  hasMore = true

  constructor(
    private recuerdoService: RecuerdoService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarRecuerdos()

    this.recuerdoService.recuerdoCreado$.subscribe(()=>{
    this.currentPage = 0;
    this.recuerdos = [];
    this.cargarRecuerdos();
    });

  }

  cargarRecuerdos(event?: any) {

    this.isLoading = true

    this.recuerdoService
      .obtenerRecuerdosPublicos(this.currentPage, this.pageSize, this.filtroEtiqueta || undefined)
      .subscribe({
        next: (response) => {
          console.log("Respuesta API:", response);
          if (event) {
            // Infinite scroll
            this.recuerdos = [...this.recuerdos, ...(response.content ?? [])]
            event.target.complete()
          } else {
            // Primera carga o refresh
            this.recuerdos = response.content ?? []
          }
          console.log("Recuerdos que llegan:", this.recuerdos);
          this.totalPages = response.totalPages
          this.hasMore = this.currentPage < response.totalPages - 1
          this.isLoading = false
        },
        error: (error) => {
          console.error("Error al cargar recuerdos:", error)
          this.isLoading = false
          if (event) {
            event.target.complete()
          }
        },
      })

  }

  loadMore(event: any) {
    this.currentPage++
    this.cargarRecuerdos(event)
  }

  filtrarPorEtiqueta(etiqueta: string) {
    this.filtroEtiqueta = etiqueta
    this.currentPage = 0
    this.recuerdos = []
    this.cargarRecuerdos()
  }

  limpiarFiltro() {
    this.filtroEtiqueta = ""
    this.currentPage = 0
    this.recuerdos = []
    this.cargarRecuerdos()
  }

  verDetalle(id: number) {
    this.router.navigate(["/recuerdo", id])
  }

  crearRecuerdo() {
    this.router.navigate(["/crear-recuerdo"])
  }

  doRefresh(event: any) {
    this.currentPage = 0
    this.recuerdos = []
    this.cargarRecuerdos()
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

  irADashboard() {
    this.router.navigate(["/dashboard"])
  }
}

export default HomePage
