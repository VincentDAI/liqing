
var CompleteInfo = function () {

    return {
        //main function to initiate the module
        init: function () {
            var form = $('#form-info');
            form.validate(
                {
                    rules: {
                        'real-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 20,
                            cnName: true,
                        },
                        'company-name': {
                            required: true,
                            minlength: 2,
                            maxlength: 60,
                            cnName: true,
                        },
                        'phone-number': {
                            required: true,
                            maxlength: 20,
                            isPhone: true,
                        },
                    },

                    messages: {
                        'real-name': {
                            required: '真实姓名不能为空',
                        },
                        'company-name': {
                            required: '公司名称不能为空',
                        },
                        'phone-number': {
                            required: '联系电话不能为空',
                        },
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
