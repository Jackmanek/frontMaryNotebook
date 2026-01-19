export interface Usuario {
  id: number
  nombre: string
  email: string
  password?: string
  fechaRegistro: string
  rol: "USER" | "ADMIN"
  activo: boolean
  ultimoAcceso?: string
}
