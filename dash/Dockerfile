
ARG BUILD_FROM=ghcr.io/hassio-addons/base:16.0.1
FROM $BUILD_FROM

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

WORKDIR /app
COPY . /app

# Ensure line endings and permissions
RUN chmod +x /app/run.sh

RUN pip install flask requests asyncio flask_socketio websockets user-agents 
EXPOSE 4100




CMD [ "/app/run.sh" ]

# CMD ["python","main.py"]
