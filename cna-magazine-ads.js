function handleAds() {

    console.log('HAAAAAAAAIIIIII');
    var adContainer = $('.upper-ad-container'),
        blogViewer = $('.blogs-block'),
        height = $(blogViewer).height(),
        numToShow = Math.floor(height / 720);

    console.log('>>>>>>>>>>>>>>>>>>>>> ', adContainer);
    console.log('>>>>>>>>>>> ', numToShow);

    for (var i = 1; i < numToShow; i++) {
        var newAd = $(adContainer).clone(),
            slotName = 'ad-container-' + i;

        $(newAd).insertAfter(adContainer);

        $(newAd).attr('id', slotName);
        
        googletag.cmd.push( function () {
            var slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont', [[300, 250], [300, 600]], slotName);

            slot.setTargeting("test", "infinitescroll").
            addService(googletag.pubads());

        // Display has to be called before
        // refresh and after the slot div is in the page.
        googletag.display(slotName);
        googletag.pubads().refresh([slot]);
        });
    }
}


$(function () {
    console.log('IZ SHOWING ADS');
    // handleAds();

    var adContainer = $('.upper-ad-container'),
        blogViewer = $('.blogs-block'),
        height = $(blogViewer).height(),
        numToShow = Math.floor(height / 720),
        parent = $(adContainer).parent();

    $(adContainer).attr('id', 'ad-container-0');

    googletag.cmd.push( function () {
        var slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont', [[300, 250], [300, 600]], 'ad-container-0');

        // slot.setTargeting("test", "infinitescroll").
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
                        slotName = $(target).attr('id'),
                        slot = googletag.defineSlot('/51158455/article-sidebar-upper-cont', [[300, 250], [300, 600]], slotName);

                    console.log('>>>>>>>>> ', slotName);
    
                    // slot.setTargeting("test", "infinitescroll").
                    slot.addService(googletag.pubads());
        
                    // Display has to be called before
                    // refresh and after the slot div is in the page.
                    googletag.display(slotName);
                    googletag.pubads().refresh([slot]);
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

        $(newAd).attr('id', slotName);

        createObserver(newAd[0]);

        
    }
});