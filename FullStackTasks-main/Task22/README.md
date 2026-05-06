# Task 22: Major Cloud Service Providers – Comparison & Core Services

## Overview

This task explores three leading cloud service providers — **Amazon Web Services (AWS)**, **Google Cloud Platform (GCP)**, and **Microsoft Azure** — and compares their core services across Compute, Storage, Databases, and Networking, along with their pay-as-you-use pricing model.

---

## 1. Compute Services

| Feature | AWS | Google Cloud | Microsoft Azure |
|---|---|---|---|
| Virtual Machines | EC2 (Elastic Compute Cloud) | Compute Engine | Azure Virtual Machines |
| Serverless Functions | AWS Lambda | Cloud Functions | Azure Functions |
| Container Orchestration | EKS (Kubernetes), ECS | GKE (Google Kubernetes Engine) | AKS (Azure Kubernetes Service) |
| PaaS (App Hosting) | AWS Elastic Beanstalk | App Engine | Azure App Service |
| Batch Processing | AWS Batch | Cloud Batch | Azure Batch |

**Key Highlights:**
- AWS EC2 offers the widest variety of instance types (700+), including specialized GPU, memory-optimized, and compute-optimized.
- GCP's Compute Engine offers live migration of VMs without downtime — a unique advantage.
- Azure VMs integrate seamlessly with on-premise Windows Server and Active Directory.

---

## 2. Storage Services

| Feature | AWS | Google Cloud | Microsoft Azure |
|---|---|---|---|
| Object Storage | S3 (Simple Storage Service) | Cloud Storage | Azure Blob Storage |
| Block Storage | EBS (Elastic Block Store) | Persistent Disk | Azure Managed Disks |
| File Storage | EFS (Elastic File System) | Filestore | Azure Files |
| Archival Storage | S3 Glacier | Cloud Storage Archive | Azure Archive Storage |
| CDN | CloudFront | Cloud CDN | Azure CDN |

**Key Highlights:**
- AWS S3 is the industry standard with 99.999999999% (11 9s) durability.
- GCP Cloud Storage offers strong consistency for all operations by default.
- Azure Blob Storage integrates natively with Microsoft's data analytics stack (Synapse, Power BI).

---

## 3. Database Services

| Feature | AWS | Google Cloud | Microsoft Azure |
|---|---|---|---|
| Relational DB (Managed) | RDS (MySQL, PostgreSQL, Oracle…) | Cloud SQL | Azure SQL Database |
| Cloud-native Relational | Aurora | Cloud Spanner | Azure SQL Hyperscale |
| NoSQL (Key-Value/Document) | DynamoDB | Firestore / Bigtable | Azure Cosmos DB |
| In-memory Cache | ElastiCache (Redis/Memcached) | Memorystore | Azure Cache for Redis |
| Data Warehouse | Redshift | BigQuery | Azure Synapse Analytics |

**Key Highlights:**
- AWS DynamoDB offers single-digit millisecond latency at any scale with auto-scaling.
- GCP BigQuery is a serverless data warehouse billed per query — no infrastructure to manage.
- Azure Cosmos DB supports multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table) in one service.

---

## 4. Networking Services

| Feature | AWS | Google Cloud | Microsoft Azure |
|---|---|---|---|
| Virtual Private Network | VPC | Virtual Private Cloud | Virtual Network (VNet) |
| Load Balancer | Elastic Load Balancing (ELB) | Cloud Load Balancing | Azure Load Balancer |
| DNS | Route 53 | Cloud DNS | Azure DNS |
| VPN Gateway | AWS VPN | Cloud VPN | Azure VPN Gateway |
| Dedicated Connection | Direct Connect | Cloud Interconnect | ExpressRoute |
| API Gateway | Amazon API Gateway | Apigee / Cloud Endpoints | Azure API Management |

**Key Highlights:**
- AWS Route 53 is a highly available DNS with health-check-based routing.
- GCP's global load balancer operates as a single anycast IP — traffic is routed to the nearest healthy instance globally.
- Azure ExpressRoute enables private connections from on-premise datacenters at up to 100 Gbps.

---

## 5. Pay-As-You-Use Pricing Model

All three providers follow a **consumption-based pricing model** where you pay only for what you use.

### Common Pricing Dimensions
- **Compute**: Billed per second (AWS, GCP) or per minute (Azure) of VM/container uptime.
- **Storage**: Billed per GB/month stored + data transfer costs.
- **Database**: Billed per vCPU-hour, storage GB, and I/O operations.
- **Networking**: Egress (outbound) data transfer is typically charged; ingress is free.

### Cost Optimization Options

| Strategy | AWS | Google Cloud | Azure |
|---|---|---|---|
| Reserved/Committed Use | Reserved Instances (1 or 3 yr) | Committed Use Discounts (1 or 3 yr) | Reserved VM Instances |
| Spot/Preemptible VMs | Spot Instances (up to 90% off) | Spot VMs (up to 91% off) | Azure Spot VMs |
| Free Tier | 12 months + always-free tier | 90-day $300 credit + always-free | 12 months + $200 credit |
| Sustained Use | N/A | Automatic sustained-use discounts | N/A |

### Pricing Example: Running a General-Purpose VM (4 vCPU, 16 GB RAM) for 1 Month

| Provider | On-Demand Price (approx.) | With 1-yr Reserved/Committed |
|---|---|---|
| AWS (m5.xlarge, us-east-1) | ~$138/month | ~$83/month |
| GCP (n2-standard-4, us-central1) | ~$134/month | ~$89/month |
| Azure (D4s v5, East US) | ~$140/month | ~$86/month |

> Prices are approximate and subject to change. Always use official pricing calculators:
> - AWS: https://calculator.aws
> - GCP: https://cloud.google.com/products/calculator
> - Azure: https://azure.microsoft.com/pricing/calculator

---

## 6. Summary Comparison Matrix

| Criterion | AWS | Google Cloud | Azure |
|---|---|---|---|
| Market Share | ~33% (largest) | ~11% | ~22% |
| Strengths | Widest service catalog, mature ecosystem | Big Data / ML / AI, global network | Enterprise/Microsoft integration |
| Global Regions | 33 regions | 40 regions | 60+ regions |
| Compliance Certifications | ISO, SOC, PCI-DSS, HIPAA, FedRAMP | ISO, SOC, PCI-DSS, HIPAA | ISO, SOC, PCI-DSS, HIPAA, FedRAMP |
| Best For | Startups, web apps, diverse workloads | Analytics, ML, cloud-native | Enterprise with Microsoft stack |

---

## Files in This Task

| File | Description |
|---|---|
| `README.md` | This document — full comparison and analysis |
| `cloud_comparison.py` | Python script that prints a structured comparison table |
| `pricing_estimate.json` | Sample JSON data representing pricing tiers for all three providers |
