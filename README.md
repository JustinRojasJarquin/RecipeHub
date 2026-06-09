# RecipeHub

Plataforma colaborativa de recetas de cocina. Desarrollada con Node.js + Express, React + Vite y MongoDB.

## Stack tecnológico

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Base de datos:** MongoDB Atlas
- **Infraestructura:** VPS Azure (Ubuntu 24.04), Docker, Nginx, Let's Encrypt

## URL de producción

- Frontend: https://recipe-hub.ddns.net
- API health check: https://recipe-hub.ddns.net/api/health

---

## Diagrama de Arquitectura

```
  [Navegador] ──HTTPS──► [No-IP DDNS]  ──resuelve IP──►  [Azure VPS Ubuntu 24.04]
                          ddns.net                        │
                                                          │
                          ┌─────── Azure VPS ─────────────┼──────────────────────┐
                          │                               │                      │
                          │       ┌───────────────────────▼──────────────────┐   │
                          │       │  Nginx (Reverse Proxy + SSL)             │   │
                          │       │  Puerto 80 → 301 redirect HTTPS          │   │
                          │       │  Puerto 443 (Let's Encrypt)              │   │
                          │       │                                          │   │
                          │       │  /api/*  ──────────────────────────────┐ │   │
                          │       │  /*  → /var/www/recipehub/             │ │   │
                          │       └──────────────────┬──────────────────── │─┘   │
                          │                          │                     │     │
                          │     ┌────────────────────▼──┐     ┌───────────▼──┐  │
                          │     │  React Build (Vite)   │     │  🐳 Docker   │  │
                          │     │  /var/www/recipehub/  │     │              │  │
                          │     │  index.html + assets  │     │  Express     │  │
                          │     │  try_files → SPA      │     │  Node.js     │  │
                          │     └───────────────────────┘     │  Puerto 4000 │  │
                          │                                    └──────┬───────┘  │
                          └───────────────────────────────────────────│──────────┘
                                                                      │ Mongoose
                                                                      ▼
                                                          ┌─────────────────────┐
                                                          │   MongoDB Atlas     │
                                                          │   (cloud externo)   │
                                                          │   - usuarios        │
                                                          │   - recetas         │
                                                          │   - comentarios     │
                                                          └─────────────────────┘

  [GitHub Actions] ──SSH──► git pull + docker compose up --build + curl /api/health
```

---

## Variables de entorno

Crear el archivo `backend/.env` con las siguientes variables:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto donde corre el backend | `4000` |
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas | `mongodb+srv://usuario:password@cluster.mongodb.net/recipehub` |
| `JWT_SECRET` | Llave secreta para firmar los tokens JWT | `ClaveSecretaSegura2026` |

> El archivo `.env` nunca debe subirse al repositorio. Está incluido en `.gitignore`.

---

## Correr el proyecto localmente

### Requisitos

- Node.js 22+
- Cuenta en MongoDB Atlas (o MongoDB local)

### Backend

```bash
cd backend
npm install
npm run dev
```

El backend corre en `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en `http://localhost:5173`

### Ejecutar tests

```bash
cd backend
npm test
```

---

## Despliegue en producción

### Requisitos del servidor

- Ubuntu 24.04 LTS
- Docker Engine
- Docker Compose plugin (v2)
- Nginx
- Certbot con plugin nginx
- Git

### 1. Clonar el repositorio en el VPS

```bash
git clone https://github.com/JustinRojasJarquin/RecipeHub.git
cd RecipeHub
```

### 2. Crear el archivo .env en el backend

```bash
cd backend
nano .env
```

Agregar las variables descritas en la sección anterior.

### 3. Levantar el backend con Docker

```bash
cd backend
docker compose up -d --build
```

### 4. Compilar y desplegar el frontend

```bash
cd frontend
npm install
npm run build
sudo cp -r dist/* /var/www/recipehub/
```

### 5. Configurar Nginx

Crear el archivo `/etc/nginx/sites-available/recipehub`:

```nginx
server {
    listen 80;
    server_name recipe-hub.ddns.net;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name recipe-hub.ddns.net;

    root /var/www/recipehub;
    index index.html;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

Activar la configuración:

```bash
sudo ln -s /etc/nginx/sites-available/recipehub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Obtener certificado SSL

```bash
sudo certbot --nginx -d recipe-hub.ddns.net
```

### 7. Verificar el deploy

```bash
curl https://recipe-hub.ddns.net/api/health
# debe retornar: {"status":"ok","timestamp":"..."}
```

---

## Pipeline CI/CD

El repositorio tiene GitHub Actions configurado en `.github/workflows/deploy.yml`.

Se activa automáticamente en cada push a `develop`:

1. **build-and-test:** instala dependencias y corre los tests del backend
2. **deploy:** si los tests pasan, conecta al VPS por SSH y despliega la nueva versión

### Secrets requeridos en GitHub

| Secret | Descripción |
|---|---|
| `VPS_HOST` | IP pública del servidor |
| `VPS_USER` | Usuario SSH del servidor |
| `SSH_PRIVATE_KEY` | Llave privada SSH en formato PEM |
