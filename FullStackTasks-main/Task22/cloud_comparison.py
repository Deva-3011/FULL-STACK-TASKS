"""
cloud_comparison.py
-------------------
Prints a structured comparison of AWS, Google Cloud, and Azure
across Compute, Storage, Database, and Networking services.
"""

import json

PROVIDERS = ["AWS", "Google Cloud", "Azure"]

SERVICES = {
    "Compute": {
        "Virtual Machines":         ["EC2",                "Compute Engine",     "Azure VMs"],
        "Serverless Functions":     ["Lambda",             "Cloud Functions",    "Azure Functions"],
        "Kubernetes (managed)":     ["EKS",                "GKE",                "AKS"],
        "PaaS":                     ["Elastic Beanstalk",  "App Engine",         "App Service"],
    },
    "Storage": {
        "Object Storage":           ["S3",                 "Cloud Storage",      "Blob Storage"],
        "Block Storage":            ["EBS",                "Persistent Disk",    "Managed Disks"],
        "File Storage":             ["EFS",                "Filestore",          "Azure Files"],
        "Archive Storage":          ["S3 Glacier",         "Storage Archive",    "Archive Storage"],
    },
    "Databases": {
        "Relational (Managed)":     ["RDS",                "Cloud SQL",          "Azure SQL DB"],
        "Cloud-native Relational":  ["Aurora",             "Cloud Spanner",      "SQL Hyperscale"],
        "NoSQL":                    ["DynamoDB",           "Firestore/Bigtable", "Cosmos DB"],
        "Data Warehouse":           ["Redshift",           "BigQuery",           "Synapse Analytics"],
        "In-memory Cache":          ["ElastiCache",        "Memorystore",        "Cache for Redis"],
    },
    "Networking": {
        "Virtual Network":          ["VPC",                "VPC",                "VNet"],
        "Load Balancer":            ["ELB",                "Cloud Load Balancing","Azure Load Balancer"],
        "DNS":                      ["Route 53",           "Cloud DNS",          "Azure DNS"],
        "CDN":                      ["CloudFront",         "Cloud CDN",          "Azure CDN"],
        "Dedicated Connection":     ["Direct Connect",     "Cloud Interconnect", "ExpressRoute"],
        "API Gateway":              ["API Gateway",        "Apigee",             "API Management"],
    },
}

PRICING = {
    "model": "Pay-as-you-use (consumption-based)",
    "compute_unit": "per second (AWS, GCP) / per minute (Azure)",
    "storage_unit": "per GB/month",
    "free_tier": {
        "AWS":           "12 months free tier + always-free",
        "Google Cloud":  "$300 credit (90 days) + always-free",
        "Azure":         "$200 credit (30 days) + 12 months free",
    },
    "reserved_discounts": {
        "AWS":           "Up to 72% with 3-year Reserved Instances",
        "Google Cloud":  "Up to 70% with 3-year Committed Use",
        "Azure":         "Up to 72% with 3-year Reserved VMs",
    },
    "spot_discounts": {
        "AWS":           "Up to 90% with Spot Instances",
        "Google Cloud":  "Up to 91% with Spot VMs",
        "Azure":         "Up to 90% with Azure Spot VMs",
    },
    "sample_vm_monthly_ondemand_usd": {
        "description": "4 vCPU, 16 GB RAM general-purpose VM",
        "AWS":           138,
        "Google Cloud":  134,
        "Azure":         140,
    },
}


def print_table(category: str, services: dict) -> None:
    col_width = 26
    header = f"{'Service':<{col_width}}" + "".join(f"{p:<{col_width}}" for p in PROVIDERS)
    divider = "-" * (col_width * (len(PROVIDERS) + 1))
    print(f"\n{'=' * len(divider)}")
    print(f"  {category.upper()}")
    print(divider)
    print(header)
    print(divider)
    for service, offerings in services.items():
        row = f"{service:<{col_width}}" + "".join(f"{o:<{col_width}}" for o in offerings)
        print(row)
    print(divider)


def print_pricing() -> None:
    print("\n" + "=" * 80)
    print("  PRICING MODEL")
    print("=" * 80)
    print(f"  Model        : {PRICING['model']}")
    print(f"  Compute unit : {PRICING['compute_unit']}")
    print(f"  Storage unit : {PRICING['storage_unit']}\n")
    for label, key in [("Free Tier", "free_tier"),
                       ("Reserved Discounts", "reserved_discounts"),
                       ("Spot Discounts", "spot_discounts")]:
        print(f"  {label}:")
        for provider, detail in PRICING[key].items():
            print(f"    {provider:<14}: {detail}")
        print()
    vm = PRICING["sample_vm_monthly_ondemand_usd"]
    print(f"  Sample VM ({vm['description']}) – On-Demand Monthly Cost:")
    for p in PROVIDERS:
        print(f"    {p:<14}: ${vm[p]}/month (approx)")
    print("=" * 80)


def export_json(path: str = "cloud_comparison_output.json") -> None:
    data = {"services": SERVICES, "pricing": PRICING}
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"\n[INFO] Full comparison exported to '{path}'")


if __name__ == "__main__":
    print("\n  CLOUD SERVICE PROVIDER COMPARISON: AWS | Google Cloud | Azure")
    for category, services in SERVICES.items():
        print_table(category, services)
    print_pricing()
    export_json()
