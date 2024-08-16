import React, { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// interface PointCondition {
//   type: string;
//   threshold: string;
//   points: number;
// }

interface Condition {
  id: number;
  type: string;
  description: string;
  label: string;
  // points: number;
}

const FormulaireParametrage: React.FC = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  // const [pointConditions, setPointConditions] = useState<PointCondition[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Montant");
  const [error, setError] = useState<string | null>(null);
  let nextId = conditions.length + 1;

  type TypeOption = {
    description: string;
    labels: string[];
  };

  type TypeOptions = {
    [key: string]: TypeOption; // Signature d'index ajoutée
  };

  const typeOptions: TypeOptions = {
    Montant: {
      description:
        "Définir le montant minimum ou maximum des transactions pour l'accumulation de points.",
      labels: ["Montant Minimum", "Montant Maximum"],
    },
    TypeT: {
      description: "Définir le type de transaction bancaire concerné.",
      labels: ["Dépôt", "Retrait", "Transfert", "Paiement"],
    },
    Fréquence: {
      description:
        "Définir la fréquence des transactions pour l'accumulation de points.",
      labels: [
        "Transaction Quotidienne",
        "Transaction Hebdomadaire",
        "Transaction Mensuelle",
      ],
    },
    VIP: {
      description: "Définir les conditions spécifiques pour les clients VIP.",
      labels: ["Client VIP", "Client Gold", "Client Platine"],
    },
    Compte: {
      description:
        "Définir les types de comptes bancaires concernés pour l'accumulation de points.",
      labels: ["Compte Épargne", "Compte Courant", "Compte Joint"],
    },
    Produit: {
      description:
        "Définir les produits bancaires concernés pour l'accumulation de points.",
      labels: ["Carte de Crédit", "Prêt Personnel", "Assurance"],
    },
    TypeDeTransaction: {
      description: "Définir le type de transaction spécifique pour les points.",
      labels: [
        "Transaction en Ligne",
        "Transaction en Agence",
        "Transaction Automatique",
      ],
    },
    Employé: {
      description:
        "Définir si la transaction est effectuée par un employé d'Attijariwafa Bank.",
      labels: ["Employé Attijariwafa", "Client Normal"],
    },
    ModeDeTransaction: {
      description:
        "Définir le mode de transaction pour l'accumulation de points.",
      labels: ["En Ligne", "En Agence", "Mobile Banking"],
    },
    Objectif: {
      description:
        "Définir les objectifs spécifiques pour l'accumulation de points.",
      labels: ["Objectif Annuel", "Objectif Trimestriel", "Objectif Mensuel"],
    },
    CatégorieClient: {
      description:
        "Définir les catégories de clients pour l'accumulation de points.",
      labels: ["Client Régulier", "Client Privilégié", "Client Corporate"],
    },
  };

  const handleDeleteCondition = (id: number) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleAddCondition = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const points = parseInt(formData.get('points') as string, 10);

    // if (!formData.get('type') || !formData.get('description') || !formData.get('label') || isNaN(points)) {
    if (
      !formData.get("type") ||
      !formData.get("description") ||
      !formData.get("label")
    ) {
      setError("Veuillez remplir tous les champs correctement.");
      return;
    }

    const newCondition: Condition = {
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      label: formData.get("label") as string,
      id: nextId++,
      // points: points,
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
          {/* Champ Code et Description */}
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
                  placeholder="Code"
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
                  placeholder="Description"
                />
              </div>
            </div>
          </div>

          {/* Champ Typologie cible et Produits cibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Typologie cible
              </label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBullseye} />
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="Typologie cible"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Produits cibles
              </label>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBoxOpen} />
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="Produits cibles"
                />
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
                placeholder="Points"
              />
            </div>
          </div>

          {/* Conditions Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conditions de Points
            </label>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheckCircle} />
              <div className="flex flex-wrap space-x-2">
                {conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 flex items-center space-x-2"
                  >
                    <span>
                      {condition.type}: si {condition.description} et{" "}
                      {condition.label}{" "}
                    </span>
                    <button
                      onClick={() => handleDeleteCondition(index)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* Afficher le "OU" uniquement entre les conditions */}
                    {conditions.length > 1 &&
                      conditions.indexOf(condition) < conditions.length - 1 && (
                        <span className="text-gray-900">OU</span>
                      )}
                  </div>
                ))}
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <select
                          name="type"
                          className="mt-1 block w-full p-2 border rounded"
                          value={selectedType}
                          onChange={handleTypeChange}
                        >
                          {Object.keys(typeOptions).map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Label
                        </label>
                        <select
                          name="label"
                          className="mt-1 block w-full p-2 border rounded"
                        >
                          {typeOptions[selectedType]?.labels.map((label) => (
                            <option key={label} value={label}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <input
                          name="description"
                          type="text"
                          className="mt-1 block w-full p-2 border rounded"
                          placeholder="Description"
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
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulaireParametrage;
