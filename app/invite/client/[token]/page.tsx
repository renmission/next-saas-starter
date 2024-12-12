"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { acceptClientInvitation } from "@/actions/business/acceptInvitation";
import logo from "@/public/_static/favicons/apple-touch-icon.png";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";

export default function AcceptInvitationPage({
  params,
}: {
  params: { token: string };
}) {
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  // const handleManualSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const result = await acceptClientInvitation({
  //       token: params.token,
  //       email,
  //       name,
  //     });
  //     if (result.success) {
  //       router.push("/client-dashboard");
  //     } else {
  //       console.log("Failed to accept invitation:", result);
  //       // TODO: Add error handling UI
  //     }
  //   } catch (error) {
  //     console.log("Failed to accept invitation:", error);
  //     // TODO: Add error handling UI
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: `/api/accept-invitation?token=${params.token}`,
        redirect: false,
      });
      if (result?.error) {
        console.log("Failed to sign in with Google:", result.error);
        // TODO: Add error handling UI
      }
    } catch (error) {
      console.log("Failed to sign in with Google:", error);
      // TODO: Add error handling UI
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      {/* <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Back
      </Link> */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src={logo}
            alt="Company Logo"
            width={60}
            height={60}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Accept Invitation
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to accept the invitation
          </p>
        </div>
        {/* <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 size-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Accept and Create Account"
            )}
          </button>
        </form> */}
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}
        <button
          onClick={handleGoogleSignIn}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          <Icons.google className="mr-2 size-4" />
          Google
        </button>
      </div>
    </div>
  );
}
