release: python manage.py migrate
web: gunicorn GuideApi.wsgi --log-file -
web: python GuideApi/manage.py runserver 0.0.0.0:$PORT