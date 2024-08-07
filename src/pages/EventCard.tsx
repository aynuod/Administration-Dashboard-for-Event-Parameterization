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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Événement: {event.type}</p>
        <p>Typologie Cible: {event.targetType}</p>
        <p>Cible: {event.target}</p>
        <Button onClick={() => navigate(event.paramUrl)}>
          Paramétrer
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
