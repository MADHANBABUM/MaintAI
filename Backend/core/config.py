import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    # Application
    PROJECT_NAME = os.getenv(
        "PROJECT_NAME",
        "MaintAI API",
    )

    DESCRIPTION = os.getenv(
        "DESCRIPTION",
        "AI Powered Predictive Maintenance Platform",
    )

    VERSION = os.getenv(
        "VERSION",
        "1.0.0",
    )

    DEBUG = os.getenv(
        "DEBUG",
        "True",
    ) == "True"

    # Database
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///maintai.db",
    )


settings = Settings()