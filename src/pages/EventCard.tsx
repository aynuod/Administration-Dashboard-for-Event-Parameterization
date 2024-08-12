import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: {
    title: string;
    type: string;
    targetType: string;
    target: string;
    paramUrl: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate(event.paramUrl, { state: { event } });// passer l'objet event à la nouvelle page.
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Événement: {event.type}</p>
        <p>Typologie Cible: {event.targetType}</p>
        <p>Cible: {event.target}</p>
        {/* <Button onClick={() => navigate(event.paramUrl)}></Button> */}
        <Button onClick={handleModifyClick}>
         Modifier
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
