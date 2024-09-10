<?php

include('database.php');

if (isset($_POST['id'])) {
  $id = mysqli_real_escape_string($connection, $_POST['id']);

  $query = "SELECT * FROM books WHERE id = {$id}";

  $result = mysqli_query($connection, $query);
  if (!$result) {
    die('Query Failed: ' . mysqli_error($connection));
  }

  $json = array();
  while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'description' => $row['description'],
      'author' => $row['author'],
      'published_date' => $row['published_date'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json[0]);
  echo $jsonstring;
}

?>
