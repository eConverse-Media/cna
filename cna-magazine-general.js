function handleAds() {

    console.log('HAAAAAAAAIIIIII');
    var adContainer = $('.upper-ad-container'),
        blogViewer = $('.blogs-block'),
        height = $(blogViewer).height(),
        numToShow = Math.floor(height / 720);

    console.log('>>>>>>>>>>>>>>>>>>>>> ', adContainer);
    console.log('>>>>>>>>>>> ', numToShow);

    for (var i = 1; i < numToShow; i++) {
        $(adContainer).clone().insertAfter(adContainer);
    }
}


$(function () {
    console.log('IZ SHOWING ADS');
    //handleAds();

    console.log('HAAAAAAAAIIIIII');
    var adContainer = $('.upper-ad-container'),
        blogViewer = $('.blogs-block'),
        height = $(blogViewer).height(),
        numToShow = Math.floor(height / 720);

    console.log('>>>>>>>>>>>>>>>>>>>>> ', adContainer);
    console.log('>>>>>>>>>>> ', numToShow);

    for (var i = 1; i < numToShow; i++) {
        $(adContainer).clone().insertAfter(adContainer);
    }
});