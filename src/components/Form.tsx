import { useState } from "react";
import "./Form.css";
import { FormInterface } from "../interfaces/FormInterface";

const Form = () => {

    const [formData, setFormData] = useState<FormInterface>({ title: "", description: "", status: "Ej påbörjad" });
    const statusArray = ["Ej påbörjad", "Pågående", "Avklarad"];

    const submitForm = ((event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        console.log("testar");
    });

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

            <label htmlFor="description">Beskrivning</label>
            <input type="text" name="description" id="description" value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                {
                    statusArray.map((status, index) => (
                        <option key={index}>{status}</option>
                    ))
                }
            </select>

            <input type="submit" value="Lägg till" />

        </form>
    )
}

export default Form