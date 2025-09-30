export interface Usuario {
  id: number
  nombre: string
  email: string
  password?: string
  fechaRegistro: Date
  rol: "USER" | "ADMIN"
}
