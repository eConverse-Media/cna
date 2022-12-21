$(function () {
    var username = $('#ProfileContainer h4').text();

    if (!!(username).length) {
        var profileLink = '<a href="profile">' + username + '!</a>'
        $(profileLink).appendTo('.greeting .HtmlContent');
        $('.member-dashboard div[id*="ProfileImage"] a[id*="ImageControl"]').prependTo('.greeting');
    } else {
        $('.member-dashboard').hide();
    }

});