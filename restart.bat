@echo off
echo ========================================
echo    Restarting Shopping Hub Server
echo ========================================
echo.
echo Stopping current server...
taskkill /f /im node.exe >nul 2>&1
echo.
echo Starting server...
echo.
echo Website will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
node server.js
pause 