# X-AI Chip Doctor - Local Server
# Run this file: Right-click > Run with PowerShell

$port = 8080
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url  = "http://127.0.0.1:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: Could not start server. Try running as Administrator." -ForegroundColor Red
    Write-Host "Or just open the file directly: $root\xai-chip-doctor.html" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "   X-AI Chip Doctor Server Running!" -ForegroundColor Green
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Open this URL in Chrome or Edge:" -ForegroundColor White
Write-Host "  http://127.0.0.1:$port" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".json" = "application/json"
    ".svg"  = "image/svg+xml"
}

while ($listener.IsListening) {
    try {
        $context  = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ($rawPath -eq '' -or $rawPath -eq '/') {
            $rawPath = 'xai-chip-doctor.html'
        }

        $filePath = Join-Path $root $rawPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext      = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime     = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes    = [System.IO.File]::ReadAllBytes($filePath)

            $response.StatusCode      = 200
            $response.ContentType     = $mime
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "  [200] $rawPath" -ForegroundColor Green
        } else {
            $msg   = [System.Text.Encoding]::UTF8.GetBytes("404 - File not found: $rawPath")
            $response.StatusCode      = 404
            $response.ContentType     = "text/plain"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "  [404] $rawPath" -ForegroundColor Red
        }

        $response.OutputStream.Close()
    } catch {
        # Ignore connection reset errors
    }
}
