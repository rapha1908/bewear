"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { toast } from "sonner"
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
import { authClient } from "@/lib/auth-client";



const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type SignInFormValues = z.infer<typeof formSchema>;


const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


   async function onSubmit(values: FormValues) {
  await authClient.signIn.email({
    email: values.email,
    password: values.password,
    fetchOptions: {
      onSuccess: () => {
        router.push("/");
      },
      onError: (contexto) => {
        console.log("Código de erro:", contexto.error.code);

      if (contexto.error.code === "USER_NOT_FOUND" || contexto.error.message.includes("User not found")) {
        toast.error("E-mail não encontrado.");
        return form.setError("email", {
          message: "E-mail não encontrado.",
        });
      }

      if (contexto.error.code === "INVALID_EMAIL_OR_PASSWORD" || contexto.error.message.includes("Invalid email or password")) {
        toast.error("E-mail ou senha inválidos.");
        form.setError("email", {
          message: "E-mail ou senha inválidos.",
        });
        return form.setError("password", {
          message: "E-mail ou senha inválidos.",
        });
      }

        toast.error(contexto.error.message);
      },
    },
  });
}

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (contexto) => {
          toast.error(contexto.error.message);
        },
      },
    });
  };



  return(
    <>
    <Card>
                <CardHeader>
                  <CardTitle>Entrar</CardTitle>
                  <CardDescription>
                    Seja bem vindo novamente e comece a explorar nossos produtos.
                  </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="grid gap-6">
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
                        </CardContent>
                        <CardFooter className="flex flex-col">
                          <Button type="submit" className="w-full">Entrar</Button>
                          <Button variant="ghost" className="w-full" onClick={handleSignInWithGoogle} type="button">Entrar com o Google</Button>
                        </CardFooter>
                    </form>
                </Form>

              </Card>
    </>
  )
};

export default SignInForm;