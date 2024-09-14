import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardRestaurant } from "./card_components";

// functionality
import FilterByResto from "@/components/filter_by";

const ApiFetch = () => {
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // state filter
    const [filterTime, setTimeFilter] = useState("TimeCook");
    const [ratingFilter, setRatingFilter] = useState("Rating");
    const [isOpenNow, setIsOpenNow] = useState(false);

    // state pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // pemanggilan api berdasarkan params yang dikirim untuk api
    // untuk mengatur data yang ada berapa ubah size yang ada di params sesuai kebutuhan
    // dan tags nya di sesuaikan dengan doc api ny
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://tasty.p.rapidapi.com/recipes/list",
                    {
                        headers: {
                            "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                            "x-rapidapi-host": import.meta.env.VITE_API_HOST
                        },
                        params: {
                            from: "0",
                            size: "20",
                            tags: "under_30_minutes"
                        }
                    }
                );
                setRecipe(response.data.results);
                // Sesuaikan dengan struktur data dari API
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // filter berdasarkan lama nya memasak dari yang kurang 30 minutes atau sama dengan 30 minutes
    const filterRecipes = recipes => {
        let filtered = recipes;
        if (filterTime === "short") {
            filtered = filtered.filter(
                recipe => recipe.total_time_minutes <= 30
            ); // Resep dengan waktu ≤ 30 menit
        } else if (filterTime === "long") {
            filtered = filtered.filter(
                recipe => recipe.total_time_minutes >= 30
            ); // Resep dengan waktu >= 30 menit
        }

        // filter berdasarkan rating disini data api tidak memuat data rating jadi saya mengubah nya menjadi num_servings atau portion
        if (ratingFilter !== "Rating") {
            filtered = filtered.filter(
                recipe => recipe.num_servings === parseInt(ratingFilter)
            );
        }

        // filter open Now disini saya hanya menggunakan nilai boolean untuk mangatur logika nya
        if (isOpenNow) {
            filtered = filtered.filter(recipe => recipe.is_shoppable === true);
        }

        return filtered;
    };

    const filteredRecipes = filterRecipes(recipe);

    // logika pagination
    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // looping pagination sedehana
    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredRecipes.length / itemsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    // kondisi jika masih fase loading
    if (loading)
        return (
            <p className="grid place-content-center items-center">Loading...</p>
        );
    // kondisi jika terdapat error dalam pemanggilan api
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <FilterByResto
                timeFilterValue={filterTime}
                onTimeFilterChange={setTimeFilter}
                ratingFilterValue={ratingFilter}
                onRatingFilterChange={setRatingFilter}
                isOpenNow={isOpenNow}
                onCheckboxChange={setIsOpenNow}
            />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {currentRecipes.map(item => (
                    <CardRestaurant
                        key={item.id}
                        thumbnail_url={item.thumbnail_url}
                        name={item.name}
                        prep={item.total_time_minutes}
                        portion={item.num_servings}
                        slug={item.slug}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <ul className="pagination flex space-x-2">
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button
                                onClick={() => paginate(number)}
                                className={`px-4 py-2 border rounded-md ${
                                    number === currentPage
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500"
                                }`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ApiFetch;
