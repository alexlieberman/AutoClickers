// ==UserScript==
// @name              Chase Merchant Offers Auto Clicker
// @namespace         chase-offers-auto-clicker
// @version           1.0.0
// @description       Click all the merchant offers for Chase Credit Cards
// @author            sleevetrick
// @match             https://*.chase.com/*
// ==/UserScript==
 
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});
 
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
 
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
 
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
 
function onUrlChange() {
if (lastUrl.indexOf("requestAllMerchantOffers") > 0) {
 
    console.log(lastUrl);
    waitForElm('.offerList').then((elm) => {
        console.log('Element is ready');
        elements = document.querySelector("#allOffersList").querySelector(".offerList").querySelectorAll("[icon-type='ico_add_circle']");
        repeat();
    });
 
}
 
}
 
var elements= null;
 
function repeat() {
 
    elements[0].click();
 
    waitForElm('#flyoutWrapper[data-has-view="true"]').then((elm) => {
         console.log('Offer Clicked');
         waitForElm('#flyoutHeaderContent[data-has-view="true"]').then((elm) => {
         document.getElementById("flyoutCloseIcon").click();
             waitForElm('.offerList').then((elm) => {
                 console.log('Proceeding to Next Offer');
                 elements = document.querySelector("#allOffersList").querySelector(".offerList").querySelectorAll("[icon-type='ico_add_circle']");
                 if (elements.length > 0) {
                    repeat();
                 }
             });
         });
 
    });
 
}