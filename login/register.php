<?php

session_start();

//$emailV = $_POST["email"];
//$pswdV = $_POST["pswd"];

$emailV = $_REQUEST["email"];
$pswdV = $_REQUEST["pswd"];

//echo "hello: " . $emailV . " " . $pswdV ;

include('dbconnection.php');
//$email = $_POST['email'];
//$password = $_POST['pass'];
$sql = "SELECT Email_Address, Password, Username FROM userinfo";
$query = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($query)) {
    $emailDb = $row['Email_Address'];
    $passwordDb = $row['Password'];
    if ($emailV == $emailDb && $pswdV == $passwordDb) {
        echo $row['Username'];
        $_SESSION["UserID"] =  $row['Username'];
        break;
    } else {
        echo '';
    }
}
$dbclose = mysqli_close($con);

