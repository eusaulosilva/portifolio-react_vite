import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://eusaulosilva.com.br',
      // Como o seu App.jsx mostra que tudo está em uma página (Single Page), 
      // o hostname principal já basta, mas você pode listar as seções:
      dynamicRoutes: ['/', '#sobre', '#skills', '#projetos', '#contato'] 
    }),
  ],
  base: './',
})