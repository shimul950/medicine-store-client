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
import { env } from "process";



export default function CreateCategoryCard() {
  const addCategory = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
   
    const data = {
      name
    };


    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error("Failed to add Category");
    }

  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
        <CardDescription>Please put only category name.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="medi-form" action={addCategory}>
          <FieldGroup>
            <Field>
              <FieldLabel>Category name</FieldLabel>
              <Input
                name="name"
                placeholder="Enter category"
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
