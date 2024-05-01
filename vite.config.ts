/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["./src/**/*.test.{js, jsx, ts,tsx}", "./tests/**/*.test.{js, jsx, ts,tsx}"],
    environment: "jsdom"
  },
})
