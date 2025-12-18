<#
.SYNOPSIS
    Build Docusaurus static site and package it into a Docker image.

.DESCRIPTION
    Runs `npm ci` and `npm run build` in `src/docs`, then builds a Docker image using
    the repository-level `Dockerfile` (which expects the built site at `src/docs/build/`).

.PARAMETER ImageName
    The Docker image name (default: mywyamblog).

.PARAMETER Tag
    The Docker tag (default: latest).

.PARAMETER Push
    If specified, the script will tag and push the built image to the registry specified
    by the environment variable `DOCKER_REPO`. Credentials must be provided via
    `DOCKER_USERNAME` and `DOCKER_PASSWORD` environment variables.

EXAMPLE
    .\scripts\build-and-package.ps1 -ImageName mywyamblog -Tag 2025-12-10

    Build the site and build a Docker image tagged `mywyamblog:2025-12-10`.

    .\scripts\build-and-package.ps1 -ImageName mywyamblog -Tag latest -Push

    Build, tag and push to registry (requires DOCKER_REPO, DOCKER_USERNAME, DOCKER_PASSWORD env vars).
#>

param(
    [string]$ImageName = "myblog",
    [string]$Tag = "latest",
    [switch]$Push
)

Set-StrictMode -Version Latest

$scripts = Split-Path -Parent $MyInvocation.MyCommand.Definition
$root = Split-Path -Parent $scripts
Write-Host "Repository root: $root"

Push-Location $root
try {
    Write-Host "--> Building Docusaurus (src/docs)"
    Push-Location "src/docs"

    if (-Not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not available on PATH. Install Node.js/npm before running this script."
        exit 2
    }

    npm ci
    npm run build
    Pop-Location

    $buildDir = Join-Path $root "src/docs/build"
    if (-not (Test-Path $buildDir)) {
        Write-Error "Build output not found at $buildDir"
        exit 3
    }

    $imageTag = "${ImageName}:${Tag}"
    Write-Host "--> Building Docker image: $imageTag"
    docker build -t $imageTag .

    if ($Push) {
        if (-not $env:DOCKER_USERNAME -or -not $env:DOCKER_PASSWORD -or -not $env:DOCKER_REPO) {
            Write-Error "To push, set DOCKER_USERNAME, DOCKER_PASSWORD, and DOCKER_REPO environment variables."
            exit 4
        }

        $fullTag = "${env:DOCKER_REPO}/${ImageName}:${Tag}"
        Write-Host "--> Tagging image as $fullTag"
        docker tag $imageTag $fullTag

        # Check if Docker is already logged in (docker info prints 'Username: <name>' when authenticated)
        $dockerInfo = docker info 2>$null
        $alreadyLoggedIn = $false
        if ($dockerInfo) {
            if ($dockerInfo -match 'Username:\s*(\S+)') {
                $currentUser = $matches[1]
                Write-Host "--> Docker already logged in as $currentUser; skipping login."
                $alreadyLoggedIn = $true
            }
        }

        if (-not $alreadyLoggedIn) {
            Write-Host "--> Logging in to Docker registry"
            docker login -u $env:DOCKER_USERNAME -p $env:DOCKER_PASSWORD
        }

        Write-Host "--> Pushing $fullTag"
        docker push $fullTag
        Write-Host "--> Push complete"
    }

    Write-Host "Done."
} finally {
    Pop-Location -ErrorAction SilentlyContinue
}
