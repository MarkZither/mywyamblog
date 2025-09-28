#!/usr/bin/env powershell
# Build script for hybrid Statiq + Docusaurus blog

param(
    [switch]$Production = $false,
    [switch]$OnlyDocusaurus = $false,
    [switch]$OnlyStatiq = $false
)

Write-Host "🚀 Building hybrid blog (Statiq + Docusaurus)" -ForegroundColor Green

# Build Statiq blog (unless OnlyDocusaurus is specified)
if (-not $OnlyDocusaurus) {
    Write-Host "📄 Building Statiq blog..." -ForegroundColor Cyan
    
    Push-Location "src/blog"
    try {
        if ($Production) {
            dotnet run -- -l Information
        } else {
            dotnet run -- -l Information
        }
        
        if ($LASTEXITCODE -ne 0) {
            throw "Statiq build failed"
        }
        
        Write-Host "✅ Statiq build completed" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
}

# Build Docusaurus (unless OnlyStatiq is specified)
if (-not $OnlyStatiq) {
    Write-Host "📚 Building Docusaurus..." -ForegroundColor Cyan
    
    Push-Location "docs"
    try {
        npm run build
        
        if ($LASTEXITCODE -ne 0) {
            throw "Docusaurus build failed"
        }
        
        Write-Host "✅ Docusaurus build completed" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
}

# Combine outputs if building both
if (-not $OnlyDocusaurus -and -not $OnlyStatiq) {
    Write-Host "🔗 Combining sites..." -ForegroundColor Cyan
    
    # Create combined output directory
    if (Test-Path "combined-site") {
        Remove-Item "combined-site" -Recurse -Force
    }
    New-Item -ItemType Directory -Path "combined-site" | Out-Null
    
    # Copy Statiq output
    if (Test-Path "output") {
        Copy-Item "output/*" "combined-site/" -Recurse -Force
        Write-Host "📄 Copied Statiq output" -ForegroundColor Gray
    }
    
    # Copy Docusaurus build to /docs subdirectory
    if (Test-Path "docs/build") {
        New-Item -ItemType Directory -Path "combined-site/docs" -Force | Out-Null
        Copy-Item "docs/build/*" "combined-site/docs/" -Recurse -Force
        Write-Host "📚 Copied Docusaurus output to /docs/" -ForegroundColor Gray
    }
    
    Write-Host "✅ Sites combined successfully" -ForegroundColor Green
    Write-Host "📁 Combined output available in: combined-site/" -ForegroundColor Yellow
}

Write-Host "🎉 Build completed!" -ForegroundColor Green

# Usage instructions
Write-Host ""
Write-Host "Usage examples:" -ForegroundColor Yellow
Write-Host "  .\build.ps1                    # Build both sites"
Write-Host "  .\build.ps1 -OnlyDocusaurus    # Build only Docusaurus"
Write-Host "  .\build.ps1 -OnlyStatiq        # Build only Statiq"
Write-Host "  .\build.ps1 -Production        # Production build"