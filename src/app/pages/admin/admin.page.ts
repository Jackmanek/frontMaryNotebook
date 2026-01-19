import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonBadge,
  IonSpinner,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonAvatar,
  IonText
} from "@ionic/angular/standalone"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { AdminService } from "../../services/admin.service"
import { RecuerdoService } from "../../services/recuerdo.service"
import { Usuario } from "../../models/usuario.model"
import { RecuerdoTimelineDTO } from "../../models/recuerdo-timeline-dto.model"
import { Visibilidad } from "../../models/visibilidad.enum"

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonBadge,
    IonSpinner,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonText
  ]
})
export class AdminPage implements OnInit {
  segmentoActivo: 'usuarios' | 'contenido' = 'usuarios'

  // Usuarios
  usuarios: Usuario[] = []
  usuariosFiltrados: Usuario[] = []
  busquedaUsuario = ''

  // Contenido
  todosRecuerdos: RecuerdoTimelineDTO[] = []
  recuerdosFiltrados: RecuerdoTimelineDTO[] = []
  busquedaContenido = ''

  isLoading = false
  Visibilidad = Visibilidad

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService,
    public recuerdoService: RecuerdoService
  ) {}

  ngOnInit() {
    this.verificarAdmin()
    this.cargarDatos()
  }

  verificarAdmin() {
    const usuario = this.authService.getUsuarioActual()
    if (!usuario || usuario.rol !== 'ADMIN') {
      this.router.navigate(['/dashboard'])
    }
  }

  cargarDatos() {
    if (this.segmentoActivo === 'usuarios') {
      this.cargarUsuarios()
    } else {
      this.cargarTodosRecuerdos()
    }
  }

  cambiarSegmento(event: any) {
    this.segmentoActivo = event.detail.value
    this.cargarDatos()
  }

  // ========== GESTIÓN DE USUARIOS ==========

  cargarUsuarios() {
    this.isLoading = true
    this.adminService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios
        this.usuariosFiltrados = usuarios
        this.isLoading = false
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error)
        this.isLoading = false
      }
    })
  }

  buscarUsuarios(event: any) {
    const query = event.target.value.toLowerCase()
    this.busquedaUsuario = query

    if (!query) {
      this.usuariosFiltrados = this.usuarios
      return
    }

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(query) ||
      usuario.email.toLowerCase().includes(query)
    )
  }

  verDetalleUsuario(usuarioId: number) {
    this.router.navigate(['/admin/usuario', usuarioId])
  }

  async toggleEstadoUsuario(usuario: Usuario, event: Event) {
    event.stopPropagation()

    const accion = usuario.activo ? 'desactivar' : 'activar'
    const confirmacion = confirm(`¿Estás seguro de ${accion} a ${usuario.nombre}?`)

    if (!confirmacion) return

    this.adminService.toggleEstadoUsuario(usuario.id).subscribe({
      next: () => {
        usuario.activo = !usuario.activo
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error)
        alert('Error al cambiar el estado del usuario')
      }
    })
  }

  // ========== MODERACIÓN DE CONTENIDO ==========

  cargarTodosRecuerdos() {
    this.isLoading = true
    this.adminService.listarTodosRecuerdos().subscribe({
      next: (recuerdos) => {
        this.todosRecuerdos = recuerdos
        this.recuerdosFiltrados = recuerdos
        this.isLoading = false
      },
      error: (error) => {
        console.error('Error al cargar recuerdos:', error)
        this.isLoading = false
      }
    })
  }

  buscarContenido(event: any) {
    const query = event.target.value.toLowerCase()
    this.busquedaContenido = query

    if (!query) {
      this.recuerdosFiltrados = this.todosRecuerdos
      return
    }

    this.recuerdosFiltrados = this.todosRecuerdos.filter(recuerdo =>
      recuerdo.texto.toLowerCase().includes(query) ||
      recuerdo.nombreUsuario?.toLowerCase().includes(query) ||
      recuerdo.etiquetas?.some(e => e.toLowerCase().includes(query))
    )
  }

  verDetalleRecuerdo(id: number) {
    this.router.navigate(['/recuerdo', id])
  }

  async eliminarRecuerdoAdmin(id: number, event: Event) {
    event.stopPropagation()

    const confirmacion = confirm('¿Estás seguro de eliminar este recuerdo? Esta acción no se puede deshacer.')
    if (!confirmacion) return

    this.recuerdoService.eliminarRecuerdo(id).subscribe({
      next: () => {
        this.todosRecuerdos = this.todosRecuerdos.filter(r => r.id !== id)
        this.recuerdosFiltrados = this.recuerdosFiltrados.filter(r => r.id !== id)
        alert('Recuerdo eliminado correctamente')
      },
      error: (error) => {
        console.error('Error al eliminar recuerdo:', error)
        alert('Error al eliminar el recuerdo')
      }
    })
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha)
    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    return date.toLocaleDateString("es-ES", opciones)
  }

  doRefresh(event: any) {
    this.cargarDatos()
    setTimeout(() => {
      event.target.complete()
    }, 1000)
  }

  volverDashboard() {
    this.router.navigate(['/dashboard'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  contarUsuariosActivos(): number {
  return this.usuarios.filter(u => u.activo).length
}

  contarRecuerdosPublicos(): number {
  return this.todosRecuerdos.filter(r => r.visibilidad === Visibilidad.PUBLICO).length
}
}

export default AdminPage
