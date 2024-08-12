import React, { useState } from 'react';
import EventCard from './EventCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Déclaration du type d'événement
// interface Event {
//   title: string;
//   type: string;
//   targetType: string;
//   target: string;
//   paramUrl: string;
// }

const events = [
  { title: "ELIG_CREDIT_IMMO_ANCC", type: "ANCC", targetType: "PRODUCT", target: "44003", paramUrl: "/parametrage/44003" },
  { title: "ELIG_FAMMON_ACTIV", type: "ACTIVATION", targetType: "FAMILY", target: "MONETIQUE", paramUrl: "/parametrage/34027" },
  { title: "ELIG_ECOM_ANNUALT", type: "ANNULATION_TICKET", targetType: "PRODUCT", target: "34027", paramUrl: "/parametrage/34027" },
  { title: "ELIG_IBH_EUROPE", type: "ASSISTANCE", targetType: "PRODUCT", target: "24067", paramUrl: "/parametrage/24067" },
  { title: "ELIG_CREDIT_IMMO_ANCC", type: "ANCC", targetType: "PRODUCT", target: "44003", paramUrl: "/parametrage/44003" },
  { title: "ELIG", type: "ACTIVATION", targetType: "FAMILY", target: "MONETIQUE", paramUrl: "/parametrage/34027" },
  { title: "ELIG_ECOM_ANNUALT", type: "ANNULATION_TICKET", targetType: "PRODUCT", target: "34027", paramUrl: "/parametrage/34027" },
  { title: "ELIG_IBH_EUROPE", type: "ASSISTANCE", targetType: "PRODUCT", target: "24067", paramUrl: "/parametrage/24067" },
  // Ajouter d'autres événements ici
];

const ITEMS_PER_PAGE = 6;

const Evenements: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Événements ({filteredEvents.length})</h2>
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Rechercher des événements"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => window.location.href = "/ajouterEvnt"}>
           + Paramétrer événement
          </Button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Précédent
        </Button>
        <span>Page {currentPage} sur {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default Evenements;
