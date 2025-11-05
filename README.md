# 🧮 Data-Table-Manager

A fully dynamic **React + Redux Toolkit** powered data table manager with CSV import/export, inline editing, drag-and-drop columns, sorting, pagination, and theme toggling.

Built for flexibility and real-world data management use cases — manage datasets easily with persistent state, custom columns, and validation.

---

## 🚀 Features

✅ **Dynamic Data Table**
- Inline cell editing with validation  
- Column visibility management  
- Global search across all visible columns  
- Sorting (ascending/descending)  
- Pagination (5 / 10 / 20 rows per page)

✅ **Column Management**
- Add or remove columns dynamically  
- Reorder columns via drag & drop  
- Persisted layout (via Redux Persist)

✅ **Data Import & Export**
- Import CSV with automatic field validation  
- Export filtered table to CSV  
- Real-time feedback via notifications

✅ **UI / UX**
- Responsive design with Material UI  
- Snackbar alerts for all major actions  
- Light/Dark mode toggle  
- Smooth animations and user-friendly interactions

✅ **State Management**
- Redux Toolkit + Redux Persist  
- Typed hooks (`useAppSelector`, `useAppDispatch`) for safety  
- Modular slice-based structure (`tableSlice.ts`)

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Next.js App Router)** | Frontend framework |
| **TypeScript** | Type safety |
| **Redux Toolkit** | State management |
| **Redux Persist** | Local persistence |
| **Material UI (MUI)** | UI components |
| **@hello-pangea/dnd** | Column drag-and-drop |
| **PapaParse** | CSV parsing |
| **FileSaver** | CSV export |
| **Notistack** | Snackbar notifications |

---

## 📥 CSV Import Rules

Your CSV file must include the following columns:

| Column | Description | Example |
|---------|--------------|----------|
| **name** | Full name | Alice |
| **email** | Valid email address | alice@example.com |
| **age** | Numeric value | 25 |
| **role** | Job title / role | Developer |

⚠️ **Validation Rules**
- Rows missing any of the above fields are automatically rejected.
- `age` must be a valid number.
- Invalid rows trigger an error message (with line number) during import.

---

## 📤 CSV Export

- Click **“Export CSV”** to download the current table view.  
- Only **visible columns** are included in the export file.  
- File name:  

