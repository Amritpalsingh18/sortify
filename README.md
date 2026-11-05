# Sortify — Product Sorting & Analytics
Advanced Data Structures mini-project using C++17 sorting algorithms, React/Vite frontend and a MySQL schema.

## Requirements
- C++17 compiler and CMake 3.16+
- Node.js 18+ and npm
- MySQL 8+ (optional for the demo UI)

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite.

## Build C++ engine
```bash
cd backend
cmake -S . -B build
cmake --build build
```
Run the produced `sortify` executable (on Windows, path depends on CMake generator, often `build\Debug\sortify.exe`).

## Database
Run `database/schema.sql` in MySQL Workbench or MySQL CLI. It creates the database, products table, and seed rows.

## Project contents
- Product catalog dashboard, search, category filtering, sorting controls, product creation, KPI cards and popularity chart.
- C++ engine: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort; selectable key/order; execution time measured with `std::chrono`.
- MySQL schema with product data.

## Integration note
The included React dashboard currently uses seeded in-memory data and browser-side sorting to remain runnable without local database credentials. The C++ sorting engine builds and runs independently. To make the browser call C++ and persist CRUD operations, the next integration step is a C++ REST service (Crow or similar) with MySQL Connector/C++ and frontend `fetch()` calls to that API. The source and schema are organized for that extension; this package does not claim that API/database wiring is already implemented.
