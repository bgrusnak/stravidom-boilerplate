import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import fs from 'fs'
import isDocker from 'is-docker';

dotenv.config()

// https://vitejs.dev/config/
const config = {
  envPrefix: 'TEST_',
  define: {
    "API_URL": `"${process.env.STRAPI_ADMIN_BACKEND_URL}"` // wrapping in "" since it's a string
  },
  server: {
		host: '127.0.0.1',
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
// bypass for the testing without docker
if (process.env.NODE_ENV == 'development' && !isDocker()) { 
  console.log('Running free');
  config.server.https = {
    key: fs.readFileSync('../cert/127.0.0.1-key.pem'),
    cert: fs.readFileSync('../cert/127.0.0.1.pem')
  } 
}

export default defineConfig(config)