
var Checkout = function () {

    return {
        //main function to initiate the module
        init: function () {
            var form_goods = $('#form-goods-info');
            form_goods.validate(
                {
                    rules: {
                        'goods-name0': {
                            required: true,
                            minlength: 2,
                            maxlength: 20,
                            cnName: true,
                        },
                        'reason0': {
                            required: true,
                            minlength: 2,
                            maxlength: 60,
                            cnName: true,
                        },
                        'goods-quantity0': {
                            required: true,
                            digits: true,
                        },
                    },

                    highlight: function(element) {
                        $(element).closest('.control-group').removeClass('success').addClass('error');
                    },

                    success: function(element) {
                        $(element).closest('.control-group').removeClass('error').addClass('success');
                    },

                });

            var form_customer = $('#form-customer-info');
            form_customer.validate(
                {
                    rules: {
                        'customer-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 20,
                            cnName: true,
                        },
                        'customer-address': {
                            required: true,
                            minlength: 2,
                            maxlength: 60,
                            cnName: true,
                        },
                        'customer-phone': {
                            required: true,
                            maxlength: 20,
                            isPhone: true,
                        }
                    },

                    messages: {
                        'customer-name': {
                            required: '客户姓名不能为空',
                        },
                        'customer-address': {
                            required: '联系地址不能为空',
                        },
                        'customer-phone': {
                            required: '联系电话不能为空',
                        }
                    },

                    highlight: function(element) {
                        $(element).closest('.control-group').removeClass('success').addClass('error');
                    },

                    success: function(element) {
                        $(element).closest('.control-group').removeClass('error').addClass('success');
                    },

                });

            var displayConfirm = function() {
                $('.display-value', $('#checkout')).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', $('#checkout'));
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    }
                });
            }

            var step = 1;
            var curr_counter = 1;

            $('#btn-service-edit').click(function () {
                if (curr_counter == 2) {
                    if (curr_counter == step) {
                        $('#header-goods').addClass('greyed-out');
                        $('#step-goods').addClass('hide');
                    } else {
                        $('#div-goods-edit1').addClass('hide');
                        $('#div-goods-edit2').addClass('hide');
                        $('#div-goods-value').removeClass('hide');
                        $('#btn-goods-edit').removeClass('hide');
                        $('#div-goods-continue').addClass('hide');
                    }
                } else if (curr_counter == 3) {
                    if (curr_counter == step) {
                        $('#header-customer').addClass('greyed-out');
                        $('#step-customer').addClass('hide');
                    } else {
                        $('#div-customer-edit').addClass('hide');
                        $('#div-customer-value').removeClass('hide');
                        $('#btn-customer-edit').removeClass('hide');
                        $('#div-customer-continue').addClass('hide');
                    }
                } else {
                    $('#header-check').addClass('greyed-out');
                    $('#step-check').addClass('hide');
                }
                curr_counter = 1;

                $('#div-service-edit').removeClass('hide');
                $('#div-service-value').addClass('hide');
                $('#btn-service-edit').addClass('hide');
                $('#div-service-continue').removeClass('hide');
                BaseFunc.scrollTo($('#header-service'), -200);
            });

            $('#btn-service-continue').click(function () {
                $('#span-service').text($('#select-service').find("option:selected").text());

                displayConfirm();
                $('#div-service-edit').addClass('hide');
                $('#div-service-value').removeClass('hide');
                $('#btn-service-edit').removeClass('hide');
                $('#div-service-continue').addClass('hide');

                if(step == 3) {
                    BaseFunc.scrollTo($('#header-goods'), -80);
                    $('#header-customer').removeClass('greyed-out');
                    $('#step-customer').removeClass('hide');
                    curr_counter = 3;
                } else if(step == 4) {
                    BaseFunc.scrollTo($('#header-customer'), -80);
                    $('#header-check').removeClass('greyed-out');
                    $('#step-check').removeClass('hide');
                    curr_counter = 4;
                } else {
                    if(step == 1) {
                        step = 2;
                    }
                    curr_counter = 2;
                    BaseFunc.scrollTo($('#header-service'), -80);
                    $('#header-goods').removeClass('greyed-out');
                    $('#step-goods').removeClass('hide');
                }
            });

            $('#btn-goods-edit').click(function () {
                if (curr_counter == 1) {
                    if (curr_counter == step) {
                        $('#header-service').addClass('greyed-out');
                        $('#step-service').addClass('hide');
                    } else {
                        $('#div-service-edit').addClass('hide');
                        $('#div-service-value').removeClass('hide');
                        $('#btn-service-edit').removeClass('hide');
                        $('#div-service-continue').addClass('hide');
                    }
                } else if (curr_counter == 3) {
                    if (curr_counter == step) {
                        $('#header-customer').addClass('greyed-out');
                        $('#step-customer').addClass('hide');
                    } else {
                        $('#div-customer-edit').addClass('hide');
                        $('#div-customer-value').removeClass('hide');
                        $('#btn-customer-edit').removeClass('hide');
                        $('#div-customer-continue').addClass('hide');
                    }
                } else {
                    $('#header-check').addClass('greyed-out');
                    $('#step-check').addClass('hide');
                }
                curr_counter = 2;

                $('#div-goods-edit1').removeClass('hide');
                $('#div-goods-edit2').removeClass('hide');
                $('#div-goods-value').addClass('hide');
                $('#btn-goods-edit').addClass('hide');
                $('#div-goods-continue').removeClass('hide');
                BaseFunc.scrollTo($('#header-service'), -80);
            });

            $('#btn-goods-continue').click(function () {
                if (form_goods.valid() == false) {
                    return false;
                } else {

                    displayConfirm();
                    $('#div-goods-edit1').addClass('hide');
                    $('#div-goods-edit2').addClass('hide');
                    $('#div-goods-value').removeClass('hide');
                    $('#btn-goods-edit').removeClass('hide');
                    $('#div-goods-continue').addClass('hide');
                    
                    if(step == 4) {
                        BaseFunc.scrollTo($('#header-customer'), -80);
                        $('#header-check').removeClass('greyed-out');
                        $('#step-check').removeClass('hide');
                        curr_counter = 4;
                    } else {
                        if(step == 2) {
                            step = 3;
                        }
                        curr_counter = 3;
                        BaseFunc.scrollTo($('#header-goods'), -80);
                        $('#header-customer').removeClass('greyed-out');
                        $('#step-customer').removeClass('hide');
                    }
                }
            });

            $('#btn-customer-edit').click(function () {
                if (curr_counter == 1) {
                    if (curr_counter == step) {
                        $('#header-service').addClass('greyed-out');
                        $('#step-service').addClass('hide');
                    } else {
                        $('#div-service-edit').addClass('hide');
                        $('#div-service-value').removeClass('hide');
                        $('#btn-service-edit').removeClass('hide');
                        $('#div-service-continue').addClass('hide');
                    }
                } else if (curr_counter == 2) {
                    if (curr_counter == step) {
                        $('#header-goods').addClass('greyed-out');
                        $('#step-goods').addClass('hide');
                    } else {
                        $('#div-goods-edit1').addClass('hide');
                        $('#div-goods-edit2').addClass('hide');
                        $('#div-goods-value').removeClass('hide');
                        $('#btn-goods-edit').removeClass('hide');
                        $('#div-goods-continue').addClass('hide');
                    }
                } else {
                    $('#header-check').addClass('greyed-out');
                    $('#step-check').addClass('hide');
                }
                curr_counter = 3;

                $('#div-customer-edit').removeClass('hide');
                $('#div-customer-value').addClass('hide');
                $('#btn-customer-edit').addClass('hide');
                $('#div-customer-continue').removeClass('hide');
                BaseFunc.scrollTo($('#header-goods'), -80);
            });

            $('#btn-customer-continue').click(function () {
                if (form_customer.valid() == false) {
                    return false;
                } else {
                    $('#span-customer-name').text($('#customer-name').val());
                    $('#span-customer-address').text($('#customer-address').val());
                    $('#span-customer-phone').text($('#customer-phone').val());

                    displayConfirm();
                    $('#div-customer-edit').addClass('hide');
                    $('#div-customer-value').removeClass('hide');
                    $('#btn-customer-edit').removeClass('hide');
                    $('#div-customer-continue').addClass('hide');

                    if(step == 3) {
                        step = 4;
                    }
                    curr_counter = 4;
                    BaseFunc.scrollTo($('#header-customer'), -80);
                    $('#header-check').removeClass('greyed-out');
                    $('#step-check').removeClass('hide');
                }
            });

        }
    };

}();

