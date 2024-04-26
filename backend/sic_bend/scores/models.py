from django.db import models
import uuid

# Create your models here.
class Score(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    name = models.CharField(max_length= 50, default='User1')
    score = models.IntegerField(null = False, blank =False )
    game_session = models.CharField(max_length= 50, default='Game1')
    created_at = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.name)
    
    class Meta:
        verbose_name = "Score"
        verbose_name_plural = "Scores"


class OverallDayPlot(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    plot = models.ImageField(upload_to = 'plot/',null = True, blank= True )
    date = models.DateField(null = False, blank = False)

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = "OverallDayPlot"
        verbose_name_plural = "OverallDayPlots"
    
class SessionPlot(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    plot = models.ImageField(upload_to = 'plot/',null = True, blank= True )
    game_session = models.CharField(max_length= 50, default='Game1')
    date = models.DateField(null = False, blank = False)

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = "SessionPlots"
        verbose_name_plural = "SessionPlots"


class AveragePlot(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    plot = models.ImageField(upload_to = 'plot/',null = True, blank= True )

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = "AveragePlot"
        verbose_name_plural = "AveragePlots"