///Lazy Load Google Ads
if ('IntersectionObserver' in window) {
} else {
    require.ensure([], function () {
        return require('IntersectionObserver');
    });
}

var bodyEl = $('body')[0];
var windowWidth = $(window).width(); //get initial browser size
var articleSlots = []; //GPT internal tracking of ad slots
var articleDivs = []; //Ad slot divs created to inject ads into

///GPT Ad Units (configured in Google Ad Manager)
var articleUnit = '/51158455/article-sidebar-upper-cont';
var articleUnitTwo = '/51158455/article-sidebar-lower-cont';
var leaderAdUnit = '/51158455/article-leaderboard-resp-cont';
var homeAdUnitUpper = '/51158455/home_lead_upper';
var homeAdUnitLower = '/51158455/home-leaderboard-resp-lower';
var generalLeaderAdUnit = '/51158455/general-leaderboard-resp';
var articleUnitFR = '/51158455/article-sidebar-upper-cont-fr';
var articleUnitTwoFR = '/51158455/article-sidebar-lower-cont-fr';
var leaderAdUnitFR = '/51158455/article-leaderboard-resp-cont-fr';
var homeAdUnitUpperFR = '/51158455/home_lead_upper-fr';
var homeAdUnitLowerFR = '/51158455/home-leaderboard-resp-lower-fr';
var generalLeaderAdUnitFR = '/51158455/general-leaderboard-resp-fr';
var membersLeader = '/51158455/members-leaderboard';
var membersLeaderFR = '/51158455/members-leaderboard-fr';
var membersSidebar = '/51158455/members-sidebar';
var membersSidebarFR = '/51158455/members-sidebar-fr';
//Selectors for ad slots on page
var articleSelectorMobile = '.content-column .mobile-ad__container, .mobile-div';
var articleSelector = '.sidebar-column .general-ad__container .upper-div,.mobile-div';
var articleSelectorTwo = '.sidebar-column .general-ad__container .lower-div';
var leaderSelector = '.content-column .general-ad__container .sidebar-div,.leaderboard-div';
var homeLeadUpperSelector = 'main .general-ad__container .home-lead-upper';
var homeLeadLowerSelector = 'main .general-ad__container .home-lead-lower';
var generalLeaderSelector = 'main .general-ad__container .general-leaderboard';
var articleSelectorFR = '.sidebar-column .general-ad__container .upper-div-fr';
var articleSelectorTwoFR = '.sidebar-column .general-ad__container .lower-div-fr';
var leaderSelectorFR = '.content-column .general-ad__container .leaderboard-div-fr';
var homeLeadUpperSelectorFR = 'main .general-ad__container .home-lead-upper-fr';
var homeLeadLowerSelectorFR = 'main .general-ad__container .home-lead-lower-fr';
var generalLeaderSelectorFR = 'main .general-ad__container .general-leaderboard-fr';
var membersLeadSelector = 'main .general-ad__container .members-leaderboard';
var membersLeadSelectorFR = 'main .general-ad__container .members-leaderboard-fr';
var membersSidebarSelector = 'main .general-ad__container .members-sidebar';
var membersSidebarSelectorFR = 'main .general-ad__container .members-sidebar-fr';
//Config info
var articleRes = [[300, 250], [300, 600]];
var articleResMobile = [[300, 250]];

var articleLongRes = [[300, 250], [300, 600]];
var articleAdLimit = 4; //Don't show more on screen than the number of creatives attached to an ad unit, or it will load blank slots
var leaderRes = [[728, 90], [320, 50]]; //Responsive ad
var leaderLimit = 2;
var leaderSlots = [];
var leaderDivs = [];
var generalSlots = [];
var generalDivs = [];
var generalLimit = 8;
var memberLimit = 3;
var memberDivs = [];
var memberSlots = [];
//Which page are we on
var articlePage = false;
var homePage = false;
var generalLeader = false;
var articlePageFR = false;
var homePageFR = false;
var generalLeaderFR = false;
var members = false;
var membersFR = false;

if ($(bodyEl).find(homeLeadUpperSelector).length) {
    homePage = true;
}
else if ($(bodyEl).find(homeLeadUpperSelectorFR).length) {
    homePageFR = true;
}
else if ($(bodyEl).find(articleSelector).length) {
    articlePage = true;
}
else if ($(bodyEl).find(articleSelectorFR).length) {
    articlePageFR = true;
}
if ($(bodyEl).find(generalLeaderSelector).length) {
    generalLeader = true;
}
else if ($(bodyEl).find(generalLeaderSelectorFR).length) {
    generalLeaderFR = true;
}
if ($(bodyEl).find(membersLeadSelector).length || $(bodyEl).find(membersSidebarSelector).length) {
    members = true;
}
else if ($(bodyEl).find(membersLeadSelectorFR).length || $(bodyEl).find(membersSidebarSelectorFR).length) {
    membersFR = true;
}

// Function to generate unique names for slots
var nextSlotId = 0;
function generateNextSlotName() {
    var id = nextSlotId++;
    return 'adslot' + id;
}

