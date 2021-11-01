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
        count = 0,
        blogTitle = $('.blogTitle').text();

    blogTitle = $.trim(blogTitle);
    for (var i = 0; i < tags.length; i++) {
        tags[i] = $(tags[i]).text().substring(1, tags[i].length);
    }

    $('.related-articles ul li').hide();

    $('.related-articles ul li').each(function () {
        var self = $(this),
            tagsList = $(self).find('.label-search-tag').toArray(),
            hasTag,
            selfTitle = $(self).find('h3 a').text();

        selfTitle = $.trim(selfTitle);

        for (var j = 0; j < tags.length && !hasTag; j++) {
            for (var k = 0; k < tagsList.length && !hasTag; k++) {
                var text = $(tagsList[k]).text();

                text = $.trim(text);
                if ((tags[j] == text) && (count < 3) &&
                !(blogTitle == selfTitle)) {
                    $(self).show();
                    count++;
                    hasTag = true;

                    // handle JS for link
                    handleLink(self);

                    break;
                }
            }
        }
    });
}

function handleCategory() {
    var tags = $('.user-content-hashtag').toArray(),
        categoryList = ['practice', 'analysis', 'career', 'research', 'profiles', 'opinions', 'pratique', 'analyse', 'carrière', 'recherche', 'profils'];

    for (var i = 0; i < tags.length; i++) {
        var tagText = $(tags[i]).text();
        
        tagText = tagText.substring(1, tags[i].length);
        
        for (var j = 0; j < categoryList.length; j++) {
            if (tagText == categoryList[j]) {
                $('.blogs-block').prepend('<h1>' + categoryList[j] + '</h1>');
                $('.blogs-block').prepend('<a class="back-button" href="' + categoryList[j] + '">Back</a>')
            }
        }
    }
}

function handleVideo() {
    $('iframe[src*="youtube"]').wrap('<div class="embed-container" />');
}

function handleTags() {
    $('.user-content-hashtag').each(function () {
        var self = $(this),
            text = $(self).text();

        text = $.trim(text);
        text = text.substring(1, text.length);

        $(self).text(text);
    });
}
function handleLatestArticles() {
    var otherTitles = $('.related-articles ul li:not([style*="display: none;"]) h3').toArray(),
        articleCount = 0;
    
    otherTitles.push($('.blogTitle'));

    $('.latest-magazine-articles ul li').each(function () {
        var self = $(this),
            selfTitle = $(self).find('h3 a').text(),
            showMe = true;

        selfTitle = $.trim(selfTitle);

        for (var j = 0; j < otherTitles.length; j++) {
            otherTitle = $.trim($(otherTitles[j]).text());

            if (selfTitle == otherTitle) {
                showMe = false;
            }
        }

        if (!!showMe &&
            articleCount < 3) {
                articleCount++;
                handleAjaxCall(self);
                handleLink(self);
        } else {
            $(self).hide();
        }

    });
}

function handlePageClass() {
    $('#MPOuterMost').addClass('blog-viewer');
}


$(function () {
    // handleByLineAndImage();
    handleRelatedArticles();
    handleCategory();
    handleVideo();
    handleTags();
    handleLatestArticles();
    handlePageClass();
});