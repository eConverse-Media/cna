function handleSearch() {
    $('#MPheader > div.row:first-child > .col-md-12').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function handleFlexContentItems() {
    $('.flex-content-item').each(function () {
        var self = $(this).find('.HtmlContent');

        $(self).find('> img').wrap('<div class="img-container" />');
        $(self).find('> *:not(.img-container)').wrapAll('<div class="text-container" />');
    });
}

function handleTestimonials() {
    $('.testimonial').wrapAll('<div class="testimonial-slider slick-dotted" />');
    $('.testimonial-slider').slick({
        arrows: true,
        dots: false,
        autoplay: false,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>',
        touchMove: false
    });

    $('.testimonial').each(function () {
        var self = $(this);

        $(self).find('.HtmlContent > em').wrap('<div class="testimonial-name-img" />');
        $(self).find('h5').appendTo($(self).find('.testimonial-name-img'));
        $(self).find('p').appendTo($(self).find('.testimonial-name-img'));
        $(self).find('.testimonial-name-img h5, .testimonial-name-img p').wrapAll('<div class="testimonial-name" />');
    });
}

function handleHero() {
    $('.hero-slide img').wrap('<div class="clip-me" />');
    $('.hero-slide').each(function () {
        var self = $(this);

        $(self).find('.clip-me').insertAfter($(self).find('.HtmlContent'));
        $(self).find('.HtmlContent em').addClass('desktop');
        $(self).find('em.desktop').clone().insertAfter($(self).find('.clip-me')).addClass('mobile').removeClass('desktop');
    });
    var heroSlides = $('.hero-slide').toArray(),
        count = heroSlides.length;

    for (var i = 0; i < heroSlides.length; i++) {
        var slide = heroSlides[i],
            h4 = $(slide).find('h4'),
            text = $(h4).text(),
            newText = i + 1;

        newText += '/';
        newText += count;
        newText += ' — ';
        newText += text;

        $(h4).text(newText);
    }
    $('.hero-slide').wrapAll('<div class="hero-slider slick-dotted" />');
    $('.hero-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-chevron-right"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-chevron-left"></i></button>',
        touchMove: false
    });

}

function handleAdModules() {

    // handle Ad Module 1

    $('.ad-module-1 .HtmlContent img:first-of-type').wrap('<div class="img-container clip-me" />');
    $('.ad-module-1 .HtmlContent >*:not(.img-container):not(img)').wrapAll('<div class="text-container" />');
    $('.ad-module-1 .HtmlContent > img').wrap('<div class="logo-container" />');

    // handle Ad Module 2

    $('.ad-module-2 .HtmlContent img:last-of-type').wrap('<div class="img-container" />');
    $('.ad-module-2 .HtmlContent > *:not(.img-container):not(img)').wrapAll('<div class="text-container" />');
    $('.ad-module-2 .HtmlContent > img').wrap('<div class="logo-container" />');

    // handle Ad Module 3

    $('.ad-module-3 .HtmlContent img:last-of-type').wrap('<div class="logo-container" />');
    $('.ad-module-3 .HtmlContent > *:not(.logo-container)').wrapAll('<div class="text-container" />');
}

function handleInteriorMenus() {

    $('#NAV .navbar-nav > li').each(function () {
        var self = $(this),
            text = $(self).find('> a').text();

        text = $.trim(text);
        text = text.toLowerCase();
        text = text.replace(/\&+/g, '');
        text = text.replace(/\s+/g, '-');

        $(self).addClass(text);
    });

    if (!!($('#MainCopy_ContentWrapper').attr('class'))) {

        var classList = $('#MainCopy_ContentWrapper').attr('class').split(' '),
            klass = classList[0],
            navItem = $('#NAV .navbar-nav > li.' + klass);
    
        $('.menu-container').append('<h2>' + $(navItem).find('> a').text() + '</h2>');
        $('.menu-container').append($(navItem).find('.dropdown-menu').clone());
        $('.menu-container .dropdown-menu').addClass('side-menu').removeClass('dropdown-menu');
        $('.side-menu li.dropdown-submenu').removeClass('dropdown-submenu');
        $('.side-menu ul.dropdown-submenu').addClass('side-submenu').removeClass('dropdown-submenu');
    
        // handle active link
    
        var url = window.location.href,
            menuLinks = $('.side-menu li a').toArray();
    
        var urlArray = url.split('/');
    
        urlArray.splice(0, 3);
    
        url = urlArray.toString();
    
        url = url.replace(/\,+/g, '/');
    
        url = '/' + url;
        
        for (var i = 0; i < menuLinks.length; i++) {
            var linkUrl = $(menuLinks[i]).attr('href');
    
            if ((url == linkUrl) ||
             (url.indexOf('blogs') > -1 && 
            linkUrl.indexOf('news-releases') > -1)) {
                $(menuLinks[i]).parent().addClass('active-item');
                $(menuLinks[i]).closest('ul.side-menu > li').addClass('active-secondary-nav');
            } 
        }
    
        // handle mobile dropdown
    
        $('<button type="button" class="mobile side-dropdown" onclick="toggleSideMenu();">' + $('.menu-container h2').text() + '</button>').prependTo('.menu-container');
    
        handleMobileWindow();
    
        $(window).on('resize orientationChange', function () {
            handleMobileWindow();
        });
    
        function handleMobileWindow() {
            if ($(window).width() < 992) {
                $('.menu-container .side-menu').slideUp();
            } else {
                $('.menu-container .side-menu').slideDown();
            }
    
        }

        // handle mobile page title

        $('.desktop.page-title-h2').clone().addClass('mobile').removeClass('desktop').insertBefore('.menu-container');
    }

}

