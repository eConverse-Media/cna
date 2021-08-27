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
    $('#MPheader > div.row:first-child > .col-md-12').append('<div class="header-search"><button class="search-btn-top" onclick="toggleSearch();" type="button" /></div>');
}

function handleLanguageButton() {
    $('.language-btn').prependTo('#MPheader > div.row:first-child > .col-md-12');
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

$(function () {
    handleHeaderLinks();
    handleSearch();
    handleLanguageButton();
    handleFlexContentItems();
    handleCTAButtons();
    handleCTATiles();
    handleTestimonials();
});