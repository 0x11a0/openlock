docker build -t my-node-app:latest . --platform linux/amd64
docker tag my-node-app:latest angruiyan/openlock:latest
docker push angruiyan/openlock:latest
