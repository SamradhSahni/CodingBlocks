window.onload = function () {
  fetch("/todos")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("todo-list")
      list.innerHTML = ""
      data.forEach(todo => {
        const div = document.createElement("div")
        div.className = "todo-item"
        div.innerHTML = `
          <span>${todo.activity}</span>
          <div class="controls">
            <form method="POST" action="/up/${todo._id}">
              <button>&uarr;</button>
            </form>
            <form method="POST" action="/down/${todo._id}">
              <button>&darr;</button>
            </form>
            <form method="POST" action="/delete/${todo._id}">
              <button>❌</button>
            </form>
          </div>
        `
        list.appendChild(div)
      })
    })
}
