from rest_framework import serializers
from .models import Score,  ScorePlot




class ScoreSeializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = "__all__"

class ScorePlotSeializer(serializers.ModelSerializer):
    class Meta:
        model = ScorePlot
        fields = "__all__"
    