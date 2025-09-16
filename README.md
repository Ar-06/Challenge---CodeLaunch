
# TaskNotes 📝

TaskNotes es una aplicación web para gestionar tareas de manera sencilla y segura. Permite registrar usuarios, iniciar sesión, agregar, editar y eliminar tareas, así como marcar tareas como completadas.  

---

## 🚀 Tecnologías utilizadas

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router

**Backend:**
- Node.js
- Express
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Bcryptjs (para el hash de contraseñas)
- TypeScript
- Cookies httpOnly para autenticación

---

## ⚙️ Instalación y configuración

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tasknotes.git
cd tasknotes 
```
### Backend
- Entrar al directorio del backend:
```bash
cd backend
```
- Instalar dependecias:
```bash
pnpm install
```
- Crear un archivo .env con las variables de entorno mencionadas en el archivo .env.example:
```bash
MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=puerto
```
- Ejecutar el backend en modo desarrollo:
```bash
pnpm run dev
```
- Para producción, primero compila TypeScript y luego ejecuta:
```bash
pnpm run build
pnpm start
```

### Frontend
- Entrar al directorio del Frontend:
```bash
cd frontend
```
- Instalar dependecias:
```bash
pnpm install
```
- Ejecutar la aplicación en modo desarrollo_
```bash
pnpm run dev
```
- Para producción, compila la app:
```bash
pnpm run build
```

### 🔐 Funcionalidades principales
- Registro y login de usuarios con autenticación segura.
- CRUD completo de tareas.
- Modal interactivo para agregar y editar tareas.
- Rutas protegidas solo accesibles para usuarios autenticados.
- Persistencia de sesión mediante cookies httpOnly.
- Visualización de tareas en tiempo real y gestión eficiente.

### 🌐 URLs de despliegue
- Backend: https://challenge-codelaunch-backend.onrender.com
- Frontend: https://challenge-code-launch.vercel.app/
