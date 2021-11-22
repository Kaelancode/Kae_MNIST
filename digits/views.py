from django.shortcuts import render
from .models import Digit
from .forms import DigitForm
from django.core.paginator import Paginator, EmptyPage

import base64
import uuid
from django.core.files.base import ContentFile
# Create your views here.


def index(request):
    digital_object = None
    #form = DigitForm(request.POST or None, request.FILES or None, auto_id='test_%s')
    #context = {
    #    'form': form
    #}
    if request.method == 'POST':
        #print('Form', form)
        #print('F', request.POST.dict())
        #print('POST', request.FILES)
        canvas_image = request.POST
        #print('Img', canvas_image['canvasData'])
        image_data = canvas_image['canvasData']

        _format, str_img = image_data.split(';base64')
        decoded_file = base64.b64decode(str_img)
        fname = f'{str(uuid.uuid4())[:10]}.png'
        final_data = ContentFile(decoded_file, name=fname)
        digital_object = Digit.objects.create(image=final_data)
        context = {'image_objects': digital_object, 'result': digital_object.result}
        #context = {}
        return render(request, 'index.html', context=context)
    #if form.is_valid():
    #    print('V', form)
    #    article_object = form.save()
        #context['form'] = ArticleForm()  # refresh the form
        #return redirect('article-detail', slug=article_object.slug)
        #return redirect(article_object.get_absolute_url())
    #context = {}
    context = {'image_objects': digital_object}
    return render(request, 'index.html', context=context)


def gallery(request):
    #img_objects = Digit.objects.all().reverse()
    img_objects = Digit.objects.order_by("id").reverse()
    p = Paginator(img_objects, 12)

    page_num = request.GET.get('page', 1)
    try:
        page = p.page(page_num)
    except EmptyPage:
        page = p.page(1)

    context = {'image_objects': page}
    return render(request, 'gallery.html', context)


def zoom(request, id):
    img_object = Digit.objects.get(id=id)
    context = {
        'img': img_object
    }
    # context = {
    #
    # }
    return render(request, 'zoom.html', context)
