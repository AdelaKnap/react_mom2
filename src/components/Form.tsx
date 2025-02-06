import { useState, useEffect } from "react";
import "./Form.css";
import { FormInterface } from "../interfaces/FormInterface";
import { ErrorsInterface } from "../interfaces/ErrorsInterface";
import * as Yup from "yup";

// Ta emot addtodo som prop
const Form = ({ addTodo }: { addTodo: (newTodo: FormInterface) => Promise<void> }) => {
    // State för formulärdata
    const [formData, setFormData] = useState<FormInterface>({title: "", description: "", status: "Ej påbörjad", 
});

    // States
    const [statusArray, setStatusArray] = useState<string[]>([]);
    const [errors, setErrors] = useState<ErrorsInterface>({});

    // useEffect för att hämta status
    useEffect(() => {
        fetchStatusOptions();
    }, []);

    // Funktion för att hämta status från en API
    const fetchStatusOptions = async () => {
        try {
            const response = await fetch("http://localhost:5000/status-options");
            if (response.ok) {
                const data = await response.json();
                setStatusArray(data); // Uppdaterar statusArray 
            } else {
                throw Error; 
            }
        } catch (error) {
            console.error("Fel vid hämtning av status-alternativ:", error);
        }
    };

    // Valideringsschema med Yup
    const validationSchema = Yup.object({
        title: Yup.string().trim().required().min(3, "Ange en titel på minst 3 tecken"),
        description: Yup.string().notRequired().max(200, "Beskrivningen får max innehålla 200 tecken"),
        status: Yup.string(),
    });

    // Funktion för submit
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 

        try {
            // Validering
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({}); 

            // Anropa addTodo med prop och lägg till ny todo
            await addTodo(formData);
            setFormData({ title: "", description: "", status: "Ej påbörjad" });    // Återställ formuläret 
        } catch (errors) {
            const validationErrors: ErrorsInterface = {};

            // Om det finns fel, skapa objekt med felmeddelanden för varje input
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach((error) => {
                    const prop = error.path as keyof ErrorsInterface;
                    validationErrors[prop] = error.message; 
                });

                setErrors(validationErrors); // Uppdatera state med felmeddelandena
            }
        }
    };

    return (
        // Formuläret
        <form className="todoForm" onSubmit={submitForm}>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}/>

            {errors.title && <span>{errors.title}</span>}

            <label htmlFor="description">Beskrivning</label>
            <input type="text" name="description" id="description" value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}/>
        
            {errors.description && <span>{errors.description}</span>}

            {/* Dropdown för status med alternativ från servern */}
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                
                {statusArray.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            {/* Visa felmeddelande, om det finns några */}
            {errors.status && <span>{errors.status}</span>}

            <input type="submit" value="Lägg till" />
        </form>
    );
};

export default Form;
