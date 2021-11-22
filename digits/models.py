from django.db import models
from django.conf import settings
from PIL import Image
import numpy as np
import joblib
import os

# not detect other modules for now as init.py not set


# Create your models here.
class Digit(models.Model):
    image = models.ImageField(upload_to='images')
    result = models.CharField(max_length=2, blank=True)
    validated = models.CharField(max_length=2, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        img = Image.open(self.image)
        bw_img = img.convert('L')
        #resized_image1 = image.resize(newsize, Image.BILINEAR)
        resize_img = bw_img.resize((28, 28), Image.BICUBIC)
        img_array = np.asarray(resize_img)
        img_array = img_array.reshape(-1, 28*28)
        img_array = img_array/255
        try:
            file_ = os.path.join(settings.BASE_DIR, 'aug_model-400-49-Ep10')
            with open(file_, 'rb') as f:
                model = joblib.load(f)
                prediction = model.predict(img_array)
                #self.result = str(prediction[0][0])
                np.set_printoptions(suppress=True)
                print('Prediction', prediction[1])
                if np.any(prediction[1] > 0.9):
                    self.result = str(prediction[0][0])
                else:
                    self.result = 'NA'
        except:
            print('Failed')
            self.result = 'Failed to recognize image'

        return super().save(*args, **kwargs)
