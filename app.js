document.addEventListener('DOMContentLoaded', function() {
  // Global Settings
  let edit = false;

  // Testing JavaScript
  console.log('JavaScript is working!');
  fetchBooks();
  document.getElementById('task-result').style.display = 'none';

  // Search key type event
  document.getElementById('search').addEventListener('keyup', function() {
    const search = this.value;
    if (search) {
      fetch('task-search.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ search })
      })
      .then(response => response.text())
      .then(response => {
        const books = JSON.parse(response);
        let template = '';
        books.forEach(book => {
          template += `<li><a href="#" class="task-item">${book.name}</a></li>`;
        });
        document.getElementById('task-result').style.display = 'block';
        document.getElementById('container').innerHTML = template;
      });
    } else {
      document.getElementById('task-result').style.display = 'none';
    }
  });

  // Form submit event
  document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const postData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      author: document.getElementById('author').value,
      published_date: document.getElementById('published_date').value,
      id: document.getElementById('taskId').value
    };
    const url = edit === false ? 'task-add.php' : 'task-edit.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(postData)
    })
    .then(response => response.text())
    .then(response => {
      console.log(response);
      document.getElementById('task-form').reset();
      fetchBooks();
    });
  });

  // Fetching Books
  function fetchBooks() {
    fetch('tasks-list.php')
      .then(response => response.text())
      .then(response => {
        const books = JSON.parse(response);
        let template = '';
        books.forEach(book => {
          template += `
            <tr taskId="${book.id}">
              <td>${book.id}</td>
              <td>
                <a href="#" class="task-item">${book.name}</a>
              </td>
              <td>${book.description}</td>
              <td>${book.author}</td>
              <td>${book.published_date}</td>
              <td>
                <button class="task-delete btn btn-danger" >Delete</button>
              </td>
            </tr>
          `;
        });
        document.getElementById('tasks').innerHTML = template;
      });
  }

  // Get a Single Book by Id
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('task-item')) {
      e.preventDefault();
      const element = e.target.closest('tr');
      const id = element.getAttribute('taskId');
      fetch('task-single.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ id })
      })
      .then(response => response.text())
      .then(response => {
        const book = JSON.parse(response);
        document.getElementById('name').value = book.name;
        document.getElementById('description').value = book.description;
        document.getElementById('author').value = book.author;
        document.getElementById('published_date').value = book.published_date;
        document.getElementById('taskId').value = book.id;
        edit = true;
      });
    }

    if (e.target.classList.contains('task-delete')) {
      if (confirm('Are you sure you want to delete it?')) {
        const element = e.target.closest('tr');
        const id = element.getAttribute('taskId');
        fetch('task-delete.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ id })
        })
        .then(response => response.text())
        .then(response => {
          console.log(response);
          fetchBooks();
        });
      }
    }
  });
});
