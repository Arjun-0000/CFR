
<?php
$usernameFromGameForShow = '';
if(isset($_POST['fromGame'])){
	$usernameFromGameForShow = $_POST['userNameFromGame'];
}
if($usernameFromGameForShow==''){
	$displayvar1 = 'block';
	$displayvar2 = 'none';
} else{
	$displayvar1 = 'none';
	$displayvar2 = 'block';
}
?>
<html>
    <body>
<?php echo $displayvar1;
echo '<br>';
echo $displayvar2;
?>
    </body>
</html>