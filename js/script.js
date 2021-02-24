$(document).ready(function () {
    // Блок "Отзывы". Скрытие части текста отзыва
    var show_btn = $(".show_btn");
    show_btn.each(function(btn) {
        if ($(this).parent().find(".text").height() < $(this).parent().find(".text p").height())
        {
            $(this).before("<div class=\"text_end\">...</div>");
        }
        else
        {
           $(this).hide() 
        }
    });
    show_btn.click(function() {
        var parent = $(this).parent();
        if (parent.hasClass("show"))
        {
            $(this).text("показать полностью");
            $(this).parent().find(".text_end").show();
            parent.removeClass("show");
        }
        else
        {
            $(this).text("скрыть");
            $(this).parent().find(".text_end").hide();
            parent.addClass("show");
        }
    });

    // Меню. Плавный переход по ссылкам меню
    $(".topmenu_block a").click(function () {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
        return false;
    });
    // Кнопка "Наверх".Плавная прокрутка наверх
    $("#toTop").click(function () {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top - 100;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1000);
        return false;
    });
    // появление кнопки
    $(window).scroll(function() {
        var scrl = $(this).scrollTop();
        if(scrl > 600) {
          $('#toTop').fadeIn();
          $("#toTop").css("display", "table");
        } else {
          $('#toTop').fadeOut();
        }
    });

    // Модальная форма
    $(".modal_form .bg").click(function() {
        $(this).parent().hide();
        $("#modal_form .email_text_box").val("");
        $("#modal_form textarea").text("");
    });
    $("header .button").click(function() {
        $(".modal_form").show();
    });
    $(".product_card .button").click(function() {
        $("#modal_form textarea").text("заказать пенобетон мерки D - XXX");
        $(".modal_form").show();
    });


    // отправка почты
    $("#submit").click(function() {
            consle.log("#submit.click");
        $("form#formm").submit(function() { 
            consle.log("form.submit");
            var form_data = $(this).serialize(); //собераем все данные из формы
            consle.log($(form_data));
            $.ajax({
                type: "POST", //Метод отправки
                url: "send.php", //путь до php фаила отправителя
                data: form_data,
                success: function() {
                    //код в этом блоке выполняется при успешной отправке сообщения
                    alert("Ваше сообщение отпрвлено!");
                }
            });
        });
    });

    

});