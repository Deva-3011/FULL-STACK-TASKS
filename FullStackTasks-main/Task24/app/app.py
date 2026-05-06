"""
app.py – Product Inventory REST API
-------------------------------------
Built using Vibe Coding (Task 24) – Version 3 (production-grade).

Endpoints:
  POST   /auth/login          – Obtain JWT token
  GET    /health              – Health check (no auth)
  GET    /products            – List products (paginated, JWT required)
  POST   /products            – Create product (JWT required)
  GET    /products/<id>       – Get product by ID (JWT required)
  PUT    /products/<id>       – Update product (JWT required)
  DELETE /products/<id>       – Delete product (JWT required)
"""

import os
import uuid
from datetime import datetime, timezone, timedelta
from functools import wraps

import jwt
from flask import Flask, jsonify, request, abort

# ---------------------------------------------------------------------------
# Configuration – fail fast if required env vars are missing
# ---------------------------------------------------------------------------
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
if not JWT_SECRET_KEY:
    raise EnvironmentError("JWT_SECRET_KEY environment variable must be set")

JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = int(os.environ.get("JWT_EXPIRY_HOURS", "24"))

# Demo user store – MUST be replaced with a real authentication system
# (e.g., hashed passwords in a database) before any production use.
# Credentials are loaded from environment variables with insecure fallbacks
# that are clearly invalid for production.
USERS = {
    os.environ.get("DEMO_USERNAME", "admin"): os.environ.get("DEMO_PASSWORD", ""),
}

# ---------------------------------------------------------------------------
# In-memory product store (replace with DB in production)
# ---------------------------------------------------------------------------
products: dict[str, dict] = {}

app = Flask(__name__)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def make_token(username: str) -> str:
    payload = {
        "sub": username,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def jwt_required(f):
    """Decorator that enforces a valid Bearer JWT token."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            abort(401, description="Missing or invalid Authorization header")
        token = auth_header.split(" ", 1)[1]
        try:
            jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            abort(401, description="Token has expired")
        except jwt.InvalidTokenError:
            abort(401, description="Invalid token")
        return f(*args, **kwargs)
    return wrapper


def error_response(status: int, message: str):
    return jsonify({"error": message}), status


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------

@app.errorhandler(400)
def bad_request(e):
    return error_response(400, str(e.description))


@app.errorhandler(401)
def unauthorized(e):
    return error_response(401, str(e.description))


@app.errorhandler(404)
def not_found(e):
    return error_response(404, str(e.description))


# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------

@app.route("/auth/login", methods=["POST"])
def login():
    """Authenticate a user and return a JWT token."""
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return error_response(400, "username and password are required")
    if USERS.get(username) != password:
        return error_response(401, "Invalid credentials")

    token = make_token(username)
    return jsonify({"token": token, "expires_in_hours": JWT_EXPIRY_HOURS}), 200


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

@app.route("/health", methods=["GET"])
def health():
    """Simple health-check endpoint for load balancers and liveness probes."""
    return jsonify({"status": "ok"}), 200


# ---------------------------------------------------------------------------
# Product endpoints
# ---------------------------------------------------------------------------

@app.route("/products", methods=["GET"])
@jwt_required
def list_products():
    """List all products with optional pagination."""
    try:
        page = max(1, int(request.args.get("page", 1)))
        per_page = min(100, max(1, int(request.args.get("per_page", 10))))
    except ValueError:
        return error_response(400, "page and per_page must be integers")

    all_products = list(products.values())
    total = len(all_products)
    start = (page - 1) * per_page
    end = start + per_page
    page_data = all_products[start:end]

    return jsonify({
        "data": page_data,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": max(1, -(-total // per_page)),
        },
    }), 200


@app.route("/products", methods=["POST"])
@jwt_required
def create_product():
    """Create a new product."""
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    price = data.get("price")
    quantity = data.get("quantity", 0)

    if not name:
        return error_response(400, "name is required")
    if price is None or not isinstance(price, (int, float)) or price < 0:
        return error_response(400, "price must be a non-negative number")

    product_id = str(uuid.uuid4())
    product = {
        "id": product_id,
        "name": name,
        "price": round(float(price), 2),
        "quantity": int(quantity),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    products[product_id] = product
    return jsonify(product), 201


@app.route("/products/<string:product_id>", methods=["GET"])
@jwt_required
def get_product(product_id: str):
    """Retrieve a single product by ID."""
    product = products.get(product_id)
    if not product:
        abort(404, description=f"Product '{product_id}' not found")
    return jsonify(product), 200


@app.route("/products/<string:product_id>", methods=["PUT"])
@jwt_required
def update_product(product_id: str):
    """Update an existing product."""
    product = products.get(product_id)
    if not product:
        abort(404, description=f"Product '{product_id}' not found")

    data = request.get_json(silent=True) or {}
    if "name" in data:
        name = data["name"].strip()
        if not name:
            return error_response(400, "name cannot be empty")
        product["name"] = name
    if "price" in data:
        if not isinstance(data["price"], (int, float)) or data["price"] < 0:
            return error_response(400, "price must be a non-negative number")
        product["price"] = round(float(data["price"]), 2)
    if "quantity" in data:
        try:
            product["quantity"] = int(data["quantity"])
        except (ValueError, TypeError):
            return error_response(400, "quantity must be an integer")

    product["updated_at"] = datetime.now(timezone.utc).isoformat()
    return jsonify(product), 200


@app.route("/products/<string:product_id>", methods=["DELETE"])
@jwt_required
def delete_product(product_id: str):
    """Delete a product by ID."""
    if product_id not in products:
        abort(404, description=f"Product '{product_id}' not found")
    del products[product_id]
    return jsonify({"message": f"Product '{product_id}' deleted"}), 200


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
