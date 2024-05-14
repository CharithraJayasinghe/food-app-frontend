import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikedMeals() {
    const [likedMeals, setLikedMeals] = useState(() => {
        const savedLikedMeals = localStorage.getItem('likedMeals');
        return savedLikedMeals ? JSON.parse(savedLikedMeals) : [];
    });

    useEffect(() => {
        const savedLikedMeals = localStorage.getItem('likedMeals');
        if (savedLikedMeals) {
            setLikedMeals(JSON.parse(savedLikedMeals));
        }
    }, []);

    const removeMealFromLiked = (mealId) => {
        const updatedLikedMeals = likedMeals.filter((id) => id !== mealId);
        setLikedMeals(updatedLikedMeals);
        localStorage.setItem('likedMeals', JSON.stringify(updatedLikedMeals));
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {likedMeals.map((mealId) => (
                    <div key={mealId} className="bg-white rounded-lg shadow-md p-4 relative">
                        <MealDetail mealId={mealId} />
                        <button
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                            onClick={() => removeMealFromLiked(mealId)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MealDetail({ mealId }) {
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const fetchMealById = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                if (response.data.meals && response.data.meals.length > 0) {
                    setMeal(response.data.meals[0]);
                }
            } catch (error) {
                console.error(`Error fetching meal details for ID ${mealId}:`, error);
            }
        };

        fetchMealById();
    }, [mealId]);

    if (!meal) {
        return <p>Loading meal details...</p>;
    }

    return (
        <>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <p className="text-xl font-semibold">{meal.strMeal}</p>
        </>
    );
}

export default LikedMeals;