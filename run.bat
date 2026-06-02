@echo off
set EXE_PATH=publish\AutoSchoolAdminArm.exe
if exist "%EXE_PATH%" (
    start "" "%EXE_PATH%"
) else (
    echo Error: %EXE_PATH% not found.
    pause
)
