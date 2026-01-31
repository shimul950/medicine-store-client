import ProductCard from "@/components/modules/medicines/medicineCard";
import { getAllMedicines } from "@/services/product.service";
import { MedicineInput } from "@/types/medicine.input";


const MedicinePage = async() => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const {data} = await getAllMedicines();
    
    return (
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-5">
            {data?.map((product:MedicineInput) => (
                <ProductCard key = {product.id} medicine = {product}/>
            ))}
        </div>
    );
};

export default MedicinePage;