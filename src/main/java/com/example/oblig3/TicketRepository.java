package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

// Repository-klassen brukes til å kalle databasen
@Repository
public class TicketRepository {

    // Spring håndterer oppstart av databasen og bruker "db"-objektet til å få tilgang til den
    @Autowired
    private JdbcTemplate db;

    // Funksjon for å lagre billetter i databasen
    public void saveTicket(Ticket ticket) {
        String ticketSQL = "INSERT INTO tickets (film,antall,fornavn,etternavn,telefonnr,epost) VALUES(?,?,?,?,?,?)";
        db.update(ticketSQL,ticket.getFilm(),ticket.getAntall(),ticket.getFornavn(),ticket.getEtternavn(),ticket.getTelefonnr(),ticket.getEpost());
    }

    // Funksjon for å hente alle billetter fra databasen
    public ArrayList<Ticket> getAllTickets() {
        String ticketSQL = "SELECT * FROM tickets ORDER BY UPPER(etternavn) ASC";
        List<Ticket> allTickets = db.query(ticketSQL,new BeanPropertyRowMapper<>(Ticket.class));
        return new ArrayList<>(allTickets);
    }

    // Funksjon for å slette alle billetter fra databasen
    public void clearAllTickets () {
        String ticketSQL = "DELETE from tickets";
        db.update(ticketSQL);
    }
}
