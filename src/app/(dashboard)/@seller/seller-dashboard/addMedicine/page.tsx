import AddingMedicine from "@/components/modules/seller-module/addingMedicineFromClient";
import { getAllMedicines } from "@/services/product.service";
import { MedicineInput } from "@/types/medicine.input";


const addMedicine =async () => {
    const {data} = await getAllMedicines()
    return (
        <div>
            <AddingMedicine/>
            {data.map((item:MedicineInput) =>(<p key={item.id}>{item.name}</p>))}

        </div>
    );
};

export default addMedicine;