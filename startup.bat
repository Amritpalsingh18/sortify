
@echo off
title SORTIFY - Smart Product Sorting System

cd /d "%~dp0"

echo ======================================
echo       SORTIFY PROJECT LAUNCHER
echo ======================================

echo.
echo [1/3] Checking frontend dependencies...

if not exist "frontend\node_modules" (
    cd frontend
    call npm install
    cd ..
)

echo.
echo [2/3] Building C++ engine...

if not exist "backend\build\sortify.exe" (
    cmake -S backend -B backend/build -G "MinGW Makefiles"
    if errorlevel 1 goto error
    cmake --build backend/build
    if errorlevel 1 goto error
)

echo.
echo [3/3] Starting frontend...

start "SORTIFY FRONTEND" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul

start http://localhost:5173

echo.
echo SORTIFY STARTED!
echo Keep the frontend terminal open.
echo.
pause
exit /b

:error
echo.
echo BUILD FAILED. Check the error above.
pause
exit /b
