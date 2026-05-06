# Task 23: Vibe Coding & Prompt Engineering with Generative AI

## Overview

This task demonstrates how **Vibe Coding** and **Prompt Engineering** techniques can be applied with a Generative AI tool (e.g., GitHub Copilot, ChatGPT, or Google Gemini) to generate high-quality code snippets, cloud configuration templates, and application logic for real-world business applications.

---

## What is Vibe Coding?

**Vibe Coding** is the practice of collaborating with a Generative AI by describing your intent in natural language and iteratively refining the output. Instead of writing every line manually, you describe *what* you want (the "vibe"), evaluate the output, and refine the prompt until the result meets quality standards.

---

## What is Prompt Engineering?

**Prompt Engineering** is the craft of designing precise, context-rich prompts that guide an AI model toward producing accurate, efficient, and safe outputs. Effective prompts include:
- **Role context** ("You are a senior cloud architect…")
- **Task clarity** ("Generate a Python Flask REST API…")
- **Constraints** ("Use JWT authentication, return JSON, follow RESTful conventions")
- **Output format** ("Provide the full file with imports")

---

## Prompt Design Examples & Generated Outputs

### Prompt 1 – Python Utility Function

**Prompt:**
```
You are a senior Python developer. Write a utility function that reads a JSON config
file from disk, validates that required keys exist, and returns the config as a dict.
Required keys: ["db_host", "db_port", "db_name"]. Raise a ValueError for missing keys.
Include type hints and a docstring.
```

**Generated Output:** see `generated/config_loader.py`

**Evaluation:**
- ✅ Type hints and docstring included
- ✅ Raises `ValueError` on missing keys
- ✅ Handles `FileNotFoundError` gracefully
- ✅ Production-ready, no unnecessary dependencies

---

### Prompt 2 – AWS S3 Upload Cloud Configuration Template

**Prompt:**
```
Act as a DevOps engineer. Generate an AWS CloudFormation YAML template that creates:
1. An S3 bucket with versioning enabled and server-side encryption (AES-256)
2. A bucket policy that allows only HTTPS access
3. Outputs the bucket name and ARN
Use descriptive logical IDs and add comments explaining each resource.
```

**Generated Output:** see `generated/s3_cloudformation.yaml`

**Evaluation:**
- ✅ Versioning and encryption correctly configured
- ✅ HTTPS-only bucket policy is a security best practice
- ✅ Outputs section makes the template reusable in nested stacks
- ⚠️ Missing lifecycle rules for cost management (identified in review)

---

### Prompt 3 – Node.js Business Logic (Invoice Calculator)

**Prompt:**
```
You are a backend developer. Write a Node.js module (ES module syntax) that calculates
an invoice total given an array of line items. Each item has: name (string), quantity
(number), unit_price (number), tax_rate (number 0-1). Return an object with:
subtotal, total_tax, total. Round all amounts to 2 decimal places. Export the function.
Include JSDoc comments.
```

**Generated Output:** see `generated/invoice_calculator.js`

**Evaluation:**
- ✅ Correct arithmetic for tax and total
- ✅ Rounding handled properly with `Math.round`
- ✅ JSDoc comments and ES module export
- ✅ Edge case: empty array returns zeros (verified)

---

## Prompt Quality Factors

| Factor | Poor Prompt | Good Prompt |
|---|---|---|
| Role context | None | "You are a senior Python developer…" |
| Specificity | "Write an API" | "Write a Flask REST API with JWT auth, `/users` endpoint returning JSON" |
| Constraints | None | "No external libraries except Flask and PyJWT" |
| Output format | "Give me code" | "Provide the complete file with all imports" |
| Error handling | Not mentioned | "Raise appropriate HTTP errors (400, 401, 404)" |

---

## Key Learnings

1. **Iterative refinement** is essential — first outputs often need follow-up prompts to add edge-case handling or security.
2. **Role priming** (telling the AI what role to play) significantly improves output quality and conventions.
3. **Specificity in constraints** (libraries, error types, output format) reduces hallucinations and increases code reusability.
4. **Evaluation criteria** should be defined before generating — compare output against expected behavior, security, and style.

---

## Files in This Task

| File | Description |
|---|---|
| `README.md` | This document — prompts, outputs, and evaluation |
| `generated/config_loader.py` | Python config loader generated via Prompt 1 |
| `generated/s3_cloudformation.yaml` | AWS CloudFormation template generated via Prompt 2 |
| `generated/invoice_calculator.js` | Node.js invoice calculator generated via Prompt 3 |
