import { Injectable } from "@angular/core"
import {  HttpClient, HttpParams } from "@angular/common/http"
import  { Observable, Subject } from "rxjs"
import { environment } from "../../environments/environment"
import  { Recuerdo } from "../models/recuerdo.model"
import  { RecuerdoTimelineDTO } from "../models/recuerdo-timeline-dto.model"
import  { RecuerdoCreateDTO } from "../models/recuerdo-create-dto.model"
import  { Visibilidad } from "../models/visibilidad.enum"

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

@Injectable({
  providedIn: "root",
})
export class RecuerdoService {
  private apiUrl = `${environment.apiUrl}/recuerdos`

  private recuerdoCreadoSource = new Subject<void>();
  recuerdoCreado$ = this.recuerdoCreadoSource.asObservable();

  constructor(private http: HttpClient) {}

  crearRecuerdo(recuerdo: RecuerdoCreateDTO): Observable<Recuerdo> {
    return this.http.post<Recuerdo>(this.apiUrl, recuerdo)
  }

  crearRecuerdoConImagen(
    texto: string,
    etiquetas: string[],
    visibilidad: Visibilidad,
    imagen?: File,
  ): Observable<Recuerdo> {
    const formData = new FormData()
    formData.append("texto", texto)
    formData.append("visibilidad", visibilidad)

    if (etiquetas && etiquetas.length > 0) {
      etiquetas.forEach((etiqueta) => {
        formData.append("etiquetas", etiqueta)
      })
    }

    if (imagen) {
      formData.append("imagen", imagen)
    }

    return this.http.post<Recuerdo>(`${this.apiUrl}/con-imagen`, formData)
  }

  listarRecuerdos(etiqueta?: string): Observable<Recuerdo[]> {
    let params = new HttpParams()
    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }
    return this.http.get<Recuerdo[]>(this.apiUrl, { params })
  }

  obtenerRecuerdo(id: number): Observable<Recuerdo> {
    return this.http.get<Recuerdo>(`${this.apiUrl}/${id}`)
  }

  obtenerTimelineSimple(etiqueta?: string): Observable<RecuerdoTimelineDTO[]> {
    let params = new HttpParams()
    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }
    return this.http.get<RecuerdoTimelineDTO[]>(`${this.apiUrl}/timeline/simple`, { params })
  }

  obtenerTimelinePaginado(page = 0, size = 10, etiqueta?: string): Observable<PageResponse<RecuerdoTimelineDTO>> {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString())

    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }

    return this.http.get<PageResponse<RecuerdoTimelineDTO>>(`${this.apiUrl}/timeline`, { params })
  }

  actualizarRecuerdo(
    id: number,
    texto: string,
    etiquetas: string[],
    visibilidad: Visibilidad,
    imagen?: File,
  ): Observable<Recuerdo> {
    const formData = new FormData()
    formData.append("texto", texto)
    formData.append("visibilidad", visibilidad)

    if (etiquetas && etiquetas.length > 0) {
      etiquetas.forEach((etiqueta) => {
        formData.append("etiqueta", etiqueta)
      })
    }

    if (imagen) {
      formData.append("imagen", imagen)
    }

    return this.http.put<Recuerdo>(`${this.apiUrl}/${id}`, formData)
  }

  eliminarImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/imagen`)
  }

  eliminarRecuerdo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  obtenerMisRecuerdos(page = 0, size = 10, etiqueta?: string): Observable<PageResponse<RecuerdoTimelineDTO>> {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString())

    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }

    return this.http.get<PageResponse<RecuerdoTimelineDTO>>(`${this.apiUrl}/timeline`, { params })
  }

  obtenerRecuerdosPublicos(page = 0, size = 10, etiqueta?: string): Observable<PageResponse<RecuerdoTimelineDTO>> {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString())

    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }

    return this.http.get<PageResponse<RecuerdoTimelineDTO>>(`${this.apiUrl}/publicos/paginado`, { params })
  }


getImagenUrl(imagenUrl: string | null | undefined): string {
  if (!imagenUrl) return 'assets/img/no-image.png'

  // Si ya incluye '/images/', redirigimos al backend base (sin /api/recuerdos)
  if (imagenUrl.startsWith('/images')) {
    // Extraemos el dominio base del apiUrl, quitando "/api/recuerdos" si existe
    const baseUrl = this.apiUrl.replace(/\/api\/recuerdos$/, '')
    return `${baseUrl}${imagenUrl}`
  }

  // Si no incluye /images/, construimos la ruta completa normal
  return `${this.apiUrl}/images/${imagenUrl}`
}


}
