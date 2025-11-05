import Papa from 'papaparse'
import { useDispatch } from 'react-redux'
import { setRows } from '@/store/tableSlice'
import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'

export default function ImportCSV() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const validateRows = (rows: any[]) => {
    const errors: string[] = []
    const validRows = rows.filter((row, index) => {
      const { Name, Email, Age, Role } = row

      if (!Name || !Email || !Age || !Role) {
        errors.push(`Row ${index + 1}: Missing required fields`)
        return false
      }
      if (isNaN(Number(Age))) {
        errors.push(`Row ${index + 1}: Age must be a number`)
        return false
      }
      return true
    })

    return { validRows, errors }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const { validRows, errors } = validateRows(results.data)
        if (errors.length) {
          enqueueSnackbar(`Import failed: ${errors[0]}`, { variant: 'error' })
        } else {
          dispatch(setRows(validRows))
          enqueueSnackbar(`Imported ${validRows.length} rows successfully!`, { variant: 'success' })
        }
      },
      error: () => enqueueSnackbar('Error reading CSV file', { variant: 'error' }),
    })
  }

  return (
    <Button
      component="label"
      variant="contained"
      color="primary"
    >
      Import CSV
      <input
        hidden
        accept=".csv"
        type="file"
        onChange={handleImport}
      />
    </Button>
  )
}
