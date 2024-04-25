from django.urls import path, include
from .views import ScoreListCreateView, ScoreUpdateDestroyView, ScorePlotUpdateDestroyView, ScorePlotListCreateView



urlpatterns = [
    path('list/', ScoreListCreateView.as_view(),name='Score_List'),
    path('details/<int:pk>', ScoreUpdateDestroyView.as_view(),name='Score_Details'),
    path('scoreplot/details/<int:pk>', ScorePlotUpdateDestroyView.as_view(),name='Score_Details'),
    path('scoreplot/', ScoreListCreateView.as_view(),name='Score_Details'),
]  

