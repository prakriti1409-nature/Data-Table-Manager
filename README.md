# 🧮 Data-Table-Manager

A **Dynamic Data Table Manager** built using **Next.js (App Router)**, **Redux Toolkit**, and **Material UI (MUI)**.  
This project demonstrates real-world UI state management, dynamic columns, CSV import/export, inline editing, and persistence — all wrapped in a clean, responsive design.

🚀 **Deployed on Vercel:** :  https://data-table-manager-liart.vercel.app/

---

## 📍 Objective

Build a feature-rich dynamic data table manager demonstrating:

- Complex state management using Redux Toolkit  
- Real-time UI updates  
- CSV import/export  
- Persistent preferences  
- Theme toggling and responsive design  

---

## 🧩 Core Features

### 1️⃣ Table View
- Default columns: **Name**, **Email**, **Age**, **Role**
- Click column headers to sort (ASC/DESC)
- Global search (filters across all visible fields)
- Client-side pagination (default: 10 rows/page)

### 2️⃣ Dynamic Columns
- “Manage Columns” modal:
  - Add new fields (e.g., Department, Location)
  - Show/Hide columns via checkboxes
  - Reflect changes instantly
- Column visibility & order are **persisted** in localStorage

### 3️⃣ Import & Export
- **Import CSV**
  - Upload CSV and parse using **PapaParse**
  - Validate structure and data types (age must be numeric)
  - Show errors for invalid rows
- **Export CSV**
  - Export the current table view to CSV
  - Includes only **visible columns**

---

## 🎁 Bonus Features

- 🔄 **Inline Editing:**  
  - Enter **Edit Mode** by clicking the “Edit Mode” button.  
  - Once in Edit Mode, **double-click** any cell to edit its value inline.  
  - Validation is applied (e.g., *Age must be numeric*).  
  - Click “Save Mode” to exit and persist your changes.  
  - 🟢 *Editing only works after entering Edit Mode — double-clicking while in view mode will not trigger editing.*

- 🗑️ **Row Actions:**  
  - Delete rows with confirmation.  
  - Edits automatically save to Redux and persist via localStorage.

- 🌗 **Theme Toggle:**  
  - Switch between Light & Dark mode using the theme icon in the header.  
  - Preference is automatically saved.

- 🧭 **Column Reordering:**  
  - Drag & drop columns using `@hello-pangea/dnd`.

- 📱 **Responsive Design:**  
  - Fully adaptive layout powered by Material UI’s responsive system.

---

## 📥 CSV Import Rules

Your CSV file **must include the following columns**:

| Column | Description | Example |
|---------|-------------|----------|
| name | Full name | Alice |
| email | Valid email address | alice@example.com |
| age | Numeric value | 25 |
| role | Job title / role | Developer |

❌ Invalid rows (missing fields or non-numeric age) are automatically rejected with an error message.

---

## 📤 CSV Export

Click **“Export CSV”** to download the current table (only visible columns are included).  
File is saved as: **`table_export.csv`**

---

## 💾 Persistence

All data (rows, columns, visibility settings) are automatically saved to **localStorage** using **Redux Persist** — so refreshing or reopening the browser restores the same table view.

---

## 🌗 Theme Toggle

Use the theme toggle button in the header to switch between light and dark mode.  
Your preference persists automatically.

---

## 🧑‍💻 Example Data

The app starts with the following demo dataset:

```json
[
  { "id": "1", "name": "Alice", "email": "alice@example.com", "age": 25, "role": "Developer" },
  { "id": "2", "name": "Bob", "email": "bob@example.com", "age": 30, "role": "Designer" },
  { "id": "3", "name": "Charlie", "email": "charlie@example.com", "age": 28, "role": "Product Manager" },
  { "id": "4", "name": "Diana", "email": "diana@example.com", "age": 32, "role": "HR Specialist" },
  { "id": "5", "name": "Evan", "email": "evan@example.com", "age": 27, "role": "Data Analyst" }
]
```


## Working 

<img width="1102" height="747" alt="image" src="https://github.com/user-attachments/assets/03e176ee-1f7a-4af3-9cfa-afa4b8d0d14f" />

EDIT OPTION:
<img width="1072" height="549" alt="image" src="https://github.com/user-attachments/assets/1ebedb3d-86ed-4195-9206-78626c0c7c4b" />

FILTERING:
<img width="1067" height="427" alt="image" src="https://github.com/user-attachments/assets/73832fc9-244f-42ac-944e-08442641aa4e" />

MANAGE TABLE :
<img width="1049" height="487" alt="image" src="https://github.com/user-attachments/assets/b5821963-b922-48c2-86f3-3a427f84ff55" />
<img width="1069" height="366" alt="image" src="https://github.com/user-attachments/assets/2dade9c0-c9b7-4238-8b22-a06e3c0d7835" />

REARRANGING :
<img width="1046" height="659" alt="image" src="https://github.com/user-attachments/assets/41ce6cfd-d99a-4546-8d62-9079c04b9d53" />




