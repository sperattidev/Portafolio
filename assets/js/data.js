/* ==========================================================================
   data.js — Configuración y contenido editable del portafolio.
   Todo lo que quieras cambiar (textos, stack, links, proyectos destacados)
   está acá. No hace falta tocar main.js.
   ========================================================================== */
window.PORTFOLIO = {
  profile: {
    name: "Matías Rubén Speratti",
    alias: "sperattidev",
    role: "Desarrollador Full-Stack & Arquitecto de Sistemas",
    mode: "Freelance",
    education: "Autodidacta",
    location: "Remoto · Disponible para todo el mundo",
    available: true,
  },

  links: {
    github: "https://github.com/sperattidev",
    // Completá estos campos para que aparezcan en Contacto y en la terminal.
    email: "",
    linkedin: "",
  },

  // Usuario de GitHub del que se cargan los repositorios públicos.
  githubUser: "sperattidev",
  // Repos que no querés mostrar en la sección de proyectos.
  excludeRepos: ["sperattidev"],
  // Cantidad máxima de repos a mostrar.
  maxRepos: 6,

  // Proyectos destacados (opcional). Se muestran antes que los repos de GitHub.
  // Ejemplo:
  // { name: "Sistema de Gestión", description: "ERP para pymes...", tags: ["Node.js", "PostgreSQL"], url: "https://..." }
  featuredProjects: [],

  roles: [
    "sitios web",
    "sistemas a medida",
    "APIs escalables",
    "automatizaciones",
    "integraciones",
    "ideas que funcionan",
  ],

  services: [
    {
      fn: "desarrolloWeb",
      param: "idea: Idea",
      returns: "Web",
      title: "Desarrollo Web",
      description:
        "Sitios, landing pages y aplicaciones web modernas: rápidas, responsive, accesibles y optimizadas para SEO. Interfaces cuidadas al detalle que convierten visitas en clientes.",
      tags: ["Landing pages", "Web apps", "E-commerce", "SEO"],
    },
    {
      fn: "sistemasAMedida",
      param: "negocio: Negocio",
      returns: "Sistema",
      title: "Sistemas a Medida",
      description:
        "Software de gestión diseñado para tu operación real: paneles administrativos, ERPs, CRMs, control de stock, facturación y reportes. Sin parches, sin licencias que no necesitás.",
      tags: ["ERP / CRM", "Dashboards", "Gestión", "Reportes"],
    },
    {
      fn: "backendYApis",
      param: "datos: Data[]",
      returns: "API",
      title: "Backend & APIs",
      description:
        "Arquitecturas de servidor sólidas y escalables. APIs REST bien documentadas, modelado de bases de datos, autenticación, seguridad y rendimiento pensados desde el día uno.",
      tags: ["REST", "Bases de datos", "Auth", "Escalabilidad"],
    },
    {
      fn: "automatizar",
      param: "tarea: Repetitiva",
      returns: "Tiempo",
      title: "Automatización & Integraciones",
      description:
        "Bots, scripts y flujos que trabajan por vos. Conecto tus herramientas, pasarelas de pago y servicios externos para eliminar tareas manuales y errores humanos.",
      tags: ["Bots", "Scraping", "Pagos", "Webhooks"],
    },
    {
      fn: "sistemasAvanzados",
      param: "reto: Complejo",
      returns: "Solucion",
      title: "Sistemas Avanzados",
      description:
        "Cuando el problema no tiene tutorial: procesamiento de datos, herramientas internas, aplicaciones de escritorio y CLI, sistemas en tiempo real y soluciones técnicas fuera de lo común.",
      tags: ["Tiempo real", "Data", "Desktop / CLI", "I+D"],
    },
    {
      fn: "prototipar",
      param: "invento: Concepto",
      returns: "MVP",
      title: "Prototipos & Consultoría",
      description:
        "De la idea al prototipo funcional. Te ayudo a validar conceptos, elegir la arquitectura y la tecnología correctas, y a construir un MVP listo para mostrar a usuarios o inversores.",
      tags: ["MVP", "Arquitectura", "Asesoría técnica"],
    },
  ],

  // Ajustá el stack a las tecnologías que usás realmente.
  stack: {
    frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "PHP", "REST APIs"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
    devops: ["Git", "GitHub Actions", "Docker", "Linux", "Nginx"],
    tools: ["VS Code", "Postman", "Figma", "Bash"],
  },

  process: [
    {
      hash: "a1f3c9e",
      type: "feat",
      scope: "discovery",
      title: "Entender el problema",
      body: "Escucho, pregunto y analizo tu negocio. Defino objetivos, alcance y requisitos antes de escribir una sola línea.",
    },
    {
      hash: "b7d204a",
      type: "design",
      scope: "arquitectura",
      title: "Diseñar la solución",
      body: "Elijo la tecnología adecuada, modelo los datos y planifico una arquitectura escalable y mantenible.",
    },
    {
      hash: "c92e1f0",
      type: "build",
      scope: "desarrollo",
      title: "Construir en iteraciones",
      body: "Desarrollo por etapas con entregas frecuentes, para que veas avances reales y puedas dar feedback temprano.",
    },
    {
      hash: "d4a8b63",
      type: "test",
      scope: "calidad",
      title: "Probar y pulir",
      body: "Pruebas, revisión de rendimiento y seguridad, y ajustes de detalle hasta que todo funcione como debe.",
    },
    {
      hash: "e0c57d2",
      type: "deploy",
      scope: "producción",
      title: "Lanzar",
      body: "Puesta en producción, configuración de servidores y dominio, y entrega de documentación clara.",
    },
    {
      hash: "f61b9aa",
      type: "chore",
      scope: "soporte",
      title: "Acompañar y evolucionar",
      body: "Mantenimiento, mejoras y nuevas funcionalidades. Tu proyecto sigue creciendo después del lanzamiento.",
    },
  ],
};
