# Warp Environment Setup for project-sage
# This script optimizes the PowerShell environment for Next.js development

# Project-specific environment variables
$env:PROJECT_NAME = "project-sage"
$env:NODE_ENV = "development"
$env:NEXT_TELEMETRY_DISABLED = "1"  # Disable Next.js telemetry for faster startup

# Enhanced PowerShell prompt for this project
function prompt {
    $currentPath = (Get-Location).Path
    if ($currentPath -like "*project-sage*") {
        Write-Host "🧠 sAIgely " -ForegroundColor Cyan -NoNewline
        Write-Host "[$($env:USERNAME)] " -ForegroundColor Green -NoNewline
        Write-Host "$(Split-Path -Leaf $currentPath)" -ForegroundColor Yellow -NoNewline
        Write-Host " > " -ForegroundColor White -NoNewline
        return " "
    }
    return "PS $($executionContext.SessionState.Path.CurrentLocation)> "
}

# Useful functions for project development (PowerShell doesn't support script block aliases)
function dev { npm run dev }
function ws { npm run ws }
function build { npm run build }
function test { npm test }
function lint { npm run lint }

# Function to quickly start full development environment
function Start-FullDev {
    Write-Host "🚀 Starting full development environment..." -ForegroundColor Green
    Write-Host "Starting WebSocket server in background..." -ForegroundColor Yellow
    Start-Job -Name "WebSocketServer" -ScriptBlock { 
        Set-Location "G:\Development_Repos\Personal\project-sage"
        npm run ws 
    }
    Write-Host "Starting Next.js development server..." -ForegroundColor Yellow
    npm run dev
}

# Function to stop all development servers
function Stop-DevServers {
    Write-Host "🛑 Stopping development servers..." -ForegroundColor Red
    Get-Job -Name "WebSocketServer" -ErrorAction SilentlyContinue | Stop-Job | Remove-Job
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { 
        $_.ProcessName -eq "node" -and $_.CommandLine -like "*project-sage*" 
    } | Stop-Process -Force
    Write-Host "All servers stopped." -ForegroundColor Green
}

# Function to check project status
function Get-ProjectStatus {
    Write-Host "📊 Project Status for sAIgely:" -ForegroundColor Cyan
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Gray
    Write-Host "Node version: $(node --version)" -ForegroundColor Gray
    Write-Host "NPM version: $(npm --version)" -ForegroundColor Gray
    
    # Check if package.json exists and show available scripts
    if (Test-Path "package.json") {
        Write-Host "Available scripts:" -ForegroundColor Yellow
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        $packageJson.scripts | Format-Table -AutoSize
    }
    
    # Check for running Node processes
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "Running Node processes:" -ForegroundColor Green
        $nodeProcesses | Select-Object Id, ProcessName | Format-Table
    } else {
        Write-Host "No Node processes currently running." -ForegroundColor Yellow
    }
}

# Auto-completion for npm scripts
Register-ArgumentCompleter -CommandName npm -ParameterName run -ScriptBlock {
    param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)
    if (Test-Path "package.json") {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        $scripts = $packageJson.scripts.PSObject.Properties.Name
        $scripts | Where-Object { $_ -like "$wordToComplete*" } | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
        }
    }
}

Write-Host "🧠 sAIgely development environment loaded!" -ForegroundColor Cyan
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  Start-FullDev    - Start both frontend and backend servers" -ForegroundColor White
Write-Host "  Stop-DevServers  - Stop all running development servers" -ForegroundColor White
Write-Host "  Get-ProjectStatus - Show current project status" -ForegroundColor White
Write-Host "  dev, ws, build, test, lint - Quick aliases for npm scripts" -ForegroundColor White