import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Usuario } from '../models/usuario.model'
import { RecuerdoTimelineDTO } from '../models/recuerdo-timeline-dto.model'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/usuarios`
  private recuerdosUrl = `${environment.apiUrl}/recuerdos`

  constructor(private http: HttpClient) {}

  // ========== GESTIÓN DE USUARIOS ==========

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`)
  }

  obtenerUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/email/${email}`)
  }

  toggleEstadoUsuario(id: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/toggle-estado`, {})
  }

  obtenerRecuerdosUsuario(usuarioId: number): Observable<RecuerdoTimelineDTO[]> {
    return this.http.get<RecuerdoTimelineDTO[]>(`${this.apiUrl}/${usuarioId}/recuerdos`)
  }

  // ========== MODERACIÓN DE CONTENIDO ==========

  listarTodosRecuerdos(): Observable<RecuerdoTimelineDTO[]> {
    return this.http.get<RecuerdoTimelineDTO[]>(`${this.recuerdosUrl}/admin/todos`)
  }

  obtenerEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/estadisticas`)
  }
}
