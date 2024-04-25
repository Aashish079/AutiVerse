from rest_framework import serializers
from .models import Score,  OverallDayPlot, SessionPlot




class ScoreSeializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = "__all__"

class ScorePlotSeializer(serializers.ModelSerializer):
    class Meta:
        model = OverallDayPlot
        fields = "__all__"

class SessionPlotSeializer(serializers.ModelSerializer):
    class Meta:
        model = SessionPlot
        fields = "__all__"