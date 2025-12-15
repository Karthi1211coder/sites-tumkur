from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from bson import ObjectId
from .forms import SiteForm

from .mongo import site_collection


def upload_site(request, site_id=None):
    site_data = None

    # Fetch existing site for edit
    if site_id:
        site_data = site_collection.find_one({'_id': ObjectId(site_id)})

    if request.method == 'POST':
        form = SiteForm(request.POST, request.FILES)

        if form.is_valid():
            data = {}

            # Save normal fields
            for key, value in form.cleaned_data.items():
                if key != 'image' and value not in [None, '', []]:
                    data[key] = value

            # ✅ SINGLE IMAGE HANDLING
            image = request.FILES.get('image')
            fs = FileSystemStorage()

            if image:
                filename = fs.save(image.name, image)
                data['image'] = fs.url(filename)
            elif site_data and 'image' in site_data:
                # keep old image during update
                data['image'] = site_data['image']

            # Reset status for admin approval
            data['status'] = 'pending'

            if site_id:
                site_collection.update_one(
                    {'_id': ObjectId(site_id)},
                    {'$set': data}
                )
                return HttpResponse(
                    "<h2>Your site has been updated successfully and sent for admin approval.</h2>"
                )
            else:
                site_collection.insert_one(data)
                return HttpResponse(
                    "<h2>Your site has been uploaded successfully and sent for admin approval.</h2>"
                )

    else:
        form = SiteForm(initial=site_data if site_data else None)

    return render(request, 'upload_site.html', {
        'form': form,
        'is_edit': bool(site_id)
    })




def site_list(request):
    query = {'status': 'approved'}

    # 🔍 Location / City / Area
    location = request.GET.get('location')
    if location:
        query['location'] = {'$regex': location, '$options': 'i'}

    # 💰 Price Range
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    if min_price or max_price:
        query['price'] = {}
        if min_price:
            query['price']['$gte'] = float(min_price)
        if max_price:
            query['price']['$lte'] = float(max_price)

    # 📐 Plot Size
    plot_size = request.GET.get('plot_size')
    if plot_size:
        query['plot_size'] = {'$gte': int(plot_size)}

    # 🧭 Facing
    facing = request.GET.get('facing')
    if facing:
        query['facing'] = facing

    # 👤 Ownership Type
    ownership_type = request.GET.get('ownership_type')
    if ownership_type:
        query['ownership_type'] = ownership_type

    # ✅ Availability
    availability = request.GET.get('availability')
    if availability:
        query['availability'] = availability

    # 🏫 Landmark
    landmark = request.GET.get('landmark')
    if landmark:
        query['landmark'] = {'$regex': landmark, '$options': 'i'}

    sites_cursor = site_collection.find(query)
    sites = []

    for site in sites_cursor:
        site['id_str'] = str(site['_id'])
        sites.append(site)

    return render(request, 'site_list.html', {'sites': sites})




def admin_dashboard(request):
    # Count sites by status
    pending = site_collection.count_documents({'status': 'pending'})
    approved = site_collection.count_documents({'status': 'approved'})
    rejected = site_collection.count_documents({'status': 'rejected'})

    # Fetch pending sites
    sites_cursor = site_collection.find({'status': 'pending'})
    sites = []

    for site in sites_cursor:
        site['id_str'] = str(site['_id'])
        sites.append(site)

    return render(request, 'admin_dashboard.html', {
        'sites': sites,
        'pending': pending,
        'approved': approved,
        'rejected': rejected
    })




def approve_site(request, site_id):
    site_collection.update_one(
        {'_id': ObjectId(site_id)},
        {'$set': {'status': 'approved'}}
    )
    return redirect('admin_dashboard')


def reject_site(request, site_id):
    site_collection.update_one(
        {'_id': ObjectId(site_id)},
        {'$set': {'status': 'rejected'}}
    )
    return redirect('admin_dashboard')

def rejected_sites(request):
    sites_cursor = site_collection.find({'status': 'rejected'})
    sites = []

    for site in sites_cursor:
        print(site)  # 👈 DEBUG
        site['id_str'] = str(site['_id'])
        sites.append(site)

    print("TOTAL REJECTED:", len(sites))
    return render(request, 'rejected_sites.html', {'sites': sites})




