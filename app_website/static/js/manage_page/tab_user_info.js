var TabUserInfo = function() {

    return {

        init: function() {

            $('a[rel*=modal]').facebox();

            before_update_modal = function () {
                var checked_list = $('input:checked');
                var checked_length = checked_list.length;
	        if (checked_length > 1) {
	            $('#btn-update').attr('href', '#more-checked');
	        } else if (checked_length == 0) {
	            $('#btn-update').attr('href', '#no-checked');
	        } else {
	            $('#btn-update').attr('href', '#update-data');
	        }
	    }
        },

    };

}();
