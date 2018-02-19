 $(function(){

        $('#phone-order').on('click',function(){
            sendGeneral($(this),1, 'Заказан звонок');
        });

        
        $('#phone-order-advice').on('click',function(){
            sendGeneral($(this),6 , 'Получить консультацию');
        });
    });

function sendGeneral(item, type, theme)
{
            var name = item.parent().prev().children('div:first-child').children('input').val();
            var phone = item.parent().prev().children('div:nth-child(2)').children('input').val();
            var checked = item.parent().parent().children('.modal-body').children('.checkbox').children('label').children('input').prop('checked');
            if (name.length < 3) alert('Введите имя!');
            else
            {
                if (phone.length != 19) alert('Введите корректный номер телефона!');
                else
                {
                    if (checked ==false) alert('Вы должны согласиться с обработкой персональных данных!');
                    else
                    {
                        var data = 'type='+type+'&name='+name+'&phone='+phone;
                        var res = sendToCrm(data);
                        if (res == '1') 
                            {
                                alert('Спасибо за заявку! Мы свяжемся с Вами в ближайшее время');
                               $('.modal').modal('hide');
                            }
                        else alert('Извините, при отправке заявки произошла ошибка. Повторите попытку позже.');
                    }
                }
            }
}

 function sendToCrm(data)
 {
    var page_name = $('h1').html();
    var page_uri = window.location.href;

    data = data+'&page_name='+page_name+'&page_uri='+page_uri;
    $.ajax({
        url: '/save-crm',
        dataType: 'json',
        data: data,            
        type: 'POST',
        async: false, 
        success:  
            function(data){
                $('#ajax-result').html(data.result);
            },
        error:
        function(data){
            $('#ajax-result').html('0');
        },
    });
    var result = $('#ajax-result').html();
    return result;
 }

function closeModals()
{
     $('.modal').fadeOut(400);
            $('.bg').fadeOut(400);
}