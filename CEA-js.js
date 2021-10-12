$(function () {
    handleHero()
    handleCTA();
    handleHomepageBlogs()
});

function handleHero() {
    $('.hero-slide').each(function () {
        $(this).find('.HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
        $(this).find('.HtmlContent > img').wrapAll('<div class="img-container" />');

        // var imgContainer = $('.img-container');
        // var ImgSrc = $(this).find('img').attr('src');
        // $(this).find('img').hide();
        // $(this).find(imgContainer).css('background-image', 'url("' + ImgSrc + '")');
    });

    $('.hero-slide').wrapAll('<div class="hero-slider slick-dotted" />');
    $('.hero-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>'
    });
}

function handleHomepageBlogs() {
    $('.HLRecentBlogs ul li').each(function () {
        var self = $(this);
        handleAjaxCall(self, false);
    });

    $('.latest-articles .HLRecentBlogs .Content .col-md-12>ul').slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
		slidesToScroll: 3,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>'
    });

    $('.editors-picks .HLRecentBlogs .Content .col-md-12>ul').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
		slidesToScroll: 4,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>'
    });
}

function handleAjaxCall(self, asBackground) {
    var href = $(self).find('h3 a').attr('href');

    // handle image 

    if (!asBackground) {
        var imgContainer = '<div class="img-container loading" />';
        $(self).wrapInner('<div class="text-container" />');
        $(self).prepend(imgContainer);
    }
    $.ajax({
        url: href,
        dataType: 'html',
        success: success,
        error: removeLoading
    });
    
    function success(resp) {
        var img = $(resp).find('.blogs-block > div[id*="UpdatePanel"] > .row:not(.margin-bottom-medium) > .col-md-12 img:first-of-type'),
            src = $(img).attr('src');

        if (!!src) {
            var url = "url('" + src + "')";
            if (asBackground) {
                $(self).css('background-image', url);
            } else {
                $(self).find('.img-container').css('background-image', url);
            }
        } else {
            $(self).find('.img-container').addClass('no-ajax-image');
        }
        
        removeLoading();
    }

    function removeLoading() {
        $(self).find('.img-container').removeClass('loading');
    }
}

function handleCTA() {
    $('.cta-section .HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
    $('.cta-section .HtmlContent > img').wrapAll('<div class="img-container" />');

    var imgContainer = $('.cta-section .img-container');
    var imgSrc = $('.cta-section img').attr('src');
    $(imgContainer).css('background-image', 'url("' + imgSrc + '")');
}