// src/store/tableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TableRow {
  id: string
  name?: string
  email?: string
  age?: number
  role?: string
  [key: string]: any
}

export interface TableState {
  rows: TableRow[]
  columns: string[]
  visibleColumns: string[]
  columnOrder: string[]
  search: string
}

const initialState: TableState = {
  rows: [
    { id: '1', name: 'Alice', email: 'alice@example.com', age: 25, role: 'Developer' },
    { id: '2', name: 'Bob', email: 'bob@example.com', age: 30, role: 'Designer' },
  ],
  columns: ['name', 'email', 'age', 'role'],
  visibleColumns: ['name', 'email', 'age', 'role'],
  columnOrder: ['name', 'email', 'age', 'role'],
  search: '',
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    addColumn: (state, action: PayloadAction<string>) => {
      const newCol = action.payload.trim()
      if (newCol && !state.columns.includes(newCol)) {
        state.columns.push(newCol)
        state.visibleColumns.push(newCol)
        state.columnOrder.push(newCol)
      }
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      if (state.visibleColumns.includes(action.payload)) {
        state.visibleColumns = state.visibleColumns.filter(c => c !== action.payload)
      } else {
        state.visibleColumns.push(action.payload)
      }
    },
    setColumnOrder: (state, action: PayloadAction<string[]>) => {
      state.columnOrder = action.payload
    },
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload)
    },
  },
})

export const {
  setSearch,
  addColumn,
  toggleColumnVisibility,
  setColumnOrder,
  setRows,
  deleteRow,
} = tableSlice.actions

export default tableSlice.reducer
