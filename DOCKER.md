# Building and Running the Docker Image

This project ships a static site (Docusaurus) that can be served from a lightweight Nginx container.

Quick steps (local):

1. Build the static site and the Docker image (PowerShell):

```powershell
# From repository root
.\scripts\build-and-package.ps1 -ImageName mywyamblog -Tag latest
```

2. Run the image locally:

```powershell
# Map container port 80 to host 8080
docker run --rm -p 8080:80 mywyamblog:latest
```

3. Build and push to registry (optional):

```powershell
# Set these environment variables first (example for Docker Hub):
$env:DOCKER_USERNAME = "your-username"
$env:DOCKER_PASSWORD = "your-password"
$env:DOCKER_REPO = "your-dockerhub-namespace"

# Then run the script with -Push
.\scripts\build-and-package.ps1 -ImageName mywyamblog -Tag latest -Push
```

Notes:

- The repository `Dockerfile` expects the Docusaurus build output to be located at `src/docs/build/`.
- The Docker image is based on `nginx:stable-alpine` to keep the image small and simple.
- For continuous delivery, see `.woodpecker.yml` which includes a ready-to-use pipeline that builds the site and (optionally) pushes the image. Configure secrets for `docker_repo`, `docker_username`, and `docker_password` in Woodpecker.
