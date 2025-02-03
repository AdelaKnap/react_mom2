import Footer from "./components/Footer";
import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { TodoInterface } from "./interfaces/TodoInterface";

function App() {

  // State för sök-funktion
  const [search, setSearch] = useState("");
  // State för todos
  const [todos, setTodos] = useState<[TodoInterface] | []>([]);
  // State för de filtrerade todos
  const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>([]);

  // UseEffect för att hämta todos
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");

      if (response.ok) {
        const data = await response.json();

        setTodos(data);
        setFilteredTodos(data);

      } else {
        throw Error;
      }

    } catch (error) {
      console.log(error);
    }
  }

  // Filtrera todos med useEffect
  useEffect(() => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()) // Filtrera utifårn titel
    );
    setFilteredTodos(filtered);
  }, [search, todos]);


  return (
    <><main>
      <h1>Mina "Todos"</h1>

      <form style={{ textAlign: "center", backgroundColor: "white", padding: "12px" }}>
        <label htmlFor="search">Sök här: </label>
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
      </form>


      <div className="todo-container">
        {filteredTodos.map((todo) => (
          <Todo todoProp={todo} key={todo._id} />
        ))}
      </div>
    </main>

      <Footer />

    </>
  );
}

export default App
