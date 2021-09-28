function placeMobileAds() {
    var contentColumn = $(".content-column");
    var articleBodies = contentColumn.find(".article-body__text");

    articleBodies.each(function (articleIndex, articleEl) {
        articleBody = $(articleEl);
        if ($(articleBody.parents(".two-column-sublayout")[0]).attr('madsPlaced') !== 'true') {
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
                    return ((e.textContent !== "" || e.innerHTML !== "") && !(e.className.includes("article__quote") || e.className.includes("pullquote")));
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

            var adText = $(".advertisement-text-column")[0].textContent;

            everyThirdParagraph.after("<div class='general-ad__wrapper'><div class='advertisement-text-column'><div class='mobile-ad-title' >" + adText + "</div><div class='mobile-ad__container'></div></div>");
            $(articleBody.parents(".two-column-sublayout")[0]).attr('madsPlaced', 'true');
        }
    });
}
function sidebarAdBehaviourInit() {
    var stickyNav = $(".sticky-nav");
    if ($(window).width() > 1240) {
        $("main > div").each(function (i, e) {
            //remove the PrintButtom from Firefox
            var isFirefox = typeof InstallTrigger !== 'undefined';
            var elementPrint = document.getElementById('printbuttom')
            if (isFirefox && elementPrint !== null) {
                elementPrint.remove();
            }
            var sidebarColumn = $(e).find(".sidebar-column");
            var articleContent = $(e).find(".article-social__container");
            sidebarColumn.height(articleContent.height());

            sidebarColumn.show();
            var mads = $(e).find(".mobile-ad__container");
            if (mads.length) {
                $(e).attr('madsPlaced', 'false');

                mads.parent().parent().remove();
            }

            if ($(e).is(".two-column-sublayout") && $(e).attr("adsLoaded") != "true") {
                $(e).attr("adsLoaded", "true");
                var articleComponent = $(e).find("article");
                var stickySidebar = $(e).find(".sidebar-column");

                var coveocomponent = $(e).find(".more-listing-coveo__wrapper");
                var adwrapper = $(e).find(".general-ad__wrapper").filter(function (i2, e2) { return $(e2).parents(".sidebar-column").length > 0; });
                var adContainerPrime = $(e).find(".general-ad__container[sliderHeight]").filter(function (i2, e2) { return $(e2).parents(".sidebar-column").length > 0; });

                if (adwrapper) {
                    var adContainerHeight = adContainerPrime.attr("sliderHeight");
                    if (adContainerHeight === null) {
                        adContainerHeight = 720;
                    }
                    adContainerPrime.height(adContainerHeight);

                    var contentMinusCoveoHeight = (stickySidebar.height() - (coveocomponent.height() + 395));
                    var contentAdsHeight = Math.min(contentMinusCoveoHeight, articleComponent.height());
                    coveocomponent.find(".CoveoResultList").on("newResultDisplayed", function (event, args) {
                        var baseComponent = event.target;
                        var articleParent = $(baseComponent).parents(".two-column-sublayout");
                        var adwrapper = $(articleParent).find(".general-ad__wrapper");
                        var stickySidebar = $(articleParent).find(".sidebar-column");

                        var contentMinusCoveoHeight = (stickySidebar.height() - (coveocomponent.height() + 395));
                        while (adwrapper.height > contentMinusCoveoHeight) {
                            adwrapper.last().remove();
                        }
                    });
                    var totalContainers = Math.floor(contentAdsHeight / adContainerHeight);
                    for (var i = 0; i < totalContainers - 1; i++) {
                        adContainerPrime.clone().appendTo(adwrapper);
                    }

                    if (contentAdsHeight < 1000) {
                        $(e).find(".sidebar-column .general-ad__wrapper:nth-child(n+2)").css("display", "none");
                    }
                    initArticles();
                }
            }
        });
    } else {
        $("main > div").each(function (i, e) {
            if ($(e).is(".two-column-sublayout")) {
                var firstAd = $(e).find(".sidebar-column .general-ad__container:first-child");
                var sidebarColumn = $(e).find(".sidebar-column");

                sidebarColumn.hide();
                var mads = $(".mobile-ad__container");
                if (mads.length) {
                    mads.parents().show();
                }
                placeMobileAds();
                initArticles();
            }
        });
    }
}
$(document).ready(function () {
    if (!$('.secondary-feature-box').length) {
        $(window).on('resize', function () {
            sidebarAdBehaviourInit();
        });
        $($("body")[0]).on('loadedArticles', function () {
            sidebarAdBehaviourInit();
        });
        sidebarAdBehaviourInit();
    }
});