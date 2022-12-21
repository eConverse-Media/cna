$(function () {
    //check for current domain/path and also verify it's not already on the domain you want it to resolve to 
    if ((window.location.href.indexOf('econversemedia.com/HigherLogic/Security/Agreement.aspx?ReturnURL') > -1) && (window.location.href.indexOf('bbc.com')) === -1) {

        //change the return url parameter so it reroutes accordingly on accept
        //also...dont know where the '1' comes from after ReturnURL.....or "why" it's there....it's just there
        window.location.href =  'https://www.econversemedia.com/HigherLogic/Security/Agreement.aspx?ReturnURL1=https%3a%2f%2fwww.bbc.com%2fnews';
    }
});