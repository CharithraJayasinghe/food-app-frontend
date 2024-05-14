import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MealDetail({ mealId, onClose }) {
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                if (response.data.meals && response.data.meals.length > 0) {
                    setMeal(response.data.meals[0]);
                }
            } catch (error) {
                console.error(`Error fetching meal details for ID ${mealId}:`, error);
            }
        };

        fetchMealDetails();
    }, [mealId]);

    if (!meal) {
        return <p>Loading meal details...</p>;
    }

    return (
        <div>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <p className="text-xl font-semibold">{meal.strMeal}</p>
            <p>{meal.strInstructions}</p>
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
                Close
            </button>
        </div>
    );
}

export default MealDetail;