npm create vite@latest utils

pick react and javascript

cd utils

npm install

### Add Tailwind and its configuration

Install `tailwindcss` and its peer dependencies:

```
npm install -D tailwindcss postcss autoprefixer
```

generate your `tailwind.config.js` and `postcss.config.js` files:

```
npx tailwindcss init -p
```

Add this import header in your main css file, src/index.css in our case:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... */
```

Configure the tailwind template paths in tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

create a `jsconfig.json` file with the following contents:

```
{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"]
  }

```

Update `vite.config.js`
Add the following code to the vite.config.ts so your app can resolve paths without error

```
# (so you can import "path" without error)
npm i -D @types/node
```

```
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Run the shadcn-ui init command to setup your project:

```
npx shadcn@latest init
```

### Add components at free will

```
npx shadcn@latest add button
```

### make sures to remove the require from within the `tailwind.config.js`

```
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [],
    plugins: ["tailwindcss-animate"],
    /* ... */
}
```
