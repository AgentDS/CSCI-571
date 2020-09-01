 <style>

        h1 {
            font-style: italic;
            height: 20px;
            margin-top: 5px;
            text-align: center;

        }
        form {
            margin-left: 450px;
            border:1px solid #ddd;
            width:400px;
            display: inline-block;
            margin-top:30px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #F3F3F3;
            padding-bottom: 24px;
        }
        #xmlTable{
            align-content: center;
            display: -webkit-flex;



            justify-content: center;
            margin-left: 420px;
            margin-top:30px;
            font-weight: 200;
            background-color: #F3F3F3;
            border-color: #D5D5D5;
            border-collapse: collapse;
        }
        #infoTable {
            align-content: center;
            display: inline;
            margin-left: 500px;
            margin-top:30px;
            font-weight: 200;
            background-color: #F3F3F3;
            border-color: #D5D5D5;
            border-collapse: collapse;
        }
        input[type="submit"] {
            border-radius: 18%;
             width: 60px;
            height:25px;
            font-family: sans-serif;

            background-color: white;

        }
        input[type="button"] {
            border-radius: 18%;
            width: 60px;
            height:25px;
            font-family: sans-serif;

            background-color: white;

        }
        input[type="text"] {

            width: 160px;

        }
        #inputButton{
            margin-top: -13px;
            margin-left: 185px;
            margin-bottom: -13px;
        }
        tr th {
            background-color: #F3F3F3;
        }
        tr td {
            background-color: #FAFAFA;
            padding:4px;
            font-weight: 500;
            min-width: 80px;
        }
        
        input:required {
            box-shadow:none;
        }
        input:invalid {
            box-shadow:none;
        }

    </style>
    <script type="text/javascript">
        function clearData() {
            document.getElementById('inputText').value = "";
            var table = document.getElementById('xmlTable');
            if (table) {
                table.parentNode.removeChild(table);
            }
            var table1 = document.getElementById('infoTable');
            if (table1) {
                table1.parentNode.removeChild(table1);
            }
            var table2 = document.getElementById('emptyTable');
            if (table2) {
                table2.parentNode.removeChild(table2);
            }


        }
        function clearXMLData( ) {

            var table = document.getElementById('xmlTable');
            if (table) {
                table.parentNode.removeChild(table);
            }
        }
    </script>

    <form class ="stockForm" method="get">
        <h1> Stock Search</h1><hr style="height:1px;border:none;background-color:black;" />
        Company Name or Symbol: <input type ="text" name ="symbol" id ="inputText"  required placeholder="Compay or symbol name" value="<?php echo isset($_GET["symbol"]) ? $_GET["symbol"] :""?>"><br><br>
        <div id="inputButton">
        <input type ="submit"  name="Search" value="search" style ="margin-right:10px">
        <input type ="button" name="Clear" value ="clear" onclick="clearData();"><br><br>
        </div>
        <a href="http://www.markit.com/product/markit-on-demand" target="_blank" style="margin-left: 145px; margin-top: 0px"> Powered by Markit on Demand</a>
    </form>

 <?php error_reporting(E_ERROR | E_PARSE); ?>
 <?php if(isset($_GET["Search"])): ?>

 <?php

 $xmlResponse = new SimpleXMLElement('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/xml?input='.$_GET["symbol"], 0, TRUE);
 $xml = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/xml?input='.$_GET["symbol"]);
 $dom = new DOMDocument();
 $dom->loadXML($xml);

 ?>

 <?php if($dom->getElementsByTagName('LookupResult')->length >0) : ?>

     <table  border ="2px" id="xmlTable" >
     <thead>
     <tr>
         <th>Name</th>
         <th>Symbol</th>
         <th>Exchange</th>
         <th>Details</th>
     </tr>
     </thead>
     <tbody>

     <?php foreach ($xmlResponse->LookupResult as $licenseElement) :?>
         <tr>
             <td><?php echo $licenseElement->Name; ?></td>
             <td><?php echo $licenseElement->Symbol; ?></td>
            <?php $symbolInfo = (string)$licenseElement->Symbol ?>
             <td><?php echo $licenseElement->Exchange; ?></td>
             <td><a href ="<?php echo 'stock.php?moreInfo='.$symbolInfo.'&symbol='.$_GET["symbol"] ?>" onclick="clearXMLData();" name="Link">More Info</a></td>

         </tr>
     <?php endforeach; ?>
  </tbody>
 </table>


 <?php else : ?>
     <table  border="2px"  id ="emptyTable"align="center" style="margin-left:600px; margin-top: 30px">
         <tr>
             <td>No Record has been found</td>
         </tr>
     </table>
 <?php endif; ?>
 <?php endif; ?>



  <?php

            if(isset($_GET["moreInfo"])) {

                    $jsonResponse = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol='.$_GET["moreInfo"]);
                $jsonResponse = json_decode($jsonResponse, true);

                echo '<table border ="1px" id="infoTable" style="text-align: center">';
                if ($jsonResponse["Status"] != "SUCCESS") {
                    echo '<tr>';
                    echo '<td style="font-weight: bold; margin-left: 550px" >' . 'There is no stock information available' . '</td>';

                    echo '</tr>';
                } else {
                    foreach ($jsonResponse as $key => $value) {

                        if ($value == "SUCCESS" || $key =="MSDate" ) {
                            continue;
                        }
                        echo '<tr>';
                        echo '<td style="font-weight: bold; background-color:#F3F3F3;min-width: 200px; text-align: left ">' . $key . '</td>';
                        if($key =="Change" ) {

                             if($value >0) {
                                 echo '<td>' . number_format((float)$value, 2, '.', '').'<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="10px" height="12px"> ' . '</td>';
                                 echo '</tr>';
                             }
                            else if($value <0) {
                                echo '<td>' . number_format((float)$value, 2, '.', '').'<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="10px" height="12px"> ' . '</td>';
                                echo '</tr>';
                            }
                            else {
                                echo '<td>' . number_format((float)$value, 2, '.', '') . '</td>';
                                echo '</tr>';
                            }

                        }
                        elseif($key =="ChangePercent"){

                            if($value >0) {
                                echo '<td>' . number_format((float)$value, 2, '.', '').'%'. '<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="10px" height="12px">'                                     .'</td>';
                                echo '</tr>';
                            }
                            else if($value <0) {
                                echo '<td>' . number_format((float)$value, 2, '.', '').'%'.'<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="10px" height="12px"> ' .                                           '</td>';
                                echo '</tr>';
                            }
                            else {
                                echo '<td>' . number_format((float)$value, 2, '.', '').'%'  . '</td>';
                                echo '</tr>';
                            }

                        }
                        elseif($key =="Timestamp") {
                            date_default_timezone_set('America/Los_Angeles');
                            $old_date = $value;              // returns Saturday, January 30 10 02:06:34
                            $old_date_timestamp = strtotime($old_date);
                            $new_date = date('Y-m-d h:i A', $old_date_timestamp);

                            echo '<td>' . $new_date . '</td>';
                            echo '</tr>';
                        }
                        elseif($key =="MarketCap") {

                            $million = $value/(1000000);
                            $billion = $value/(1000000000);

                            if($billion < 0.005) {
                                echo '<td>' . number_format((float)$million, 2, '.', '') . ' M' . '</td>';
                                echo '</tr>';
                            }
                            else {
                                echo '<td>' . number_format((float)$billion, 2, '.', '') . ' B' . '</td>';
                                echo '</tr>';
                            }
                        }
                        elseif ($key =="Volume"){
                            echo '<td>' . number_format($value). '</td>';
                            echo '</tr>';
                        }
                        elseif($key =="ChangeYTD") {

                             $value = $jsonResponse["LastPrice"]- $value;

                            if ($value > 0) {
                                echo '<td>' . number_format((float)$value, 2, '.', '') . '<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="10px" height="12px">' . '</td>';
                                echo '</tr>';
                            } else if($value <0) {
                                echo '<td>' .'(' .number_format((float)$value, 2, '.', '') . ')' . '<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="10px" height="12px"> ' . '</td>';
                                echo '</tr>';
                            }
                            else {
                                echo '<td>' . number_format((float)$value, 2, '.', '')  . '</td>';
                                echo '</tr>';
                            }

                        }
                        elseif($key =="ChangePercentYTD") {



                            if ($value > 0) {
                                echo '<td>' .number_format((float)$value, 2, '.', '').'%'. '<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png" width="10px" height="12px">' . '</td>';
                                echo '</tr>';
                            } else if($value <0) {
                                echo '<td>'  .number_format((float)$value, 2, '.', '') .'%'  . '<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png" width="10px" height="12px"> ' . '</td>';
                                echo '</tr>';
                            }
                            else {
                                echo '<td>' . number_format((float)$value, 2, '.', '') .'%'  . '</td>';
                                echo '</tr>';
                            }
                        }


                        else {
                            echo '<td>' . $value . '</td>';
                            echo '</tr>';
                        }

                    }

                }
            }

            echo '</table>';

  ?>






