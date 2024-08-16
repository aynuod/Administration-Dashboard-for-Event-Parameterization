import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

// Déclaration du type d'événement
interface Event {
  id: string;
  code: string;
  description: string;
  typologie: string;
  produit: string;
  points: number;
  conditionCode: number[];
}

const ITEMS_PER_PAGE = 6;

const Evenements: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  axios
    .get("http://localhost:8080/api/v1/events/all")
    .then((response) => {
      console.log("Réponse complète : ", response); // Affiche la réponse complète
      console.log("Données récupérées : ", response.data); // Affiche les données spécifiques
      setEvents(response.data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données : ", error);
    });
}, []);


  const filteredEvents = events.filter(event =>
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  console.log("Événements filtrés :", currentEvents); // Vérifie les événements filtrés ici 


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            Événements ({filteredEvents.length})
          </h2>
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Rechercher des événements"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => (window.location.href = "/ajouterEvnt")}>
            + Paramétrer événement
          </Button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Précédent
        </Button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
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
