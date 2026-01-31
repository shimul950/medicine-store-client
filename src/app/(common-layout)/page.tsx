import HeroCarousel from "@/components/modules/home/slidder";
import ProductCard from "@/components/modules/medicines/medicineCard";
import { getFeaturedMedicines } from "@/services/product.service";
import { MedicineInput } from "@/types/medicine.input";



export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const { data } = await getFeaturedMedicines();
  return (
    <div>
      <HeroCarousel />
      <h1 className="text-2xl my-3 text-center font-semibold text-green-500 lg:text-4xl lg:my-5 ">Trusted <span className="text-blue-800">Essentials</span></h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-5">
        {data?.map((product: MedicineInput) => (
          <ProductCard key={product.id} medicine={product} />
        ))}
      </div>
    </div>
  );
}
