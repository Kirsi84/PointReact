<?php
  
    $local = ($_SERVER['REMOTE_ADDR']=='127.0.0.1' || $_SERVER['REMOTE_ADDR']=='::1');
  
    require 'point-dbcon-prod.php';

    // production
    if (!$local )
    //if ($local ) //simulating production
    {
        $palvelin = $prod_palvelin;
        $kayttaja = $prod_kayttaja;
        $salasana = $prod_salasana;

        $tietokanta = "react_php_crud";

        // Turn off all error reporting
        error_reporting(0); // in production not showing 

        log_writing("Production: ");
    }

    // test environment
    else {
        $palvelin   = "localhost";
        $kayttaja   = "root";  // tämä on tietokannan käyttäjä, ei tekemäsi järjestelmän
        $salasana   = "";
        $tietokanta = "react_php_crud";

        error_reporting(0); // just testing not to show errors in test environment
        error_reporting(E_ALL);
        log_writing("Test: ");
    }
   
    // log_writin by UTC-time 
    function log_writing($msg) {       
        $date_utc = new \DateTime("now", new \DateTimeZone("UTC")); //UTC-time is used
        
        $log  = $date_utc->format(\DateTime::ISO8601) . " " . $msg .  "\r\n";
        file_put_contents('./logs/log_'.date("j.n.Y").'.txt', $log, FILE_APPEND);
    }
?> 