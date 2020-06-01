<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$sourceinfo = "point-upd-message.php: ";
 
require 'point-dbcon.php';

try  {

    $db_conn = mysqli_connect($palvelin, $kayttaja, $salasana, $tietokanta);
    mysqli_set_charset($db_conn, 'utf8'); 
    
    if (mysqli_connect_errno()) {
       
        // Send error message to the server log if error connecting to the database
        log_writing($sourceinfo . "Failed to connect to MySQL: " . mysqli_connect_error());
        makeErrReturnJson();

        exit;
    }
    else {
         // $_POST['message'] = "Testataan tallennusta"; //just testing
         // $_POST['email'] = "test@test.fi";            //just testing
        // $_POST['email'] = "";                         //just testing
         
        if  ((isset( $_POST['email'])) && (isset( $_POST['message']))) {
 
            $email          = trim(strip_tags( $_POST['email']));
            $email          = mysqli_real_escape_string($db_conn, $email );

            $message        = trim(strip_tags( $_POST['message'])); 
            $message        = mysqli_real_escape_string($db_conn, $message);
        
            // Validate email       
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $sql = "INSERT INTO messages (                
                    message,
                    email                                    
                )
                VALUES (
                    '$message',                   
                    '$email')";

                //  echo $sql ;
                //  exit;

                if (mysqli_query($db_conn, $sql))
                {
                    log_writing($sourceinfo . "insert successful");
            
                    $last_id = mysqli_insert_id($db_conn);

                    log_writing($sourceinfo . "id: " . $last_id);
                    echo json_encode(["success"=>1]);
                    //todo: echo json_encode(["success"=>1,"msg"=>"Message Inserted.","id"=>$last_id]);

                }
                
                else
                {
                    makeErrReturnJson();
                    log_writing($sourceinfo . "Error description: " . mysqli_error($con));
                //  show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
                } 
            }
            else {
                makeErrReturnJson();
            }
        } 
        else {
             makeErrReturnJson();
        }
    }
}
catch(Exception $e) {
   
    log_writing($e->getMessage());
    makeErrReturnJson();
   // show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
}

finally {

    mysqli_close($db_conn);
    log_writing($sourceinfo . "db connection closed");
}

// in error cases todo:
function makeErrReturnJson() {       
    echo json_encode(["success"=>0]);
}
?>
 