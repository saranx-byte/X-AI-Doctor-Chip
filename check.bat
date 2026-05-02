@echo off
cd /d "C:\Users\SARANYA\OneDrive\Desktop\VLSI"
"C:\Program Files\nodejs\node.exe" -e "var fs=require('fs');var h=fs.readFileSync('xai-chip-doctor.html','utf8');console.log('SIZE:'+h.length);console.log('ASSISTANT:'+h.includes('page-assistant'));console.log('SHOWPAGE:'+h.includes('function showPage'));console.log('BODY:'+h.includes('</body>'));"
pause
