#this will build an image that will run on intel/amd or mac m1/arm platforms
#this pushes directly to docker hub, so you must be logged in to docker hub already
#run once for new version then again to replace the latest tagged
docker buildx build --platform linux/amd64,linux/arm64 --push -t hubmap/github-pages-server:1.0.1 .
docker buildx build --platform linux/amd64,linux/arm64 --push -t hubmap/github-pages-server:latest .

