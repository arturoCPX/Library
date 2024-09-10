<?php

include('database.php');

$query = "SELECT * FROM books";
$result = mysqli_query($connection, $query);

if (!$result) {
  die('Query Failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
  $json[] = array(
    'id' => $row['id'],
    'name' => $row['name'],
    'description' => $row['description'],
    'author' => $row['author'],
    'published_date' => $row['published_date']
  );
}
$jsonstring = json_encode($json);
echo $jsonstring;

?>
