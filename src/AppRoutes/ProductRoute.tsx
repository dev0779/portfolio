import { productSteps } from "@/features/Product/productSteps";
import {
    useParams
} from "react-router-dom";
    

export const ProductRoute = () => {
    const { slug } = useParams();

    const step = productSteps.find((step) => step.slug === slug)


    if (!step) {
        return <div> Page not found </div>;
    }

    return step.element
 }