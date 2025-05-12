CRUD App Angular con JSONPlaceholder API
Este proyecto es una aplicación CRUD simple desarrollada con Angular 15 y Angular Material 
que permite gestionar una lista de tareas.
Características

Lista de tareas con estado de completado
Crear nuevas tareas
Editar tareas existentes
Eliminar tareas
Persistencia temporal usando localStorage
Diseño responsive

Tecnologías utilizadas

Angular 15
Angular Material
JSONPlaceholder API como fuente de datos inicial
LocalStorage para persistencia de datos

Cómo iniciar

Clona el repositorio
Instala las dependencias: npm install
Inicia el servidor de desarrollo: ng serve
Navega a http://localhost:4200/

Estructura del proyecto

src/app/models: Contiene la interfaz del modelo de datos
src/app/services: Contiene el servicio para manejar las operaciones HTTP y localStorage
src/app/components: Contiene los componentes de la aplicación

header: Barra de navegación superior
footer: Pie de página
todo-list: Lista de tareas
todo-form: Formulario para crear/editar tareas



API utilizada
El proyecto utiliza la API JSONPlaceholder para cargar datos iniciales:
JSONPlaceholder
Notas adicionales

La aplicación guarda los cambios temporalmente en localStorage
Al actualizar la página, los datos vuelven a su estado inicial desde la API
El botón de restablecer datos en la barra de navegación permite recargar los datos desde la API