import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
      'process.env.ACCESS_KEY': JSON.stringify(env.ACCESS_KEY),
      'process.env.SECRET_ACCESS_KEY': JSON.stringify(env.SECRET_ACCESS_KEY),
      global: {},
    },
    plugins: [react()],
  }
})
