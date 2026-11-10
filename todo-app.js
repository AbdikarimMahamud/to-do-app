const form = document.getElementById('form');
const input = document.getElementById('text');
const list = document.getElementById('list');
const count = document.getElementById('count');
let todos = [];
try { todos = JSON.parse(localStorage.getItem('todos')) || []; } catch (e) { todos = []; }
function save() {
  try { localStorage.setItem('todos', JSON.stringify(todos)); } catch (e) {}
}
function render() {
  list.innerHTML = '';
  todos.forEach(function (t, i) {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    const span = document.createElement('span');
    span.textContent = t.text;
    span.addEventListener('click', function () { todos[i].done = !todos[i].done; save(); render(); });
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', function () { todos.splice(i, 1); save(); render(); });
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
  const left = todos.filter(function (t) { return !t.done; }).length;
  count.textContent = left + ' left';
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) { return; }
  todos.push({ text: text, done: false });
  input.value = '';
  save();
  render();
});
render();
