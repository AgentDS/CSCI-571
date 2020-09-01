/**
 * Created by vt on 3/31/16.
 */
/* global $ */
var MIN_LENGTH = 1;
var inputValue;
var imageValue;
var companyName;
var stockPrice;
var tempChangeValue;
var tempChangePercent;
var jsonData;
var currentStock;
var tableresult ="";
var changeYTD;
var pageRender;
var tableSymbol;
var flag;
var tableData ="";
var counter =0;
var favResultArray =[];

$(window).load(function () {
    $('.carousel').carousel({
        interval: false
    });
    jQuery.fn.highlight = function (str, className) {
        var regex = new RegExp(str, "gi");
        return this.each(function () {
            this.innerHTML = this.innerHTML.replace(regex, function(matched) {
                return "<span style='font-weight :bold'>" + matched + "</span>";
            });
        });
    };

    var fixDate = function(dateIn) {
        var dat = new Date(dateIn);
        return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
    };
    function checkIfFinished() {
        return (favResultArray.length == localStorage.length);
    }
    if((localStorage.length) >0) {
        refreshNow();
        var timeout = setInterval(function()
        { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);



    }

    $('#errorAlert').css("display","none");
    $("#nextButtton .btn").prop("disabled",true);
//    $('#rightPanel-navigation').addClass("disabled");
    $('#rightPanel-navigation').css("background-color", "#E4E4E4");

    $("#clearButton").on("click", function () {
        $('#autoComplete').val("");
        /*localStorage.clear();
         refreshNow();*/
        $("#nextButtton .btn").prop("disabled",true);
        $('#errorAlert').css("display","none");

        // $('#rightPanel-navigation').addClass("disabled");
        $('#rightPanel-navigation').css("background-color", "#E4E4E4");
        if($('#myCarousel').find('.active').index() ==1){
            $('#myCarousel').carousel('next');
        }
    });
    /*
     $('#refButtonWrapper #refereshNowButton').on("click",function () {
     refreshNow();
     });*/
    var autoRefreshVar;
    $('#refershButton').on("change",function () {
        if ($('#refershButton').prop('checked') === true) {
            autoRefreshVar  =   setInterval(function(){ favResultArray = [];
                counter =0; autorefreshNow();  var timeout = setInterval(function()
                { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
                    favResultArray =[]; } }, 100);
            }, 5000)






        }
        else if ($('#refershButton').prop('checked') === false){
            clearInterval(autoRefreshVar);
        }


    });

    $('#autoComplete').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'http://v1-csci517-hw8.appspot.com/index.php',
                dataType: "json",
                method: 'GET',
                data: {
                    keyword: request.term,

                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Symbol + " - " + item.Name + " (" + item.Exchange + ")"
                        };
                    }));
                }
            });
        },
        autoFocus: true,
        minLength: 1,

    });
    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }
    $('document').ready(function () {

        $('#stockForm').submit(function () {
            pageRender(document.getElementById('autoComplete').value);
            return false;
        });
        PageRender:
            pageRender = function getQuoteFunction(input) {
                flag ="";
                $('#errorAlert').css("display","none");
                $("#nextButtton .btn").prop('disabled',false);
                //   $("#nextButtton").enabled;


                $("#resultTable").empty();
                $("#stockImage").empty();
                if($("#autoComplete").val() == input){
                    if (input.indexOf("-") > -1) {
                        inputValue = input;
                        companyName = (inputValue.split("("));
                        companyName = (companyName[0].split("-"));
                        inputValue = (inputValue.split("-"));

                        companyName = companyName[1].trim();

                        inputValue = inputValue[0].trim();
                    }
                    else {
                        inputValue = $("#autoComplete").val();
                    }
                }
                else {
                    inputValue = input;
                }


                if (inputValue.length >= MIN_LENGTH) {
                    $.get("http://v1-csci517-hw8.appspot.com/index.php", {inputValue: inputValue})
                        .done(function (data) {


                            jsonData = data;


                            if(JSON.parse(data).hasOwnProperty("Message") ||JSON.parse(data).Status == "Failure|APP_SPECIFIC_ERROR"){
                                flag = "exitFunction";
                                $('#errorAlert').text("Select a valid Entry");
                                $('#errorAlert').css("display","block");
                                $("#nextButtton .btn").prop("disabled",true);
                                //   $('#rightPanel-navigation').addClass("disabled");
                                $('#rightPanel-navigation').css("background-color", "#E4E4E4");

                                return;
                            }

                            var results = jQuery.parseJSON(data);
                            var content = '<table class=" table table-striped table-responsive" id ="stockInfoTable" style ="width:100%">';
                            $.each(results, function (key, value) {
                                if (key === "Status" || key === "MSDate") {

                                    return true;
                                }
                                else if (key === "Change") {
                                    tempChangeValue = value;
                                    return true;
                                }
                                else if (key === "LastPrice") {
                                    stockPrice = value;
                                    value = "$" + (Math.round(value).toFixed(2));
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else if (key === "ChangePercent") {
                                    tempChangePercent = value;
                                    if (tempChangeValue < 0 && value < 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/down.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">Change (Change Perecent) </td> <td style="color: red">' + value + '</td></tr>');
                                    }
                                    else if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(tempChangeValue)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td style="color: green">' + value + '</td></tr>');

                                    }
                                    else {
                                        value = Math.round(Math.abs(tempChangeValue)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + "% ) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change (Change Perecent)' + '</td>' + '<td>' + value + '</td></tr>');

                                    }
                                }
                                else if (key === "Timestamp") {
                                    value = moment(value).format((' DD MMM  YYYY, hh:mm:ss a'));
                                    content += ('<tr><td style="font-weight: bold;">' + 'Time and Date' + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else if (key == "MarketCap") {
                                    var billionValue = value / (1000000000);
                                    var millionValue = value / (1000000);


                                    if (billionValue > 0.005) {
                                        content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + billionValue.toFixed(2) + ' Billion</td></tr>');
                                    }
                                    else {
                                        content += ('<tr><td style="font-weight: bold;">' + 'Market Cap' + '</td>' + '<td>' + millionValue.toFixed(2) + ' Million</td></tr>');

                                    }
                                }


                                else if (key == "High" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'High Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "Low" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'Low Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "Open" ) {
                                    content += ('<tr><td style="font-weight: bold;">' + 'Opening  Price' + '</td>' + '<td>$' + value.toFixed(2) + '</td></tr>');
                                }
                                else if (key == "ChangeYTD") {
                                    changeYTD = value;
                                }
                                else if (key == "ChangePercentYTD") {
                                    if (tempChangeValue > 0 && value > 0) {
                                        value = (Math.abs(changeYTD)).toFixed(2) + " ( " + (Math.abs(value)).toFixed(2) + " %) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change YTD (Change Percent YTD)' + '</td>' + '<td style="color: green">' + value + '</td></tr>');

                                    }
                                    else {
                                        value = Math.round(Math.abs(changeYTD)).toFixed(2) + " ( " + Math.round(Math.abs(value)).toFixed(2) + " %) " + "<img src ='http://cs-server.usc.edu:45678/hw/hw8/images/up.png' style='width: 20px;'>";
                                        content += ('<tr><td style="font-weight: bold;">' + 'Change YTD (Change Percent YTD)' + '</td>' + '<td>' + value + '</td></tr>');

                                    }
                                }
                                else if(key =="Name"){
                                    companyName =value;
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }
                                else {
                                    content += ('<tr><td style="font-weight: bold;">' + key + '</td>' + '<td>' + value + '</td></tr>');
                                }


                            });

                            content += '</table>';
                            $("#resultTable").append(content);
                            if($('#myCarousel').find('.active').index() ==0){
                                $('#myCarousel').carousel('next');
                            }


                        })

                } else {
                    $('#results').html('');

                }
                if(flag =="exitFunction"){
                    return;
                }

                imageValue = 'http://chart.finance.yahoo.com/t?s=' + inputValue + '&lang=en-US&width=500&height=400';
                var img = $('<img id="dynamicImage" class="img-responsive">'); //Equivalent: $(document.createElement('img'))
                img.attr('src', imageValue);
                img.appendTo('#stockImage');

                $("#starElement").removeClass('starClass');
                $("#starElement").addClass('undostarClass');

                for (var i = 0; i < localStorage.length; i++) {
                    var localResult = localStorage.getItem(localStorage.key(i));

                    var tableresult = (localResult);
                    if (inputValue.toLowerCase() == tableresult.toLowerCase()) {
                        $("#starElement").removeClass('undostarClass');
                        $("#starElement").addClass('starClass');

                    }

                }
                //Below code will generate the Google Feed results
                $.get("http://v1-csci517-hw8.appspot.com/index.php", {feedInput: inputValue})

                    .done(function (data) {
                        $('#newsFeeds').html('');
                        tableresult = "";
                        for (var i = 0; i < jQuery.parseJSON(data).d.results.length; i++) {
                            tableresult = "";
                            tableresult += ('<div class ="well feedResult" style="width:95% ;background-color: #E9E9E9">');
                            tableresult += ('<div style="margin-bottom:2%"><a href=' + jQuery.parseJSON(data).d.results[i].Url + ' target="_blank ">' + jQuery.parseJSON(data).d.results[i].Title + '</a></div>');
                            tableresult += ('<div class="FeedContent" style="margin-bottom:2%">' + jQuery.parseJSON(data).d.results[i].Description + '</div>');
                            tableresult += ('<div  style="margin-bottom:2%;font-weight:bolder">Publisher: ' + jQuery.parseJSON(data).d.results[i].Source + '</div>');
                            tableresult += ('<div  style="font-weight: bolder">Date: ' + moment(jQuery.parseJSON(data).d.results[i].Date).format(' DD MMM  YYYY hh:mm:ss') + '</div></div>');
                            $('#newsFeeds').append(tableresult);



                        }

                        $('.FeedContent').highlight(inputValue,"highlight");

                    });
                /*if ( inputValue.length !== 0){
                 $('.FeedContent').each(function(){

                 var search_regexp = new RegExp(inputValue, "g");
                 $(this).html($(this).html().replace(search_regexp,"<span class = 'highlight'>"+inputValue+"</span>"));
                 });
                 }*!/*/
                //Below code will generate highstock chart
                $(document).ready(function () {


                    var input =  {"Normalized":false,"NumberOfDays":1095,"DataPeriod":"Day","Elements":[{"Symbol":inputValue,"Type":"price","Params":["ohlc"]}]};
                    input = JSON.stringify(input);
                    $.get("http://v1-csci517-hw8.appspot.com/index.php", {chartInput: input})

                        .done(function (resultData) {


                            if((resultData.length >5) && ((resultData.indexOf('error')) <0) ){
                                // It is JSON

                                resultData = jQuery.parseJSON(resultData);
                                var dates = resultData.Dates || [];
                                var elements = resultData.Elements || [];
                                var chartSeries = [];

                                if (elements[0]) {

                                    for (var i = 0, datLen = dates.length; i < datLen; i++) {
                                        var dat = fixDate(dates[i]);
                                        var pointData = [
                                            dat,
                                            elements[0].DataSeries['open'].values[i],
                                            elements[0].DataSeries['high'].values[i],
                                            elements[0].DataSeries['low'].values[i],
                                            elements[0].DataSeries['close'].values[i]
                                        ];
                                        chartSeries.push(pointData);
                                    }
                                    ;
                                }


                                $('#chartData').highcharts('StockChart', {


                                    rangeSelector: {
                                        buttons: [{
                                            type: 'week',
                                            count: 1,
                                            text: '1w'
                                        }, {
                                            type: 'month',
                                            count: 1,
                                            text: '1m'
                                        }, {
                                            type: 'month',
                                            count: 3,
                                            text: '3m'
                                        },
                                            {
                                                type: 'month',
                                                count: 6,
                                                text: '6m'
                                            }

                                            , {
                                                type: 'YTD',
                                                count: 1,
                                                text: 'YTD'
                                            },
                                            {
                                                type: 'year',
                                                count: 1,
                                                text: '1y'
                                            }, {
                                                type: 'all',
                                                count: 1,
                                                text: 'All'
                                            }],
                                        selected: 0,
                                        inputEnabled: false
                                    },

                                    exporting: {enabled: false},

                                    title: {
                                        text: inputValue + ' Stock Value'
                                    },
                                    yAxis: [{
                                        title: {
                                            text: 'Stock Value'
                                        },
                                        min: 0,

                                    }],

                                    series: [{
                                        type: 'area',
                                        name: inputValue,
                                        data: chartSeries,
                                        threshold: null,
                                        tooltip: {
                                            valueDecimals: 2,

                                        },
                                        fillColor: {
                                            linearGradient: {
                                                x1: 0,
                                                y1: 0,
                                                x2: 0,
                                                y2: 1
                                            },
                                            stops: [
                                                [0, Highcharts.getOptions().colors[0]],
                                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                            ]
                                        },


                                    }],


                                });
                            }



                        });


                });
                // $('#rightPanel-navigation').removeClass("disabled");
                $('#rightPanel-navigation').css("background-color", "#FFFFFF");

            }
    });
    $('#favouriteTable').on('click', '.deleteButton', function () {

        var tdValue = $(this).closest('tr').children('td:first').text();
        tdValue = tdValue.trim();
        for(var i =0; i<localStorage.length;i++){
            if (localStorage.getItem(i.toString()).toLowerCase() == tdValue.toLowerCase()) {

                localStorage.removeItem(i.toString());
                $(this).parent().parent().remove();
            }
        }
        var pointer =0;
        for(var i=0; i< localStorage.length+1;i++){
            if(localStorage.getItem(i.toString())==null){
                continue;
            }
            var tempValue = localStorage.getItem(i.toString());
            localStorage.removeItem(i.toString());
            localStorage.setItem(pointer.toString(),tempValue);
            pointer++;
        }
        favResultArray = [];
        counter =0;
        refreshNow();


        var timeout = setInterval(function()
        { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);


    });
    $("#nextButtton").click(function(){
        if($("#nextButtton .btn").prop("disabled") == false) {
            $('#myCarousel').carousel('next');
        }
    });
    $("#refButtonWrapper").click(function(){
        counter =0;

        refreshNow();
        var timeout = setInterval(function()
        { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
            favResultArray =[]; } }, 100);





        counter =0;
    });
    $('#tabs').tab();

    $("#fbData").click(function () {

        if(tempChangeValue)
            FB.ui({

                method: 'Feed',

                name: 'Current Stock Price of ' + companyName + 'is $ ' + stockPrice.toFixed(2),
                picture: 'http://chart.finance.yahoo.com/t?s=' + inputValue + '&lang=en-US&width=400&height=500',
                description: 'Stock information of ' + companyName + ' ' + inputValue,
                caption: 'Last Trade Price: $ ' + stockPrice + " CHANGE: " + tempChangeValue.toFixed(2) + " ( " + tempChangePercent.toFixed(2) + "%)"


            }, function (data) {
                console.log(data);
                if (data && data.post_id) {
                    alert('Post was published.');
                } else {
                    alert('Post was not published.');
                }
            });
    });




    $('#starBat').click(function () {

        if ($('#starElement').hasClass("starClass")) {
            for (var i =0; i <localStorage.length; i++) {
                var localResult = localStorage.getItem(i.toString());

                //      var tableresult = jQuery.parseJSON(localResult);
                if (inputValue.toLowerCase() == localResult.toLowerCase()) {
                    $("#starElement").removeClass('starClass');
                    $("#starElement").addClass('undostarClass');
                    localStorage.removeItem(i.toString());

                    if ($('#favouriteTable td:contains(localResult)')) {

                        $('#favouriteTable td:contains(localResult)').parent().remove();
                    }
                }
            }
            if (localStorage.length == 0) {
                var tempData = ('<table class="table table-striped" id="favouriteTable"> <tr> <th>Symbol</th> <th>Company Name</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Market Cap</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></table>');

                $('#favouriteTable').text("");
                $('#favouriteTable').append(tempData);
            }
            else {
                var pointer =0;
                for(var i=0; i< localStorage.length+1;i++){
                    if(localStorage.getItem(i.toString())==null){
                        continue;
                    }
                    var tempValue = localStorage.getItem(i.toString());
                    localStorage.removeItem(i.toString());
                    localStorage.setItem(pointer.toString(),tempValue);
                    pointer++;
                }
                favResultArray = [];
                counter =0;
                refreshNow();


                var timeout = setInterval(function()
                { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
                    favResultArray =[]; } }, 100);



            }
        }


        else {
            $("#starElement").removeClass('undostarClass');
            $("#starElement").addClass('starClass');
            if (localStorage) {


                var tableresult = jQuery.parseJSON(jsonData);
                //var lastIndex = localStorage.length;*/
                localStorage.setItem(localStorage.length.toString(), tableresult.Symbol);
                counter =0;
                refreshNow();
                var timeout = setInterval(function()
                { if(favResultArray.length == localStorage.length) { clearInterval(timeout); isFinished = true;print_Data(favResultArray);
                    favResultArray =[]; } }, 100);





                counter =0;

            }
        }


    });



    function refreshNow()
    {
        tableData ="";
        //var tempData1 = ('<table class="table table-striped" id="favouriteTable"> <tr> <th>Symbol</th> <th>Company Name</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Market Cap</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></table>');
        // $('#favouriteTable').text("");
        // $('#favouriteTable').append(tempData1);

        $.ajax({
            url:'http://v1-csci517-hw8.appspot.com/index.php',
            data :{inputValue :localStorage.getItem(counter.toString())},
            async: true,
            dataType: 'json',
            success:function(data){
                counter++;

                favResultArray.push(data);


                if (counter < localStorage.length) refreshNow();







            }
        });
    }

    function print_Data(inputArr) {
        var tempData1 = ('<table class="table table-striped" id="favouriteTable"> <tr> <th>Symbol</th> <th>Company Name</th> <th>Stock Price</th> <th class ="changeFavourite">Change(Change Percent)</th> <th class ="changeFavourite">Market Cap</th> <th class ="changeFavourite" id="deleteTh"></th> </tr></table>');
        $('#favouriteTable').text("");
        $('#favouriteTable').append(tempData1);
        for (i = 0; i < inputArr.length; i++) {

            tableresult = "";
            tableresult = (inputArr[i]);
            if(tableresult.hasOwnProperty("Message")){


                continue;
            }
            var tableData ="";

            tableSymbol = tableresult.Symbol;

            tableData += ('<tr><td ><a href="javascript:void(0)"; onclick=" pageRender($(this).text());" >' + tableresult.Symbol + '</a></td><td>' + tableresult.Name + '</td><td>' + '$ ' + (tableresult.LastPrice).toFixed(2) + '</td>');
            if (tableresult.Change < 0) {
                tableData += ('<td style="color: red;" class ="changeFavourite">' + tableresult.Change.toFixed(2) + ' ( ' + tableresult.ChangePercent.toFixed(2) + ' % )' + '<img src ="http://cs-server.usc.edu:45678/hw/hw8/images/down.png" style="width: 20px"></td> ');
            }
            else if (tableresult.Change > 0) {
                tableData += ('<td style="color: green;"class ="changeFavourite">' + tableresult.Change.toFixed(2) + ' ( ' + tableresult.ChangePercent.toFixed(2) + ' % )      ' + '<img src ="http://cs-server.usc.edu:45678/hw/hw8/images/up.png" style="width: 20px"></td> ');

            }
            tableData += ('<td class ="changeFavourite">' + (tableresult.MarketCap / (1000000000)).toFixed(2) + ' Billion</td>');
            tableData += ('<td class ="changeFavourite"><button class="deleteButton" ><i class ="glyphicon glyphicon-trash"></i></button></td>');
            tableData += '</tr>';

            $("#favouriteTable").append(tableData);

        }

    }

    $("div:contains(inputValue  )").each(function(){
        var content = inputValue
        this.innerHTML = this.innerHTML.replace(content,"<span>"+content+"</span>")
    })
    function autorefreshNow()
    {
        refreshNow();
    }


});