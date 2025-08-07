"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";



const formSchema = z.object({
  name: z.string("nome invalido").min(3).max(50),
  email: z.email("email invalido"),
  password: z.string("senha invalida").min(8,"A Senha deve conter pelo menos 8 caracteres"),
  confirmPassword: z.string("senha invalida").min(8,"A Senha deve conter pelo menos 8 caracteres")
}).refine(
  (data) => {
    return data.password === data.confirmPassword
  }, 
  { error: "As senhas não são iguais ",
    path: ["confirmPassword"] 

  });

type FormValues = z.infer<typeof formSchema>;


const SignupForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


    function onSubmit(values: FormValues) {
        console.log("FORMULARIO ENVIADO COM ÉXITO! ^^");
        console.log(values)
    }

  return(
    <>
    <Card>
                <CardHeader>
                  <CardTitle>Se Cadastrar</CardTitle>
                  <CardDescription>
                    Crie uma nova conta gratuita e comece a explorar nossos
                    produtos.
                  </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                          />
                          <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input placeholder="email" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                        <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                              <Input placeholder="Senha" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                                              <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Confirme sua senha</FormLabel>
                          <FormControl>
                              <Input placeholder="Senha" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                        </CardContent>
                        <CardFooter>
                          <Button type="submit">Cadastre-se</Button>
                        </CardFooter>
                    </form>
                </Form>

              </Card>
    </>
  )
};

export default SignupForm;