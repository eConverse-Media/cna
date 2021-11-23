function updateSearch() {
    $('.search-bar-top .form-control').attr('placeholder', 'Rechercher...');
}

function updateFeaturedNews() {
    $('.featured-news .Content ul li h4').text('En Vedette');
}

function updateProfileAndLogoutLinks() {
    $('.logout-link a').text('Déconnexion');
    $('.profile-link a').text('Bonjour, ' + $('#ProfileContainer h4').text());
}

$(function () {
    updateSearch();
    updateFeaturedNews();
    updateProfileAndLogoutLinks();
});