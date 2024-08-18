import React, { useState, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';
import {
  faBarcode,
  faTag,
  faBullseye,
  faBoxOpen,
  faCoins,
  faCheckCircle,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import api from '../api/api';

interface Condition {
  id: string;
  code: number;
  type: string;
  description: string;
  label: string;
}

const FormulaireParametrage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [typologiesCible, setTypologiesCible] = useState<string[]>([]);
  const [typologieCible, setTypologieCible] = useState("");
  const [produitsCible, setProduitsCible] = useState<any[]>([]);
  const [produitCible, setProduitCible] = useState("");
  const [points, setPoints] = useState(0);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedCode, setSelectedCode] = useState(0);
  const [allConditions, setAllConditions] = useState<Condition[]>([]);
  const [selectOptions, setSelectOptions] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`${api}events/event/${id}`)
        .then((response) => {
          const eventData = response.data;
          setEvent(eventData);
          setCode(eventData.code);
          setDescription(eventData.description);
          setTypologieCible(eventData.typologie);
          setProduitCible(eventData.produit);
          setPoints(eventData.points);

          if (eventData.conditionCode && eventData.conditionCode.length > 0) {
            axios.get(`${api}conditions/conditions`, {
              params: { ids: eventData.conditionCode.join(",") },
            })
              .then((response) => {
                setConditions(response.data);
              })
              .catch((error) => {
                console.error("Erreur lors de la récupération des conditions :", error);
                setError("Erreur lors de la récupération des conditions.");
              });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'événement :", error);
          setError("Erreur lors de la récupération de l'événement.");
        });
    }
  }, [id]);

  useEffect(() => {
    axios.get(`${api}conditions/all`)
      .then((response) => {
        setAllConditions(response.data);
        const options = response.data.map((condition: Condition) => ({
          value: condition.id,
          label: `${condition.code} - ${condition.label}`
        }));
        setSelectOptions(options);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des conditions :", error);
        setError("Erreur lors de la récupération des conditions.");
      });
  }, []);

  useEffect(() => {
    axios.get(`${api}products/domains`)
      .then((response) => {
        setTypologiesCible(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des typologies :", error);
        setError("Erreur lors de la récupération des typologies.");
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    const eventData = {
       code,
       description,
       typologie: typologieCible,
       produit: produitCible,
       points,
       conditionCode: conditions.length > 0 ? conditions.map(condition => condition.code) : [],
    };
 
    const saveOrUpdateEvent = id
       ? axios.put(`${api}events/update/${id}`, eventData)
       : axios.post(`${api}events/save`, eventData);
 
    saveOrUpdateEvent
       .then(response => {
          console.log("Événement sauvegardé avec succès :", response.data);
          navigate('/dashboard');
       })
       .catch(error => {
          console.error("Erreur lors de la sauvegarde de l'événement :", error.response?.data || error.message);
          setError(`Erreur lors de la sauvegarde de l'événement : ${error.response?.data?.message || error.message}`);
       });
 };
 
  

  const handleTypologieCibleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTypologie = event.target.value;
    setTypologieCible(selectedTypologie);
    axios.get(`${api}products/product/${selectedTypologie}`)
      .then((response) => {
        setProduitsCible(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
        setError("Erreur lors de la récupération des produits.");
      });
  };

  const handleDeleteCondition = (id: string) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleAddCondition = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Empêche la soumission globale
  
    if (!selectedCondition) {
      setError("Veuillez sélectionner une condition.");
      return;
    }
  
    const newCondition: Condition = {
      ...selectedCondition,
      label: selectedLabel,
      description: selectedDescription
    };
  
    const conditionExists = conditions.some(c => c.id === newCondition.id);
    if (!conditionExists) {
      setConditions([...conditions, newCondition]);
    } else {
      setError("La condition est déjà présente.");
    }
  
    setSelectedCondition(null);
    setSelectedLabel("");
    setSelectedDescription("");
    setSelectedCode(0);
    setError(null);
  };
  
  

  const handleConditionChange = (selectedOption: any) => {
    const condition = allConditions.find(c => c.id === selectedOption.value);
    
    if (condition) {
      setSelectedCondition(condition);
      setSelectedLabel(condition.label);
      setSelectedDescription(condition.description);
      setSelectedCode(condition.code);
    } else {
      setSelectedCondition(null);
      setSelectedLabel("");
      setSelectedDescription("");
      setSelectedCode(0);
    }
  };
  return (
    <div className="w-full max-w-4xl p-2">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Paramétrer l'Événement</h2>
        <form className="space-y-6 max-w-full w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Code
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Typologie cible
              </label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBullseye} />
                {/* <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded"
                  value={typologieCible}
                  onChange={(e) => setTypologieCible(e.target.value)}
                /> */}
                <select
                  className="mt-1 block w-full p-2 border rounded"
                  value={typologiesCible[0]}
                  onChange={handleTypologieCibleChange}
                  name="typologieCible"
                >
                  {typologiesCible &&
                    typologiesCible.length > 0 &&
                    typologiesCible.map((typologie: string) => (
                      <option key={typologie} value={typologie}>
                        {typologie}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Produits cibles
              </label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBoxOpen} />
                {/* <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded"
                  value={produitCible}
                  onChange={(e) => setProduitCible(e.target.value)}
                /> */}
                <select
                  className="mt-1 block w-full p-2 border rounded"
                  value={produitsCible[0]}
                  onChange={(e) => setProduitCible(e.target.value)}
                  name="typologieCible"
                >
                  {produitsCible &&
                    produitsCible.length > 0 &&
                    produitsCible.map((produit: any) => (
                      <option
                        key={produit.fuctionalId}
                        value={produit.functionalId}
                      >
                        {produit.functionalId}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Points si une condition est vérifiée
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Conditions de Points
            </label>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheckCircle} />
              <div
                className="mt-1 block w-full p-2 border rounded bg-white flex flex-wrap items-center"
                style={{ minHeight: "40px" }}
              >
                {conditions.map((condition, index) => (
                  <div
                    key={condition.id}
                    className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 flex items-center space-x-2 m-1"
                  >
                    <span>
                      {condition.code} - Type: {condition.type},{" "}
                      {condition.label} | Description: {condition.description}
                    </span>
                    <button
                      onClick={() => handleDeleteCondition(condition.id)}
                      className="text-red-500"
                    >
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
                  <button
                    type="button"
                    className="p-2 border rounded text-gray-700"
                  >
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
          <label className="block text-sm font-medium text-gray-700">Sélectionner Condition</label>
          <Select
            options={selectOptions}
            onChange={handleConditionChange}
            placeholder="Rechercher une condition..."
            isClearable
            isSearchable
          />
        </div>

    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">Code</label>
      <input
        type="number"
        className="mt-1 block w-full p-2 border rounded"
        name="code"
        value={selectedCode}
        readOnly
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">Type</label>
      <input
        type="text"
        className="mt-1 block w-full p-2 border rounded"
        name="type"
        value={selectedCondition?.type || ""}
        readOnly
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">Label</label>
      <input
        type="text"
        className="mt-1 block w-full p-2 border rounded"
        name="label"
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        className="mt-1 block w-full p-2 border rounded"
        name="description"
        value={selectedDescription}
        onChange={(e) => setSelectedDescription(e.target.value)}
      />
    </div>

    {error && <p className="text-red-600 text-sm">{error}</p>}
    <button
      type="submit"
      className="bg-orange-500 text-white px-4 py-2 rounded"
    >
      Ajouter
    </button>
  </form>
</SheetContent>
              </Sheet>
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulaireParametrage;
