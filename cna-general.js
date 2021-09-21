function handleHeaderLinks() {
    var links = $('#MPAuxNav ul.level1 li');
    $('#MPheader > div.row:first-child > .col-md-12').prepend('<ul class="left-top-links" />')
    $(links).each(function () {
        var self = $(this),
            text = $(self).text();

        text = text.toLowerCase();
        text = $.trim(text);

        if (text.indexOf('canadian nurse journal') > -1 ||
        text.indexOf('nursing jobs') > -1) {
            $(self).appendTo('.left-top-links');
        }

    });
}

function handleSearch() {
    $('#MPheader > div.row:first-child > .col-md-12').append('<div class="header-search"><button class="search-btn-top desktop" onclick="toggleSearch();" type="button" /></div>');
    $('.search-bar-top .form-control').attr('placeholder', 'Search...');
    $('#Logo').after('<button class="search-btn-top mobile" onclick="toggleSearch();" type="button" />');
}

function toggleSearch() {
    if ($('.search-bar-top').hasClass('open')) {
        $('.search-bar-top').removeClass('open');
    } else {
        $('.search-bar-top').addClass('open');
        $('.search-bar-top .form-control').focus();
    }
}

function handleLanguageButton(windowWidth) {
    if (windowWidth > 991) {
        $('.language-btn').prependTo('#MPheader > div.row:first-child > .col-md-12');
    } else {
        $('.language-btn').insertAfter('#Logo');
    }
}

function handleFlexContentItems() {
    $('.flex-content-item').each(function () {
        var self = $(this).find('.HtmlContent');

        $(self).find('> img').wrap('<div class="img-container" />');
        $(self).find('> *:not(.img-container)').wrapAll('<div class="text-container" />');
    });
}

function handleCTAButtons() {
    $('.cta-button').wrapAll('<div class="cta-buttons" />');
}

function handleCTATiles() {
    $('.cta-tile .HtmlContent').each(function () {
        var self = $(this),
            link = $(self).find('a'),
            href = $(link).attr('href'),
            target = $(link).attr('target');

        if (target == '_blank') {
            $(self).wrapInner('<a href="' + href + '" target="_blank" rel="noopener" />');
        } else {
            $(self).wrapInner('<a href="' + href + '" />');
        }

        $(link).hide();
    });
}

function handleTestimonials() {
    $('.testimonial').wrapAll('<div class="testimonial-slider slick-dotted" />');
    $('.testimonial-slider').slick({
        arrows: true,
        dots: false,
        autoplay: false,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="cna cna-arrow-right-2"></i></button>',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-arrow-left"></i></button>'
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
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="cna cna-chevron-left"></i></button>'
    });

}

function handleMobileHeader() {
    var width = $(window).width();

    handleLanguageButton(width);

    $(window).on('resize orientationChange', function () {
        width = $(window).width();

        handleLanguageButton(width);
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
    
            if (url == linkUrl) {
                $(menuLinks[i]).parent().addClass('active-item');
                $(menuLinks[i]).closest('ul.side-menu > li').addClass('active-secondary-nav');
            }
        }
    
        // handle mobile dropdown
    
        $('<button type="button" class="mobile side-dropdown" onclick="toggleSideMenu();">Pages in this section</button>').insertBefore('.menu-container');
    
        $('.page-title-h2').clone().addClass('mobile').removeClass('desktop').insertBefore('.side-dropdown');
    
        handleMobileWindow();
    
        $(window).on('resize orientationChange', function () {
            handleMobileWindow();
        });
    
        function handleMobileWindow() {
            if ($(window).width() < 992) {
                $('.menu-container').slideUp();
            } else {
                $('.menu-container').slideDown();
            }
    
        }
    }

}

function toggleSideMenu() {
    $('.menu-container').slideToggle(600, 'swing');
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

$(function () {
    handleHeaderLinks();
    handleSearch();
    handleFlexContentItems();
    handleCTAButtons();
    handleCTATiles();
    handleTestimonials();
    handleHero();
    handleMobileHeader();
    handleAdModules();
    handleInteriorMenus();
    handleLeadership();
});