function lazyLoadAds(adUnit, adRes, adLimit, selector, adSlots, adDivs) {
    // From: https://support.google.com/admanager/answer/4578089?hl=en
    // Function to add content to page, mimics real infinite scroll
    // but keeps it much simpler from a code perspective.
    function moreContent(element) {
        //Inject ad slot into General Ad Container if there isn't one already
        if (!$(element).find('.ad-slot').length) {
            //If we're at limit for GPT Ad Slots/Divs, delete the first one in the array
            if (adSlots.length >= adLimit) {
                googletag.destroySlots([adSlots[0]]);
                adSlots.shift();
                $(adDivs[0]).remove();
                adDivs.shift();
            }

            // Generate next slot name & Create a div for the slot
            var slotName = generateNextSlotName();
            var slotDiv = document.createElement('div');
            slotDiv.id = slotName; // Id must be the same as slotName
            slotDiv.className = "ad-slot";
            $(element).append(slotDiv);
            adDivs.push($(element).find('.ad-slot')); //Push to div array

            // Define the slot itself, call display() to 
            // register the div and refresh() to fetch ad.
            googletag.cmd.push(function () {
                //Define responsive mapping table for responsive ads
                var mapping = googletag.sizeMapping().
                    addSize([768, 480], [728, 90]).
                    addSize([0, 0], [320, 50]).
                    build();

                var slot = googletag.defineSlot(adUnit, adRes, slotName);

                adSlots.push(slot); //push to slots array

                if (adUnit == leaderAdUnit || adUnit == homeAdUnitUpper || adUnit == homeAdUnitLower || adUnit == leaderAdUnitFR || adUnit == homeAdUnitUpperFR || adUnit == homeAdUnitLowerFR || adUnit == membersLeader || adUnit == membersLeaderFR) {
                    slot.defineSizeMapping(mapping); //Create responsive mapping for slot if Ad Unit is a leaderboard
                }

                slot.setTargeting("test", "infinitescroll").
                    addService(googletag.pubads());

                // Display has to be called before
                // refresh and after the slot div is in the page.
                googletag.display(slotName);
                googletag.pubads().refresh([slot]);
            });
        }
    }

    function handleIntersect(entries, observer) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                // Should only fire at ~0.8
                //Get tag ID from array of ad wrappers
                var tagID = $(entries[i].target).children(":first").attr('id');

                moreContent($(entries[i].target));
                if ($(window).width() < 1240) { placeMobileAds(); };
            }
        }
    }

    function createObserver(element, innerCode) {
        let observer;

        const options = {
            threshold: [0.5]
        };

        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(element);
    }

    //Grab all ad wrappers
    var adWrappers = $(selector).parent(); //selector is the specific child div inserted in the script field on an ad rendering

    //Create InteractionObservers for each ad wrapper
    for (var i = 0; i < adWrappers.length; i++) {
        var adScript = adWrappers[i].innerHTML;
        createObserver(adWrappers[i], adScript);
    }
}

function destroyAdSlots(slotArray) {
    slotArray.forEach(destro);

    function destro(item, index, arr) {
        googletag.cmd.push(function () { googletag.destroySlots([item]); });
    }
}

function destroySlotDivs(divArray) {
    divArray.forEach(destro);

    function destro(item, index, arr) {
        $(item).remove();
    }
}

function articleInitialize() {
    lazyLoadAds(articleUnit, articleRes, articleAdLimit, articleSelector, articleSlots, articleDivs);
    articleLeadResize();
}

function articleInitializeFR() {
    lazyLoadAds(articleUnitFR, articleRes, articleAdLimit, articleSelectorFR, articleSlots, articleDivs);
    articleLeadResizeFR();
}

function articleInitializeMobile() {
    lazyLoadAds(articleUnit, articleResMobile, articleAdLimit, articleSelectorMobile, articleSlots, articleDivs);
    articleLeadResize();
}

function articleInitializeFRMobile() {
    lazyLoadAds(articleUnitFR, articleResMobile, articleAdLimit, articleSelectorMobile, articleSlots, articleDivs);
    articleLeadResizeFR();
}

function articleLeadResize() {
    destroyAdSlots(leaderSlots);
    destroySlotDivs(leaderDivs);
    lazyLoadAds(leaderAdUnit, leaderRes, leaderLimit, leaderSelector, leaderSlots, leaderDivs);
}

function articleLeadResizeFR() {
    destroyAdSlots(leaderSlots);
    destroySlotDivs(leaderDivs);
    lazyLoadAds(leaderAdUnitFR, leaderRes, leaderLimit, leaderSelectorFR, leaderSlots, leaderDivs);
}

function desktopResize() {
    //destroy all ad units on page and in gpt
    googletag.cmd.push(function () { googletag.destroySlots(); });
    destroySlotDivs(leaderDivs);
    lazyLoadAds(homeAdUnitUpper, leaderRes, leaderLimit, homeLeadUpperSelector, leaderSlots, leaderDivs);
    lazyLoadAds(homeAdUnitLower, leaderRes, leaderLimit, homeLeadLowerSelector, leaderSlots, leaderDivs);
}

