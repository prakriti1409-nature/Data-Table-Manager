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
    { id: '3', name: 'Charlie', email: 'charlie@example.com', age: 28, role: 'Product Manager' },
    { id: '4', name: 'Diana', email: 'diana@example.com', age: 35, role: 'Team Lead' },
    { id: '5', name: 'Ethan', email: 'ethan@example.com', age: 32, role: 'QA Engineer' },
    { id: '6', name: 'Fiona', email: 'fiona@example.com', age: 27, role: 'UI/UX Designer' },
    { id: '7', name: 'George', email: 'george@example.com', age: 29, role: 'Backend Developer' },
    { id: '8', name: 'Hannah', email: 'hannah@example.com', age: 31, role: 'Frontend Developer' },
    { id: '9', name: 'Ivan', email: 'ivan@example.com', age: 26, role: 'DevOps Engineer' },
    { id: '10', name: 'Julia', email: 'julia@example.com', age: 33, role: 'Scrum Master' },
    { id: '11', name: 'Kevin', email: 'kevin@example.com', age: 24, role: 'Intern' },
    { id: '12', name: 'Laura', email: 'laura@example.com', age: 38, role: 'Project Manager' },
    { id: '13', name: 'Mark', email: 'mark@example.com', age: 36, role: 'Full Stack Developer' },
    { id: '14', name: 'Nina', email: 'nina@example.com', age: 27, role: 'Content Strategist' },
    { id: '15', name: 'Oscar', email: 'oscar@example.com', age: 29, role: 'Data Analyst' },
    { id: '16', name: 'Paula', email: 'paula@example.com', age: 34, role: 'HR Manager' },
    { id: '17', name: 'Quentin', email: 'quentin@example.com', age: 40, role: 'CTO' },
    { id: '18', name: 'Rachel', email: 'rachel@example.com', age: 28, role: 'Marketing Specialist' },
    { id: '19', name: 'Sam', email: 'sam@example.com', age: 26, role: 'Software Engineer' },
    { id: '20', name: 'Tina', email: 'tina@example.com', age: 30, role: 'Graphic Designer' },
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
