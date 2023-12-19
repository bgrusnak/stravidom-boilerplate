import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

// https://vitejs.dev/config/
const config = {
  envPrefix: 'TEST_',
  define: {
    "API_URL": `"${process.env.STRAPI_ADMIN_BACKEND_URL}"` // wrapping in "" since it's a string
  },
  server: {
		host: true,
		port: process.env.FRONTEND_PORT
	},
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
}
/* 
if (process.env.NODE_ENV == 'development') {
	config.server.https = {
		key: fs.readFileSync('cert/localhost-key.pem'),
		cert: fs.readFileSync('cert/localhost.pem')
	}
}  */

export default defineConfig(config)