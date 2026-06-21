"use client";

import { Input } from "ar-design";

const Page = () => (
  <Input.FormattedDecimal
    border={{
      radius: "sm",
    }}
    color="light"
    digits={{
      maximum: 2,
      minimum: 0,
    }}
    locale="tr-TR"
    name="amount"
    onChange={() => {}}
    placeholder="Tutar Giriniz (Örn: 1250,50)"
    value="1500.50"
    variant="outlined"
  />
);

export default Page;
