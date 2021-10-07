function handleSearch() {
    $('#MPheader #Logo').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
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

function handleMobileHeader() {
    var width = $(window).width();

    handleLanguageButton(width);

    $(window).on('resize orientationChange', function () {
        width = $(window).width();

        handleLanguageButton(width);
    });
}

function handleHeaderLinks() {
    var links = $('#MPAuxNav ul.level1 li');
    $('#MPheader > div.row:first-child > .col-md-12').prepend('<ul class="left-top-links" />')
    $(links).each(function () {
        var self = $(this),
            text = $(self).text();

        text = text.toLowerCase();
        text = $.trim(text);

        if (text.indexOf('canadian nurses association') > -1 ||
        text.indexOf('nursing jobs') > -1) {
            $(self).appendTo('.left-top-links');
        }

    });
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

$(function () {
    handleSearch();
    handleMobileHeader();
    handleHeaderLinks();
    handleCTATiles();
});