function assembleGoodsFormHtml(formid) {

    var htmlStr = "<div id='goods-form" + formid + "' class='row-fluid'>" +
        "<div class='span12'>" +
        "<table class='border-table'>" +
        "<td class='text-center span1'>" +
        "<h5 class='font-bold'>" + (formid + 1) + "</h5>" +
        "</td>" +
        "<td class='text-center span2'>" +
        "<!-- Start div Goods Name -->" +  
        "<div class='control-group margin-default'>" +
        "<input type='text' id='goods-name" + formid + "' name='goods-name" + formid + "' placeholder='货物名称'>" +
        "</div>" +
        "<!-- End div Goods Name -->" +
        "</td>" +
        "<td class='text-center span4'>" +
        "<!-- Start div Repair Reason -->" +  
        "<div class='control-group margin-default'>" +
        "<input type='text' id='reason" + formid + "' name='reason" + formid + "' placeholder='报修原因'>" +
        "</div>" +
        "<!-- End div Repair Reason -->" +
        "</td>" +
        "<td class='text-center span2'>" +
        "<!-- Start div Goods Quantity -->" +  
        "<div class='control-group margin-default'>" +
        "<input type='text' id='goods-quantity" + formid + "' name='goods-quantity" + formid + "' placeholder='数量'>" +
        "</div>" +
        "<!-- End div Goods Quantity -->" +
        "</td>" +
        "<td class='text-center span2'>" +
        "<button id='btn-del-goods" + formid + "' class='btn red' onclick='delGoodsForm(this)'>" +
        '删除' + " <i class='icon-trash'></i>" +
        "</button>" +
        "</td>" +
        "</table>" +
        "</div>" +
        "</div>";

    return htmlStr; 
}

