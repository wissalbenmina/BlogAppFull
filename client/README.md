# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Get started with vite

## Create vite app

- npm create vite@latest client -- --template react

## Install dependecies

- cd client
- npm install

# Get started with Tailwind.css

## Install Tailwind CSS

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

## Configure your template paths in your "tailwind.config.js" file

content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],

## Add the Tailwind directives to your CSS

@tailwind base;
@tailwind components;
@tailwind utilities;

# Set Up Font Awesome with Reat

## Add SVG Core

- npm i --save @fortawesome/fontawesome-svg-core

## Add Icon Packages

- npm i --save @fortawesome/free-solid-svg-icons
- npm i --save @fortawesome/free-regular-svg-icons
- npm i --save @fortawesome/free-brands-svg-icons

## Add the React Component

- npm i --save @fortawesome/react-fontawesome@latest

# Start your build process

- npm run dev
