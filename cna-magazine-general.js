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

function handleMobileHeader() {
    var width = $(window).width();

    handleLanguageButton(width);

    $(window).on('resize orientationChange', function () {
        width = $(window).width();

        handleLanguageButton(width);
    });
}

$(function () {
    handleSearch();
    handleMobileHeader();
});