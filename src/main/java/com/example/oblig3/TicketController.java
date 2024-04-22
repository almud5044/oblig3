package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

// Kontrollerklasse for billettbehandling
@RestController
public class TicketController {
    @Autowired
    TicketRepository rep;

    // Tar imot input når en billett bestilles og kaller saveTicket-funksjonen for å lagre billetten
    @PostMapping("/tickets/save")
    public void saveTicket(Ticket innTicket) {
        rep.saveTicket(innTicket);
    }

    // Henter alle billetter fra repositoryet ved å kalle getAllTickets-funksjonen og legger dem i en ArrayList<Ticket>
    @GetMapping("/tickets/getAll")
    public ArrayList<Ticket> getAllTickets() {
        return rep.getAllTickets();
    }

    // Kaller clearAllTickets for å slette alle billetter
    @PostMapping("/tickets/clearAll")
    public void clearAllTickets() {
        rep.clearAllTickets();
    }
}
