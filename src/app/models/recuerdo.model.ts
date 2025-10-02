import type { Etiqueta } from "./etiqueta.model";
import type { Visibilidad } from "./visibilidad.enum"

export interface Recuerdo {
  id?: number
  texto: string
  fecha: string // ISO string format
  imagen?: string
  visibilidad: Visibilidad
  etiquetas: Etiqueta[]
  usuarioId?: number
}

export interface Recuerdo {
  id?: number
  texto: string
  fecha: string // ISO string format
  imagen?: string
  etiquetas: Etiqueta[]
  usuarioId?: number
}
