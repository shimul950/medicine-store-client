"use client"

import { sendFormMediDataForAdding } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addingMediService } from "@/services/product.service";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

const mediSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 character")
    .max(200, "Title must be less than 200 character"),
  description: z
    .string()
    .min(3, "Title must be at least 3 character")
    .max(500, "Title must be less than 200 character"),
  price: z
    .number()
    .min(1, "Price must be at least 1 Tk")
    .max(2000, "Price must be less than 2000 Tk"),
  stock: z
    .number()
    .min(1, "Stock must be at least 1 pieace")
    .max(500, "Stock must be less than 500 pieace"),
  categoryName: z
    .string()
    .min(1, "Category name must be at least 1 character")
    .max(50, "Category name must be less than 3 character")
})


export default function AddingMedicineFromClient() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryName: ""
    },
    validators: {
      // Add validators to the form the same way you would add them to a field
      onSubmit: mediSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const mediData = { ...value };

      try {
        const res = await sendFormMediDataForAdding(mediData)
        
        toast.success("Post Created", { id: toastId })
      } catch (err) {
        toast.error("Something went wrong", { id: toastId })
      }
    }
  })

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Medicine</CardTitle>
        <CardDescription>Please put the information.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="medi-form" onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <FieldGroup>

            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Medicine Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter Full name of Medicine"
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Provide the name of your existing Medicine.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter about medicine"
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Provide some info for your medicine.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="price"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Set Price</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder="Enter medicine price."
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Provide your beneficial price.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="stock"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Set Stock</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder="Enter medicines stock."
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Provide the number of availability of your medicine.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="categoryName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter category name."
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Provide the category name of medicine.
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
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
