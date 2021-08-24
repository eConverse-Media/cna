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

$(function () {
    handleHeaderLinks();
    handleSearch();
    handleLanguageButton();
});