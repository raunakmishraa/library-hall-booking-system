from django.http import HttpResponse

# Create your views here.

def index(request):
    html_content = "<h1>Hello, Django!</h1><p>This is a direct HTML response.</p>"
    return HttpResponse(html_content)
