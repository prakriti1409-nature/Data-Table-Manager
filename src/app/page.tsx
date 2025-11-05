'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { ThemeProvider, CssBaseline, Container, Stack, Paper } from '@mui/material'
import { getDesignTokens } from '@/theme/theme'
import { createTheme } from '@mui/material/styles'
import ThemeToggle from '@/components/ThemeToggle'
import DataTable from '@/components/DataTable'
import ImportExportButtons from '@/components/ImportExportButtons'

export default function HomePage() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // ✅ Load saved theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  // ✅ Save theme mode to localStorage when changed
  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mb={3}
          >
            <h1 style={{ margin: 0 }}>Dynamic Data Table Manager</h1>

            <Stack direction="row" spacing={1} alignItems="center">
              <ImportExportButtons />
              <ThemeToggle mode={mode} toggle={toggleTheme} />
            </Stack>
          </Stack>

          {/* ✅ Data Table includes Manage Columns modal internally */}
          <DataTable />
        </Paper>
      </Container>
    </ThemeProvider>
  )
}
