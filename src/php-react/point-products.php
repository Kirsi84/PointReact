<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$sourceinfo = "point-products.php: ";

require 'point-dbcon.php';

try  {

    $db_conn = mysqli_connect($palvelin, $kayttaja, $salasana, $tietokanta);

    if (mysqli_connect_errno()) {
       
        // Send error message to the server log if error connecting to the database
        log_writing($sourceinfo . "Failed to connect to MySQL: " . mysqli_connect_error());
        makeReturnJson();   

        exit;
    }
    else {
      
        $sql = "SELECT id, updated, name, description, price FROM products";
        $result = mysqli_query($db_conn, $sql);
   
        if ($result = mysqli_query($db_conn, $sql)) {
            $products = mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($products);    
        }
        else{           
            makeReturnJson();           
        }
    }
}
catch(Exception $e) {
    
    log_writing($e->getMessage());
    makeReturnJson();       
 } 

finally {

    mysqli_close($db_conn);
    //log_writing($sourceinfo . "db connection closed");
}

// in error cases
function makeReturnJson() {       
    echo json_encode([]);
}

?>
 