Taller - Sistema de Gestión de Taller
Descripción
"Taller" es una aplicación web para gestionar la entrada, salida y estado de los vehículos en un taller mecánico. Está diseñada para empleados y administradores del taller, permitiendo:

Registro de entrada y salida de vehículos.
Modificación de registros por parte de los empleados.
Subida de imágenes y documentos relacionados con cada vehículo.
Generación de estadísticas sobre el estado de los vehículos (pendiente, en reparación, finalizado).
Sistema de roles, donde los administradores tienen control total y los empleados solo pueden gestionar los vehículos que ellos mismos han registrado.
Características principales
Autenticación de usuarios: Los empleados pueden iniciar sesión y acceder a las funcionalidades según sus permisos.
Gestión de vehículos: Registro, modificación, eliminación y consulta de vehículos.
Subida de archivos: Permite la subida de imágenes y documentos asociados a cada vehículo.
Estadísticas: Vista de resumen de los vehículos en el taller, con estadísticas en el panel de control.
Roles: Los administradores pueden gestionar todos los vehículos, mientras que los empleados solo pueden gestionar sus propios registros.
Requisitos del servidor
Para instalar y ejecutar esta aplicación, necesitas un servidor con las siguientes características:

Requisitos mínimos
Sistema operativo: Linux (Ubuntu recomendado) o Windows con WSL2.
Memoria RAM: Al menos 2 GB de RAM.
Almacenamiento: Al menos 10 GB de espacio libre para la base de datos y almacenamiento de archivos.
Acceso a internet: Para la instalación de dependencias y actualización de paquetes.
Software necesario
El servidor debe tener instalado el siguiente software:

Docker: Motor de contenedores para ejecutar la aplicación.

Guía de instalación de Docker
Docker Compose: Herramienta para definir y ejecutar aplicaciones multicontenedor con Docker.

Guía de instalación de Docker Compose
PostgreSQL: Base de datos relacional utilizada por la aplicación (gestionado mediante Docker).

Node.js: Si deseas hacer cambios en el frontend, asegúrate de tener instalado Node.js para el desarrollo local (opcional).

Guía de instalación de Node.js
Instrucciones de instalación
Paso 1: Clonar el repositorio
Clona el repositorio desde tu servidor:

bash
Copiar código
git clone https://github.com/usuario/taller.git
cd taller
Paso 2: Configuración de entorno
Crea un archivo .env en la carpeta raíz del proyecto y añade las variables de entorno necesarias, por ejemplo:

bash
Copiar código
DATABASE_URL=postgresql://postgres:password@db/taller
SECRET_KEY=tu_clave_secreta
Paso 3: Configuración de Docker
Asegúrate de que Docker esté correctamente instalado. Luego, ejecuta Docker Compose para iniciar todos los servicios necesarios (backend, frontend, base de datos):

bash
Copiar código
docker-compose up --build
Este comando hará lo siguiente:

Levantar la base de datos PostgreSQL en un contenedor.
Levantar el backend de la aplicación, gestionado por FastAPI.
Levantar el frontend basado en React.
Crear un volumen para almacenar los archivos subidos (imágenes y documentos).
Paso 4: Inicialización de la base de datos
Al iniciar por primera vez, es necesario ejecutar las migraciones para crear las tablas necesarias en la base de datos:

bash
Copiar código
docker-compose exec backend alembic upgrade head
Esto aplicará todas las migraciones pendientes para inicializar la base de datos correctamente.

Paso 5: Acceder a la aplicación
Una vez que Docker Compose haya terminado de levantar los contenedores, puedes acceder a la aplicación en tu navegador web en:

arduino
Copiar código
http://localhost:3000
El puerto 3000 corresponde al frontend (React).
El puerto 8000 corresponde al backend (API de FastAPI).
La base de datos PostgreSQL estará disponible en el puerto 5432.
Funcionalidades del sistema
Iniciar sesión: Los usuarios pueden autenticarse para acceder al sistema.
Gestión de vehículos: Registrar, editar o eliminar vehículos.
Subir archivos: Subir imágenes o documentos asociados a los vehículos.
Estadísticas: Consultar las estadísticas de los vehículos en el panel de control.
Usuarios de prueba
Al iniciar el sistema, puedes crear un usuario administrador para gestionar el sistema:

bash
Copiar código
docker-compose exec backend python manage.py createsuperuser
Detener la aplicación
Para detener todos los servicios:

bash
Copiar código
docker-compose down
Estructura del proyecto
bash
Copiar código
taller/
│
├── backend/
│   ├── app/
│   │   ├── app.py               # Configuración del backend (FastAPI)
│   │   ├── routers/
│   │   │   ├── upload.py        # Manejo de la subida de archivos
│   │   │   ├── vehicles.py      # Rutas de gestión de vehículos
│   │   │   ├── auth.py          # Autenticación de usuarios
│   │   │   ├── dashboard.py     # Generación de estadísticas
│   │   ├── schemas.py           # Esquemas Pydantic
│   │   ├── models.py            # Modelos SQLAlchemy
│   │   ├── database.py          # Configuración de la base de datos
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React (Login, Navbar, etc.)
│   │   ├── pages/               # Páginas principales (Dashboard, Vehicles)
│   │   ├── services/            # Servicios para interactuar con la API
│   │   ├── styles/              # Archivos de estilo CSS
│
├── docker-compose.yml            # Configuración de Docker Compose
Consideraciones finales
Seguridad: Recuerda establecer una clave secreta segura para la variable de entorno SECRET_KEY.
Backup: Configura respaldos automáticos de la base de datos PostgreSQL para evitar la pérdida de datos importantes.
Logs: Puedes consultar los logs del sistema mediante Docker para identificar errores o problemas:
bash
Copiar código
docker-compose logs
Con estas instrucciones, tu aplicación estará funcionando correctamente. Si deseas realizar modificaciones, puedes hacerlo en el código fuente del backend o frontend, y luego reconstruir los contenedores utilizando Docker.
