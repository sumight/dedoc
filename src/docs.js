jQuery(function($) {
    $(document).on('click', '.bs-btn-show-code', function() {
        var $codeArea = $(this).parent().find('.bs-code');
        $codeArea.slideToggle();
    });
});
