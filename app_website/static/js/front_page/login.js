var Login = function () {

    return {
        //main function to initiate the module
        init: function () {
            var form = $('#form-login');
            form.validate(
                {
                    rules: {
                        username: {
                            required: true,
                            remote: {
                                url: "/register/",
                                type: "post",
                                data: {
                                    array_str: function () {
                                        return "1|" + $('#username').val();
                                    }
                                },
                            }
                        },
                        password: {
                            required: true,
                        },
                    },

                    messages: {
                        'username': {
                            required: "请输入用户名",
                            remote: '用户名不存在',
                        },
                        'password': {
                            required: "请输入密码",
                        },
                    },

                    highlight: function(element) {
                        $(element).closest('.control-group').removeClass('success').addClass('error');
                    },

                    success: function(element) {
                        $(element).closest('.control-group').removeClass('error').addClass('success');
                    }
                });
        }
    };

}();