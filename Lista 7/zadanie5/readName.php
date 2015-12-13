<?php
require_once("dbcontroller.php");
$db_handle = new DBController();
if(!empty($_POST["keyword"])) {
$query ="SELECT * FROM first_names WHERE first_name like '" . $_POST["keyword"] . "%' ORDER BY first_name LIMIT 0,10";
$result = $db_handle->runQuery($query);
if(!empty($result)) {
?>
<ul id="names-list">
<?php
foreach($result as $name) {
?>
<li onClick="selectName('<?php echo $name["first_name"]; ?>');"><?php echo $name["first_name"]; ?></li>
<?php } ?>
</ul>
<?php } } ?>