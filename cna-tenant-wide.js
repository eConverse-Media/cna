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
    } else {
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
    $(links).each(function() {
        var self = $(this),
            text = $(self).text();

        text = text.toLowerCase();
        text = $.trim(text);

        if (text.indexOf('canadian nurse') > -1 ||
            text.indexOf('canadian nurses association') > -1 ||
            text.indexOf('association des infirmières ') > -1 ||
            text.indexOf('emplois en soins infirmiers') > -1 ||
            text.indexOf('nursing jobs') > -1 ||
            text.indexOf('la revue infirmière canadienne') > -1 ||
            text.indexOf('communities') > -1 ||
            text.indexOf('communautés') > -1) {
            $(self).addClass('mobile-link');
            $(self).clone().removeClass('mobile-link').addClass('desktop-link').appendTo('.left-top-links');
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

    var location = window.location.href,
        isProfile = !!(location.indexOf('?UserKey') > -1);

    if (isProfile) {
        var userKey = location.substring(location.indexOf('?UserKey'), location.length);

        languageBtnLink += userKey;
    }

    if (!!languageBtnLink) {
        $('.language-btn a').attr('href', languageBtnLink);
    }


    // language button location
    if (windowWidth > 991) {
        $('.language-btn').prependTo('#MPheader > div.row:first-child > .col-md-12');
    } else {
        $('.language-btn').insertAfter('#Logo');
    }

    // deal with 404 text in language button
    var content = $('.language-btn .HtmlContent').outerHTML;

    $('.language-btn').innerHTML = content;
}

function handleMobileHeader() {
    var width = $(window).width();

    handleLanguageButton(width);

    $(window).on('resize orientationChange', function() {
        width = $(window).width();

        handleLanguageButton(width);
    });
}

function handleCTATiles() {
    $('.cta-tile .HtmlContent').each(function() {
        handleLink(this);
    });
}

function handleCTAButtons() {
    $('.cta-button').wrapAll('<div class="cta-buttons" />');
}

function handleAlertBar() {
    $('.alert-bar').prependTo('#MPOuterHeader');
    $('.alert-bar .HtmlContent').append('<button type="button" title="Close Alert" onclick="closeAlert();"><i class="cna cna-close"></i></button>');
}

function closeAlert() {
    $('.alert-bar').hide();
}

$(function() {
    handleMobileHeader();
    handleHeaderLinks();
    handleCTATiles();
    handleCTAButtons();
    handleAlertBar();
});