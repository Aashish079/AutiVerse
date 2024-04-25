from django.db import models
import uuid

# Create your models here.
class Score(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    name = models.CharField(max_length= 50, default='User1')
    score = models.IntegerField(null = False, blank =False )
    created_at = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.name)
    
    class Meta:
        verbose_name = "Score"
        verbose_name_plural = "Scores"


class ScorePlot(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key= True, editable=False)
    plot = models.ImageField(upload_to = 'plot/',null = True, blank= True )
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = "ScorePlots"
        verbose_name_plural = "ScoresPlots"
    