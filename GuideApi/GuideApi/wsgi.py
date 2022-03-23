"""
WSGI config for GuideApi project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SettleGuide.settings.development")

# if os.environ.get("DJANGO_SETTINGS_MODULE") == "GuideApi.settings.production":
#     from raven.contrib.django.raven_compat.middleware.wsgi import Sentry
#     application = Sentry(get_wsgi_application())
# else:
#     get_wsgi_application()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'GuideApi.settings')

application = get_wsgi_application()
