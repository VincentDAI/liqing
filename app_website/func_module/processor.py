from app_website.models import Info, Client, Order, Goods, Repairs, Order_Goods, Order_Repairs

### Processor ###
class Processor():
    def user_login_check(self, user):
        return user.is_authenticated()

    def append_user_info(self, context, curr_user):
        if curr_user.is_authenticated():
            context.update(user = curr_user)

            infos = Info.objects.filter(user=curr_user)
            if infos.count() > 0:
                context.update(info = infos[0])

    # handle the new order request
    def handle_new_order_req(self, request):
        data = request.POST
        curr_user = request.user
        
        client_name = data['client-name']
        client_address = data['client-address']
        client_phone = data['client-phone']
        client = Client(name=client_name, phone_number=client_phone, address=client_address)
        client.save()

        type = data['type']
        order = Order(type=type, client=client, user=curr_user)
        order.save()
        if type == "0" or type == "1":
            goods_name = data['goods-name']
            goods_quantity = data['goods-quantity']
            goods = Goods(name=goods_name)
            goods.save()

            order_goods = Order_Goods(order=order, goods=goods, quantity=goods_quantity)
            order_goods.save()

        return "true"

    def append_pagination_stuff(self, context, page_num, count_per_page, CurrModel, orderField):

        total = CurrModel.objects.all().count()
        total_page = ( total - 1 ) / count_per_page if total > 0 else 0

        start_pos = page_num * count_per_page
        end_pos = start_pos + count_per_page

        if page_num - 2 > 0 and page_num + 2 < total_page:
            page_range_start = page_num - 2
            page_range_end =  page_num + 2
        elif page_num - 2 <= 0:
            page_range_start = 0
            page_range_end = page_range_start + 4 if page_range_start + 4 < total_page else total_page
        elif page_num + 2 >= total_page:
            page_range_end = total_page
            page_range_start = page_range_end - 4 if page_range_end - 4 > 0 else 0            
        page_range = range(page_range_start + 1, page_range_end + 2)

        has_page_head = False
        has_page_tail = False
        has_head_ellipsis = True
        has_tail_ellipsis = True
        if page_range:
            if 1 < page_range[0]:
                has_page_head = True
                if 2 == page_range[0]:
                    has_head_ellipsis = False
            if total_page + 1 > page_range[-1]:
                has_page_tail = True
                if total_page == page_range[-1]:
                    has_tail_ellipsis = False

        context.update(data_list = CurrModel.objects.all().order_by(orderField)[start_pos:end_pos])
        context.update(total_page = total_page)
        context.update(page_range = page_range)
        context.update(has_page_head = has_page_head)
        context.update(has_page_tail = has_page_tail)
        context.update(has_head_ellipsis = has_head_ellipsis)
        context.update(has_tail_ellipsis = has_tail_ellipsis)
