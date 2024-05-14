import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealDetail from '../../components/MealDeatail'; // Import the updated MealDetail component
import "./FetchData.css";

function FetchData() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Beef');
    const [meals, setMeals] = useState([]);
    const [likedMeals, setLikedMeals] = useState(() => {
        const savedLikedMeals = localStorage.getItem('likedMeals');
        return savedLikedMeals ? JSON.parse(savedLikedMeals) : [];
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                const allCategories = response.data.categories;
                
                const desiredCategories = allCategories.filter(category =>
                    ['Chicken', 'Pork', 'Beef', 'Lamb', 'Seafood'].includes(category.strCategory)
                );
                
                setCategories(desiredCategories);
                fetchMealsByCategory('Beef');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    const fetchMealsByCategory = async (category) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            setMeals(response.data.meals || []); 
            setSelectedCategory(category);
        } catch (error) {
            console.error(`Error fetching meals for category ${category}:`, error);
        }
    };

    const toggleLikeMeal = (mealId) => {
        const isMealLiked = likedMeals.includes(mealId);
        if (isMealLiked) {
            const updatedLikedMeals = likedMeals.filter((id) => id !== mealId);
            setLikedMeals(updatedLikedMeals);
        } else {
            const updatedLikedMeals = [...likedMeals, mealId];
            setLikedMeals(updatedLikedMeals);
        }
    };

    const openModal = (mealId) => {
        setSelectedMealId(mealId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMealId(null);
    };

    useEffect(() => {
        localStorage.setItem('likedMeals', JSON.stringify(likedMeals));
    }, [likedMeals]);

    return (
        <div className="max-w-screen-xl mx-auto p-6">
            <div className="flex justify-center flex-wrap gap-4">
                {categories.map((category) => (
                    <button
                        key={category.idCategory}
                        className={`inline-block py-2 px-4 rounded-full bg-pink-500 text-white font-semibold focus:outline-none ${selectedCategory === category.strCategory ? 'bg-pink-600' : ''}`}
                        onClick={() => fetchMealsByCategory(category.strCategory)}
                    >
                        {category.strCategory}
                    </button>
                ))}
            </div>

            {selectedCategory && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {meals.map((meal) => (
                        <div key={meal.idMeal} className="bg-white rounded-lg shadow-md p-4 relative" onClick={() => openModal(meal.idMeal)}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            <p className="text-xl font-semibold">{meal.strMeal}</p>
                            <button
                                className={`absolute bottom-4 right-4 w-8 h-8 bg-transparent border-2 border-gray-400 rounded-full transition-colors ${likedMeals.includes(meal.idMeal) ? 'bg-red-500 border-red-500' : 'text-gray-400 hover:bg-gray-200'}`}
                                onClick={(e) => { e.stopPropagation(); toggleLikeMeal(meal.idMeal); }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 mx-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

                {showModal && (
                    <div className="modal-container">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <MealDetail mealId={selectedMealId} onClose={closeModal} />
                        </div>
                    </div>
                )}
        </div>
    );
}

export default FetchData;