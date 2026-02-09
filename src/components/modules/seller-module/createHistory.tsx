import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MedicineInput } from "@/types/medicine.input";

export default function HistoryTable({medicines} : {medicines:MedicineInput[]}) {
    return (
        <Table className="border rounded">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {medicines.map((item : MedicineInput)=>(
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                    </TableRow>
                ))}
                
                
            </TableBody>
        </Table>
    )
}