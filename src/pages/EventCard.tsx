import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: {
    id: string;
    code: string;         // Utilisé pour le titre de l'événement
    description: string;  // Description de l'événement
    typologie: string;     // Utilisé pour la typologie des produits
    produit: string;       // Cible ou produit
    points: number;        // Points associés
    conditionCode: number[]; // Liste des codes de conditions
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    // Passe l'objet event à la nouvelle page
    navigate(`/parametrage/${event.id}`, { state: { event } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.code}</CardTitle> {/* Utilisation de `description` pour le titre */}
      </CardHeader>
      <CardContent>
        <p>Description: {event.description}</p>  {/* Utilisation de `typologie` pour le type d'événement */}
        <p>Typologie Cible: {event.typologie}</p>       {/* Utilisation de `produit` pour la cible */}
        <p>Cible: {event.produit}</p>
        <p>Points: {event.points}</p>         {/* Points associés */}
        {/* L'URL pour modifier l'événement est basée sur l'ID */}
        <Button onClick={handleModifyClick}>
          Modifier
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
