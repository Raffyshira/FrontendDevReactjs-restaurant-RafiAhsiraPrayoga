import { Button } from "@/components/ui/button";

import Container from "@/components/container";
import ApiFetch from "@/components/api_fetch";

const Homepage = () => {
    return (
        <>
            <Container>
                <div className="w-full h-full space-y-3.5 sm:w-[28rem]">
                    <h1 className="text-3xl font-semibold">Restaurant</h1>
                    <p className="font-light">
                        consequat mollit commodo veniam elit dolor reprehenderit
                        laboris elit laborum sit fugiat fugiat laborum est
                    </p>
                </div>
            </Container>
            <Container>
                <h3 className="mb-5 text-3xl">All Restaurant</h3>
                <ApiFetch />
            </Container>
        </>
    );
};

export default Homepage;
