from django.contrib import admin
from .models import Score, OverallDayPlot, SessionPlot



# Register your models here.

class ScoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'score', 'game_session', 'created_at')
    search_fields = ('name', 'game_session')
    list_filter = ('name', 'game_session')
    ordering = ('-created_at',)

class OverallDayPlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'plot')
    search_fields = ('date',)
    list_filter = ('date',)
    ordering = ('-date',)

class SessionPlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'game_session', 'plot')
    search_fields = ('date', 'game_session')
    list_filter = ('date', 'game_session')
    ordering = ('-date',)

admin.site.register(Score, ScoreAdmin)
admin.site.register(SessionPlot, SessionPlotAdmin)
admin.site.register(OverallDayPlot, OverallDayPlotAdmin)

