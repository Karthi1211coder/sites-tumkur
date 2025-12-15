from django.urls import path
from . import views

urlpatterns = [
    # Public
    path('', views.site_list, name='site_list'),

    # Create & Update
    path('upload/', views.upload_site, name='upload_site'),
    path('edit/<str:site_id>/', views.upload_site, name='edit_site'),

    # Admin
    path('admin/', views.admin_dashboard, name='admin_dashboard'),
    path('approve/<str:site_id>/', views.approve_site, name='approve_site'),
    path('reject/<str:site_id>/', views.reject_site, name='reject_site'),
    path('rejected/', views.rejected_sites, name='rejected_sites'),
]
