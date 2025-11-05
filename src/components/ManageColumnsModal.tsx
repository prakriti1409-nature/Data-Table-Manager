'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { toggleColumnVisibility } from '@/store/tableSlice'
import type { RootState } from '@/store/store'

interface ManageColumnsModalProps {
  open: boolean
  onClose: () => void
}

interface FormValues {
  [key: string]: boolean
}

export default function ManageColumnsModal({ open, onClose }: ManageColumnsModalProps) {
  const dispatch = useAppDispatch()
  const { columns, visibleColumns } = useAppSelector((state: RootState) => state.table)

  const { handleSubmit, reset } = useForm<FormValues>()

  const handleToggle = (column: string) => {
    dispatch(toggleColumnVisibility(column))
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Manage Columns</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={1}>
          <FormGroup>
            {columns.map((col: string) => (
              <FormControlLabel
                key={col}
                control={
                  <Checkbox
                    checked={visibleColumns.includes(col)}
                    onChange={() => handleToggle(col)}
                  />
                }
                label={col.toUpperCase()}
              />
            ))}
          </FormGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
