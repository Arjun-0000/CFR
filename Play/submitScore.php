<?php

$a = $_POST['username'];
$b = (int)$_POST['score'];
$c = $_POST['userId'];
$cTest;
// echo $a;
// echo '<br>';
 //echo $b;
// echo gettype($b);
// echo $c;

$count = 0 ;

$conSubmit = mysqli_connect('localhost','root','','learnbyweb');

$checkUser = "SELECT userID, score from scorelist where userID = '" . $c . "'";
$queryUser = mysqli_query($conSubmit, $checkUser);
while ( $row = mysqli_fetch_assoc($queryUser) ) {
    // $cTest = $row['userID'];
    $count++;
    // if ($c == $row['userID']) {
       //  echo "User id same";
        if($b > $row['score']) {
            echo "greater";
            $sqlSubmit = "UPDATE scorelist SET score = " . $b . " where userID = '" . $c . "'";
            $querySubmit = mysqli_query($conSubmit, $sqlSubmit);
        } else {
            echo "not greater";
        //}
        // echo "console.log('match')";
        // $sqlSubmit = "UPDATE scorelist SET score = " . $b . " where userID = '" . $c . "'";
        // $querySubmit = mysqli_query($conSubmit, $sqlSubmit);
    } //else {
        //echo "Not same useer id";
       // $sqlSubmit = "INSERT INTO scorelist VALUES ('$a','$b','$c')";
        // $querySubmit = mysqli_query($conSubmit, $sqlSubmit);
    //}
} 
if ($count == 0){
    // echo "ok";
    $sqlSubmit = "INSERT INTO scorelist VALUES ('$a','$b','$c')";
    $querySubmit = mysqli_query($conSubmit, $sqlSubmit);
}



// $sqlSubmit = "INSERT INTO scorelist VALUES ('$a','$b','$c')";
//$querySubmit = mysqli_query($conSubmit, $sqlSubmit);
//$dbcloseSubmit = mysqli_close($conSubmit);

mysqli_close($conSubmit);

header("Location: game.php");


?>
<html>
    <head>

    </head>
    <body>



    </body>
</html>