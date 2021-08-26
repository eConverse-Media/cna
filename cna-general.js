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

$(function () {
    handleHeaderLinks();
    handleSearch();
    handleLanguageButton();
    handleFlexContentItems();
    handleCTAButtons();
    handleCTATiles();
});