function toggleSideMenu() {
    $('.menu-container .side-menu').slideToggle(600, 'swing');
    $('button.side-dropdown').toggleClass('open');
}

function handleLeadership() {
    $('.leadership').each(function () {
        // handle leadership HTML
        var self = $(this);

        $(self).find('.HtmlContent > img').wrap('<div class="img-container" />');
        $(self).find('.HtmlContent > *:not(.img-container)').wrapAll('<div class="text-container" />');
        
        
        // handle leadership hover
        $(self).find('a').mouseover(function () {
            $(self).addClass('is-hovered');
        });
        
        $(self).find('a').mouseout(function () {
            $(self).removeClass('is-hovered');
        });
    });

}

function handleEventsAndLatestNews() {
    $('.home .HLEventList ul li, .latest-news-list .Content ul li').each(function () {
        var self = $(this),
            link = $(self).find('h3 a'),
            href = $(link).attr('href'),
            target = $(link).attr('target');

        if (target == '_blank') {
            $(self).wrapInner('<a href="' + href + '" target="_blank" />');
        } else {
            $(self).wrapInner('<a href="' + href + '" />');
        }

        $(link).contents().unwrap();
    });
}

function handleFeaturedNews() {

    // handle 'see more news' button on mobile
    $('.news-title .HtmlContent').clone().addClass('mobile make-buttons').insertAfter('.latest-news-list');
    $('.news-title .HtmlContent:not(.mobile)').addClass('desktop');

    $('.latest-news-featured, .featured-news').wrapAll('<div class="featured-news-and-image" />');

    // handle featured news image
    // $('.featured-news .Content ul li').each(function () {
    //     var self = $(this);
    //     handleAjaxCall(self);

    //     $(self).find('.text-container').prepend('<h4>Featured</h4>');
    //     $(self).find('p[id*="Description"] a[id*="ShowMore"]').appendTo($(self).find('.text-container')); 
    // });
}

function handleACLCommas() {
    $('.HLLandingControl.SearchResults ul li').each(function() {
        var byline = $(this).find('.ByLine');
        var byLineLink = $(byline).find('a[id*="Name"]');
        if (byLineLink.length === 0) {
            var trimmedByline = $(byline).text().trim().slice(2, $(byline).text().trim().length);
            $(byline).text(trimmedByline);
        }        
    });
}

function handleAdSpace() {
    $('.ad-space.full-width, .ad-space.half-width').wrapAll('<div class="row row-wide ad-wrapper" />');
    $('.ad-wrapper').appendTo('#MainCopy_ContentWrapper');
    $('.ad-space.half-width').wrap('<div class="col-md-6" />');
    $('.ad-space.full-width').wrap('<div class="col-md-12" />');
    $('.ad-wrapper .col-md-6').wrapAll('<div class="row row-wide" />');
    $('.ad-wrapper .col-md-12').wrap('<div class="row row-wide" />');
}

function handleDateThumbnails() {
    $('.HLLandingControl.HLEventList ul li, .upcoming-events .HLLandingControl ul li').each(function () {
        var self = $(this),
            month = $(self).find('.date-block .calendar-month span').text();
    
        month = month.substring(0, 3);
        $(self).find('.date-block .calendar-month span').text(month);
    });
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
    handleSearch();
    handleFlexContentItems();
    handleTestimonials();
    handleHero();
    handleAdModules();
    handleInteriorMenus();
    handleLeadership();
    handleEventsAndLatestNews();
    handleFeaturedNews();
    handleACLCommas();
    handleAdSpace();
    handleDateThumbnails();
    handleProfileAndLogoutLinks();
});