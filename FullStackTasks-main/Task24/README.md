# Task 24: Vibe Coding – Cloud-Based REST API Feature

## Overview

This task uses **Vibe Coding** (iterative AI-assisted development) to build a complete cloud-based feature: a **Product Inventory REST API** with JWT authentication, containerised with Docker, deployed on Kubernetes (AWS EKS-compatible), and secured with industry best practices.

The prompt-engineering process is fully documented across **three prompt versions**, showing how refinement improves code accuracy, scalability, and real-world usability.

---

## Feature: Product Inventory REST API

The API allows authenticated users to manage a product inventory stored in memory (can be replaced with a real DB).

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | No | Obtain a JWT token |
| GET | `/products` | JWT | List all products |
| POST | `/products` | JWT | Create a product |
| GET | `/products/<id>` | JWT | Get a single product |
| PUT | `/products/<id>` | JWT | Update a product |
| DELETE | `/products/<id>` | JWT | Delete a product |
| GET | `/health` | No | Health check |

---

## Prompt Version History

### Version 1 – Initial (broad prompt)

**Prompt:**
```
Build a REST API in Python for product management.
```

**Output quality:**
- Generated basic Flask CRUD — no auth, no input validation, no error handling.
- Not production-ready.

**Identified gaps:** Authentication, validation, HTTP error codes, structured responses.

---

### Version 2 – Refined (role + constraints)

**Prompt:**
```
You are a senior backend engineer. Build a Flask REST API for product inventory management
with these endpoints: GET/POST /products, GET/PUT/DELETE /products/<id>.
Use JWT authentication. Validate inputs and return proper HTTP status codes.
```

**Output quality:**
- Added JWT authentication via PyJWT.
- Added basic input validation.
- Missing: health check endpoint, pagination, standardised error response format,
  environment-variable-based secrets.

**Identified gaps:** Config from env vars, `/health` endpoint, pagination, Dockerfile.

---

### Version 3 – Production-grade (full constraints + deployment)

**Prompt:**
```
You are a senior backend engineer and DevOps architect. Extend the Flask product inventory
API to:
1. Load JWT_SECRET_KEY from an environment variable (fail fast if missing)
2. Add a /health endpoint returning {"status": "ok"}
3. Add pagination (page, per_page query params) to GET /products
4. Write a production-grade Dockerfile using a multi-stage build with a non-root user
5. Write a Kubernetes Deployment + Service manifest for AWS EKS
6. Write a Kubernetes Secret manifest for the JWT secret
7. Add a security note explaining rate limiting and HTTPS termination at the ingress layer
```

**Output quality:**
- All gaps addressed.
- Secrets managed via Kubernetes Secrets (not hardcoded).
- Multi-stage Docker build reduces image size by ~60%.
- Non-root container user follows least-privilege principle.
- Pagination makes the API scalable for large datasets.

---

## How Prompt Engineering Improved the Output

| Dimension | Version 1 | Version 2 | Version 3 |
|---|---|---|---|
| Authentication | ❌ None | ✅ JWT | ✅ JWT + env-based secret |
| Input Validation | ❌ None | ✅ Basic | ✅ Full with error responses |
| Error Handling | ❌ None | ✅ HTTP codes | ✅ Structured JSON errors |
| Scalability | ❌ No pagination | ❌ No pagination | ✅ Paginated responses |
| Security | ❌ None | ⚠️ Hardcoded secret | ✅ K8s Secret, non-root user |
| Cloud Readiness | ❌ None | ❌ No container | ✅ Docker + K8s manifests |
| Observability | ❌ None | ❌ None | ✅ `/health` endpoint |

---

## Files in This Task

| File | Description |
|---|---|
| `README.md` | This document — full Vibe Coding walkthrough |
| `app/app.py` | Flask REST API (Version 3, production-grade) |
| `app/requirements.txt` | Python dependencies |
| `app/Dockerfile` | Multi-stage Docker build |
| `deploy/k8s-deployment.yaml` | Kubernetes Deployment + Service manifest |
| `deploy/k8s-secret.yaml` | Kubernetes Secret for JWT key |
| `security/security_notes.md` | Security configuration and best practices |

---

## Running Locally

```bash
# Set required environment variable
export JWT_SECRET_KEY=your-very-secret-key

# Install dependencies
pip install -r app/requirements.txt

# Start the API
python app/app.py
```

## Docker Build & Run

```bash
docker build -t product-api:latest ./app
docker run -p 5000:5000 -e JWT_SECRET_KEY=your-secret product-api:latest
```

## Kubernetes Deployment (AWS EKS)

```bash
# Apply the secret first
kubectl apply -f deploy/k8s-secret.yaml

# Deploy the application
kubectl apply -f deploy/k8s-deployment.yaml

# Verify pods are running
kubectl get pods -l app=product-api
```
