@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Once Node.js LTS kurun: https://nodejs.org/en/download
  echo Kurulumdan sonra bu dosyayi yeniden acin.
  pause
  exit /b 1
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm bulunamadi. Node.js kurulumunu npm secenegiyle tamamlayin.
  pause
  exit /b 1
)
if not exist "node_modules\.bin\sirv.cmd" (
  echo Ilk kurulum: paketler indiriliyor...
  call npm.cmd ci
  if errorlevel 1 (
    echo Kurulum tamamlanamadi. Yukaridaki hatayi ve internet baglantisini kontrol edin.
    pause
    exit /b 1
  )
)
echo.
echo Grid Dijital: http://127.0.0.1:4317
echo Sunucu hazir oldugunda bu adresi tarayicida acin.
echo Bu pencereyi acik tutun. Durdurmak icin Ctrl+C kullanin.
echo.
call npm.cmd run dev
if errorlevel 1 (
  echo Sunucu baslatilamadi. Yukaridaki hata mesajini kontrol edin.
  pause
  exit /b 1
)
endlocal
