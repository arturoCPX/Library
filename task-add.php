<?php

include('database.php');

if (isset($_POST['name'])) {
  $book_name = $_POST['name'];
  $book_description = $_POST['description'];
  $book_author = $_POST['author'];
  $book_published_date = $_POST['published_date'];
  $query = "INSERT INTO books (name, description, author, published_date) VALUES ('$book_name', '$book_description', '$book_author', '$book_published_date')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed: ' . mysqli_error($connection));
  }

  echo "Book Added Successfully";

}

?>
