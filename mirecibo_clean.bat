set source="C:\Users\wsuarez\Desktop\recibos"
set destination="C:\Apache7\webapps\mirecibo\pdfs\sinFirmar"
del %destination%\*.* /F /Q
xcopy %source% %destination% /y