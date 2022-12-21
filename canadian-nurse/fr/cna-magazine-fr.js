function updateSearch() {
    $('.search-bar-top .form-control').attr('placeholder', 'Rechercher...');
}

function updateProfileAndLogoutLinks() {
    $('.logout-link a').text('Déconnexion');
    $('.profile-link a').text('Bonjour, ' + $('#ProfileContainer h4').text());
}

$(function () {
    updateSearch();
    updateProfileAndLogoutLinks();
});