import type { Visibilidad } from "./visibilidad.enum"

export interface RecuerdoTimelineDTO {
  id: number
  texto: string
  fecha: string
  imagen?: string
  etiquetas: string[]
  visibilidad: Visibilidad
  nombreUsuario?: string
}


export interface RecuerdoTimelineDTO {
  id: number
  texto: string
  fecha: string
  imagen?: string
  etiquetas: string[]
}
