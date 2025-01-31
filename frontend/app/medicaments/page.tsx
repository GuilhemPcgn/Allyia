"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Dock from "@/components/Dock";
import MedicamentCard from "@/components/MedicamentCard";
import PharmacyList from "@/components/PharmacyList";

const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: 48.8566,
    lng: 2.3522,
};

export default function Medicaments() {
    const [searchQuery, setSearchQuery] = useState("");
    const [addressQuery, setAddressQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState("medicaments");
    const [pharmacies, setPharmacies] = useState([
        {
            id: 1,
            name: "Pharmacie du Centre",
            address: "123 rue de Paris",
            distance: "500m",
            isOpen: true,
            position: { lat: 48.8566, lng: 2.3522 },
            rating: 4.5,
            reviewCount: 127,
            hours: {
                lundi: { open: "09:00", close: "19:30" },
                mardi: { open: "09:00", close: "19:30" },
                mercredi: { open: "09:00", close: "19:30" },
                jeudi: { open: "09:00", close: "19:30" },
                vendredi: { open: "09:00", close: "19:30" },
                samedi: { open: "09:30", close: "19:00" },
                dimanche: { open: "10:00", close: "13:00" }
            },
            reviews: [
                {
                    id: 1,
                    author: "Marie L.",
                    rating: 5,
                    date: "2024-01-15",
                    comment: "Personnel très professionnel et de bon conseil."
                },
                {
                    id: 2,
                    author: "Pierre D.",
                    rating: 4,
                    date: "2024-01-10",
                    comment: "Pharmacie bien située avec un large choix de produits."
                }
            ]
        },
        {
            id: 2,
            name: "Pharmacie de la Gare",
            address: "45 avenue de la République",
            distance: "750m",
            isOpen: false,
            position: { lat: 48.8576, lng: 2.3532 },
            rating: 4.2,
            reviewCount: 85,
            hours: {
                lundi: { open: "08:30", close: "20:00" },
                mardi: { open: "08:30", close: "20:00" },
                mercredi: { open: "08:30", close: "20:00" },
                jeudi: { open: "08:30", close: "20:00" },
                vendredi: { open: "08:30", close: "20:00" },
                samedi: { open: "09:00", close: "19:30" },
                dimanche: { open: null, close: null }
            },
            reviews: [
                {
                    id: 1,
                    author: "Sophie M.",
                    rating: 4,
                    date: "2024-01-20",
                    comment: "Service rapide et efficace."
                },
                {
                    id: 2,
                    author: "Jean R.",
                    rating: 5,
                    date: "2024-01-18",
                    comment: "Équipe très sympathique et disponible."
                }
            ]
        }
    ]);
    const [medicaments, setMedicaments] = useState([
        {
            id: 1,
            nom: "Doliprane",
            posologie: "1000mg",
            frequence: "3 fois par jour",
            duree: "7 jours",
            prochaineDose: "2024-01-30T08:00:00",
            effetsSecondaires: [
                "Maux de tête",
                "Nausées",
                "Vertiges"
            ]
        }
    ]);

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setAddressQuery("Votre position actuelle");
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <Dock />

            <div className="p-8 pb-32 max-w-7xl mx-auto space-y-8">
                <Tabs
                    defaultValue="medicaments"
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full"
                >
                    <div className="relative">
                        <TabsList className="w-full justify-start bg-transparent border-b border-gray-200">
                            <TabsTrigger
                                value="medicaments"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8"
                            >
                                Médicaments
                            </TabsTrigger>
                            <TabsTrigger
                                value="pharmacies"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8"
                            >
                                Pharmacies
                            </TabsTrigger>
                        </TabsList>
                        <div
                            className="absolute bottom-0 h-0.5 bg-[hsl(var(--lavender))] transition-all duration-300"
                            style={{
                                left: selectedTab === "medicaments" ? "0" : "50%",
                                width: "50%",
                            }}
                        />
                    </div>

                    <TabsContent value="medicaments" className="mt-6">
                        <div className="relative mb-8">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Rechercher un médicament..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white"
                            />
                        </div>

                        <ScrollArea className="w-full whitespace-nowrap rounded-xl">
                            <div className="flex space-x-4 p-4">
                                {medicaments.map((medicament) => (
                                    <MedicamentCard
                                        key={medicament.id}
                                        medicament={medicament}
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="pharmacies" className="mt-6">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Entrez une adresse..."
                                        value={addressQuery}
                                        onChange={(e) => setAddressQuery(e.target.value)}
                                        className="pl-10 bg-white"
                                    />
                                </div>
                                <Button
                                    onClick={handleGeolocation}
                                    variant="outline"
                                    className="flex items-center gap-2 rounded-full"
                                >
                                    <MapPin className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="p-0 overflow-hidden">
                                    <LoadScript googleMapsApiKey="AIzaSyAoLLyhZKt5uQGJ6xaXQ7paBxdpE_El_pY">
                                        <GoogleMap
                                            mapContainerStyle={mapContainerStyle}
                                            center={center}
                                            zoom={14}
                                        >
                                            {pharmacies.map((pharmacy) => (
                                                <MarkerF
                                                    key={pharmacy.id}
                                                    position={pharmacy.position}
                                                    title={pharmacy.name}
                                                />
                                            ))}
                                        </GoogleMap>
                                    </LoadScript>
                                </Card>

                                <PharmacyList pharmacies={pharmacies} />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}