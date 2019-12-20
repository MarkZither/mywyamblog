@echo off
dotnet publish
if %errorlevel% == 0 (
  bin\Debug\netcoreapp3.1\publish\mywyamblog.exe %*
)
set exitcode=%errorlevel%
cd %~dp0
exit /b %exitcode%