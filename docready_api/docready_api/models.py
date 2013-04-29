from django.db import models


class AdviceCategory(models.Model):
    name = models.CharField(max_length=35)

    def __str__(self):
        return self.name


class Advice(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    categories = models.ManyToManyField(AdviceCategory,
                                        verbose_name='categories',
                                        blank=True)
