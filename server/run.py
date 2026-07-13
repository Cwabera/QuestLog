from app import create_app
from app.extensions import db
import os

app = create_app()

print("SECRET_KEY =", app.config["SECRET_KEY"])
print("JWT_SECRET_KEY =", app.config["JWT_SECRET_KEY"])

if __name__ == "__main__":
    app.run()


