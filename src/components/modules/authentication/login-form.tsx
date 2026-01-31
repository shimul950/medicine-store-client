"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "@tanstack/react-form"
import { Field } from "../../ui/field"

import { Button } from "@/components/ui/button"

import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().min(4, "This field is required")
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });

      } catch (err) {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    }
  })

  const handlelogin = () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    });
    console.log(data);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>LogIn with an account</CardTitle>
        <CardDescription>
          Enter your information below to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <>
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}

                      />

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  </>
                )
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <>
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}

                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  </>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button form="login-form" type="submit" className="w-full font-bold">LogIn</Button>
        <Button onClick={() => handlelogin()} variant="outline" type="button" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