function assembleGoodsValueHtml(formid) {

    var htmlStr = "<div id='goods-value" + formid + "' class='row-fluid'>" +
        "<div class='span12'>" +
        "<table class='border-table grid-1of1'>" +
        "<td class='text-center span1'>" +
        "<h5 class='font-bold'>" + (formid + 1) + "</h5>" +
        "</td>" +
        "<td class='text-center span2'>" +
        "<div class='control-group margin-default'>" +
	"<span class='display-value' data-display='goods-name" + formid + "'></span>" +
        "</div>" +
        "</td>" +
        "<td class='text-center span4'>" +
        "<div class='control-group margin-default'>" +
	"<span class='display-value' data-display='reason" + formid + "'></span>" +
        "</div>" +
        "</td>" +
        "<td class='text-center span2'>" +
        "<div class='control-group margin-default'>" +
	"<span class='display-value' data-display='goods-quantity" + formid + "'></span>" +
        "</div>" +
        "</td>" +
        "<td class='text-center span2'>" +
        "</td>" +
        "</table>" +
        "</div>" +
        "</div>";

    return htmlStr; 
}

function addGoodsForm() {

    var newValue = 0;
    if(goodsFormArray.length != 0) {
        newValue = goodsFormArray[goodsFormArray.length - 1] + 1;
    }
    goodsFormArray.push(newValue);
    var htmlStr = assembleGoodsFormHtml(newValue);
    
    if(newValue == 0) {
        $("#btn-add").before(htmlStr);
        $("#goods-header").removeClass('hide');
    } else {
        var lastFormId = goodsFormArray[goodsFormArray.length - 2];      
        $("#goods-form" + lastFormId).after(htmlStr);
    }
    
    BaseFunc.scrollTo($("#goods-form" + newValue), -400);
    
    $('#form-goods-info').validate(); //sets up the validator
    $("#goods-name" + newValue).rules("add", "required");
    $("#reason" + newValue).rules("add", "required");
    $("#goods-quantity" + newValue).rules("add", "required");
    
    // confirm form
    var valueHtmlStr = assembleGoodsValueHtml(newValue);  
    $("#div-goods-value").append(valueHtmlStr);
}

function delGoodsForm(obj) {

    id = obj.id.charAt(obj.id.length - 1);
    array_index = goodsFormArray.indexOf(parseInt(id));   
    goodsFormArray.splice(array_index, 1);
    if (goodsFormArray.length == 0) {
        $("#goods-header").addClass('hide');
    }
    $("#goods-form" + id).remove();

    // confirm form
    $("#goods-value" + id).remove();

}