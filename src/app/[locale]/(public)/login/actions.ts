"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getLocale } from "next-intl/server";

export async function login(formData: FormData) {
  const locale = await getLocale();
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/${locale}/error`);
  }

  revalidatePath(`/${locale}`, "layout");
  redirect(`/${locale}`);
}

export async function signup(formData: FormData) {
  const locale = await getLocale();
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/${locale}/error`);
  }

  revalidatePath(`/${locale}`, "layout");
  redirect(`/${locale}`);
}
