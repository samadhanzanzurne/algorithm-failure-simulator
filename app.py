from server import app, app as application

# This router acts as a failsafe for Gunicorn if the Start Command was set to 'gunicorn app:app', 'gunicorn server', or 'gunicorn app'.
