var Register = function () {

    return {
        //main function to initiate the module
        init: function () {
            var form = $('#form-register');
            form.validate(
                {
                    rules: {
                        username: {
                            required: true,
                            byteRangeLength: [6, 30],
                            charCheck: true,
                            remote: {
                                url: "/register/",
                                type: "post",
                                data: {
                                    array_str: function () {
                                        return "0|" + $('#username').val();
                                    }
                                },
                    }
                        },
                        password1: {
                            required: true,
                            byteRangeLength: [6, 16],
                        },
                        password2: {
                            required: true,
                            equalTo: "#password1",
                        },
                    },

                    messages: {
                        username: {
                            required: '用户名不能为空',
                            byteRangeLength: "( 用户名由6-30个字符组成。 )",
                            remote: '用户名已存在',
                        },
                        password1: {   
                            required: "请填写密码",   
                            byteRangeLength:"( 密码由6-16个字符组成。 )",
                        },
                        password2: {   
                            required: "请填写确认密码",   
                            equalTo: "两次密码输入不相同"   
                        }
                    },

                    highlight: function(element) {
                        $(element).closest('.control-group').removeClass('success').addClass('error');
                    },

                    success: function(element) {
                        $(element).closest('.control-group').removeClass('error').addClass('success');
                    },

                });

        }
    };

}();
