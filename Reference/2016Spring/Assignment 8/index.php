<?php
header("Access-Control-Allow-Origin: *");

if(isset($_GET["keyword"])){
    $result  = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='.$_GET["keyword"]);
    echo($result);
}
if(isset($_GET["inputValue"])) {
    $result = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' . $_GET["inputValue"]);
    echo($result);
}

if(isset($_GET["chartInput"])) {
    $result = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters='. $_GET["chartInput"]);
    echo($result);
}
if (isset($_GET['feedInput'])) {

    // Replace this value with your account key
    $accountKey = 'OFAzZfgKq5j5zPEZWk2zm7R08P2NUvgxfqn++17FzLw';
    //https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27AAPL%27&$format=json.
    $ServiceRootURL = 'https://api.datamarket.azure.com/Bing/Search/v1/';
    $WebSearchURL = $ServiceRootURL . 'News?$format=json&Query=';

    $cred = sprintf('Authorization: Basic %s',
        base64_encode($accountKey . ":" . $accountKey));

    $context = stream_context_create(array(
        'http' => array(
            'header' => $cred
        )
    ));

    $request = $WebSearchURL . urlencode('\'' . $_GET['feedInput'] . '\'');

    $response = file_get_contents($request, 0, $context);
    echo($response);
}

?>