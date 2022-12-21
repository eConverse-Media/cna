function placeMobileAds() {
    var articleBody = $('.blogs-block div[id*="UpdatePanel"] > .row:not(.margin-bottom-medium):not([id*="ucPermission"]) > .col-md-12');

        if ($(articleBody.parents('.blogs-block')[0]).attr('madsPlaced') !== 'true') {
        var everyParagraph = $(articleBody).children();
        var everyFilteredParagraph = everyParagraph.filter(function (i, e) {
            return true;
        });

        var everyFlattenedParagraph = $([]);
        everyFilteredParagraph.each(function (i, e) {
            if ($(e).children('br').length) {
                var contents = $(e).contents();
                var b = contents.filter(function (i2, e2) {
                    return ($(e2).is("br") || $.trim(contents[i2].textContent) != "");
                });
                var c = b.filter(function (i3, e3) {
                    return ($(e3).is("span") ||
                        i3 == b.length - 1 ||
                        $(b[i3 + 1]).is("br"));
                });
                if (b.length == 1) {
                    everyFlattenedParagraph = everyFlattenedParagraph.add(e);
                } else {
                    everyFlattenedParagraph = everyFlattenedParagraph.add(c);
                }
            } else {
                everyFlattenedParagraph = everyFlattenedParagraph.add(e);
            }
        });
        var everyTwiceFilteredParagraph = everyFlattenedParagraph.filter(function (i, e) {
            if (e.className != null) {
                return ((e.textContent !== "" || e.innerHTML !== "") && !($(e).is('blockquote')));
            } else {
                return (e.textContent !== "" || e.innerHTML !== "");
            }
        });
        var everyThriceFilteredParagraph = everyTwiceFilteredParagraph.filter(function (i, e) {
            return ($(e).is('p, ul, ol') || e.nodeType == 3);
        });
        var paragraphCounter = 0;
        var ImageMap = articleBody.find("img").map(function (i, e) {
            return articleBody.find("*").index(e);
        });
        var ListMap = articleBody.find("ul, ol").map(function (i, e) {
            return articleBody.find("*").index(e);
        });
        var TestNext = false;
        var everyThirdParagraph = everyThriceFilteredParagraph.filter(function (i, e) {
            //throw out the last paragraph, always.
            if (i == everyThriceFilteredParagraph.length - 1) {
                return false;
            }

            if (TestNext || paragraphCounter === 2) {
                if ($(e).children().length === 1 &&
                    $(e).children().first().is("strong") &&
                    $(e).text() === $(e).children().first().text()) {
                    TestNext = true;
                    paragraphCounter++;
                    return false;
                }
                if ($(e).is("ul") || $(e).is("ol")) {
                    if (TestNext) {
                        paragraphCounter = -1;
                        TestNext = false;

                        return true;
                    } else {
                        TestNext = true;
                        return false;
                    }
                }
                var nextParagraph = everyThriceFilteredParagraph[i + 1];
                var articleFullBody = articleBody.find("*");
                var prevIndex = articleFullBody.index(e);
                if (prevIndex == -1) {
                    prevIndex = articleFullBody.index(e.parentElement);
                }
                var nextIndex = articleFullBody.index(nextParagraph);
                if (nextIndex == -1) {
                    nextIndex = articleFullBody.index(nextParagraph.parentElement);
                }
                var InteriorImage = false;

                ImageMap.each(function (index) {
                    if (ImageMap[index] > prevIndex && ImageMap[index] <= nextIndex) {
                        InteriorImage = true;
                    }
                });

                if (InteriorImage || $(e).is("ul") || $(nextParagraph).is("ul") || $(e).is("ol") || $(nextParagraph).is("ol")) {
                    TestNext = true;
                    return false;
                }
                paragraphCounter = 0;
                TestNext = false;

                return true;
            }
            paragraphCounter++;
            TestNext = false;
            return false;
        });

        everyThirdParagraph.after("<div class='ad-container'><div class='advertisement-text-column'><span class='advertisement-text' >Publicité</span><div class='upper-ad-container'></div></div>");
        $(articleBody.parents('.blogs-block')[0]).attr('madsPlaced', 'true');

        var adsList = $('.ad-container').toArray();

        for (var i = 0; i < adsList.length; i++) {
            function handleIntersect(entries, observer) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
    
                        var target = entries[i].target,
                            slotName = $(target).attr('id');
    
                        if (!($(target).find('iframe').length)) {
                            var slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont', [[300, 250], [300, 600]], slotName);
    
                            slot.addService(googletag.pubads());
    
                            // Display has to be called before
                            // refresh and after the slot div is in the page.
                            googletag.display(slotName);
                            googletag.pubads().refresh([slot]);
                        }
                    }
                }
            }
    
            function createObserver(elem) {
                var observer,
                    options = {
                        threshold: [0.5]
                    };
    
                observer = new IntersectionObserver(handleIntersect, options);
                observer.observe(elem);
            }

            var newAd = adsList[i],
                slotName = 'ad-container-' + i;

            $(newAd).attr('id', slotName);
            $(newAd).before('<span class="advertisement-text">Publicité</span>');

            createObserver(newAd);
        }
    }
}

function handleDesktopAds() {
    var adContainer = $('.upper-ad-container'),
        blogViewer = $('.blogs-block'),
        height = $(blogViewer).height(),
        numToShow = Math.floor(height / 720),
        parent = $(adContainer).parent();

    $(adContainer).attr('id', 'ad-container-0');
    $(adContainer).before('<span class="advertisement-text">Publicité</span>');

    googletag.cmd.push(function () {
        var slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont-fr', [[300, 250], [300, 600]], 'ad-container-0');

        slot.addService(googletag.pubads());

        // Display has to be called before
        // refresh and after the slot div is in the page.
        googletag.display('ad-container-0');
        googletag.pubads().refresh([slot]);
    });


    for (var i = 1; i < numToShow; i++) {

        function handleIntersect(entries, observer) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {

                    var target = entries[i].target,
                        slotName = $(target).attr('id');

                    if (!($(target).find('iframe').length)) {
                        var slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont-fr', [[300, 250], [300, 600]], slotName);

                        slot.addService(googletag.pubads());

                        // Display has to be called before
                        // refresh and after the slot div is in the page.
                        googletag.display(slotName);
                        googletag.pubads().refresh([slot]);
                    }
                }
            }
        }

        function createObserver(elem) {
            var observer,
                options = {
                    threshold: [0.5]
                };

            observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(elem);
        }

        var newAd = $(adContainer).clone(),
            slotName = 'ad-container-' + i;

        $(newAd).appendTo(parent);
        $(newAd).before('<span class="advertisement-text">Publicité</span>');

        $(newAd).attr('id', slotName);

        createObserver(newAd[0]);


    }
}

function handleAdPlacement() {
    if ($(window).width() > 991) {
        handleDesktopAds();
    } else {
        placeMobileAds();
    }
}

$(function () {
    var ua = window.navigator.userAgent,
        isIE = /MSIE|Trident/.test(ua);

    if ( !isIE ) {
        handleAdPlacement();
    }
    
});