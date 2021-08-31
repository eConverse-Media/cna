function showComments() {
    $('.comments').show();
}

function handleRelatedArticles() {
    var tags = $('.blogs-block .user-content-hashtag').toArray(),
        count = 0;

    for (var i = 0; i < tags.length; i++) {
        tags[i] = $(tags[i]).text().substring(1, tags[i].length);
    }

    $('.related-articles ul li').hide();

    $('.related-articles ul li').each(function () {
        var self = $(this),
            tagsList = $(self).find('.label-search-tag').toArray(),
            hasTag;

        for (var j = 0; j < tags.length && !hasTag; j++) {
            for (var k = 0; k < tagsList.length && !hasTag; k++) {
                var text = $(tagsList[k]).text();

                text = $.trim(text);
                if ((tags[j] == text) && (count < 6)) {
                    $(self).show();
                    count++;
                    hasTag = true;
                    break;
                }
            }
        }
    });
}

$(function () {
    handleRelatedArticles();
});