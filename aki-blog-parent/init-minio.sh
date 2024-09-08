#!/bin/sh
# Start Minio
minio server /data &

# Wait for Minio to start
sleep 20

# Configure Minio client
mc alias set myminio http://minio:9000/ aki-blog-user qwe6110484131 && \
mc mb myminio/aki-blog-bucket && \
mc anonymous set public myminio/aki-blog-bucket

# Keep the container running
tail -f /dev/null