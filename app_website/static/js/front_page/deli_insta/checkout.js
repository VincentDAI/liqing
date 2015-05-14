
var Checkout = function () {

    return {
        //main function to initiate the module
        init: function () {
            var form_goods = $('#form-goods-info');
            form_goods.validate(
                {
                    rules: {
                        'goods-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 20,
                            cnName: true,
                        },
                        'goods-quantity': {
                            required: true,
                            digits: true,
                        },
                    },

                    messages: {
                        'goods-name': {
                            required: '货物名称不能为空',
                        },
                        'goods-quantity': {
                            required: '货物数量不能为空',
                        },
                    },

                    highlight: function(element) {
                        $(element).closest('.control-group').removeClass('success').addClass('error');
                    },

                    success: function(element) {
                        $(element).closest('.control-group').removeClass('error').addClass('success');
                    },

                });

            var form_client = $('#form-client-info');
            form_client.validate(
                {
                    rules: {
                        'client-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 20,
                            cnName: true,
                        },
                        'client-address': {
                            required: true,
                            minlength: 2,
                            maxlength: 60,
                            cnName: true,
                        },
                        'client-phone': {
                            required: true,
                            maxlength: 20,
                            isPhone: true,
                        }
                    },

                    messages: {
                        'client-name': {
                            required: '客户姓名不能为空',
                        },
                        'client-address': {
                            required: '联系地址不能为空',
                        },
                        'client-phone': {
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

            var step = 1;
            var curr_counter = 1;

            $('#btn-service-edit').click(function () {
                if (curr_counter == 2) {
                    if (curr_counter == step) {
                        $('#header-goods').addClass('greyed-out');
                        $('#step-goods').addClass('hide');
                    } else {
                        $('#div-goods-edit').addClass('hide');
                        $('#div-goods-value').removeClass('hide');
                        $('#btn-goods-edit').removeClass('hide');
                        $('#div-goods-continue').addClass('hide');
                    }
                } else if (curr_counter == 3) {
                    if (curr_counter == step) {
                        $('#header-client').addClass('greyed-out');
                        $('#step-client').addClass('hide');
                    } else {
                        $('#div-client-edit').addClass('hide');
                        $('#div-client-value').removeClass('hide');
                        $('#btn-client-edit').removeClass('hide');
                        $('#div-client-continue').addClass('hide');
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

                $('#div-service-edit').addClass('hide');
                $('#div-service-value').removeClass('hide');
                $('#btn-service-edit').removeClass('hide');
                $('#div-service-continue').addClass('hide');

                if(step == 3) {
                    BaseFunc.scrollTo($('#header-goods'), -80);
                    $('#header-client').removeClass('greyed-out');
                    $('#step-client').removeClass('hide');
                    curr_counter = 3;
                } else if(step == 4) {
                    BaseFunc.scrollTo($('#header-client'), -80);
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
                        $('#header-client').addClass('greyed-out');
                        $('#step-client').addClass('hide');
                    } else {
                        $('#div-client-edit').addClass('hide');
                        $('#div-client-value').removeClass('hide');
                        $('#btn-client-edit').removeClass('hide');
                        $('#div-client-continue').addClass('hide');
                    }
                } else {
                    $('#header-check').addClass('greyed-out');
                    $('#step-check').addClass('hide');
                }
                curr_counter = 2;

                $('#div-goods-edit').removeClass('hide');
                $('#div-goods-value').addClass('hide');
                $('#btn-goods-edit').addClass('hide');
                $('#div-goods-continue').removeClass('hide');
                BaseFunc.scrollTo($('#header-service'), -80);
            });

            $('#btn-goods-continue').click(function () {
                if (form_goods.valid() == false) {
                    return false;
                } else {
                    $('#span-goods-name').text($('#goods-name').val());
                    $('#span-goods-quantity').text($('#goods-quantity').val() + ' 件');

                    $('#div-goods-edit').addClass('hide');
                    $('#div-goods-value').removeClass('hide');
                    $('#btn-goods-edit').removeClass('hide');
                    $('#div-goods-continue').addClass('hide');
                    
                    if(step == 4) {
                        BaseFunc.scrollTo($('#header-client'), -80);
                        $('#header-check').removeClass('greyed-out');
                        $('#step-check').removeClass('hide');
                        curr_counter = 4;
                    } else {
                        if(step == 2) {
                            step = 3;
                        }
                        curr_counter = 3;
                        BaseFunc.scrollTo($('#header-goods'), -80);
                        $('#header-client').removeClass('greyed-out');
                        $('#step-client').removeClass('hide');
                    }
                }
            });

            $('#btn-client-edit').click(function () {
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
                        $('#div-goods-edit').addClass('hide');
                        $('#div-goods-value').removeClass('hide');
                        $('#btn-goods-edit').removeClass('hide');
                        $('#div-goods-continue').addClass('hide');
                    }
                } else {
                    $('#header-check').addClass('greyed-out');
                    $('#step-check').addClass('hide');
                }
                curr_counter = 3;

                $('#div-client-edit').removeClass('hide');
                $('#div-client-value').addClass('hide');
                $('#btn-client-edit').addClass('hide');
                $('#div-client-continue').removeClass('hide');
                BaseFunc.scrollTo($('#header-goods'), -80);
            });

            $('#btn-client-continue').click(function () {
                if (form_client.valid() == false) {
                    return false;
                } else {
                    $('#span-client-name').text($('#client-name').val());
                    $('#span-client-address').text($('#client-address').val());
                    $('#span-client-phone').text($('#client-phone').val());

                    $('#div-client-edit').addClass('hide');
                    $('#div-client-value').removeClass('hide');
                    $('#btn-client-edit').removeClass('hide');
                    $('#div-client-continue').addClass('hide');

                    if(step == 3) {
                        step = 4;
                    }
                    curr_counter = 4;
                    BaseFunc.scrollTo($('#header-client'), -80);
                    $('#header-check').removeClass('greyed-out');
                    $('#step-check').removeClass('hide');
                }
            });

            $('#submit').click(function () {
                var data = {};
                data['type'] = $('#select-type').find("option:selected").val();
                data['goods-name'] = $('#goods-name').val();
                data['goods-quantity'] = $('#goods-quantity').val();
                data['client-name'] = $('#client-name').val();
                data['client-address'] = $('#client-address').val();
                data['client-phone'] = $('#client-phone').val();

                $.post("/new_order_req/", data, function(ret) {
                    alert(ret);
                });
            });

        }
    };

}();
