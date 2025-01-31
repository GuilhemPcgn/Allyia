import axios from 'axios';
import GOOGLE_MAPS_API_KEY from '../.env';

const pharmacieController = {
getPharmacies: async (req, res) => {
    const { lat, lng, radius = 5000 } = req.query;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat}, ${lng}`,
                    radius: radius,
                    type: 'pharmacy',
                    key: GOOGLE_MAPS_API_KEY
                }
            }
        );

        const pharmacies = response.data.results.map(place => ({
            id: place.place_id,
            nom: place.name,
            adresse: place.vicinity,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            est_ouvert: place.opening_hours?.opne_now,
            photos: place.photos?.map(photo => ({
                photo_reference: photo.photo_reference
            }))
        }));

        res.json(pharmacies);
    } catch (err) {
        console.error('Erreur lors de la requête à Google Places:', err);
        res.status(500).json({ error: 'Erreur lors de la recherche des pharmacies' });
    }
},

getPharmacieById: async (req, res) => {
    const { id } = req.params;

    try {
        const detailsResponse = await axios.get(
            'https://maps.googleapis.com/maps/api/place/details/json',
            {
                params: {
                    place_id: id,
                    fields: 'name,formatted_address,geometry,rating,user_ratings_total,opening_hours,reviews,photos,formatted_phone_number,website',
                    key: GOOGLE_MAPS_API_KEY
                }
            }
        );

        const place = detailsResponse.data.result;

        const pharmacie = {
            id: place.place_id,
            nom: place.name,
            adresse: place.formatted_adress,
            telephone: place.formatted_adress,
            telephone: place.formatted_phone_number,
            website: place.website,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            rating: place.rating,
            reviewCount: place.user_ratings_total,
            est_ouvert: place.opening_hours?.open_now,
            horaires: place.opening_hours?.weekday_text?.map(jour => {
                const [dayName, hours] = jour.split(':');
                return {
                    jour: dayName,
                    heures: hours
                };
            }),
            reviews: place.reviews?.map(review => ({
                auteur: review.author_name,
                note: review.rating,
                commentaire: review.text,
                date: review.time,
                photo: review.profile_photo_url,
            }))
        };
        res.json(pharmacie);
    } catch (err) {
        console.error('Erreur lors de la requête à Google Places:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des détails de la pharmacie' });
    }
},
};

export default pharmacieController;