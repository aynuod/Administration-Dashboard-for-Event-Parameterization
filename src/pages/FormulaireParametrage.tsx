import React, { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faTag, faBullseye, faBoxOpen, faCoins, faCheckCircle, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Condition {
  id: string;
  code: number;
  type: string;
  description: string;
  label: string;
}

const FormulaireParametrage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [typologieCible, setTypologieCible] = useState('');
  const [produitCible, setProduitCible] = useState('');
  const [points, setPoints] = useState(0);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [selectedType, setSelectedType] = useState<string>('Montant');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/v1/events/event/${id}`)
        .then(response => {
          const eventData = response.data;
          setEvent(eventData);
          setCode(eventData.code);
          setDescription(eventData.description);
          setTypologieCible(eventData.typologie);
          setProduitCible(eventData.produit);
          setPoints(eventData.points);

          // Récupérer les conditions depuis l'API
          axios.get(`http://localhost:8080/api/v1/conditions/conditions`, {
            params: { ids: eventData.conditionCode.join(',') } // Assurez-vous que `conditionCode` est une liste d'IDs séparés par des virgules
          })
          .then(response => {
            setConditions(response.data);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des conditions :", error);
            setError("Erreur lors de la récupération des conditions.");
          });
        })
        .catch(error => {
          console.error("Erreur lors de la récupération de l'événement :", error);
          setError("Erreur lors de la récupération de l'événement.");
        });
    }
  }, [id]);

  const handleDeleteCondition = (id: string) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleAddCondition = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get('type') || !formData.get('description') || !formData.get('label')) {
      setError('Veuillez remplir tous les champs correctement.');
      return;
    }

    const newCondition: Condition = {
      id: (conditions.length + 1).toString(),
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      label: formData.get('label') as string,
      code: conditions.length + 1 // Ici, vous pouvez définir la logique pour le code
    };

    setConditions([...conditions, newCondition]);
    event.currentTarget.reset();
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl p-2">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Paramétrer l'Événement</h2>
        <form className="space-y-6 max-w-full w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBarcode} />
                <input 
                  type="text" 
                  className="mt-1 block w-full p-2 border rounded" 
                  value={code} 
                  readOnly 
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faTag} />
                <input 
                  type="text" 
                  className="mt-1 block w-full p-2 border rounded" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Typologie cible</label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBullseye} />
                <input 
                  type="text" 
                  className="mt-1 block w-full p-2 border rounded" 
                  value={typologieCible} 
                  onChange={(e) => setTypologieCible(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Produits cibles</label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBoxOpen} />
                <input 
                  type="text" 
                  className="mt-1 block w-full p-2 border rounded" 
                  value={produitCible} 
                  onChange={(e) => setProduitCible(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">Points si une condition est vérifiée</label>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCoins} />
              <input 
                type="number" 
                className="mt-1 block w-full p-2 border rounded" 
                value={points} 
                onChange={(e) => setPoints(parseInt(e.target.value, 10))}
              />
            </div>
          </div>

          {/* Conditions Points */}
          <div className="flex flex-col space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">Conditions de Points</label>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheckCircle} />
              <div 
                className="mt-1 block w-full p-2 border rounded bg-white flex flex-wrap items-center"
                style={{ minHeight: '40px' }}
              >
                {conditions.map((condition, index) => (
                  <div key={condition.id} className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 flex items-center space-x-2 m-1">
                    <span>
                      {condition.code} - Type: {condition.type}, {condition.label} | Description: {condition.description}
                    </span>
                    <button onClick={() => handleDeleteCondition(condition.id)} className="text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {index < conditions.length - 1 && (
                      <span className="text-gray-900 mx-1">OU</span>
                    )}
                  </div>
                ))}
              </div>
              <Sheet>
                <SheetTrigger>
                  <button type="button" className="p-2 border rounded text-gray-700">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Ajouter une Condition de Points</SheetTitle>
                    <SheetDescription>
                      Définir les conditions pour l'accumulation de points.
                    </SheetDescription>
                  </SheetHeader>
                  <form className="space-y-4" onSubmit={handleAddCondition}>
                    <div className="flex flex-col space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select 
                        className="mt-1 block w-full p-2 border rounded" 
                        value={selectedType} 
                        onChange={handleTypeChange}
                        name="type"
                      >
                        <option value="Montant">Montant</option>
                        <option value="TypeT">Type de Transaction</option>
                        <option value="Frequence">Fréquence</option>
                        <option value="VIP">VIP</option>
                        <option value="Compte">Compte</option>
                        <option value="Produit">Produit</option>
                        <option value="ModeDeTransaction">Mode de Transaction</option>
                        <option value="Objectif">Objectif</option>
                        <option value="CatégorieClient">Catégorie Client</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Label</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full p-2 border rounded"
                        name="label"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input 
                        type="text" 
                        className="mt-1 block w-full p-2 border rounded"
                        name="description"
                      />
                    </div>

                    
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Ajouter</button>

                  </form>
                </SheetContent>
              </Sheet>
            </div>
          </div>


          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default FormulaireParametrage;