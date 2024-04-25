from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import ScoreSeializer, ScorePlotSeializer, SessionPlotSeializer 
from .models import Score, OverallDayPlot, SessionPlot
from rest_framework import generics, permissions
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from datetime import date, timedelta
import os


class ScoreListCreateView(generics.ListCreateAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSeializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset = Score.objects.all()
        name = self.request.query_params.get('name', None)
        game_session = self.request.query_params.get('game_session', None)
        date = self.request.query_params.get('date', None)
        if name is not None:
            queryset = queryset.filter(name=name)
        if game_session is not None:
            queryset = queryset.filter(game_session=game_session)
        if date is not None:
            queryset = queryset.filter(created_at__date=date)
        return queryset

class ScoreUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSeializer
    permission_classes = [permissions.AllowAny]

class OverallDayPlotListCreateView(generics.ListCreateAPIView):
    queryset = OverallDayPlot.objects.all()
    serializer_class = ScorePlotSeializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset = OverallDayPlot.objects.all()
        date = self.request.query_params.get('date', None)
        if date is not None:
            queryset = queryset.filter(date=date)
        return queryset

class OverallDayPlotUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OverallDayPlot.objects.all()
    serializer_class = ScorePlotSeializer
    permission_classes = [permissions.AllowAny]


class SessionPlotListCreateView(generics.ListCreateAPIView):
    queryset = SessionPlot.objects.all()
    serializer_class = ScorePlotSeializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset = SessionPlot.objects.all()
        date = self.request.query_params.get('date', None)
        game_session = self.request.query_params.get('game_session', None)
        if date is not None:
            queryset = queryset.filter(date=date)
        if game_session is not None:
            queryset = queryset.filter(game_session=game_session)
        return queryset

class SessionPlotUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SessionPlot.objects.all()
    serializer_class = SessionPlotSeializer
    permission_classes = [permissions.AllowAny]


# class GeneratePlot(APIView):
#     def get(self, request):
#         # Get all unique dates
#         unique_dates = Score.objects.dates('created_at', 'day')
#         print(unique_dates)
#         for unique_date in unique_dates:
#             # Check if plot for this date already exists and it's not today's date
#             if unique_date != date.today() and ScorePlot.objects.filter(date=unique_date).exists():
#                 continue

#             # Get scores for this date
#             scores = Score.objects.filter(created_at__date=unique_date)

#             # Prepare data for plot
#             time = [score.created_at for score in scores]
#             scores = [score.score for score in scores]

#             # Create plot
#             plt.figure(figsize=(10, 5))
#             plt.plot(time, scores)
#             plt.title(f'Scores for {unique_date}')
#             plt.xlabel('Time')
#             plt.ylabel('Score')

#             # Save plot to temporary file
#             img_temp = NamedTemporaryFile(delete=True)
#             plt.savefig(img_temp.name, format='png')
#             img_temp.seek(0)

#             # Create or get OverallDayPlot object and save plot to it
#             plot, created = OverallDayPlot.objects.get_or_create(date=unique_date)
#             plot.plot.save(f"plot_{unique_date}.png", File(img_temp), save=True)
#             # Close the plot figure
#             plt.close()

#         # filter all the gamesession with date = today
#         scores = Score.objects.filter(created_at__date=date.today())
#         game_sessions = scores.values_list('game_session', flat=True).distinct()

#         # Create plot for each game session
#         for game_session in game_sessions:
#             # Get scores for this game session
#             scores = Score.objects.filter(game_session=game_session, created_at__date=date.today())

#             # Prepare data for plot
#             time = [score.created_at for score in scores]
#             scores = [score.score for score in scores]

#             # Create plot
#             plt.figure(figsize=(10, 5))
#             plt.plot(time, scores)
#             plt.title(f'Scores for {game_session} on {date.today()}')
#             plt.xlabel('Time')
#             plt.ylabel('Score')

#             # Save plot to temporary file
#             img_temp = NamedTemporaryFile(delete=True)
#             plt.savefig(img_temp.name, format='png')
#             img_temp.seek(0)

#             # Create ScorePlot object and save plot to it
#             plot = ScorePlot(date=date.today(), game_session=game_session)
#             plot.plot.save(f"plot_{game_session}_{date.today()}.png", File(img_temp), save=True)

#             # Close the plot figure
#             plt.close()

#         return Response("Plots generated and saved successfully.", status=status.HTTP_200_OK)


class GenerateSessionPlot(APIView):
    def get(self, request):
        # filter all the gamesession with date = today
        scores = Score.objects.filter(created_at__date=date.today())
        game_sessions = scores.values_list('game_session', flat=True).distinct()

        # Create plot for each game session
        for game_session in game_sessions:
            # Get scores for this game session
            scores = Score.objects.filter(game_session=game_session, created_at__date=date.today())

            # Prepare data for plot
            time = [score.created_at for score in scores]
            scores = [score.score for score in scores]

            # Create plot
            plt.figure(figsize=(10, 5))
            plt.scatter(time, scores, s=scores)  # Use scatter plot and adjust size based on score
            plt.title(f'Scores for {game_session} on {date.today()}')
            plt.xlabel('Time')
            plt.ylabel('Score')

            # Save plot to temporary file
            img_temp = NamedTemporaryFile(delete=True)
            plt.savefig(img_temp.name, format='png')
            img_temp.seek(0)

            # Create ScorePlot object and save plot to it
            plot = SessionPlot(date=date.today(), game_session=game_session)
            plot.plot.save(f"plot_{game_session}_{date.today()}.png", File(img_temp), save=True)

            # Close the plot figure
            plt.close()

        return Response("Plots generated and saved successfully.", status=status.HTTP_200_OK)

class GenerateOverallDayPlot(APIView):
    def get(self, request):
        # Get all unique dates
        unique_dates = Score.objects.dates('created_at', 'day')
        print(unique_dates)
        for unique_date in unique_dates:
            # Check if plot for this date already exists and it's not today's date
            if unique_date != date.today() and OverallDayPlot.objects.filter(date=unique_date).exists():
                continue

            # Get scores for this date
            scores = Score.objects.filter(created_at__date=unique_date)

            # Prepare data for plot
            time = [score.created_at for score in scores]
            scores = [score.score for score in scores]

            # Create plot
            plt.figure(figsize=(10, 5))
            plt.plot(time, scores, marker='o', linestyle='-', color='b')
            plt.title(f'Scores for {unique_date}')
            plt.xlabel('Time')
            plt.ylabel('Score')

            # Save plot to temporary file
            img_temp = NamedTemporaryFile(delete=True)
            plt.savefig(img_temp.name, format='png')
            img_temp.seek(0)

            # Create or get OverallDayPlot object and save plot to it
            plot, created = OverallDayPlot.objects.get_or_create(date=unique_date)
            plot.plot.save(f"plot_{unique_date}.png", File(img_temp), save=True)
            # Close the plot figure
            plt.close()

        plots = OverallDayPlot.objects.all()
        # returning the list of all the plots

        