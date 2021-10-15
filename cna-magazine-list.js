function handleBlogImages() {
    $('.HLLandingControl .Content ul li').each(function () {
        var self = $(this);

        handleAjaxCall(self);
        handleLink(self);
    });
}

$(function () {
    handleBlogImages();
});