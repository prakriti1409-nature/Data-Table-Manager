'use client'
import { createTheme } from '@mui/material/styles'

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
          background: { default: '#fafafa', paper: '#fff' },
        }
      : {
          primary: { main: '#90caf9' },
          secondary: { main: '#ce93d8' },
          background: { default: '#121212', paper: '#1e1e1e' },
        }),
  },
  shape: { borderRadius: 12 },
})
