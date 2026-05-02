@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" build_complete.js
if %ERRORLEVEL%==0 (
  echo.
  echo SUCCESS - Starting server...
  echo.
  "C:\Program Files\nodejs\node.exe" server.js
) else (
  echo FAILED - check errors above
  pause
)
