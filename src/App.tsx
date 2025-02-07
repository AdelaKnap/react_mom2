import Footer from "./components/Footer";
import Todo from "./components/Todo";
import Form from "./components/Form";
import "./App.css";
import { useState, useEffect } from "react";
import { TodoInterface } from "./interfaces/TodoInterface";

function App() {

  // States
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState<TodoInterface[] | []>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setloading] = useState(false);

  // UseEffect för att hämta todos
  useEffect(() => {
    getTodos();
  }, []);

  // Fetch-anrop för att hämta todos
  const getTodos = async () => {
    try {
      setloading(true);

      const response = await fetch("https://todos-api-wudv.onrender.com/todos");

      if (response.ok) {
        const data = await response.json();

        setTodos(data);
        setFilteredTodos(data);
        setError(null);

      } else {
        throw Error("Något gick fel " + response.status);
      }
    } catch (error) {
      console.log(error);
      setError("Något gick fel vid hämtningen av todos. Testa igen senare!");
    } finally {
      setloading(false);
    }
  }

  // Funktion för att lägga till en ny todo
  const addTodo = async (newTodo: { title: string; description?: string; status: string }) => {
    try {
      const response = await fetch("https://todos-api-wudv.onrender.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        await getTodos(); // Hämta todos på nytt efter post
      } else {
        throw new Error("Kunde inte lägga till todo.");
      }
    } catch (error) {
      console.error("Fel vid tilläggning av todo:", error);
    }
  };

  // Filtrera todos med useEffect
  useEffect(() => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()) // Filtrera utifårn titel
    );
    setFilteredTodos(filtered);
  }, [search, todos]);

  // Sidinnehållet

  return (
    <>
      <main>
        <h1>Mina "Todos"</h1>
        {error && <p className="fetchInfo"> {error} </p>}

        {loading && (                           // Visa laddningsikon om loading är true 
          <div className="fetchInfo">
            <span className="loading-spinner"></span>
            <p>Hämtar todos...</p>
          </div>
        )}

        <form className="search-form">
          <label htmlFor="search">Sök efter todo: </label>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
        </form>

        <div className="todo-container">  
          {
            filteredTodos.map((todo) => (               // Loopa genom de filtrerade todos
              <Todo todoProp={todo} key={todo._id} onStatusUpdate={getTodos} />
            ))}
        </div>

        <h2 style={{ textAlign: "center", padding: "1.4em" }} >Lägg till nya "todos"</h2>

        <Form addTodo={addTodo} />

      </main>

      <Footer />

    </>
  );
}

export default App
