import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "process";



export default function AddingMedicine() {
  const addMedi = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryName = formData.get("categoryName") as string;

    const data = {
      name,
      description,
      price,
      stock,
      categoryName,
    };


    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/medicine/seller/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error("Failed to add medicine");
    }

 
    redirect("/medicines");



  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Medicine</CardTitle>
        <CardDescription>Please put the information.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="medi-form" action={addMedi}>
          <FieldGroup>
            <Field>
              <FieldLabel>Medicine Name</FieldLabel>
              <Input
                name="name"
                placeholder="Enter medicine name"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <textarea
                name="description"
                placeholder="Enter about medicine"
                required
                className="w-full border rounded-md p-2"
              />
            </Field>

            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input
                type="number"
                name="price"
                placeholder="Enter medicine price"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Stock</FieldLabel>
              <Input
                type="number"
                name="stock"
                placeholder="Enter stock availability"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Category Name</FieldLabel>
              <Input
                type="text"
                name="categoryName"
                placeholder="Enter medicine category"
                required
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="medi-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
