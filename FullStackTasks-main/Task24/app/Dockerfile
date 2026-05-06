# -------------------------------------------------------
# Stage 1 – Build: install dependencies into a venv
# -------------------------------------------------------
FROM python:3.12-slim AS builder

WORKDIR /build

# Install only what we need to build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt


# -------------------------------------------------------
# Stage 2 – Runtime: minimal image with non-root user
# -------------------------------------------------------
FROM python:3.12-slim AS runtime

# Create a non-root user and group
RUN groupadd --gid 1001 appgroup && \
    useradd --uid 1001 --gid appgroup --no-create-home appuser

WORKDIR /app

# Copy installed packages from the builder stage
COPY --from=builder /install /usr/local

# Copy application source
COPY app.py .

# Use non-root user for all subsequent commands
USER appuser

# Expose application port
EXPOSE 5000

# Health check (used by Docker and Kubernetes liveness probes)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')"

# Start with gunicorn (production WSGI server)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "4", "--timeout", "60", "app:app"]
