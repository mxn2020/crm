from app import create_app, db
from flask_migrate import Migrate

app = create_app()

migrate = Migrate(app, db)

if __name__ == '__main__':
    # Adding additional configurations if needed before running the app
    # It's helpful to specify host='0.0.0.0' to make the server externally visible if that's desired
    # You can also specify a different port
    app.run(debug=True)


from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)