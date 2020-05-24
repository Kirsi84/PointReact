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

    if (mysqli_connect_errno()) {
       
        // Send error message to the server log if error connecting to the database
        log_writing($sourceinfo . "Failed to connect to MySQL: " . mysqli_connect_error());
       //  show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");

        // exit;
    }
    else {
        //   $_POST['message'] = "tesmessage4";           //just testing
        //   $_POST['email'] = "test4@testi4.fi";         //just testing
       
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
                    echo json_encode(["success"=>0]);
                    log_writing($sourceinfo . "Error description: " . mysqli_error($con));
                //  show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
                } 
            }
            else {
                echo json_encode(["success"=>0]);
            }
        } 
        else {
            echo json_encode(["success"=>0]);
        }      
    }
}
catch(Exception $e) {
    echo json_encode(["success"=>0]);
    log_writing($e->getMessage());
   // show_user_error("Virhe tietokantakäsittelyssä. Kokeile hetken kuluttua uudelleen.");
}

finally {

    mysqli_close($db_conn);
    //log_writing($sourceinfo . "db connection closed");
}
?>
 