# sperattidev — Portfolio

Portafolio profesional de **Matías Rubén Speratti** (`sperattidev`), desarrollador freelance full-stack.

La web simula un entorno de desarrollo (IDE): cada sección es un archivo (`about.md`, `services.ts`, `stack.json`…),
con terminal interactiva, paleta de comandos, temas y proyectos sincronizados en vivo desde GitHub.

## Características

- 🖥️ **Interfaz tipo IDE**: explorador de archivos, pestañas, breadcrumbs y barra de estado que siguen el scroll.
- ⌨️ **Paleta de comandos** con `Ctrl/⌘ + K`.
- 💻 **Terminal interactiva**: `help`, `whoami`, `skills`, `projects`, `neofetch`, `cd`, `cat`, `theme`, `sudo hire-me`…
- 🔄 **Proyectos automáticos** desde la API pública de GitHub (sin tokens).
- 🎨 **3 temas**: `dark`, `dracula` y `light` (se recuerda la preferencia).
- 🚀 Secuencia de arranque, código que se escribe solo y un easter egg (↑↑↓↓←→←→BA).
- 📱 Responsive, accesible y con soporte para `prefers-reduced-motion`.
- ⚡ HTML + CSS + JavaScript puro. Sin build, sin dependencias.

## Estructura

```
index.html          # Estructura y contenido principal
404.html            # Página de error estilo terminal
assets/css/style.css
assets/js/data.js   # ← Contenido editable: links, servicios, stack, proceso, proyectos destacados
assets/js/main.js   # Interactividad
assets/favicon.svg
```

## Personalizar

Casi todo se edita en [`assets/js/data.js`](assets/js/data.js):

- `links.email` / `links.linkedin`: al completarlos aparecen en Contacto (y se habilita el formulario).
- `stack`: tus tecnologías reales.
- `featuredProjects`: proyectos destacados (incluso privados o de clientes) que se muestran antes que los repos.
- `excludeRepos`: repos de GitHub que no querés mostrar.

## Publicar en GitHub Pages

1. **Settings → Pages** del repositorio.
2. *Source*: **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. La web queda en `https://sperattidev.github.io/Portafolio/`.

> 💡 Si renombrás el repo a `sperattidev.github.io`, la web queda en la raíz: `https://sperattidev.github.io/`.

## Ver en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```
