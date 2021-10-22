function handleSearch() {
    $('#MPheader #Logo').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}


function handleFeaturedMember() {
    $('.featured-member .HtmlContent > img').wrapAll('<div class="img-container" />');
    $('.featured-member .HtmlContent > *:not(em)').wrapAll('<div class="member-info" />');
    $('.featured-member .HtmlContent .member-info> *:not(.img-container)').wrapAll('<div class="member-details" />');
}

function handleByLinePostedIn() {
    $('.recent-discussions .HLLandingControl ul li').each(function () {
        var self = $(this);

        $(self).find('.ByLine, h5').wrapAll('<div class="byline-posted-in" />');
    });
}

function handleMAM() {
    $('.mam-button').appendTo('.home .HLEngagement .Content');
}

function handleResources() {
    $('.community-resources .HLLandingControl ul li').each(function () {

        // handle Ajax image
        var self = $(this),
            href = $(self).find('h3 a').attr('href');

        var imgContainer = '<div class="img-container loading" />';
        $(self).wrapInner('<div class="text-container" />');
        $(self).prepend(imgContainer);

        $.ajax({
            url: href,
            dataType: 'html',
            success: success,
            error: removeLoading
        });
        
        function success(resp) {
            var img = $(resp).find('.col-md-10[class*="section"] .col-md-10.col-sm-10 img'),
                src = $(img).attr('src');
    
            if (!!src) {
                var url = "url('" + src + "')";
                $(self).find('.img-container').css('background-image', url);
            } else {
                $(self).find('.img-container').addClass('no-ajax-image');
            }
            
            removeLoading();
        }
    
        function removeLoading() {
            $(self).find('.img-container').removeClass('loading');
        }

        // handle file type class
        var tagList = $(self).find('.content-tags .label-search-tag').toArray();

        for (var i = 0; i < tagList.length; i++) {
            $(self).addClass($(tagList[i]).text());
        }
    });
}

function handleBlogs() {
    $('.home .HLRecentBlogs ul li').each(function () {
        handleAjaxCall(this);
    });
}

function handleLoggedInContent() {
    $('.home .bg-grey .col-md-12[class*="section"]:empty').closest('.bg-grey').hide();
}

$(function() {
    handleSearch();
    handleByLinePostedIn();
    handleFeaturedMember();
    handleMAM();
    handleResources();
    handleBlogs();
    handleLoggedInContent();
});