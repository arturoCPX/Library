<?php

include('database.php');

if (isset($_POST['id'])) {
  $book_name = $_POST['name'];
  $book_description = $_POST['description'];
  $book_author = $_POST['author'];
  $book_published_date = $_POST['published_date'];
  $id = $_POST['id'];
  $query = "UPDATE books SET name = '$book_name', description = '$book_description', author = '$book_author', published_date = '$book_published_date' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed: ' . mysqli_error($connection));
  }
  echo "Book Updated Successfully";

}

?>
