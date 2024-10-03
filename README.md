# Vacunation App!

Este proyecto está desarrollado utilizando **NestJS** (backend), **PostgreSQL** (base de datos) y **Angular 14** (frontend). Permite a los usuarios gestionar datos relacionados con la vacunación, como departamentos, municipios, niños y vacunas. El proyecto utiliza **concurrently** para ejecutar tanto el frontend como el backend al mismo tiempo.

## Instalación

1. Clona el repositorio.

   ```bash
   git clone https://github.com/FelipeForero21/vacunacion_OnCredit.git` 

2. Navega a la carpeta raíz del proyecto.

   ```bash
   cd .\vacunacion_OnCredit\` 
3. Ejecuta el siguiente comando para instalar todas las dependencias, tanto el backend como el frontend:

   ```bash
   npm i` 

4.  Después de instalar las dependencias, inicia tanto el frontend como el backend utilizando:

    
    `npm run start` 
    

Esto iniciará tanto el backend (NestJS) como el frontend (Angular) de manera simultánea.

## Tecnologías Utilizadas

-   **NestJS** para el desarrollo del API backend.
-   **Angular 14** para la interfaz de usuario frontend.
-   **PostgreSQL** como la base de datos.

## Endpoints

Estos son los principales endpoints del API que ofrece el proyecto. El API se ejecuta en `http://localhost:3000`:

### Departamentos

-   **Obtener todos los departamentos**: `GET /Departamentos`
-   **Obtener un departamento por ID**: `GET /Departamentos/{id}`

### Municipios

-   **Añadir un municipio**: `POST /municipios`
-   **Obtener todos los municipios**: `GET /municipios`
-   **Obtener un municipio por ID**: `GET /municipios/{id}`
-   **Obtener municipios por departamento**: `GET /municipios/departamento/{idDepartamento}`

### Niños

-   **Obtener niños (paginación)**: `GET /ninos?page=1&limit=10`
-   **Resumen de niños por municipio**: `GET /ninos/resumen/municipios`
-   **Añadir un niño**: `POST /ninos`
-   **Obtener niños por municipio**: `GET /ninos/municipio/{id}`
-   **Actualizar municipio de residencia de un niño**: `PUT /ninos/{id}/municipio`
-   **Obtener el promedio de edad de los niños por municipio**: `GET /ninos/municipio/{id}/promedio-edad`
-   **Buscar niños por tarjeta de identidad**: `GET /ninos/tarjeta-identidad/{id}`

### Vacunas

-   **Añadir una vacuna**: `POST /vacunas`
-   **Obtener todas las vacunas**: `GET /vacunas`
-   **Aplicar una vacuna a un niño**: `POST /nino-vacuna`
-   **Obtener el número de niños vacunados**: `GET /nino-vacuna/vacunados/count`
-   **Obtener el número de niños no vacunados**: `GET /nino-vacuna/no-vacunados/count`
-   **Actualizar estado de vacunación de un niño**: `PUT /ninos/{id}/estado-vacunacion`

## Colección de Postman

Puedes encontrar la colección de Postman con todos los endpoints del API [aquí](https://github.com/FelipeForero21/vacunacion_OnCredit/blob/master/VacunationApp.postman_collection.json).

## Ejecución del Proyecto

Una vez que la instalación esté completa y se hayan instalado las dependencias, ejecuta:



`npm run start` 

Este comando utiliza **concurrently** para ejecutar tanto el backend de NestJS como el frontend de Angular de manera simultánea.

¡Disfruta!

## Modelo de Base de Datos (Postgres)

![enter image description here](https://github.com/FelipeForero21/vacunacion_OnCredit/blob/master/ModeloBaseDeDatosVacunacion.png?raw=true)
