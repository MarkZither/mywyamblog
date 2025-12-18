#!/usr/bin/env powershell
# Build script for hybrid Statiq + Docusaurus blog

param(
    [switch]$Production = $false,
    [switch]$Image = $false
)


Write-Host "🚀 Building blog" -ForegroundColor Green

    Write-Host "📚 Building Docusaurus..." -ForegroundColor Cyan

    # Work in `src/docs` to match repository layout
    Push-Location "src/docs"
    try {
        npm ci --silent
        npm run build

        if ($LASTEXITCODE -ne 0) {
            throw "Docusaurus build failed"
        }

        Write-Host "✅ Docusaurus build completed" -ForegroundColor Green

        # create a compressed archive of the built site for artifact upload
        Pop-Location
        $archive = Join-Path -Path (Get-Location) -ChildPath "docusaurus-build.tar.gz"
        if (Test-Path $archive) { Remove-Item $archive -Force }
        Write-Host "📦 Creating archive: $archive"
        tar -czf $archive -C src/docs build
        Write-Host "📄 Archive contents:" -ForegroundColor Cyan
        # Use a cross-platform PowerShell-friendly listing to avoid Unix flags on Windows
        if ([System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([System.Runtime.InteropServices.OSPlatform]::Windows)) {
            Get-Item -Path $archive | Select-Object FullName, Length, LastWriteTime | Format-List
        }
        else {
            & ls -la $archive
        }

        # Optionally build a container image (requires Docker engine)
        if ($Image) {
            $tag = "markzither/myblog:latest"
            Write-Host "🐳 Building Docker image: $tag" -ForegroundColor Cyan
            docker build -t $tag .
            if ($LASTEXITCODE -ne 0) { throw "Docker build failed" }

            # save the image as a tar for artifact collection
            $imgTar = Join-Path -Path (Get-Location) -ChildPath "docusaurus-image.tar"
            if (Test-Path $imgTar) { Remove-Item $imgTar -Force }
            docker save $tag -o $imgTar
            Write-Host "📦 Docker image saved: $imgTar"
            # Use a cross-platform PowerShell-friendly listing to avoid Unix flags on Windows
            if ([System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([System.Runtime.InteropServices.OSPlatform]::Windows)) {
                Get-Item -Path $imgTar | Select-Object FullName, Length, LastWriteTime | Format-List
            }
            else {
                & ls -la $imgTar
            }
        }
    }
    catch {
        Pop-Location
        throw
    }


Write-Host "🎉 Build completed!" -ForegroundColor Green

# Usage instructions
Write-Host ""
Write-Host "Usage examples:" -ForegroundColor Yellow
Write-Host "  .\build.ps1 -Production        # Production build"
Write-Host "  .\build.ps1 -Production -Image # Production build with docker Image"