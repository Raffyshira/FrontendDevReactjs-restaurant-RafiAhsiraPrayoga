import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Clock7, Users } from "lucide-react";

export function CardRestaurant(props) {
    return (
        <Card className="w-full h-full max-w-sm border-none shadow-none">
            <div className="w-full h-fit bg-gray-300">
                <img
                    src={props.thumbnail_url || "/default-image.jpg"} // Gambar default jika tidak ada
                    alt={props.name}
                    className="w-full h-full object-cover aspect-square"
                    width="700"
                    height="250"
                />
            </div>
            <CardContent className="space-y-2.5 p-0 mt-2.5">
                <h2 className="text-lg font-medium">{props.name}</h2>
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon
                            key={index}
                            className={`w-4 h-4 ${
                                index < Math.floor(props.portion)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                    {props.portion % 1 !== 0 && (
                        <StarHalfIcon className="text-yellow-500 w-4 h-4" />
                    )}
                </div>
                <div className="flex items-center justify-between mt-3.5">
                    <p className="inline-flex items-center text-sm">
                        <Clock7 className="size-4 mr-1" />
                        {props.prep} min
                    </p>
                    <p className="inline-flex items-center text-sm">
                        {props.portion}
                        <Users className="size-4 ml-1" />
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-0 pt-3.5">
                <Button className="w-full bg-[#003366] text-white">
                    <a href={`/detail/${props.slug}`}>Get Recipe</a>
                </Button>
            </CardFooter>
        </Card>
    );
}

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