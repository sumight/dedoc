jQuery(function($) {
    var handle = function() {
        var $codeArea = $(this).parent().find('.bs-code');
        $codeArea.slideToggle();
        console.log('targe');
    }
    $('body').off('click', '.bs-btn-show-code');
    console.log('docsx.js');
    $('body').on('click', '.bs-btn-show-code', handle);
});
