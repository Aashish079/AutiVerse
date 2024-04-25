from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import ScoreSeializer, ScorePlotSeializer 
from .models import Score
from rest_framework import generics, permissions

class ScoreListCreateView(generics.ListCreateAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSeializer
    permission_classes = [permissions.AllowAny]

class ScoreUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSeializer
    permission_classes = [permissions.AllowAny]

class ScorePlotListCreateView(generics.ListCreateAPIView):
    queryset = ScorePlot.objects.all()
    serializer_class = ScorePlotSeializer
    permission_classes = [permissions.AllowAny]

class ScorePlotUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScorePlot.objects.all()
    serializer_class = ScorePlotSeializer
    permission_classes = [permissions.AllowAny]



# class ScoreListView(APIView):
#     def get(self, request):
#         scores = Score.objects.all
#         serializer = ScoreSeializer(scores, many = True)
#         return Response({"user":2}, status = status.HTTP_200_OK)
    

