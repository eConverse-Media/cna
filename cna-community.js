function handleSearch() {
    $('#MPheader #Logo').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function handleHero() {
    $('.hero .HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
    $('.hero .HtmlContent > img').wrapAll('<div class="img-container" />');
}

function handleHomepageBlogs() {
    $('.home .HLRecentBlogs ul li').each(function() {
        var self = $(this);
        handleAjaxCall(self, false);
    });

    $('.latest-articles .HLRecentBlogs .Content .col-md-12>ul').slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.editors-picks .HLRecentBlogs .Content .col-md-12>ul').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                },
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

function handleFeaturedMember() {
    $('.featured-member .HtmlContent > img').wrapAll('<div class="img-container" />');
    handleBgImage(
        ".featured-member .HtmlContent .img-container",
        ".featured-member .HtmlContent .img-container"
    );
    $('.featured-member .HtmlContent > *:not(em)').wrapAll('<div class="member-info" />');
    $('.featured-member .HtmlContent .member-info> *:not(.img-container)').wrapAll('<div class="member-details" />');
}

$(function() {
    handleSearch();
    handleHero()
        // handleHomepageBlogs()
    handleFeaturedMember()
});