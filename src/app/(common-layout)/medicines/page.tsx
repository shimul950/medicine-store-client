import ProductCard from "@/components/modules/medicines/medicineCard";
import { getAllMedicines } from "@/services/product.service";
import { userServices } from "@/services/user.service";
import { MedicineInput } from "@/types/medicine.input";

interface MedicinePageProps {
  userId: string; // pass userId as prop
}

const MedicinePage = async ({ userId }: MedicinePageProps) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const { data } = await getAllMedicines();

  const { data : session } :any = await  userServices.getsession();
  userId = session.user.id

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {data?.map((product: MedicineInput) => (
        <ProductCard
          key={product.id}
          medicine={product}
          userId ={userId}
        />
      ))}
    </div>
  );
};

export default MedicinePage;
