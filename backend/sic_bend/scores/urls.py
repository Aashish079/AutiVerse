from django.urls import path, include
from .views import ScoreListCreateView, ScoreUpdateDestroyView, GenerateSessionPlot, SessionPlotListCreateView, OverallDayPlotListCreateView, OverallDayPlotUpdateDestroyView, SessionPlotUpdateDestroyView, GenerateOverallDayPlot, GenerateAveragePlot, AveragePlotListCreateView, AveragePlotUpdateDestroyView


urlpatterns = [
    path('list/', ScoreListCreateView.as_view(),name='Score_List'),
    path('details/<slug:pk>', ScoreUpdateDestroyView.as_view(),name='Score_Details'),
    path('overalldayplot/', OverallDayPlotListCreateView.as_view(),name='OverallDayPlot'),
    path('overalldayplot/<slug:pk>', OverallDayPlotUpdateDestroyView.as_view(),name='OverallDayPlot'),
    path('sessionplot/', SessionPlotListCreateView.as_view(),name='SessionPlot'),
    path('sessionplot/<slug:pk>', SessionPlotUpdateDestroyView.as_view(),name='SessionPlot'),
    path('generatesessionplot/', GenerateSessionPlot.as_view(),name='GenerateSessionPlot'),
    path('generateoveralldayplot/', GenerateOverallDayPlot.as_view(),name='GenerateOverallDayPlot'),
    path('generateaverageplot/', GenerateAveragePlot.as_view(),name='GenerateAveragePlot'),
    path('averageplot/', AveragePlotListCreateView.as_view(),name='AveragePlot'),
    path('averageplot/<slug:pk>', AveragePlotUpdateDestroyView.as_view(),name='AveragePlot'),

]
 

