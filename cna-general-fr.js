function updateSearch() {
    $('.search-bar-top .form-control').attr('placeholder', 'Rechercher...');
}

function updateFeaturedNews() {
    $('.featured-news .Content ul li').each(function () {
        var self = $(this);

        $(self).find('.text-container h4').text('Apprendre plus');
    });
}

$(function () {
    updateSearch();
    updateFeaturedNews();
});