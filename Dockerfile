# Use official Python runtime as base image
FROM python:3.13-slim

# Set working directory in container
WORKDIR /app

# Copy requirements first (for better caching)
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application
COPY backend/ .

# Create necessary directories
RUN mkdir -p /app/logs

# Expose the backend port
EXPOSE 10000

# Set environment variables
ENV PORT=10000
ENV PYTHONUNBUFFERED=1

# Run the application with uvicorn using the platform-provided port
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-10000}"]
