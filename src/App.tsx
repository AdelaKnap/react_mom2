import Footer from "./components/Footer";
import Todo from "./components/Todo";
import Form from "./components/Form";
import "./App.css";
import { useState, useEffect } from "react";
import { TodoInterface } from "./interfaces/TodoInterface";

function App() {

  // State för sök-funktion
  const [search, setSearch] = useState("");
  // State för todos
  const [todos, setTodos] = useState<[TodoInterface] | []>([]);
  // State för de filtrerade todos
  const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>([]);
  // State för errors
  const [error, setError] = useState<string | null>(null);
  // State för laddningsmeddelnade
  const [loading, setloading] = useState(false);

  // UseEffect för att hämta todos
  useEffect(() => {
    getTodos();
  }, []);

  // Fetch-anrop för att hämta todos
  const getTodos = async () => {
    try {

      setloading(true);

      const response = await fetch("http://localhost:5000/todos");

      if (response.ok) {
        const data = await response.json();

        setTodos(data);
        setFilteredTodos(data);
        setError(null);

      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtningen av todos. Testa igen senare!");
    } finally {
      setloading(false);
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
    <>
      <main>
        <h1>Mina "Todos"</h1>

        {
          error && <p className="fetchInfo"> {error} </p>   // För felmeddelande vid fetch
        }

        {
          loading && (
            <div className="fetchInfo">
              <span className="loading-spinner"></span>
              <p>Hämtar todos...</p>
            </div>
          )
        }

        <form className="search-form">
          <label htmlFor="search">Sök efter todo: </label>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        </form>

        <div className="todo-container">
          {
            filteredTodos.map((todo) => (
              <Todo todoProp={todo} key={todo._id} />
            ))}
        </div>

        <h2 style={{ textAlign: "center", padding: "1.4em" }} >Lägg till nya "todos"</h2>

        <Form />

      </main>

      <Footer />

    </>
  );
}

export default App
