import "./Todo.css";
import { useState } from "react";
import { TodoInterface } from "../interfaces/TodoInterface";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const Todo = ({ todoProp, onStatusUpdate }: { todoProp: TodoInterface, onStatusUpdate: Function }) => {
    // States för error
    const [error, setError] = useState<string | null>(null);

    // Färgkoda status
    const statusColor = todoProp.status === "Ej påbörjad" ? "red" : todoProp.status === "Pågående" ? "orange" : "green";

    // Funktion för att ändra status
    const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;

        // Skapa ett nytt objekt och ta bort id och _v för att matcha joi-valideirng backend, eslint för att strunta i att _v inte används
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...restTodo } = todoProp;
        const newTodoStatus: Omit<TodoInterface, '_id' | '__v'> =
            { ...restTodo, status: newStatus };

        // PUT-anrop
        try {
            const response = await fetch("https://todos-api-wudv.onrender.com/todos/" + _id,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(newTodoStatus),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                onStatusUpdate();

                setError(null);
            } else {
                throw new Error("Något gick fel " + response.status);
            }
        } catch (error) {
            console.error(error);
            setError("Något gick fel vid uppdatering av status.");
        }
    }

    // Funktion för att radera
    const deleteTodo = async () => {
        try {
            const response = await fetch("https://todos-api-wudv.onrender.com/todos/" + todoProp._id,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                onStatusUpdate();
                setError(null);
            } else {
                throw Error("Något gick fel... " + response.status);
            }
        } catch (error) {
            console.error(error);
            setError("Något gick fel vid raderingen.")
        }
    }

    // Sidinnehållet

    return (
        <section className="todoSection">
            <h2>{todoProp.title}</h2>
            <p>{todoProp.description}</p>
            <p style={{ color: statusColor }}><strong>{todoProp.status}</strong></p>

            <form>
                <label htmlFor="status">Uppdatera status:</label>
                <select name="status" id="status" defaultValue={todoProp.status}
                    onChange={updateStatus}>

                    <option>Ej påbörjad</option>
                    <option>Pågående</option>
                    <option>Avklarad</option>
                </select>
            </form>

            {error && <p style={{ color: "red" }}> {error} </p>}

            <button className="btn-delete" onClick={deleteTodo}>Radera</button>

        </section>
    );
};

export default Todo;
