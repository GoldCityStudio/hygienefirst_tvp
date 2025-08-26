@echo off
echo Fixing chatbot encoding issues...

REM Copy the corrected chatbot to replace corrupted ones
copy corrected-chatbot.html temp-chatbot.txt

REM Process each HTML file
for %%f in (*.html) do (
    if not "%%f"=="chatbot.html" if not "%%f"=="corrected-chatbot.html" (
        echo Processing %%f...
        
        REM Remove corrupted chatbot section and add corrected one
        powershell -Command "(Get-Content '%%f' -Raw) -replace '(?s)<!-- Chatbot Component -->.*?</script>', (Get-Content 'temp-chatbot.txt' -Raw) | Set-Content '%%f' -Encoding UTF8"
        
        echo Fixed %%f
    )
)

REM Clean up
del temp-chatbot.txt

echo Chatbot encoding fix completed!
pause

