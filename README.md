# DT210G Moment 2
I den här uppgiften har en enkel webbplats skapats med React och Type Script.
Webbplatsen består av en startsida som är uppbyggd av komponenterna Todo, Form samt Footer. 
I Todo-komponenten hanteras visning och uppdatering av en enskild todo. Det finns funktionalitet för att ändra status och för att radera. 
I Form-komponenten finns ett formulär för att lägga till nya todos. Där validerars input med hjälp av Yup och hämtar statusalternativen från en API:et. Vid korrekta input skickas formulärdata till förälderakomponenten med prop och formuläret återställs.
I App hanteras sedan todos där useState används för att hantera olika tillstånd, som sökning, todos, filtrerade todos, felmeddelanden och laddningsstatus. Alla todos hämtas från API:et med ett fetch-anrop i useEffect så att man kan söka efter, visa och lägga till nya todos.

## Skapad av:
Adela Knap adkn2300@student.miun.se
