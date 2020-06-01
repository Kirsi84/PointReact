<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$sourceinfo = "point-product.php: ";
 
require 'point-dbcon.php';
 
try  {

    $db_conn = mysqli_connect($palvelin, $kayttaja, $salasana, $tietokanta);
    mysqli_set_charset($db_conn, 'utf8'); 

    if (mysqli_connect_errno()) {
       
        // Send error message to the server log if error connecting to the database
        log_writing($sourceinfo . "Failed to connect to MySQL: " . mysqli_connect_error());
        makeReturnJson();    
        exit; 
    }
    else {

        if (isset($_GET["id"])) {

            $id = (int)$_GET["id"];

            $sql = "SELECT id, updated, name, description, price, information FROM products WHERE id =" . $id;
                      
            if ($result = mysqli_query($db_conn, $sql)) {      
                $row = $result->fetch_object();               
                echo json_encode($row);
            }
            else{
                makeReturnJson();  
            }
        }
        else {
            log_writing($sourceinfo . "input parameter missing");
            makeReturnJson();  
        }
    }
}
catch(Exception $e) {
    
    log_writing($e->getMessage());
    makeReturnJson();  
   // show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
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
 