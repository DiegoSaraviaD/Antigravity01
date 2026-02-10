# 🕒 Control Horario App - MVP

Una aplicación web moderna y profesional diseñada para la gestión y control de jornadas laborales, permitiendo a los usuarios registrar sus entradas, salidas, pausas y visualizar métricas financieras clave.

## 🚀 Características Principales

-   **Gestión de Autenticación**: Registro e inicio de sesión seguro mediante **Supabase Auth**.
-   **Control de Jornadas**: Registro preciso de inicio, pausa y fin de jornada con cálculo automático de horas.
-   **Dashboard Financiero**: Visualización de ingresos, costos, utilidad neta y métricas de clientes.
-   **Historial Detallado**: Listado completo de jornadas anteriores con filtros y ordenamiento.
-   **Diseño Responsive**: Interfaz optimizada para dispositivos móviles, tablets y desktop.
-   **Iconografía Profesional**: Uso de la librería `lucide-react` para una estética premium.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Routing**: React Router DOM v7
-   **Backend & Auth**: Supabase
-   **Estilos**: CSS nativo (Variables semánticas y diseño atómico)
-   **Gráficos**: Recharts
-   **Iconos**: Lucide React

## 🏗️ Arquitectura del Sistema

```mermaid
graph TD
    User((Usuario)) <--> Frontend[Frontend React/Vite]
    Frontend <--> Router[React Router DOM]
    Router <--> Pages[Vistas / Páginas]
    Pages <--> Components[Componentes Atómicos]
    Pages <--> Hooks[Custom Hooks]
    Hooks <--> Services[Servicios de API]
    Services <--> SupabaseSDK[Supabase SDK]
    SupabaseSDK <-->|Auth| Auth[Supabase Auth]
    SupabaseSDK <-->|Data| DB[(PostgreSQL Database)]
    DB <--> Policies[Row Level Security]
```

## 📊 Modelo de Datos

```mermaid
erDiagram
    USERS ||--o{ JORNADAS : "realiza"
    USERS ||--o{ METRICAS_FINANCIERAS : "genera"

    USERS {
        uuid id PK
        string email
        timestamp created_at
    }

    JORNADAS {
        uuid id PK
        uuid user_id FK
        date fecha
        timestamp hora_inicio
        timestamp hora_pausa
        timestamp hora_fin
        decimal horas_trabajadas
        string estado "activa | pausada | finalizada"
    }

    METRICAS_FINANCIERAS {
        uuid id PK
        uuid user_id FK
        decimal ingresos_totales
        decimal costos_totales
        int clientes_nuevos
        int clientes_recurrentes
        decimal utilidad_neta
        decimal porcentaje_utilidad
        date periodo
    }
```

## ⚙️ Configuración e Instalación

### Requisitos Previos

-   Node.js (v18 o superior)
-   Cuenta en [Supabase](https://supabase.com/)

### Pasos para el Setup Local

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd aaqa
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz basado en `.env.example`:
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
    ```

4.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

## 📁 Estructura del Proyecto

```text
src/
├── components/     # Componentes reutilizables (Atómicos)
├── context/        # Context Providers (Auth, Jornada)
├── hooks/          # React Hooks personalizados
├── pages/          # Vistas principales de la aplicación
├── services/       # Integración con Supabase y lógica de negocio
├── styles/         # CSS Global y variables de diseño
└── utils/          # Helpers y constantes
```

## 📜 Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo con Vite.
-   `npm run build`: Genera el bundle de producción.
-   `npm run preview`: Previsualiza la versión de producción localmente.

---
Proyecto desarrollado como parte del **Sprint 0 - MVP**.
