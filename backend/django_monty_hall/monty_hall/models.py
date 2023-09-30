from django.db import models

class GameRun(models.Model):
    total_wins = models.PositiveIntegerField()
    total_games = models.PositiveIntegerField(default=10)
    switch_wins = models.PositiveIntegerField()
    switch_losses = models.PositiveIntegerField()
    stick_wins = models.PositiveIntegerField()
    stick_losses = models.PositiveIntegerField()
    probability = models.FloatField()  # This can be computed as total_wins/total_games

    def save(self, *args, **kwargs):
        self.probability = self.total_wins/self.total_games
        super().save(*args, **kwargs)
