"""
config_loader.py
----------------
Utility to load and validate a JSON configuration file.

Generated via Prompt Engineering (Task 23):
  Prompt: "You are a senior Python developer. Write a utility function that reads
  a JSON config file from disk, validates that required keys exist, and returns
  the config as a dict. Required keys: ['db_host', 'db_port', 'db_name'].
  Raise a ValueError for missing keys. Include type hints and a docstring."
"""

import json
from pathlib import Path

REQUIRED_KEYS: list[str] = ["db_host", "db_port", "db_name"]


def load_config(config_path: str | Path) -> dict:
    """Load and validate a JSON configuration file.

    Args:
        config_path: Path to the JSON configuration file.

    Returns:
        A dictionary containing the configuration values.

    Raises:
        FileNotFoundError: If the config file does not exist.
        ValueError: If any required configuration key is missing.
        json.JSONDecodeError: If the file is not valid JSON.
    """
    path = Path(config_path)
    if not path.exists():
        raise FileNotFoundError(f"Configuration file not found: {path}")

    with path.open("r", encoding="utf-8") as f:
        config: dict = json.load(f)

    missing = [key for key in REQUIRED_KEYS if key not in config]
    if missing:
        raise ValueError(
            f"Configuration is missing required keys: {', '.join(missing)}"
        )

    return config


if __name__ == "__main__":
    import sys

    config_file = sys.argv[1] if len(sys.argv) > 1 else "config.json"
    try:
        cfg = load_config(config_file)
        print(f"Config loaded successfully: {cfg}")
    except (FileNotFoundError, ValueError, json.JSONDecodeError) as e:
        print(f"Error loading config: {e}", file=sys.stderr)
        sys.exit(1)
