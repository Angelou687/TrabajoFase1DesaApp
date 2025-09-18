# 🍔 Sabrositos SAC — Aplicación Web (SPA)

**Tema:** Comida rápida (menú, inventario y administración)  
**Stack usado:**  
- HTML5 semántico  
- CSS3 + diseño responsivo (Flexbox y CSS Grid)  
- SASS (variables, anidación, mixin) → compilado a CSS  
- Bootstrap 5 (botones, modal, alertas, rejilla)  
- JavaScript (Vanilla JS, sin frameworks)  
- LocalStorage para guardar datos en el navegador  

---

## 🎯 Objetivo
Este proyecto es una **Single Page Application (SPA)** que permite:
- Mostrar un menú de comida rápida en formato de **cards**.  
- Administrar productos con un **formulario validado** y una **tabla de inventario**.  
- Agregar, editar y eliminar productos dinámicamente **sin recargar la página**.  
- Guardar la información en el **localStorage** del navegador.  

---

## 👥 Integrantes
- **Cabrera Rodriguez Mathias Angel**  
- **Conde Quipe Miguel Eduardo Sebastian**  
- **Cruz Torres Angel Fernando**  
- **Lipa Lipa Luis Angel**  

---

## 🚀 Cómo ejecutar
1. Descarga o clona este repositorio.  
2. Abre el archivo `index.html` en tu navegador.  
   - O usa la extensión **Live Server** de VS Code.  
3. Explora las secciones de la SPA:  
   - **Inicio** → portada de bienvenida.  
   - **Menú** → cards filtrables y buscables.  
   - **Administración** → formulario + tabla de productos.  

---

## 📦 Estructura del proyecto
├─ index.html # Estructura principal HTML
├─ assets/
│ ├─ css/
│ │ └─ style.css # Estilos compilados desde SASS
│ └─ scss/
│ └─ style.scss # Código fuente en SASS
├─ js/
│ └─ app.js # Lógica SPA (DOM + eventos + storage)
└─ README.md # Este archivo

---

## 🎨 SASS
- **Variables**: colores principales y texto.  
- **Anidación**: estilos dentro de `.hero`, `.sab-card`, etc.  
- **Mixin**: `card-shadow()` para reutilizar sombras en tarjetas.  
