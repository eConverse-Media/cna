function handleNav() {
    $('#NAV .navbar-nav > li.dropdown').each(function () {
        var self = $(this),
            klass = $(self).find('> a').text();

        klass = klass.toLowerCase();
        klass = $.trim(klass);
        klass = klass.replace(/\s+/g, '-');

        $(self).addClass(klass);
    });
}

function handleSearch() {
    $('#MPheader #Logo').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function handleHero() {
    $('.hero-slide').each(function () {
        $(this).find('.HtmlContent img').wrap('<div class="img-container" />');
        $(this).find('p .img-container').unwrap();
        $(this).find('.HtmlContent > *:not(.img-container)').wrapAll('<div class="text-container" />');
    });

    $('.hero-slide').wrapAll('<div class="hero-slider slick-dotted" />');
    $('.hero-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        touchMove: false
    });
}

function handleHomepageBlogs() {
    $('.latest-articles .HLLandingControl ul li, .editors-picks .HLLandingControl ul li').each(function () {
        var self = $(this),
            href = $(self).find('h3 a').attr('href');

        if (href.indexOf('cna-aiic.ca') > -1) {
            href = href.substring(33, href.length);

            href = 'https://www.canadian-nurse.com' + href;
        }

        $(self).find('h3 a').attr('href', href);

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
        touchMove: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    rows: 3,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.editors-picks .HLLandingControl .Content ul').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 4,
		slidesToScroll: 4,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        touchMove: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {

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

function handleCTA() {
    $('.cta-section .HtmlContent img').wrapAll('<div class="img-container" />');
    $('.cta-section .HtmlContent p .img-container').unwrap();
    $('.cta-section .HtmlContent > *:not(.img-container)').wrapAll('<div class="text-container" />');

    var imgContainer = $('.cta-section .img-container');
    var imgSrc = $('.cta-section img').attr('src');
    $(imgContainer).css('background-image', 'url("' + imgSrc + '")');
}

function handleImageTiles() {
    $('.img-tile').each(function () {
        var self = $(this),
            image = $(self).find('img');

        $(image).wrap('<div class="img-container" />');
        handleBgImage($(self).find('.img-container'), $(self).find('.img-container'));
        $(self).find('.img-container').prependTo(self);
    });
}

function handleTopicLandingPages() {
    $('.topic-landing .row-wide .col-md-12 a').wrap('<div />');
}

function handleProfileAndLogoutLinks() {
    
    var isLoggedIn = !!($('#ProfileContainer').html());

    if (isLoggedIn) {
        var logoutLink = '<li class="logout-link"><a href="https://mem.cna-aiic.ca/logout">Logout</a></li>';
        $(logoutLink).appendTo('#MPAuxNav ul.level1');
        
        var profileLink = '<li class="profile-link"><a href="https://mem.cna-aiic.ca/myaccount">Hi, ' + $('#ProfileContainer h4').text() + '</a></li>';
        $(profileLink).insertBefore('.logout-link');

        $('.HLWelcome').hide();
    }
    
}

$(function () {
    handleNav();
    handleSearch();
    handleHero()
    handleCTA();
    handleHomepageBlogs()
    handleImageTiles();
    handleTopicLandingPages();
    handleProfileAndLogoutLinks();
});