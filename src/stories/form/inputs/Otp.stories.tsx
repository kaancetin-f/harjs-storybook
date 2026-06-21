import { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Input } from "ar-design";

type StoryProps = React.ComponentProps<typeof Input.Otp> & {};

const meta: Meta<StoryProps> = {
  title: "FORM/Inputs/Otp",
  component: Input.Otp,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replace(/<Otp/g, "<Input.Otp").replace(/<\/Otp/g, "</Input.Otp");
        },
      },
    },
  },
  argTypes: {
    character: {
      name: "Character Count",
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Üretilecek OTP kutucuklarının (karakter sınırının) toplam sayısını belirler.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "6" },
      },
    },

    variant: {
      name: "Variant",
      control: { type: "select" },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      labels: {
        filled: "Dolu (Filled)",
        surface: "Zemin (Surface)",
        outlined: "Çerçeveli (Outlined)",
        dashed: "Kesik Çizgili (Dashed)",
        borderless: "Çerçevesiz (Borderless)",
      },
      description: "OTP girdi kutucuklarının görsel çerçeve ve arka plan tasarım stil varyasyonunu belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Outlined" },
      },
    },

    color: {
      name: "Color",
      control: { type: "select" },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      labels: {
        blue: "Mavi (Blue)",
        purple: "Mor (Purple)",
        pink: "Pembe (Pink)",
        red: "Kırmızı (Red)",
        orange: "Turuncu (Orange)",
        yellow: "Sarı (Yellow)",
        green: "Yeşil (Green)",
        teal: "Camgöbeği (Teal)",
        cyan: "Açık Mavi (Cyan)",
        gray: "Gri (Gray)",
        light: "Açık Renk (Light)",
      },
      description: "Kutucuklar odaklandığında (focus) veya aktifleştiğinde uygulanacak renk temasını seçer.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Light" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Tüm OTP kutucuklarını etkileşime kapatarak veri girişini ve odaklanmayı engeller.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    character: 6,
    variant: "outlined",
    color: "light",
    disabled: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ character, ...args }) => {
    return <Input.Otp key="6" character={6} color="light" onChange={() => {}} variant="outlined" />;
  },
};
