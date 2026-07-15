@echo off
chcp 65001 >nul
setlocal

cd /d "D:\桌面\workbuddy\web\deploy"
if errorlevel 1 (
  echo [错误] 找不到目录 D:\桌面\workbuddy\web\deploy
  pause
  exit /b 1
)

REM 选择 python：优先系统 python，否则用 WorkBuddy 自带的
set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY set "PY=C:\Users\MECHREVO\.workbuddy\binaries\python\versions\3.13.12\python.exe"

if not exist "%PY%" (
  echo [错误] 未找到 Python，请确认路径：%PY%
  echo 或先安装 Python 并加入 PATH。
  pause
  exit /b 1
)

echo ===================================================
echo   敦煌纹样网站 - 本地预览
echo   首页(含3D):  http://localhost:8080/
echo   轮播(2D):    http://localhost:8080/carousel.html
echo   独立轮播(免服务器,可双击): deploy\carousel-standalone.html
echo   保持此窗口打开 = 服务运行中；关闭窗口即停止。
echo ===================================================

REM 端口占用检测：若 8080 已被占用，直接用已有服务
netstat -ano 2>nul | findstr ":8080 " >nul
if %errorlevel%==0 (
  echo [提示] 8080 端口已被占用，直接使用已有服务。
  goto :open
)

start "DunhuangPreview" /min "%PY%" -m http.server 8080
timeout /t 2 >nul

:open
start "" "http://localhost:8080/"

echo.
echo 服务器已启动。按任意键停止并关闭窗口...
pause >nul

taskkill /f /fi "WINDOWTITLE eq DunhuangPreview" >nul 2>nul
echo 服务器已停止。
exit /b 0
