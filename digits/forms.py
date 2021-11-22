from django import forms
from .models import Digit


class DigitForm(forms.ModelForm):
    class Meta:
        model = Digit
        fields = ['image']

    def clean(self):
        data = self.cleaned_data
        #title = data.get('title')
        #qs = Article.objects.filter(title__icontains=title)
        #if qs.exists():
        #    self.add_error('title', f'\'{title}\' is already in use')  # or use \" to comma
        return data
