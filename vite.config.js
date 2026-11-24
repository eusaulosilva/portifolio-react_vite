import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://eusaulosilva.com.br',
      dynamicRoutes: [
        '/inicio',
        '/sobre',
        '/skills',
        '/projetos',
        '/curriculo',
        '/contato',
        '/cv',
        '/cv/dados',
        '/cv/dev',
      ],
      generateRobotsTxt: false,
    }),
  ],
  base: '/',
})
