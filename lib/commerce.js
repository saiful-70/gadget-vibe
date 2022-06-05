import CommerceSDK from "@chec/commerce.js";

export const commerce = new CommerceSDK(
  process.env.NEXT_PUBLIC_commercejs_public_key,
  true
);
