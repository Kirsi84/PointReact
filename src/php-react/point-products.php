<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$sourceinfo = "point-products.php: ";

require 'point-dbcon.php';

log_writing($sourceinfo . "process starts");

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
    
        if ($result = mysqli_query($db_conn, $sql)) {
            $products = mysqli_fetch_all($result,MYSQLI_ASSOC);
           
            echo json_encode($products); //todo: there is some error, this is 
                                        //working in test but not in production
            // makeReturnJson();     //testing todo: making empty json
        
        }
        else{   
             
            makeReturnJson();           
        }
    }
}
catch(Exception $e) {
    
    log_writing($sourceinfo . "Virhe: produts-tietojen haussa.");
    log_writing($e->getMessage());
    makeReturnJson();       
 } 

finally {

    mysqli_close($db_conn);
    //log_writing($sourceinfo . "db connection closed");
}

// in error cases
function makeReturnJson() {     
    log_writing("Virhe tai tyhjä tulosjoukko!");  
    echo json_encode([]);
}

?>
 