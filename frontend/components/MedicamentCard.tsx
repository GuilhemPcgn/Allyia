"use clien";

import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MedicamentCard({ medicament }) {
    const {
        nom,
        posologie,
        frequence,
        duree,
        prochaineDose,
        effetsSecondaires
    } = medicament;

    const prochaineDoseFormatted = formatDistanceToNow(new Date(prochaineDose), {
        addSuffix: true,
        locale: fr
    });

    return (
        <Card className="p-6 w-[300px] inline-block">
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{nom}</h3>
                    <p className="text-sm text-gray-500">{posologie}</p>
                </div>

                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-medieum text-gray-600">Fréquence</p>
                        <p className="text-sm text-gray-800">{frequence}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-600">Durée du traitement</p>
                        <p className="text-sm text-gray-800">{duree}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-600"> Prochaine dose</p>
                        <p className="text-sm text-gray-800">{prochaineDoseFormatted}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-600"> Effets secondaires principaux</p>
                        <ul className="text-sm text-gray-600">
                            {effetsSecondaires.slice(0, 3).map((effet: string, index: number) => {
                                <li key={index}>{effet}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    );
}