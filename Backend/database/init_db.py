from database.connection import Base, engine


def create_tables():
    """
    Create all database tables.
    """
    Base.metadata.create_all(bind=engine)