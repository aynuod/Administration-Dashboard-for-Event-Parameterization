import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

interface Event {
  id: string;
  code: string;
  description: string;
  typologie: string;
  produit: string;
  points: number;
  conditionCode: number[];
}

const ITEMS_PER_PAGE = 9;

const Evenements: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/events/all")
      .then((response) => {
        console.log("Données récupérées : ", response.data);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">
          Événements ({filteredEvents.length})
        </h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Rechercher des événements"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={() => (window.location.href = "/ajouterEvnt")} className="w-full md:w-auto">
            + Paramétrer événement
          </Button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2"
          >
            Précédent
          </Button>
          <span className="text-sm">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2"
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
};

export default Evenements;