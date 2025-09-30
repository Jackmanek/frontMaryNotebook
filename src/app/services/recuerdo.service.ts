import { inject, Injectable } from "@angular/core"
import {  HttpClient, HttpParams } from "@angular/common/http"
import  { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import  { Recuerdo } from "../models/recuerdo.model"
import  { RecuerdoTimelineDTO } from "../models/recuerdo-timeline-dto.model"
import  { RecuerdoCreateDTO } from "../models/recuerdo-create-dto.model"

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
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/recuerdos`

  constructor() {}

  crearRecuerdo(recuerdo: RecuerdoCreateDTO): Observable<Recuerdo> {
    return this.http.post<Recuerdo>(this.apiUrl, recuerdo)
  }

  crearRecuerdoConImagen(texto: string, etiquetas: string[], imagen?: File): Observable<Recuerdo> {
    console.log('RecuerdoService: llamando a crearRecuerdoConImagen');
    const formData = new FormData()
    formData.append("texto", texto)

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
    return this.http.get<RecuerdoTimelineDTO[]>(`${this.apiUrl}/timeline/simple`, { withCredentials: true })
  }

  obtenerTimelinePaginado(page = 0, size = 10, etiqueta?: string): Observable<PageResponse<RecuerdoTimelineDTO>> {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString())

    if (etiqueta) {
      params = params.set("etiqueta", etiqueta)
    }

    return this.http.get<PageResponse<RecuerdoTimelineDTO>>(`${this.apiUrl}/timeline`, { params })
  }

  actualizarRecuerdo(id: number, texto: string, etiquetas: string[], imagen?: File): Observable<Recuerdo> {
    const formData = new FormData()
    formData.append("texto", texto)

    if (etiquetas && etiquetas.length > 0) {
      etiquetas.forEach((etiqueta) => {
        formData.append("etiquetas", etiqueta)
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
}
