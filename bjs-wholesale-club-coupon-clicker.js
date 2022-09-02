// ==UserScript==
// @name              BJ's Wholesale Club Coupon Clicker
// @namespace         bjs-wholesale-coupon
// @version           1.2.8
// @description       Click all the coupons on BJ's Wholesale Club website
// @author            sleevetrick
// @match             https://www.bjs.com/myCoupons
// @match             https://www.bjs.com/myCoupons?source=header
// @contributionURL   https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=abl34@cornell.edu&item_name=Greasy+Fork+Donation
// ==/UserScript==
 
var couponAttribute = "";
var totalCoupon = 0;
 
function clipCoupons(index, elements, limit, count){
 
   if (elements == "undefined") {
      elements = document.querySelectorAll(".gray-btn");
      count = elements.length;
      clipCoupons(0, elements, 1000, count);
      console.log("Next Page...");
 
   } else if (index < count){
       elements[index].click();
       totalCoupon++;
       index++;
       console.log("Clipping Coupon #" + totalCoupon);
       setTimeout(()=>{
           clipCoupons(index, elements, 1000, count);
       }, 750)
   } else {
      if(document.querySelectorAll("span[class='next']").length >= 1) {
        document.querySelectorAll("span[class='next']")[0].click();
        setTimeout(()=>{
               clipCoupons(0, "undefined", 1000, 0);
       }, 3000)
      } else {
        printEnd();
      }
   }
}
 
function loadFrame() {
    totalCoupon = 0;
    console.log('Beginning Coupon Clipping...!');
    clipCoupons(0, "undefined", 1000, 0);
};
 
window.onload = setTimeout(loadFrame, 5000);
 
function printEnd(){
   console.log('Finished');
}