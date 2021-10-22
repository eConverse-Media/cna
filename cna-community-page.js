$(function () {
    $('#MPOuterMost').addClass('community');
    $('#PageTitleH1').wrap('<div class="community-page-heading" />');
    $('.summary-edit').appendTo('.community-page-heading');
    $('.JoinLeaveLink').appendTo('.community-page-heading');
    $('#CommunityTabsContainer').prependTo('.community-page-heading');
});