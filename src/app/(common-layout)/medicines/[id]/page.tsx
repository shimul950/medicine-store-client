import { Button } from "@/components/ui/button";
import { getSinglemedicine } from "@/services/product.service";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const MedicinePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: medicine } = await getSinglemedicine(id);

    if (!medicine) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Medicine details not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Card Container */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Medicine Image */}
                {medicine.image && (
                    <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-64 object-cover"
                    />
                )}

                {/* Medicine Details */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{medicine.name}</h1>
                    <p className="text-gray-600 mt-2">{medicine.description}</p>

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-green-600">
                            Price: Tk {medicine.price}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4">
                        <Button
                            disabled={medicine?.stock === 0}
                            size="sm"
                            className="flex-1 bg-blue-800 hover:bg-primary/90 hover:text-secondary text-primary"
                        // onClick={() => handleAddProduct(product)}
                        >
                            <ShoppingCart className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Add to Cart</span>
                        </Button>
                        <Link href={`http://localhost:3000/medicines`} className="flex-1 border-1 border-gray-500 hover:bg-primary/90 rounded-xl hover:text-secondary text-black text-center font-semibold">
                            <button >
                                Back to Products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicinePage;