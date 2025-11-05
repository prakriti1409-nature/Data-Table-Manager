'use client'
import React, { useState, useMemo, useEffect } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton, TextField, Stack,
  Button, Tooltip, Paper, TableSortLabel, Typography
} from '@mui/material'
import { Delete, Edit, Save, ViewColumn } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setRows, deleteRow, TableRow as TableRowType } from '@/store/tableSlice'
import { useSnackbar } from 'notistack'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import ManageColumnsModal from '@/components/ManageColumnsModal'

type Order = 'asc' | 'desc'

export default function DataTable() {
  const dispatch = useDispatch()
  const { rows, visibleColumns } = useSelector((state: RootState) => state.table)
  const { enqueueSnackbar } = useSnackbar()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCell, setEditingCell] = useState<{ id: string, field: string } | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('name')
  const [searchTerm, setSearchTerm] = useState('')
  const [columnOrder, setColumnOrder] = useState<string[]>(visibleColumns)
  const [openManageColumns, setOpenManageColumns] = useState(false)

  // ✅ Sync columnOrder when visibleColumns in Redux changes
  useEffect(() => {
    setColumnOrder(visibleColumns)
  }, [visibleColumns])

  // --- Sorting ---
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valA = a[orderBy] ?? ''
      const valB = b[orderBy] ?? ''
      if (valA < valB) return order === 'asc' ? -1 : 1
      if (valA > valB) return order === 'asc' ? 1 : -1
      return 0
    })
  }, [rows, order, orderBy])

  // --- Global Search ---
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return sortedRows
    return sortedRows.filter((row) =>
      visibleColumns.some((col) =>
        String(row[col] ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, sortedRows, visibleColumns])

  // --- Edit Mode Toggle ---
  const toggleEditMode = () => {
    setIsEditMode(prev => !prev)
    setEditingCell(null)
    enqueueSnackbar(isEditMode ? 'Exited edit mode' : 'Entered edit mode', {
      variant: isEditMode ? 'default' : 'info'
    })
  }

  // --- Inline Edit ---
  const handleCellDoubleClick = (id: string, field: string, value: string) => {
    if (!isEditMode) return
    setEditingCell({ id, field })
    setEditValue(value)
    setValidationError('')
  }

  const handleSave = () => {
    if (!editingCell) return

    if (editingCell.field === 'age' && isNaN(Number(editValue))) {
      setValidationError('Age must be a valid number')
      enqueueSnackbar('Invalid input: Age must be numeric', { variant: 'error' })
      return
    }

    const updatedRows = rows.map(row =>
      row.id === editingCell.id ? { ...row, [editingCell.field]: editValue } : row
    )

    dispatch(setRows(updatedRows))
    enqueueSnackbar('Changes saved successfully', { variant: 'success' })
    setEditingCell(null)
  }

  // --- Delete Row ---
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this row?')) {
      dispatch(deleteRow(id))
      enqueueSnackbar('Row deleted', { variant: 'warning' })
    }
  }

  // --- Column Drag & Drop ---
  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const reordered = Array.from(columnOrder)
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)
    setColumnOrder(reordered)
    enqueueSnackbar('Columns reordered', { variant: 'info' })
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Dynamic Data Table Manager</Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            variant="outlined"
            startIcon={<ViewColumn />}
            onClick={() => setOpenManageColumns(true)}
          >
            Manage Columns
          </Button>

          <Button
            variant="contained"
            onClick={toggleEditMode}
            startIcon={isEditMode ? <Save /> : <Edit />}
            sx={{
              borderRadius: 3,
              backgroundColor: isEditMode ? 'success.main' : 'primary.main',
              '&:hover': { opacity: 0.9 },
            }}
          >
            {isEditMode ? 'Save Mode' : 'Edit Mode'}
          </Button>
        </Stack>
      </Stack>

      {/* Manage Columns Modal */}
      <ManageColumnsModal
        open={openManageColumns}
        onClose={() => setOpenManageColumns(false)}
      />

      <TableContainer
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? '#fafafa' : '#1e1e1e',
          borderRadius: 3,
          overflow: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <TableRow ref={provided.innerRef} {...provided.droppableProps}>
                    {columnOrder.map((col, index) => (
                      <Draggable key={col} draggableId={col} index={index}>
                        {(provided) => (
                          <TableCell
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ fontWeight: 'bold', backgroundColor: 'action.selected' }}
                          >
                            <TableSortLabel
                              active={orderBy === col}
                              direction={orderBy === col ? order : 'asc'}
                              onClick={() => handleSort(col)}
                            >
                              {col.toUpperCase()}
                            </TableSortLabel>
                          </TableCell>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                  </TableRow>
                )}
              </Droppable>
            </DragDropContext>
          </TableHead>

          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: TableRowType) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                >
                  {columnOrder.map((col) => (
                    <TableCell
                      key={col}
                      onDoubleClick={() => handleCellDoubleClick(row.id, col, String(row[col] ?? ''))}
                      sx={{
                        cursor: isEditMode ? 'pointer' : 'default',
                        backgroundColor:
                          editingCell?.id === row.id && editingCell.field === col
                            ? 'rgba(25,118,210,0.1)'
                            : 'transparent',
                      }}
                    >
                      {editingCell?.id === row.id && editingCell.field === col ? (
                        <TextField
                          size="small"
                          variant="standard"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                          autoFocus
                          fullWidth
                          error={!!validationError}
                          helperText={validationError}
                        />
                      ) : (
                        row[col]
                      )}
                    </TableCell>
                  ))}

                  <TableCell align="center">
                    <Tooltip title="Delete Row">
                      <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
        />
      </TableContainer>
    </Paper>
  )
}
