function handleHeaderLinks() {
    var links = $('#MPAuxNav ul.level1 li');
    $('#MPheader > div.row:first-child > .col-md-12').prepend('<ul class="left-top-links" />')
    $(links).each(function () {
        var self = $(this),
            text = $(self).text();

        text = text.toLowerCase();
        text = $.trim(text);

        if (text.indexOf('canadian nurse journal') > -1 ||
        text.indexOf('nursing jobs') > -1) {
            $(self).appendTo('.left-top-links');
        }

    });
}

function handleSearch() {
    $('#MPheader > div.row:first-child > .col-md-12').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function toggleSearch() {
    if ($('.search-bar-top').hasClass('open')) {
        $('.search-bar-top').removeClass('open');
    } else {
        $('.search-bar-top').addClass('open');
        $('.search-bar-top .form-control').focus();
    }
}

function handleLanguageButton(windowWidth) {
    if (windowWidth > 991) {
        $('.language-btn').prependTo('#MPheader > div.row:first-child > .col-md-12');
    } else {
        $('.language-btn').insertAfter('#Logo');
    }
}

function handleFlexContentItems() {
    $('.flex-content-item').each(function () {
        var self = $(this).find('.HtmlContent');

        $(self).find('> img').wrap('<div class="img-container" />');
        $(self).find('> *:not(.img-container)').wrapAll('<div class="text-container" />');
    });
}

function handleCTAButtons() {
    $('.cta-button').wrapAll('<div class="cta-buttons" />');
}

function handleCTATiles() {
    $('.cta-tile .HtmlContent').each(function () {
        var self = $(this),
            link = $(self).find('a'),
            href = $(link).attr('href'),
            target = $(link).attr('target');

        if (target == '_blank') {
            $(self).wrapInner('<a href="' + href + '" target="_blank" rel="noopener" />');
        } else {
            $(self).wrapInner('<a href="' + href + '" />');
        }

        $(link).hide();
    });
}

function handleTestimonials() {
    $('.testimonial').wrapAll('<div class="testimonial-slider slick-dotted" />');
    $('.testimonial-slider').slick({
        arrows: true,
        dots: false,
        autoplay: false,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>'
    });

    $('.testimonial').each(function () {
        var self = $(this);

        $(self).find('.HtmlContent > em').wrap('<div class="testimonial-name-img" />');
        $(self).find('h5').appendTo($(self).find('.testimonial-name-img'));
        $(self).find('p').appendTo($(self).find('.testimonial-name-img'));
        $(self).find('.testimonial-name-img h5, .testimonial-name-img p').wrapAll('<div class="testimonial-name" />');
    });
}

function handleHero() {
    $('.hero-slide img').wrap('<div class="clip-me" />');
    $('.hero-slide').each(function () {
        var self = $(this);

        $(self).find('.clip-me').insertAfter($(self).find('.HtmlContent'));
    });
    var heroSlides = $('.hero-slide').toArray(),
        count = heroSlides.length;

    for (var i = 0; i < heroSlides.length; i++) {
        var slide = heroSlides[i],
            h4 = $(slide).find('h4'),
            text = $(h4).text(),
            newText = i + 1;

        newText += '/';
        newText += count;
        newText += ' — ';
        newText += text;

        $(h4).text(newText);
    }
    $('.hero-slide').wrapAll('<div class="hero-slider slick-dotted" />');
    $('.hero-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-chevron-right"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-chevron-left"></i></button>'
    });

}

function handleMobileHeader() {
    var width = $(window).width();

    handleLanguageButton(width);

    $(window).on('resize orientationChange', function () {
        width = $(window).width();

        handleLanguageButton(width);
    });
}

$(function () {
    handleHeaderLinks();
    handleSearch();
    handleFlexContentItems();
    handleCTAButtons();
    handleCTATiles();
    handleTestimonials();
    handleHero();
    handleMobileHeader();
});