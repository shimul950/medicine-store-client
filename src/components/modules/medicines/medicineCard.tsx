
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MedicineInput } from "@/types/medicine.input";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({ medicine }: { medicine: MedicineInput }) => {
    
    return (
        <div className="h-120 w-full">
            <Card className="p-3 h-full flex flex-col border hover:shadow-lg transition-all duration-300">
                {/* Product Image */}
                <CardHeader className="p-0 aspect-square overflow-hidden rounded-lg relative">
                    <Link href={`/api/medicine/${medicine?.id}`} >
                        <Image
                            src="https://media.istockphoto.com/id/1156359059/photo/macro-photo-of-blue-and-white-capsule-isolated.jpg?s=612x612&w=0&k=20&c=YRF774nVhQE4ET5SKIpiPxoxcpG8zKTbngJAz1YCRms=" // your static image
                            alt={medicine?.name}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </Link>
                </CardHeader>

                {/* Product Info */}
                <CardContent className="p-0 mt-3 flex-1 space-y-2">
                    <Link href={`/api/medicine/${medicine?.id}`}>
                        <CardTitle className="font-semibold text-base sm:text-lg line-clamp-2 min-h-[3rem]">
                            {medicine?.name}
                        </CardTitle>
                    </Link>

                    <p className="text-gray-600 text-sm line-clamp-2">
                        {medicine?.description}
                    </p>

                    <div className="font-bold text-lg sm:text-xl mt-2">
                        ৳{Number(medicine?.price ?? 0).toFixed(2)}
                    </div>
                </CardContent>

                <CardFooter className="p-0 mt-3 sm:mt-4">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-2 w-full">
                            <Link
                                href={`/medicines/${medicine?.id}`}
                                className="flex-1"
                            >
                                <Button
                                    size="sm"
                                    className="w-full bg-green-500  text-white hover:bg-secondary/90 hover:text-primary"
                                >
                                    Details
                                </Button>
                            </Link>

                            <Button
                                disabled={medicine?.stock === 0}
                                size="sm"
                                className="flex-1 bg-blue-800 hover:bg-primary/90 hover:text-secondary text-primary"
                            // onClick={() => handleAddProduct(product)}
                            >
                                <ShoppingCart className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Add to Cart</span>
                            </Button>
                        </div>

                        
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCard;