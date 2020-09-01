
function clearForm(){
    document.getElementById("searchForm").reset();
    document.getElementById("resultDescription").innerHTML= "";
    document.getElementById("resultShow").innerHTML= "";
    document.getElementById("moreItemInfo").innerHTML= "";
    document.getElementById("showButton").innerHTML= "";
}
function check() {
        var minPrice = document.getElementById("minPrice").value;
        var maxPrice = document.getElementById("maxPrice").value;
        if (parseInt(minPrice) < 0 || parseInt(maxPrice) < 0) {
            alert("Price Range values cannot be negative! Please try a value greater than or equal to 0.0");
            return false;
        }

        if (maxPrice.trim() !=="") {
            if (parseInt(maxPrice) < parseInt(minPrice)) {
                alert("Oops! Lower price limit cannot be greater than upper price limit! Please try again.");
                return false;
            }
        }

        return true;
}

window.onload = function () {
    var formEl = document.getElementById("searchForm");
    // var URL = "http://127.0.0.1:8080/?";
    var URL = "https://gcphomework6.wl.r.appspot.com/?";
    var ITEMS_RETURN = 10;


    formEl.addEventListener('submit', function(event) {

        var url = URL;
        var keyWords = document.getElementById("keyWords").value;
        var sortOrder = document.getElementById("sortBy").value;
        var minPrice = document.getElementById("minPrice").value;
        var maxPrice = document.getElementById("maxPrice").value;



        var returnAcceptedElt = document.getElementById("returnAccepted");
        var freeShippingElt = document.getElementById("freeShipping");
        var expeditedShippingElt = document.getElementById("expeditedShipping");
        var conditionNewElt= document.getElementById("conditionNew");
        var conditionUsedElt = document.getElementById("conditionUsed");
        var conditionVeryGoodElt = document.getElementById("conditionVeryGood");
        var conditionGoodElt = document.getElementById("conditionGood");
        var conditionAcceptableElt = document.getElementById("conditionAcceptable");

        var returnAccepted = returnAcceptedElt.value;
        var freeShipping = freeShippingElt.value;
        var expeditedShipping = expeditedShippingElt.value;
        var conditionNew = conditionNewElt.value;
        var conditionUsed = conditionUsedElt.value;
        var conditionVeryGood = conditionVeryGoodElt.value;
        var conditionGood = conditionGoodElt.value;
        var conditionAcceptable = conditionAcceptableElt.value;



        if(!returnAcceptedElt.checked) {
            returnAccepted = "false";
            // alert("returnAcceptedElt unchecked");
        }
        if(!freeShippingElt.checked) {
            freeShipping = "false";
            // alert("freeShipping unchecked");

        }
        if(!expeditedShippingElt.checked) {
            expeditedShipping = "false";
        }
        if(!conditionNewElt.checked) {
            conditionNew = "false";
        }
        if(!conditionUsedElt.checked) {
            conditionUsed = "false";
        }
        if(!conditionVeryGoodElt.checked) {
            conditionVeryGood = "false";
        }
        if(!conditionGoodElt.checked) {
            conditionGood = "false";
        }
        if(!conditionAcceptableElt.checked) {
            conditionAcceptable = "false";
        }

        // Key Words
        url += "keywords=" + keyWords;

        // entriesPerPage
        url += "&paginationInput.entriesPerPage=" + ITEMS_RETURN;

        //  Sort by
        if (sortOrder === "BestMatch") {
            url += "&sortOrder=BestMatch";
        } else if (sortOrder === "CurrentPriceHighest") {
            url += "&sortOrder=CurrentPriceHighest";
        } else if (sortOrder === "PricePlusShippingHighest") {
            url += "&sortOrder=PricePlusShippingHighest";
        } else {
            url += "&sortOrder=PricePlusShippingLowest";
        }


        // itemFilter count
        var i = 0;

        //  Price Range From
        if (minPrice.trim() !== "") {
            url += "&itemFilter(" + i + ").name=MinPrice&itemFilter(" + i + ").value=" + minPrice
                + "&itemFilter(" + i + ").paramName=Currency&itemFilter(" + i + ").paramValue=USD";
            i++;
        }

        // Price Range To
        if (maxPrice.trim() !== "") {
            url += "&itemFilter(" + i + ").name=MaxPrice&itemFilter(" + i + ").value=" + maxPrice
                + "&itemFilter(" + i + ").paramName=Currency&itemFilter(" + i + ").paramValue=USD";
            i++;
        }

        // Seller - Returns Accepted
        if (returnAccepted === "true") {
            url += "&itemFilter(" + i + ").name=ReturnsAcceptedOnly&itemFilter(" + i + ").value=true";
            i++;
        }

        // Shipping - Free Shipping
        if (freeShipping === "true") {
            url += "&itemFilter(" + i + ").name=FreeShippingOnly&itemFilter(" + i + ").value=true";
            i++;
        }

        // Shipping - Expedited shipping available

        if (expeditedShipping === "true") {
            url += "&itemFilter(" + i + ").name=ExpeditedShippingType&itemFilter(" + i + ").value=Expedited";
            i++;
        }

        // Condition
        if (conditionNew === "true" || conditionUsed === "true" || conditionVeryGood === "true"
            || conditionGood === "true"  || conditionAcceptable === "true" ) {
            url += "&itemFilter(" + i + ").name=Condition";
            var j = 0;
            if (conditionNew === "true") {
                url += "&itemFilter(" + i + ").value(" + j + ")=1000";
                j += 1;
            }
            if (conditionUsed === "true")  {
                url += "&itemFilter(" + i + ").value(" + j + ")=3000";
                j += 1;
            }
            if (conditionVeryGood === "true") {
                url += "&itemFilter(" + i + ").value(" + j + ")=4000";
                j += 1;
            }
            if (conditionGood === "true") {
                url += "&itemFilter(" + i + ").value(" + j + ")=5000";
                j += 1;
            }
            if (conditionAcceptable === "true") {
                url += "&itemFilter(" + i + ").value(" + j + ")=6000";
                j += 1;
            }
        }


        var responsePromise = fetch(url);
        // 3. Use the response
        // ================================
        responsePromise
            // 3.1 Convert the response into JSON-JS object.
            .then(function(response) {
                return response.json();


            })
            // 3.2 Do something with the JSON data
            .then(function(jsonData) {
                // console.log(jsonData);
                // document.getElementById("results").innerText =
                //     JSON.stringify(jsonData);
                // var resultData = JSON.stringify(jsonData);
                var resultData = jsonData;
                var finalPageDescription = displayResultDescription(resultData);
                document.getElementById("resultDescription").innerHTML = finalPageDescription;

                var finalPageCards = "";
                var moreResult = "";

                if (resultData["count"] !== 0) {
                    for (var i = 0; i < 3; i++) {
                        finalPageCards += displayResultCards(resultData["searchResult"][i], i);
                    }
                    for (var i = 3; i < resultData["count"]; i++) {
                        moreResult += displayResultCards(resultData["searchResult"][i], i);
                    }

                }

                document.getElementById("resultShow").innerHTML = finalPageCards;
                if (resultData["count"] !== 0 ) {
                    document.getElementById("showButton").innerHTML =
                        "<input type=\"button\" id=\"showBtn\" class=\"button button1\" value=\"Show More\">";
                }

                var showBtnElt = document.getElementById("showBtn");
                if (resultData["count"] !== 0) {
                    // card0 click function to  show more details
                    var clickFlag0 = false;
                    var cardElt0 = document.getElementById("card0");
                    var crossBtnElt0 = document.getElementById("crossBtn0");

                    var item0 = resultData["searchResult"][0];
                    var itemTitle0Elt = document.getElementById("itemTitle0");
                    var location0Elt = document.getElementById("location0");

                    cardElt0.onclick = function () {
                    if (!clickFlag0) {
                        clickFlag0 = true;
                        crossBtnElt0.innerHTML = "&#x274C";
                        itemTitle0Elt.className = "itemTitleExpand";
                        location0Elt.innerText = " From " + item0["location"][0];

                        var node = cardElt0.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item0["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt0.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item0["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item0["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item0["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt0.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt0.addEventListener("click",function(event0){

                            var card0Div = cardElt0.getElementsByTagName("div");
                            itemTitle0Elt.className = "itemTitle";
                            location0Elt.innerText = "";

                            node = cardElt0.lastChild;
                            node.className = card0Div[4].className;
                            cardElt0.removeChild(card0Div[4]);
                            cardElt0.removeChild(card0Div[4]);

                            crossBtnElt0.innerHTML="";
                            clickFlag0 = false;
                            event0.stopPropagation();
                        })
                    }

                }

                // card1 click function to  show more details
                    var clickFlag1 = false;
                    var cardElt1 = document.getElementById("card1");
                    var crossBtnElt1 = document.getElementById("crossBtn1");
                    var item1 = resultData["searchResult"][1];
                    var itemTitle1Elt = document.getElementById("itemTitle1");
                    var location1Elt = document.getElementById("location1");

                    cardElt1.onclick = function () {
                    if (!clickFlag1) {
                        clickFlag1 = true;
                        crossBtnElt1.innerHTML = "&#x274C";
                        itemTitle1Elt.className = "itemTitleExpand";
                        location1Elt.innerText = " From " + item1["location"][0];

                        var node = cardElt1.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item1["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt1.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item1["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item1["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item1["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt1.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt1.addEventListener("click",function(event1){

                            var card1Div = cardElt1.getElementsByTagName("div");
                            itemTitle1Elt.className = "itemTitle";
                            location1Elt.innerText = "";

                            node = cardElt1.lastChild;
                            node.className = card1Div[4].className;
                            cardElt1.removeChild(card1Div[4]);
                            cardElt1.removeChild(card1Div[4]);

                            crossBtnElt1.innerHTML="";
                            clickFlag1 = false;
                            event1.stopPropagation();
                        })
                    }

                }

            // card2 click function to  show more details
                    var clickFlag2 = false;
                    var cardElt2 = document.getElementById("card2");
                    var crossBtnElt2 = document.getElementById("crossBtn2");
                    var item2 = resultData["searchResult"][2];
                    var itemTitle2Elt = document.getElementById("itemTitle2");
                    var location2Elt = document.getElementById("location2");

                    cardElt2.onclick = function () {
                    if (!clickFlag2) {
                        clickFlag2 = true;
                        crossBtnElt2.innerHTML = "&#x274C";
                        itemTitle2Elt.className = "itemTitleExpand";
                        location2Elt.innerText = " From " + item2["location"][0];

                        var node = cardElt2.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item2["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt2.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item2["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item2["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item2["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt2.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt2.addEventListener("click",function(event2){

                            var card2Div = cardElt2.getElementsByTagName("div");
                            itemTitle2Elt.className = "itemTitle";
                            location2Elt.innerText = "";

                            node = cardElt2.lastChild;
                            node.className = card2Div[4].className;
                            cardElt2.removeChild(card2Div[4]);
                            cardElt2.removeChild(card2Div[4]);

                            crossBtnElt2.innerHTML="";
                            clickFlag2 = false;
                            event2.stopPropagation();
                        })
                    }

                }



                // show more items
                var moreItemElt = document.getElementById("moreItemInfo");
                showBtnElt.onclick = function () {
                    if (showBtnElt.value === "Show More") {
                        moreItemElt.innerHTML = moreResult;
                        showBtnElt.value = "Show Less";
                        scrollSmoothTo(1800);
                        // if (resultData["count"] < 10) {
                        //     for (var i = resultData["count"]; i < 10; i++) {
                        //         document.getElementById("card"+i).innerHTML = "";
                        //     }
                        // }

                    // card3 click function to  show more details
                    var clickFlag3 = false;
                    var cardElt3 = document.getElementById("card3");
                    var crossBtnElt3 = document.getElementById("crossBtn3");
                    var item3 = resultData["searchResult"][3];
                    var itemTitle3Elt = document.getElementById("itemTitle3");
                    var location3Elt = document.getElementById("location3");

                    cardElt3.onclick = function () {
                    if (!clickFlag3) {
                        clickFlag3 = true;
                        crossBtnElt3.innerHTML = "&#x274C";
                        itemTitle3Elt.className = "itemTitleExpand";
                        location3Elt.innerText = " From " + item3["location"][0];

                        var node = cardElt3.lastChild;
                        var str1 = document.createElement("div");
                        str1.className = node.className;
                        if (item3["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt3.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item3["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item3["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item3["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt3.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt3.addEventListener("click",function(event3){

                            var card3Div = cardElt3.getElementsByTagName("div");
                            itemTitle3Elt.className = "itemTitle";
                            location3Elt.innerText = "";

                            node = cardElt3.lastChild;
                            node.className = card3Div[4].className;
                            cardElt3.removeChild(card3Div[4]);
                            cardElt3.removeChild(card3Div[4]);

                            crossBtnElt3.innerHTML="";
                            clickFlag3 = false;
                            event3.stopPropagation();
                        })
                    }

                }

                // card4 click function to  show more details
                    var clickFlag4 = false;
                    var cardElt4 = document.getElementById("card4");
                    var crossBtnElt4 = document.getElementById("crossBtn4");
                    var item4 = resultData["searchResult"][4];
                    var itemTitle4Elt = document.getElementById("itemTitle4");
                    var location4Elt = document.getElementById("location4");

                    cardElt4.onclick = function () {
                    if (!clickFlag4) {
                        clickFlag4 = true;
                        crossBtnElt4.innerHTML = "&#x274C";
                        itemTitle4Elt.className = "itemTitleExpand";
                        location4Elt.innerText = " From " + item4["location"][0];

                        var node = cardElt4.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item4["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt4.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item4["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item4["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item4["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt4.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt4.addEventListener("click",function(event4){

                            var card4Div = cardElt4.getElementsByTagName("div");
                            itemTitle4Elt.className = "itemTitle";
                            location4Elt.innerText = "";

                            node = cardElt4.lastChild;
                            node.className = card4Div[4].className;
                            cardElt4.removeChild(card4Div[4]);
                            cardElt4.removeChild(card4Div[4]);

                            crossBtnElt4.innerHTML="";
                            clickFlag4 = false;
                            event4.stopPropagation();
                        })
                    }

                }

                 // card5 click function to  show more details
                    var clickFlag5 = false;
                    var cardElt5 = document.getElementById("card5");
                    var crossBtnElt5 = document.getElementById("crossBtn5");
                    var item5 = resultData["searchResult"][5];
                    var itemTitle5Elt = document.getElementById("itemTitle5");
                    var location5Elt = document.getElementById("location5");

                    cardElt5.onclick = function () {
                    if (!clickFlag5) {
                        clickFlag5 = true;
                        crossBtnElt5.innerHTML = "&#x274C";
                        itemTitle5Elt.className = "itemTitleExpand";
                        location5Elt.innerText = " From " + item5["location"][0];

                        var node = cardElt5.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item5["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt5.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item5["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item5["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item5["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt5.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt5.addEventListener("click",function(event5){

                            var card5Div = cardElt5.getElementsByTagName("div");
                            itemTitle5Elt.className = "itemTitle";
                            location5Elt.innerText = "";

                            node = cardElt5.lastChild;
                            node.className = card5Div[4].className;
                            cardElt5.removeChild(card5Div[4]);
                            cardElt5.removeChild(card5Div[4]);

                            crossBtnElt5.innerHTML="";
                            clickFlag5 = false;
                            event5.stopPropagation();
                        })
                    }

                }

                // card6 click function to  show more details
                    var clickFlag6 = false;
                    var cardElt6 = document.getElementById("card6");
                    var crossBtnElt6 = document.getElementById("crossBtn6");
                    var item6 = resultData["searchResult"][6];
                    var itemTitle6Elt = document.getElementById("itemTitle6");
                    var location6Elt = document.getElementById("location6");

                    cardElt6.onclick = function () {
                    if (!clickFlag6) {
                        clickFlag6 = true;
                        crossBtnElt6.innerHTML = "&#x274C";
                        itemTitle6Elt.className = "itemTitleExpand";
                        location6Elt.innerText = " From " + item6["location"][0];

                        var node = cardElt6.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item6["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt6.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item6["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item6["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item6["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt6.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt6.addEventListener("click",function(event6){

                            var card6Div = cardElt6.getElementsByTagName("div");
                            itemTitle6Elt.className = "itemTitle";
                            location6Elt.innerText = "";

                            node = cardElt6.lastChild;
                            node.className = card6Div[4].className;
                            cardElt6.removeChild(card6Div[4]);
                            cardElt6.removeChild(card6Div[4]);

                            crossBtnElt6.innerHTML="";
                            clickFlag6 = false;
                            event6.stopPropagation();
                        })
                    }

                }

                // card7 click function to  show more details
                    var clickFlag7 = false;
                    var cardElt7 = document.getElementById("card7");
                    var crossBtnElt7 = document.getElementById("crossBtn7");
                    var item7 = resultData["searchResult"][7];
                    var itemTitle7Elt = document.getElementById("itemTitle7");
                    var location7Elt = document.getElementById("location7");

                    cardElt7.onclick = function () {
                    if (!clickFlag7) {
                        clickFlag7 = true;
                        crossBtnElt7.innerHTML = "&#x274C";
                        itemTitle7Elt.className = "itemTitleExpand";
                        location7Elt.innerText = " From " + item7["location"][0];

                        var node = cardElt7.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item7["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt7.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item7["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item7["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item7["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt7.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt7.addEventListener("click",function(event7){

                            var card7Div = cardElt7.getElementsByTagName("div");
                            itemTitle7Elt.className = "itemTitle";
                            location7Elt.innerText = "";

                            node = cardElt7.lastChild;
                            node.className = card7Div[4].className;
                            cardElt7.removeChild(card7Div[4]);
                            cardElt7.removeChild(card7Div[4]);

                            crossBtnElt7.innerHTML="";
                            clickFlag7 = false;
                            event7.stopPropagation();
                        })
                    }

                }

                // card8 click function to  show more details
                    var clickFlag8 = false;
                    var cardElt8 = document.getElementById("card8");
                    var crossBtnElt8 = document.getElementById("crossBtn8");
                    var item8 = resultData["searchResult"][8];
                    var itemTitle8Elt = document.getElementById("itemTitle8");
                    var location8Elt = document.getElementById("location8");

                    cardElt8.onclick = function () {
                    if (!clickFlag8) {
                        clickFlag8 = true;
                        crossBtnElt8.innerHTML = "&#x274C";
                        itemTitle8Elt.className = "itemTitleExpand";
                        location8Elt.innerText = " From " + item8["location"][0];

                        var node = cardElt8.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item8["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt8.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item8["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item8["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item8["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt8.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt8.addEventListener("click",function(event8){

                            var card8Div = cardElt8.getElementsByTagName("div");
                            itemTitle8Elt.className = "itemTitle";
                            location8Elt.innerText = "";

                            node = cardElt8.lastChild;
                            node.className = card8Div[4].className;
                            cardElt8.removeChild(card8Div[4]);
                            cardElt8.removeChild(card8Div[4]);

                            crossBtnElt8.innerHTML="";
                            clickFlag8 = false;
                            event8.stopPropagation();
                        })
                    }

                }

                // card9 click function to  show more details
                    var clickFlag9 = false;
                    var cardElt9 = document.getElementById("card9");
                    var crossBtnElt9 = document.getElementById("crossBtn9");
                    var item9 = resultData["searchResult"][9];
                    var itemTitle9Elt = document.getElementById("itemTitle9");
                    var location9Elt = document.getElementById("location9");

                    cardElt9.onclick = function () {
                    if (!clickFlag9) {
                        clickFlag9 = true;
                        crossBtnElt9.innerHTML = "&#x274C";
                        itemTitle9Elt.className = "itemTitleExpand";
                        location9Elt.innerText = " From " + item9["location"][0];

                        var node = cardElt9.lastChild;
                        var str1 =document.createElement("div");
                        str1.className = node.className;
                        if (item9["returnsAccepted"][0] ==="false") {
                            str1.innerHTML = "Seller:&nbsp<b>does not accept returns</b>";
                        }
                        else {
                            str1.innerHTML = "Seller:&nbsp<b>accepts returns</b>";
                        }
                        node.className = "extraItemInfo";
                        cardElt9.insertBefore(str1,node);

                        var str2 =document.createElement("div");
                        str2.className = "extraItemInfo";
                        if (parseInt(item9["shippingInfo"][0]["shippingServiceCost"]) === 0.0){
                            if (item9["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "Free Shipping";
                            }
                        }
                        else{
                            if (item9["shippingInfo"][0]["expeditedShipping"] ==="true") {
                                str2.innerText = "No Free Shipping -- Expedited Shipping available";
                            }
                            else {
                                str2.innerText = "No Free Shipping";
                            }
                        }

                        cardElt9.insertBefore(str2,node);
                    }
                    else {
                        crossBtnElt9.addEventListener("click",function(event9){

                            var card9Div = cardElt9.getElementsByTagName("div");
                            itemTitle9Elt.className = "itemTitle";
                            location9Elt.innerText = "";

                            node = cardElt9.lastChild;
                            node.className = card9Div[4].className;
                            cardElt9.removeChild(card9Div[4]);
                            cardElt9.removeChild(card9Div[4]);

                            crossBtnElt9.innerHTML="";
                            clickFlag9 = false;
                            event9.stopPropagation();
                        })
                    }

                }
                    }
                    else {
                        showBtnElt.value = "Show More";
                        moreItemElt.innerHTML ="";
                        scrollSmoothTo(0);

                    }
                }
            }
        });
        event.preventDefault();


    });


}



function displayResultDescription(ebayData) {
    var keyWords = document.getElementById("keyWords").value;
    var result = "";
    if (ebayData["count"] === 0) {
        result += "<h2>No Results found</h2>";
    }
    else {
        result +="<h2>"+ebayData["totalEntries"][0]+"&nbspResult found for&nbsp"+"<I>"+keyWords+"</I></h2>";
        result +="<hr style='width: 750px '>";
    }
    return result;
}


function displayResultCards(ebayData,index) {
    var cardsResult = "";
    cardsResult += "<div class=\"card\" id=\"card"+index+"\">" +
                        "<div class=\"imageDiv\">" +
                            "<img class=\"itemImage\""+ "src=" +ebayData["galleryURL"][0] + ">"+
                        "</div>" +
                        "<button class=\"crossButton\" id=\"crossBtn"+index+"\" ></button>" +
                        "<div class=\"itemInfo\">" +
                              "<a onclick=\"event.stopPropagation();\"  target=\"_blank\" href="+ebayData["viewItemURL"][0]+">" +
                                    "<p class=\"itemTitle\" id=\"itemTitle"+index+"\">"+ebayData["title"][0]+
                                    "</p>" +
                              "</a>" +
                        "</div>" +
                        "<div class=\"itemInfo\"> Category:&nbsp" +
                             "<I>"+ebayData["primaryCategory"][0]["categoryName"][0]+"</I>" +
                             "<a onclick=\"event.stopPropagation();\" target=\"_blank\" href="+ebayData["viewItemURL"][0] +">"+
                                 "<img src=\"./static/img/redirect.png\" style=\" max-height:10px;max-width:10px;\">" +
                             "</a>" +
                        "</div>";

    if (ebayData["topRatedListing"][0] === "false") {
        cardsResult += "<div class=\"itemInfo\">Condition:&nbsp" + ebayData["condition"][0]["conditionDisplayName"][0] +
                            "<img src=\"./static/img/topRatedImage.png\" style=\" max-height:20px;max-width:15px;\">" +
                       "</div>";

    }
    else {
         cardsResult += "<div class=\"itemInfo\">Condition:&nbsp"+ebayData["condition"][0]["conditionDisplayName"][0] +
                        "</div>";

        }

    if (parseInt(ebayData["shippingInfo"][0]["shippingServiceCost"][0]["__value__"]) > 0) {

        cardsResult += "<div class=\"itemInfo\">" +
                            "<b>Price:&nbsp$"+ebayData["sellingStatus"][0]["convertedCurrentPrice"][0]["__value__"]+
                            "(+$"+ebayData["shippingInfo"][0]["shippingServiceCost"][0]["__value__"] +
                            "&nbsp for shipping)</b><I id=\"location"+index+"\" ></I>"+
                       "</div>";
    }
    else {
        cardsResult += "<div class=\"itemInfo\">" +
                            "<b>Price:&nbsp$"+ebayData["sellingStatus"][0]["convertedCurrentPrice"][0]["__value__"]+
                            "</b><I id=\"location"+index+"\"></I>" +
                       "</div>";
    }
    cardsResult += "</div>"
    return cardsResult;
}

// scroll function
var scrollSmoothTo = function (target) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 20);
        };
    }
    var nowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scroll = function () {
        var distance = target - nowScrollTop;
        nowScrollTop = nowScrollTop + distance / 10;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, target);
        } else {
            window.scrollTo(0, nowScrollTop);
            requestAnimationFrame(scroll);
        }
    };
    scroll();
};
