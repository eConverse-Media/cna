function showComments() {
    $('.comments').show();
}

function handleCookie() {
    var num = 0,
        cookies = document.cookie.split(';'),
        pageUrl = window.location.href,
        addCount = true;

    for (var i = 0; i < cookies.length; i++) {
        var cookieName = cookies[i].substring(0, cookies[i].indexOf('=')),
            cookieValue = cookies[i].substring(cookies[i].indexOf('=') + 1, cookies[i].length);

        if (cookieName == 'blogViews') {
            debugger;
            num = parseInt(cookieValue);
        }

        if (cookieName.indexOf('cookieUrl') > -1) {
            if (cookieValue == pageUrl) {
                addCount = false;
            }
        }
    }

    if (addCount) {
        debugger;
        num++;
        var cookieExpiry = new Date();
        cookieExpiry.setTime(cookieExpiry.getTime() + (30 * 24 * 60 * 60 * 1000));
        cookieExpiry = 'expires=' + cookieExpiry.toUTCString();
        document.cookie = 'blogViews=' + num + ';' + cookieExpiry + ';';
        document.cookie = 'cookieUrl' + num + '=' + pageUrl + ';' + cookieExpiry + ';';
    }
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
                if ((tags[j] == text) && (count < 3)) {
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
        categoryList = ['practice', 'analysis', 'career', 'research', 'profiles', 'opinions'];

    for (var i = 0; i < tags.length; i++) {
        var tagText = $(tags[i]).text();
        
        tagText = tagText.substring(1, tags[i].length);
        
        for (var j = 0; j < categoryList.length; j++) {
            if (tagText == categoryList[j]) {
                $('.blogs-block').prepend('<h1>' + categoryList[j] + '</h1>');
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
    $('.latest-magazine-articles ul li').each(function () {
        handleAjaxCall(this);
        handleLink(this);
    });
}


$(function () {
    // handleByLineAndImage();
    // handleCookie();
    handleRelatedArticles();
    handleCategory();
    handleVideo();
    handleTags();
    handleLatestArticles();
});