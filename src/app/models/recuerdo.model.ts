import type { Etiqueta } from "./etiqueta.model";

export interface Recuerdo {
  id?: number
  texto: string
  fecha: string // ISO string format
  imagen?: string
  etiquetas: Etiqueta[]
  usuarioId?: number
}
