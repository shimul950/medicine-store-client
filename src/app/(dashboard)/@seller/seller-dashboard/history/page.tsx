import HistoryTable from "@/components/modules/seller-module/createHistory";
import { getAllMedicines } from "@/services/product.service";


const HistoryPage = async() => {
    const res = await getAllMedicines();
    const medicines = res.data || [];

    return (
        <div>
            <HistoryTable medicines={medicines}/>
        </div>
    );
};

export default HistoryPage;