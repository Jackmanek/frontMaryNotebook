# MaryNotebookFront

MaryNotebook es una aplicación de gestión personalizada que permite a los usuarios crear, organizar y compartir recuerdos. La plataforma ofrece funcionalidades avanzadas para la administración de usuarios y recuerdos, incluyendo la posibilidad de agregar etiquetas, establecer visibilidad y gestionar imágenes.

## Características Principales

- **Gestión de Usuarios**: Creación, autenticación y gestión de perfiles de usuario.
- **Administración de Recuerdos**: Creación, edición, eliminación y visualización de recuerdos con opciones de etiquetado y visibilidad.
- **Interfaz Amigable**: Diseño moderno y fácil de usar para una experiencia óptima.

## Tecnologías Utilizadas

- **Backend**: Spring Boot (Java 17+), Hibernate, MySQL
- **Frontend**: Angular/Ionic
- **Base de Datos**: MySQL
- **Autenticación**: JWT
- **Pruebas Unitarias y de Integración**: JUnit 5, Mockito, Pytest, PHPUnit

## Instalación y Configuración

### Requisitos Previos

- Java 17+
- Node.js (para el frontend)
- MySQL

### Pasos para la Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/your-repo/MaryNotebook.git
   cd MaryNotebook
   ```

2. **Configurar las Variables de Entorno**:
   - Crear un archivo `.env` en la raíz del proyecto.
   - Configurar las variables de entorno necesarias, como `API_URL`, `DB_HOST`, `DB_PORT`, etc.

3. **Instalar Dependencias**:
   ```bash
   # Instalar dependencias backend (Spring Boot)
   ./gradlew build

   # Instalar dependencias frontend (Angular/Ionic)
   cd android/app/src/main/assets/www
   npm install
   ```

4. **Ejecutar la Aplicación**:
   - **Backend**:
     ```bash
     ./gradlew bootRun
     ```
   - **Frontend**:
     ```bash
     cd android/app/src/main/assets/www
     ng serve
     ```

## Contribución

Contribuciones son bienvenidas. Para contribuir, por favor:

1. Fork el repositorio.
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`).
3. Haz los cambios y realiza las pruebas necesarias.
4. Commitea tus cambios (`git commit -m 'Add some AmazingFeature'`).
5. Pide un pull request.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

