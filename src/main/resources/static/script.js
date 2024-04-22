// Array med ID-ene til feltene i skjemaet
const fieldIds = ['movie', 'count', 'firstname', 'lastname', 'tel', 'email'];

// Funksjon for å kjøpe billetter
function buyTicket() {
    // Henter referanser til alle input-elementene og feilmeldings-elementene
    const film = document.getElementById("film");
    const antall = document.getElementById("antall");
    const fornavn = document.getElementById("fornavn");
    const etternavn = document.getElementById("etternavn");
    const telefonnr = document.getElementById("telefonnr");
    const epost = document.getElementById("epost");
    const wrongFilm = document.getElementById("wrongFilm");
    const wrongAmount = document.getElementById("wrongAmount");
    const wrongFirstName = document.getElementById("wrongFirstName");
    const wrongLastName = document.getElementById("wrongLastName");
    const wrongNumber = document.getElementById("wrongNumber");
    const wrongEmail = document.getElementById("wrongEmail");

    let wrongInput = false;

    // Funksjon for å validere brukerens inndata og gi riktig feilmelding
    function validateInput(value, regex, errorElement, errorEmpty, errorRegex) {
        if (regex.test(value)) {
            errorElement.innerText = "";
            return;
        }
        wrongInput = true;
        if (!value) {
            errorElement.innerText = errorEmpty;
            return;
        }
        errorElement.innerText = errorRegex;
    }

    // Validerer inndata for hvert input-felt
    validateInput(film.value, /^[^]+$/, wrongFilm, "Velg film", "Velg film");
    validateInput(antall.value, /^[1-99]+$/, wrongAmount, "Skriv inn antall", "Skriv inn gyldig antall");
    validateInput(fornavn.value, /^[a-zæøåA-ÅÆØÅ]+$/, wrongFirstName, "Skriv inn fornavn", "Skriv inn gyldig fornavn");
    validateInput(etternavn.value, /^[a-zæøåA-ZÆØÅ]+$/, wrongLastName, "Skriv inn etternavn", "Skriv inn gyldig etternavn");
    validateInput(telefonnr.value, /^\d{8}$/, wrongNumber, "Skriv inn telefonnr", "Skriv inn gyldig telefonnr (8 tall)");
    validateInput(epost.value, /^[a-zæøåA-ZÆØÅ0-9._%+-]+@[a-zæøåA-ZÆØÅ0-9.-]+\.[a-zæøåA-ZÆØÅ]+$/, wrongEmail, "Skriv inn epost", "Skriv inn gyldig epost");

    // Hvis ingen feil, opprettes et billettobjekt og sendes til serveren
    if (wrongInput === false) {
        ticket = {
            "film": film.value,
            "antall": antall.value,
            "fornavn": fornavn.value,
            "etternavn": etternavn.value,
            "telefonnr": telefonnr.value,
            "epost": epost.value
        };
        $.post("/tickets/save", ticket, function (){
            getAllTickets();
        });

        // Nullstiller input-feltene etter bestilling
        film.value = "";
        antall.value = "";
        fornavn.value = "";
        etternavn.value = "";
        telefonnr.value = "";
        epost.value = "";
    }
}

// Funksjon for å hente og vise alle billetter
function getAllTickets() {
    $.get("/tickets/getAll", function (tickets){
        let ticketlist= `<table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>Film</td>
                            <td>Antall</td>
                            <td>Fornavn</td>
                            <td>Etternavn</td>
                            <td>Telefonnummer</td>
                            <td>Epost</td>
                        </tr>
                    </thead>
                    `;
        tickets?.forEach(function(ticket){
            // Dynamisk oppretter HTML for hver billett i listen
            ticketlist +=`<tbody>
                                <tr>
                                    <td> ${ticket.film} </td>
                                    <td> ${ticket.antall} </td>
                                    <td> ${ticket.fornavn} </td>
                                    <td> ${ticket.etternavn} </td>
                                    <td> ${ticket.telefonnr} </td>
                                    <td> ${ticket.epost} </td>
                                </tr>
                           </tbody>`;
        });
        ticketlist+="</table>";
        document.getElementById("/tickets/getAll").innerHTML = ticketlist;
    });
}

// Funksjon for å slette alle billetter
function deleteAll() {
    $.post("tickets/clearAll", function (){
        getAllTickets();
    });
}
