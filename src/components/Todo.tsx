import "./Todo.css";
import { TodoInterface } from "../interfaces/TodoInterface";

const Todo = ({ todoProp }: { todoProp: TodoInterface }) => {
    return (
        <section className="todoSection">
            <h2>{todoProp.title}</h2>
            <p>{todoProp.description}</p>
            <p>{todoProp.status}</p>
        </section>
    );
};

export default Todo;
