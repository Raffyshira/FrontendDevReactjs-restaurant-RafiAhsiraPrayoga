// utility className
import { cn } from "@/lib/utils.ts";


const Container = ({ children, className }) => {
    return (
        <>
            <section
                className={cn(
                    "max-w-3xl w-full h-full mx-auto px-5 py-5 md:px-8 md:py-8",
                    className
                )}
            >
                {children}
            </section>
        </>
    );
};

export default Container;