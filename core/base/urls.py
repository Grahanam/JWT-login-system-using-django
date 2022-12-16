from django.urls import path , re_path
from django.views.generic import TemplateView
from django.shortcuts import render

app_name='base'
def render_react(request):
    return render(request, "index.html")

urlpatterns=[
    # path('',TemplateView.as_view(template_name="base/index.html"))
    path('',TemplateView.as_view(template_name='index.html'))
#     re_path(r"^$", render_react),
#   re_path(r"^(?:.*)/?$", render_react),
]