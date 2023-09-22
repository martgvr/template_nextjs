# NextJS

## Índice

1. [**Instalación y ejecución**](#instalación--ejecución)
2. [**Estructura**](#estructura)
3. [**Link**](#link)
4. [**Carpeta components**](#carpeta-components)
5. [**SEO**](#seo)
6. [**Fuentes**](#fuentes)
7. [**Error 404**](#error-404)
8. [**Componentes lado servidor**](#componentes-lado-servidor)

## Instalación & Ejecución

Para comenzar con Next.js, puedes utilizar el siguiente comando para crear una nueva aplicación:

1. Crea una nueva aplicación Next.js:

    ```
    $ npx create-next-app@latest
    ```

2. Ingresa al directorio de tu nueva aplicación e inicia el servidor de desarrollo:

    ```
    $ cd nombre-de-tu-aplicacion
    $ npm run dev
    ```

## Estructura

### Rutas

```
─ 📁 app
   │
   ├── 📄 page.jsx (Root)
   ├── 📄 layout.js
   │
   └── 📁 ruta
        ├── 📄 page.jsx
        │
        └── 📁 subruta
             └── 📄 page.jsx
```

En `app` van a ir las Screens, el compilador reconoce los archivos con nombre `page.jsx`

Ejemplo:

```
─ 📁 app
   │
   ├── 📁 about
   │    └── 📄 page.jsx
   │
   └── 📁 shop
        ├── 📄 page.jsx
        │
        └── 📁 categories
             └── 📄 page.jsx
```

Esto daría como resultado las rutas:

- http://localhost:3000/about
- http://localhost:3000/shop
- http://localhost:3000/shop/categories

### app/page.jsx

```js
export default function Root() {
  return (
    <div>Root</div>
  )
}
```

En el `layout.js` de `app` puedo poner una navbar o cualquier componente que sea común a todos los children. La `metadata` de este mismo archivo es el head, es la información que va a servir para SEO.

## Link

Importación:

```js
import Link from 'next/link'
```

Uso en componente:

```js
<Link href='/about'>About</Link>
```

## Carpeta components

```
─ 📁 components
   │
   └─ 📁 Navbar
       ├─ 📄 Navbar.jsx
       └─ 📄 navbar.css
```

## SEO

En cada layout, tanto del root como de los componentes, y en los componentes mismos puedo personalizar el SEO de la siguiente manera:

### Ejemplo en layout.jsx del Root

```js
export const metadata = {
    title: 'Título de la página',
    description: 'Descripción de la página',
}
```

### Ejemplo en un componente

```js
export const metadata = {
  title: 'Acerca de nosotros',
}

export default function About() {
  return (
    <div>About</div>
  )
}
```

## Fuentes

Una de las posibilidades para utilizar el módulo Fonts de NextJS, consiste en importar la fuente deseada de `next/font/google` en el componente o layout correspondiente.

### Ejemplo en layout.jsx del Root

```js
import { Open_Sans as Font } from 'next/font/google'

const customFont = Font({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={customFont.className}>
                {children}
            </body>
        </html>
    )
}
```

## Error 404

Situar un componente personalizable en la ubicación `/app/not-found.jsx`, el mismo será utilizado cuando no se encuentre el recurso solicitado (404) por el cliente.

### Ubicación

```
─ 📁 app
   │
   └── 📄 not-found.jsx
```

### Contenido

```js
export default function NotFound() {
  return (
    <div>
        <h2>Error 404</h2>
        <p>Página no encontrada</p>
    </div>
  )
}
```

## Componentes lado servidor

En componentes de servidor (back end) no se puede trabajar con datos o funcionalidades que necesitan ser procesadas en el navegador, ya sea ejecutar manejadores de eventos, hooks de React (como useState o useEffect), o hacer uso del localStorage. Para esto hay que transformar el componente de servidor en componente de cliente.

Para hacer esto hay que añadir la siguiente linea en la parte superior del componente:

`'use client'`

### Ejemplo con page.jsx de About

```js
'use client'

import { useEffect } from "react"

export const metadata = {
	title: "Acerca de nosotros"
}

export default function About() {
	const clickHandler = () => alert('chau')
	
	useEffect(() => {
		console.log('hola')
	}, [])
	
	return (
		<div>
			<h1>About</h1>
			<button onClick={clickHandler}>Clickear</button>
		</div>
	)
}
```

### *IMPORTANTE*

1. Si un componente padre se marca como `componente cliente`, los otros componentes importados (hijos) también tendrán comportamiento de cliente.

2. Los `metadata` para SEO solo funcionan en componentes de servidor.

### Algunos beneficios de usar Componente de Servidor

1. Data Fetching: Los componentes de servidor te permiten mover la data fetcheada al servidor, más cerca de su fuente de datos. Esto puede mejorar el rendimiento al reducir el tiempo que lleva recuperar los datos necesarios para el renderizado y la cantidad de requests que el cliente debe realizar.

2. Seguridad: Los componentes de servidor te permiten mantener los datos y la lógica confidenciales en el servidor, como tokens y claves API, sin el riesgo de exponerlos al cliente.

3. Optimización de motores de búsqueda y capacidad de compartir en redes sociales: los robots de los motores de búsqueda pueden utilizar el HTML renderizado para indexar sus páginas y los robots de las redes sociales para generar vistas previas de tarjetas sociales para sus páginas.

### Algunos beneficios de usar Componentes de Cliente

1. Interactividad: los componentes del cliente pueden utilizar state, effects y event listeners, lo que significa que pueden proporcionar feedback inmediato al usuario y actualizar la interfaz de usuario.

2. API del navegador: los componentes del cliente tienen acceso a las API del navegador, como geolocation o localStorage, lo que le permite crear una interfaz de usuario para casos de uso específicos.


### Cómo saber cuando usar Cliente o Servidor?

| Casos                                                      | Server Component | Client Component |
|----------------------------------------------------------------------------|----------|----------|
| Fetch data                                                                          |  SI  |  -  |
| Acceder a los recursos backend (directamente)                                       |  SI  |  -  |
| Mantener información confidencial en el servidor (access tokens, API keys, etc)     |  SI  |  -  |
| Mantener dependencias grandes en el servidor / Reduce JS en el cliente              |  SI  |  -  |
| Agregar interactividad y event listeners (onClick(), onChange(), etc)               |  -  |  SI  |
| Use State y efectos del ciclo de vida (useState(), useReducer(), useEffect(), etc)  |  -  |  SI  |
| Usar APIs solo para navegador                                                       |  -  |  SI  |
| Usar custom hooks que dependan de state, effects, o de APIs solo de navegador       |  -  |  SI  |
| Usar React Class components                                                         |  -  |  SI  |

## Componente Servidor Asíncrono & Cliente

### Fetch (Renderizado Servidor)

```js
import PostCard from "@/components/PostCard/PostCard"

async function loadPosts() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts")
	const data = await res.json()
	return data
}

export default async function PostPage() {
	const posts = await loadPosts()

	return (
		<div>
			{
                posts.map((post) => 
                    <PostCard key={post.id} post={post} />
			    )
            }
		</div>
	)
}
```

### Componente PostCard interactivo (Renderizado Cliente)

```js
'use client'

export default function PostCard({ post }) {
  return (
    <div>
        <h3>{post.id}. {post.title}</h3>
        <p>{post.body}</p>
        <button onClick={() => alert('Clickeado')}>Click me!</button>
    </div>
  )
}
```

## Loading Page

