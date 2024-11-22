# [Utils](https://alberu.github.io/utils/)

# 🌟 Overview

The **Utils React App** is a dynamic and user-friendly web application offering a suite of practical tools to make daily tasks easier. Designed with **React.js**, this project features seamless utility functionality, and a responsive design tailored for any device.

## ✨ Features

- 🔍 **Utility Tools:**
  - **Spending Visualizer:**
    - Input your gross salary and monthly expenses to visualize your spending habits.
    - Receive clear, graphical representations of your financial allocations.
  - **Fuel Cost Calculator:**
    - Calculate the cost of fuel based on distance, fuel efficiency, and fuel price.
    - Get insights into potential savings or expenses for your trips.

- 🎨 **Responsive Design:**
  - Optimized for desktop, tablet, and mobile devices.

## 🛠️ Built With

- **Javascript:** To handle all of the back end
- **React.js:** Front-end framework for creating dynamic user interfaces.
- **Tailwind CSS:** Ensures clean and modern styling.
- **Git & GitHub:** Version control and project hosting.

## 🚀 How to Run the Project

### Prerequisites

- Node.js and npm installed on your machine.
- Basic understanding of React.js, JavaScript, and Tailwind CSS.
- Familiarity with shadcn/ui for component-based styling.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/alberu/utils.git
   cd utils
   ```
2. Install dependinces the repository:
   ```bash
   npm install
   ```
3. Setup Tailwind CSS:
   - Ensure the Tailwind configuration is correct. The `tailwind.config.js` file should have relevant configurations for shadcn and your project.
   npm run dev
   - If needed, generate Tailwind classes or utilities:
   ```bash
   npx tailwindcss init
   ```
4. Start the develoments server using Vite:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL show in the terminal which should also be the one below (usually):
   ```
   http://localhost:5173
   ```

### Deploying

1. Modify `vite.config.js` setting the `base` option to your repository name so paths resolve correctly:
```javascript
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/utils/',
  // any extra bits
})
```
2. Install `gh-pages` as a development dependency in your project:
```bash
npm install gh-pages --save-dev
```
3. Add a deploy script to your `package.json`
```json
"scripts": {
  "build": "vite build",
  "deploy": "gh-pages -d dist"
}
```
4. Build the app
build the app
```bash
npm run build
```
5. Deploy the app
```bash
npm run deploy
```

## Credits

This project was inspired by the projects built on the [React.JS Full Course by James McArthur](https://smoljames.com/roadmap)