function desktopResizeFR() {
    //destroy all ad units on page and in gpt
    googletag.cmd.push(function () { googletag.destroySlots(); });
    destroySlotDivs(leaderDivs);
    lazyLoadAds(homeAdUnitUpperFR, leaderRes, leaderLimit, homeLeadUpperSelectorFR, leaderSlots, leaderDivs);
    lazyLoadAds(homeAdUnitLowerFR, leaderRes, leaderLimit, homeLeadLowerSelectorFR, leaderSlots, leaderDivs);
}

function reinitGeneralLeaders() {
    destroyAdSlots(generalSlots);
    destroySlotDivs(generalDivs);
    lazyLoadAds(generalLeaderAdUnit, leaderRes, generalLimit, generalLeaderSelector, generalSlots, generalDivs);
}

function reinitGeneralLeadersFR() {
    destroyAdSlots(generalSlots);
    destroySlotDivs(generalDivs);
    lazyLoadAds(generalLeaderAdUnitFR, leaderRes, generalLimit, generalLeaderSelectorFR, generalSlots, generalDivs);
}

function initMemberAds() {
    googletag.cmd.push(function () { googletag.destroySlots(); });
    destroySlotDivs(memberDivs);
    lazyLoadAds(membersLeader, leaderRes, memberLimit, membersLeadSelector, memberSlots, memberDivs);
    lazyLoadAds(membersSidebar, articleLongRes, memberLimit, membersSidebarSelector, memberSlots, memberDivs);
}

function initMemberAdsFR() {
    googletag.cmd.push(function () { googletag.destroySlots(); });
    destroySlotDivs(memberDivs);
    lazyLoadAds(membersLeaderFR, leaderRes, memberLimit, membersLeadSelectorFR, memberSlots, memberDivs);
    lazyLoadAds(membersSidebarFR, articleLongRes, memberLimit, membersSidebarSelectorFR, memberSlots, memberDivs);
}


///TODO: refine this
$(window).on('resize', function () {
    //breakpoints
    var mobile = 768;
    var tablet = 992;
    var desktop = 1240;
    var $width = $(window).width();
    if ($width <= mobile) {
        if (homePage) { desktopResize(); }
        if (homePageFR) { desktopResizeFR(); }
        if (articlePage) { articleLeadResize(); }
        if (articlePageFR) { articleLeadResizeFR(); }
        if (generalLeader) { reinitGeneralLeaders(); }
        if (generalLeaderFR) { reinitGeneralLeadersFR(); }
        if (members) { initMemberAds(); }
        if (membersFR) { initMemberAdsFR(); }
    }
    else if ($width >= tablet) {
        if (homePage) { desktopResize(); }
        if (homePageFR) { desktopResizeFR(); }
        if (articlePage) { articleLeadResize(); }
        if (articlePageFR) { articleLeadResizeFR(); }
        if (generalLeader) { reinitGeneralLeaders(); }
        if (generalLeaderFR) { reinitGeneralLeadersFR(); }
        if (members) { initMemberAds(); }
        if (membersFR) { initMemberAdsFR(); }
    }
    else if ($width >= desktop) {
        if (homePage) { desktopResize(); }
        if (homePageFR) { desktopResizeFR(); }
        if (articlePage) { articleLeadResize(); }
        if (articlePageFR) { articleLeadResizeFR(); }
        if (generalLeader) { reinitGeneralLeaders(); }
        if (generalLeaderFR) { reinitGeneralLeadersFR(); }
        if (members) { initMemberAds(); }
        if (membersFR) { initMemberAdsFR(); }
    }
});
function initArticles() {
    var $width = $(window).width();
    var mobile = 768;
    var tablet = 992;
    var desktop = 1240;
    if (articlePage) {
        if ($width <= desktop) {
            articleInitializeMobile();
        } else {
            articleInitialize();
        }
    }
    else if (articlePageFR) {
        if ($width <= tablet) {
            articleInitializeFRMobile();
        } else {
            articleInitializeFR();

        }
    }

}
bodyEl.addEventListener('initArticles', function (e) {
    initArticles();
}, false);


bodyEl.addEventListener('loadedArticles', function (e) {
    var $width = $(window).width();
    var mobile = 768;
    var tablet = 992;
    var desktop = 1240;
    if (articlePage) {
        if ($width <= desktop) {
            articleInitializeMobile();
        } else {
            articleInitialize();
        }
    }
    else if (articlePageFR) {
        if ($width <= mobile) {
            articleInitializeFRMobile();
        } else {
            articleInitializeFR();

        }
    }
}, false);

if (generalLeader) { reinitGeneralLeaders(); }
else if (generalLeaderFR) { reinitGeneralLeadersFR(); }

if (members) { initMemberAds(); }
else if (membersFR) { initMemberAdsFR(); }

//Initialize leaderboard slots on desktop
if (homePage) { desktopResize(); }
else if (homePageFR) { desktopResizeFR(); }