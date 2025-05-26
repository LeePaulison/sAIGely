# fly-deploy.ps1

$AppName = "project-sage-ws"

# Check required secret
if (-not $env:NEXTAUTH_SECRET) {
    Write-Host "❌ NEXTAUTH_SECRET is not set in your environment."
    Write-Host "Set it first with: `$env:NEXTAUTH_SECRET = 'your-secret'"
    exit 1
}

# Default WS_PORT to 4001 if not set
if (-not $env:WS_PORT) {
    $env:WS_PORT = "4001"
}

Write-Host "🚀 Setting secrets for $AppName..."

fly secrets set `
    NEXTAUTH_SECRET="$env:NEXTAUTH_SECRET" `
    WS_PORT="$env:WS_PORT" `
    --app $AppName

Write-Host "📦 Deploying to Fly..."

fly deploy --app $AppName

Write-Host "✅ Deploy complete for $AppName"
