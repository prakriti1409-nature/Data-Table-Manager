'use client'
import React from 'react'
import { Button } from '@mui/material'
import Papa, { ParseResult } from 'papaparse'
import { saveAs } from 'file-saver'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setRows, TableRow } from '@/store/tableSlice'

export default function ImportExportButtons() {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { rows, visibleColumns } = useSelector((state: RootState) => state.table)

  // ✅ Import CSV
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Record<string, string>>) => {
        // Validate that we got valid rows
        if (!Array.isArray(results.data) || results.data.length === 0) {
          alert('CSV file is empty or has invalid format.')
          return
        }

        const newRows: TableRow[] = results.data
          .filter((r): r is Record<string, string> => typeof r === 'object' && r !== null)
          .map((r, i) => ({
            id: String(i + 1),
            ...r,
          }))

        if (newRows.length === 0) {
          alert('No valid rows found in CSV file.')
          return
        }

        dispatch(setRows(newRows))
        alert('CSV imported successfully!')
      },
      error: (err: Error) => {
        alert(`CSV Error: ${err.message}`)
      },
    })

    // Reset the input so the same file can be uploaded again
    e.target.value = ''
  }

  // ✅ Export CSV
  const handleExport = () => {
    if (rows.length === 0) {
      alert('No data to export.')
      return
    }

    const filtered = rows.map((row) => {
      const newObj: Record<string, any> = {}
      visibleColumns.forEach((col) => (newObj[col] = row[col]))
      return newObj
    })

    const csv = Papa.unparse(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'table_export.csv')
  }

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={() => fileInputRef.current?.click()}
        sx={{ mr: 1 }}
      >
        Import CSV
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleExport}>
        Export CSV
      </Button>
    </>
  )
}
