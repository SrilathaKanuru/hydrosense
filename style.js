body {
  margin: 0;
  font-family: sans-serif;
  background: #f0f8ff;
  color: #222;
}
header {
  background: #0077cc;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.card {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  min-width: 250px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.card.wide {
  width: 100%;
}
button {
  background: #0077cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.alert {
  display: none;
  background: #ffcccc;
  padding: 0.5rem;
  border-radius: 6px;
  color: red;
  text-align: center;
}
footer {
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
  padding: 1rem;
  background: #eaf4fb;
}

/* Dark Mode */
.dark-mode {
  background: #121212;
  color: #eee;
}
.dark-mode header {
  background: #1e1e1e;
}
.dark-mode .card {
  background: #1e1e1e;
  color: #eee;
}
.dark-mode .alert {
  background: #400000;
  color: #fff;
}
