function handleNav() {
    $('#NAV .navbar-nav > li.dropdown').each(function () {
        var self = $(this),
            klass = $(self).find('> a').text();

        klass = klass.toLowerCase();
        klass = $.trim(klass);
        klass = klass.replace(/\s+/g, '-');

        $(self).addClass(klass);
    });
}

function handleSearch() {
    $('#MPheader #Logo').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function handleHero() {
    $('.hero-slide').each(function () {
        $(this).find('.HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
        $(this).find('.HtmlContent > img').wrapAll('<div class="img-container" />');
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
    $('.home .HLRecentBlogs ul li').each(function () {
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
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.editors-picks .HLRecentBlogs .Content .col-md-12>ul').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
		slidesToScroll: 4,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                },
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

function handleCTA() {
    $('.cta-section .HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
    $('.cta-section .HtmlContent > img').wrapAll('<div class="img-container" />');

    var imgContainer = $('.cta-section .img-container');
    var imgSrc = $('.cta-section img').attr('src');
    $(imgContainer).css('background-image', 'url("' + imgSrc + '")');
}

function handleImageTiles() {
    $('.img-tile').each(function () {
        var self = $(this),
            image = $(self).find('img');

        $(image).wrap('<div class="img-container" />');
        handleBgImage($(self).find('.img-container'), $(self).find('.img-container'));
        $(self).find('.img-container').prependTo(self);
    });
}

$(function () {
    handleNav();
    handleSearch();
    handleHero()
    handleCTA();
    handleHomepageBlogs()
    handleImageTiles();
});