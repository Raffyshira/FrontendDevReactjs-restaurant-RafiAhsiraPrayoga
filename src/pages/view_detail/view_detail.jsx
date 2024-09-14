import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";

import { Clock7, Users, ArrowLeft, Share2 } from "lucide-react";

const ViewDetail = ({ recipes }) => {
    // state
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { slug } = useParams();

    // pemanggilan api sesuai parameter slug nya
    useEffect(() => {
        if (recipes && recipes.length > 0) {
            // Jika props recipes ada, cari berdasarkan slug
            const foundRecipe = recipes.find(item => item.slug === slug);
            setRecipe(foundRecipe);
            setLoading(false);
        } else {
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
                    // jika parameter sesuai dengan yang di requesr maka di lanjutkan rendering
                    const foundRecipe = response.data.results.find(
                        item => item.slug === slug
                    );
                    setRecipe(foundRecipe);
                    // kondisi jika error dlm pemanggilan api
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [recipes, slug]); // Tambahkan slug sebagai dependensi

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // kondisi jika slug tidak sesuai atau tidak ada data slug maka merender dibawah ini
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <>
            <figure className="relative z-30">
                <img
                    src={recipe.thumbnail_url}
                    alt={recipe.name}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="aspect-video object-cover w-full h-full brightness-75"
                />
                <div className="w-full absolute top-5 z-10 flex justify-between items-center px-5">
                    <a href="/">
                        <ArrowLeft
                            className="size-5"
                            color="#fff"
                            strokeWidth={2}
                        />
                    </a>
                    <a href="/">
                        <Share2
                            className="size-5"
                            color="#fff"
                            strokeWidth={2}
                        />
                    </a>
                </div>
            </figure>
            <Container>
                <article className="border-b py-5">
                    <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                    <p className="mt-3.5 text-neutral-500">
                        {recipe.description}
                    </p>
                    <div className="flex items-center justify-start gap-x-5 mt-3.5">
                        <p className="inline-flex items-center text-sm">
                            <Clock7 className="size-4 mr-1" />
                            {recipe.total_time_minutes} min
                        </p>
                        <p className="inline-flex items-center text-sm">
                            <Users className="size-4 mr-1" />
                            {recipe.num_servings}
                        </p>
                        <p className="text-sm">Made By {recipe.show.name}</p>
                    </div>
                </article>
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-3.5">Ingredient</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {recipe.sections[0].components.map((item, index) => (
                            <li key={index}>{item.raw_text}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-3.5">
                        Instruction
                    </h3>
                    <ol className="list-decimal list-outside space-y-1 pl-4">
                        {recipe.instructions.map((item, index) => {
                            return <li key={index}>{item.display_text}</li>;
                        })}
                    </ol>
                </div>
                <Button className="w-full mt-5">
                    <a href="/">Back to Homepage</a>
                </Button>
            </Container>
        </>
    );
};

export default ViewDetail;

function StarHalfIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
        </svg>
    );
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
