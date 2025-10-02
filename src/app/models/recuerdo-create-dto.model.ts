import type { Visibilidad } from "./visibilidad.enum"

export interface RecuerdoCreateDTO {
  texto: string
  etiquetas?: string[]
  visibilidad?: Visibilidad
}



export interface RecuerdoCreateDTO {
  texto: string
  etiquetas?: string[]
}
