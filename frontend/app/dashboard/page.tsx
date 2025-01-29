"use client";

import { User, Moon, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import Dock from "@/components/Dock";
import {
    LineChart as ReChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const mockData = [
    {
        jour: "Lundi",
        humeur: 7,
        anxiété: 4,
        fatigue: 6,
        "pensées positives": 8,
        "pensées négatives": 3,
    },
    {
        jour: "Mardi",
        humeur: 6,
        anxiété: 5,
        fatigue: 7,
        "pensées positives": 6,
        "pensées négatives": 4,
    },
    {
        jour: "Mercredi",
        humeur: 8,
        anxiété: 3,
        fatigue: 5,
        "pensées positives": 9,
        "pensées négatives": 2,
    },
    {
        jour: "Jeudi",
        humeur: 7,
        anxiété: 4,
        fatigue: 6,
        "pensées positives": 7,
        "pensées négatives": 3,
    },
    {
        jour: "Vendredi",
        humeur: 9,
        anxiété: 2,
        fatigue: 4,
        "pensées positives": 9,
        "pensées négatives": 1,
    },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <Dock />

            {/* Content */}
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                {/* Profile Section */}
                <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="w-20 h-20 bg-[hsl(var(--lavender))] rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-800" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Sophie Martin</h2>
                        <p className="text-gray-600">26 ans • Paris</p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Prochaine prise */}
                    <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Prochaine prise</h3>
                            <Moon className="w-5 h-5 text-[hsl(var(--lavender-dark))]" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-800">14:30</p>
                            <p className="text-gray-600">Sertraline 50mg</p>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-[hsl(var(--lavender))] h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                        </div>
                    </Card>

                    {/* Sommeil */}
                    <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Sommeil</h3>
                            <Moon className="w-5 h-5 text-[hsl(var(--mint))]" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-800">7h 30min</p>
                            <p className="text-gray-600">Dernière nuit</p>
                            <div className="flex gap-2 text-sm">
                                <span className="bg-[hsl(var(--mint))] px-2 py-1 rounded-full">Endormi à 23:15</span>
                                <span className="bg-[hsl(var(--mint))] px-2 py-1 rounded-full">Réveillé à 6:45</span>
                            </div>
                        </div>
                    </Card>

                    {/* Bien-être */}
                    <Card className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Bien-être</h3>
                            <Brain className="w-5 h-5 text-[hsl(var(--peach))]" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-800">Excellent</p>
                            <p className="text-gray-600">+15% cette semaine</p>
                            <div className="flex gap-2">
                                <span className="bg-[hsl(var(--peach))] px-3 py-1 rounded-full text-sm">😊 Positif</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Graph Card */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Suivi hebdomadaire</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="jour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="humeur" stroke="#c4b5fd" strokeWidth={2} />
                                <Line type="monotone" dataKey="anxiété" stroke="#fecaca" strokeWidth={2} />
                                <Line type="monotone" dataKey="fatigue" stroke="#bfdbfe" strokeWidth={2} />
                                <Line type="monotone" dataKey="pensées positives" stroke="#86efac" strokeWidth={2} />
                                <Line type="monotone" dataKey="pensées négatives" stroke="#fca5a5" strokeWidth={2} />
                            </ReChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}