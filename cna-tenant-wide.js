function toggleSearch() {
    if ($('.search-bar-top').hasClass('open')) {
        $('.search-bar-top').removeClass('open');
    } else {
        $('.search-bar-top').addClass('open');
        $('.search-bar-top .form-control').focus();
    }
}

function handleLink(self) {
    var link = !!($(self).find('h3 a').attr('href')) ? $(self).find('h3 a') : $(self).find('a'),
        href = $(link).attr('href'),
        target = $(link).attr('target');

        if (target == '_blank') {
            $(self).wrapInner('<a href="' + href + '" target="_blank" rel="noopener" />');
        } else {
            $(self).wrapInner('<a href="' + href + '" />');
        }

        if ($(link).parent().is('h3')) {
            $(link).contents().unwrap();
        } 
        else {
            $(link).hide();
        }
}

function handleLanguageButton(windowWidth) {
    if (windowWidth > 991) {
        $('.language-btn').prependTo('#MPheader > div.row:first-child > .col-md-12');
    } else {
        $('.language-btn').insertAfter('#Logo');
    }
}

function handleHeaderLinks() {
    var links = $('#MPAuxNav ul.level1 li');
    $('#MPheader > div.row:first-child > .col-md-12').prepend('<ul class="left-top-links" />')
    $(links).each(function () {
        var self = $(this),
            text = $(self).text();

        text = text.toLowerCase();
        text = $.trim(text);

        if (text.indexOf('canadian nurse journal') > -1 ||
        text.indexOf('canadian nurses association') > -1 ||
        text.indexOf('nursing jobs') > -1) {
            $(self).appendTo('.left-top-links');
        }

    });
}

function handleLanguageButton(windowWidth) {

    //language button link
    var languageBtnLink = $('.language-btn-link a').attr('href');

    if (!languageBtnLink) {
        var linkContainer = $('.blogs-block pre').html();

        languageBtnLink = $.trim(linkContainer);

        languageBtnLink = languageBtnLink.substring(6, languageBtnLink.length - 7);
    }

    $('.language-btn a').attr('href', languageBtnLink);

    // language button location
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

function handleCTATiles() {
    $('.cta-tile .HtmlContent').each(function () {
        handleLink(this);
    });
}

$(function () {
    handleMobileHeader();
    handleHeaderLinks();
    handleCTATiles();
});