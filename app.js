document.addEventListener('DOMContentLoaded', function() {
  // Global Settings
  let edit = false;

  // Testing JavaScript
  console.log('JavaScript is working!');
  fetchTasks();
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
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          template += `<li><a href="#" class="task-item">${task.name}</a></li>`;
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
      fetchTasks();
    });
  });

  // Fetching Tasks
  function fetchTasks() {
    fetch('tasks-list.php')
      .then(response => response.text())
      .then(response => {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          template += `
            <tr taskId="${task.id}">
              <td>${task.id}</td>
              <td>
                <a href="#" class="task-item">${task.name}</a>
              </td>
              <td>${task.description}</td>
              <td>
                <button class="task-delete btn btn-danger">Delete</button>
              </td>
            </tr>
          `;
        });
        document.getElementById('tasks').innerHTML = template;
      });
  }

  // Get a Single Task by Id
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
        const task = JSON.parse(response);
        document.getElementById('name').value = task.name;
        document.getElementById('description').value = task.description;
        document.getElementById('taskId').value = task.id;
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
          fetchTasks();
        });
      }
    }
  });
});
