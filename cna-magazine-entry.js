function showComments() {
    $('.comments').show();
}

function handleByLineAndImage() {
    $('.blogs-block div[id*="ByLinePanel"]').closest('h4').addClass('hl-byline-container');
    $('.blogs-block h4:not(.hl-byline-container)').wrap('<div class="byline-image" />');
    $('.blogs-block h5').appendTo('.byline-image');
    $('.blogs-block img').appendTo('.byline-image');
    $('.blogs-block h6').appendTo('.byline-image');
    $('.byline-image').prependTo('.blogs-block');
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
    handleByLineAndImage();
    handleRelatedArticles();
});