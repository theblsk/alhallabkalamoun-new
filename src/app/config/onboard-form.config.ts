import { z } from "zod";

export const formSchema = z.object({
  first_name: z.string().min(1, "First name is required").trim(),
  last_name: z.string().min(1, "Last name is required").trim(),
  country_code: z.string().trim().default("+961"),
  phone_number: z.string().min(1, "Phone number is required").trim(),
  delivery_address: z.string().min(1, "Delivery address is required").trim(),
});

export type FormInput = z.infer<typeof formSchema>;

export const defaultFormValues: FormInput = {
  first_name: "",
  last_name: "",
  country_code: "+961",
  phone_number: "",
  delivery_address: "",
};
