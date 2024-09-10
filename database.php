<?php

$connection = mysqli_connect(
  'localhost', 'root', '', 'library'
);

if (!$connection) {
  die('Connection failed: ' . mysqli_connect_error());
}
?>
