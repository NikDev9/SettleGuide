release: python manage.py migrate
web: gunicorn --chdir GuideApi.wsgi --log-file -
web: python manage.py runserver 0.0.0.0:$PORT