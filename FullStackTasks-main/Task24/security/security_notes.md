# Security Configuration & Best Practices

## Task 24 – Cloud-Based REST API Security

This document outlines the security measures applied to the Product Inventory REST API and its cloud deployment.

---

## 1. Authentication & Authorization

- **JWT (JSON Web Tokens)** are used to authenticate all API requests (except `/auth/login` and `/health`).
- Tokens are signed with **HS256** using a secret key loaded exclusively from an environment variable (`JWT_SECRET_KEY`). The key is never hardcoded in source code.
- Tokens expire after a configurable period (default: 24 hours) to limit exposure from stolen tokens.

**Best Practice:** Rotate the JWT secret regularly. For production, use an asymmetric algorithm (RS256) with a key pair managed in AWS KMS, GCP Cloud KMS, or Azure Key Vault.

---

## 2. Secrets Management

| Layer | Mechanism |
|---|---|
| Local development | `JWT_SECRET_KEY` env var in `.env` file (never committed to git) |
| Kubernetes | Kubernetes `Secret` object (base64-encoded, not plaintext) |
| Production (recommended) | AWS Secrets Manager + External Secrets Operator |

**`.gitignore` rule (required):**
```
.env
*.key
secrets/
```

---

## 3. Container Security

- **Non-root user**: The Docker container runs as `appuser` (UID 1001) — not as `root`.
- **Read-only filesystem**: Kubernetes `securityContext` sets `readOnlyRootFilesystem: true`.
- **Dropped capabilities**: All Linux capabilities are dropped in the K8s pod spec.
- **No privilege escalation**: `allowPrivilegeEscalation: false` prevents sudo-like behaviour.
- **Minimal base image**: `python:3.12-slim` reduces the attack surface vs. a full image.

---

## 4. HTTPS / TLS Termination

All traffic to the API must be encrypted in transit. TLS termination is handled at the **Ingress layer** (not in the application), which is the recommended cloud-native pattern.

**Recommended Ingress setup (AWS EKS):**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: product-api-ingress
  annotations:
    kubernetes.io/ingress.class: "alb"
    alb.ingress.kubernetes.io/scheme: "internet-facing"
    alb.ingress.kubernetes.io/certificate-arn: "arn:aws:acm:REGION:ACCOUNT:certificate/CERT-ID"
    alb.ingress.kubernetes.io/ssl-policy: "ELBSecurityPolicy-TLS13-1-2-2021-06"
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: "443"
spec:
  rules:
    - host: api.yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: product-api-service
                port:
                  number: 80
```

---

## 5. Rate Limiting

To prevent abuse and denial-of-service, rate limiting should be enforced at the **API Gateway or Ingress** level rather than inside the Flask app.

**AWS API Gateway:** Configure usage plans with throttling (requests/sec, burst limit).

**Nginx Ingress (K8s):**
```yaml
annotations:
  nginx.ingress.kubernetes.io/limit-rps: "20"
  nginx.ingress.kubernetes.io/limit-connections: "10"
```

**Application-level (fallback):** Use `flask-limiter` with Redis as a backend for distributed rate limiting if a gateway is not available.

---

## 6. Input Validation

The API validates all user-supplied input:
- `name` must be a non-empty string.
- `price` must be a non-negative number.
- `page` and `per_page` must be positive integers.
- Unknown fields are silently ignored (not reflected back to the client to prevent information leakage).

---

## 7. Security Checklist

| Item | Status |
|---|---|
| JWT authentication on all data endpoints | ✅ |
| JWT secret from environment variable (not hardcoded) | ✅ |
| HTTPS enforced at ingress (TLS 1.3) | ✅ (config provided) |
| Non-root container user | ✅ |
| Read-only container filesystem | ✅ |
| All Linux capabilities dropped | ✅ |
| Kubernetes secrets (not ConfigMaps) for sensitive data | ✅ |
| Rate limiting at ingress/gateway | ✅ (config provided) |
| Input validation on all endpoints | ✅ |
| No sensitive data in logs | ✅ |
| `.gitignore` for secrets and `.env` files | ✅ (documented) |
