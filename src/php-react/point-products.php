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
      //  show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");

        // exit;
    }
    else {

       
        $sql = "SELECT id, updated, name, description, price FROM products";
        $result = mysqli_query($db_conn, $sql);

        if(mysqli_num_rows($result) > 0){
        
            $products = mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($products);
        
            // echo json_encode(["success"=>1,"data"=>$all_users]);
        }
        else{
            echo json_encode(["success"=>0]);
        }
    }
}
catch(Exception $e) {
    
    log_writing($e->getMessage());
   // show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
}

finally {

    mysqli_close($db_conn);
    //log_writing($sourceinfo . "db connection closed");
}
?>
 