function handleBlogImages() {
    $('.HLLandingControl .Content ul li').each(function () {
        var self = $(this),
            href = $(self).find('h3 a').attr('href');

        if (href.indexOf('cna-aiic.ca') > -1) {
            href = href.substring(33, href.length);

            href = 'https://www.canadian-nurse.com' + href;
        }

        $(self).find('h3 a').attr('href', href);

        handleAjaxCall(self);
        handleLink(self);
    });
}

$(function () {
    handleBlogImages();
});