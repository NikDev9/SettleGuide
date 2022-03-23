release: python GuideApi/manage.py migrate
web: gunicorn --chdir GuideApi.wsgi --log-file -
web: python GuideApi/manage.py runserver 0.0.0.0:$PORT