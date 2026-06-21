import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "ar-design";
import React, { useState } from "react";

// Orijinal proplar ile çakışmaları önlemek ve kontrol panelini düzleştirmek için tip tanımı
type StoryProps = React.ComponentProps<typeof Checkbox> & {
  borderRadius?: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Checkbox",
  component: Checkbox as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    label: {
      name: "Label",
      control: { type: "text" },
      description: "Checkbox bileşeninin yanında listelenecek olan açıklama metnini belirler.",
      table: {
        type: { summary: "string" },
      },
    },

    color: {
      name: "Color",
      control: {
        type: "select",
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
      },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description: "Checkbox işaretlendiğinde (checked) aktif olacak tasarım sistemi renk temasını belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Mavi (Blue)" },
      },
    },

    upperCase: {
      name: "Upper Case",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, label alanına gönderilen metnin tüm harflerini otomatik olarak büyük harfe dönüştürür.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Checkbox bileşenini etkileşime kapatarak tıklanamaz duruma getirir.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    // Orijinal arayüzden gelen karmaşık nesneleri dökümantasyon tablosunda gizliyoruz
    border: { table: { disable: true } },
    validation: { table: { disable: true } },
    className: { table: { disable: true } },

    // #region Border Ayarları
    borderRadius: {
      name: "Radius",
      control: {
        type: "select",
        labels: {
          sm: "Küçük (SM)",
          lg: "Büyük (LG)",
          xl: "Çok Büyük (XL)",
          xxl: "Daha Büyük (XXL)",
          pill: "Kapsül (PILL)",
          none: "Kenarlık Yok (NONE)",
        },
      },
      options: ["sm", "lg", "xl", "xxl", "pill", "none"],
      description: "Checkbox kutusunun radius (köşe yuvarlatma) değerini yapılandırır.",
      table: {
        category: "Border Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Küçük (SM)" },
      },
    },
    // #endregion

    // #region Doğrulama Ayarları
    validationText: {
      name: "Validation Text",
      control: { type: "text" },
      description: "Bileşen için gösterilecek hata veya uyarı mesajı metnini tanımlar.",
      table: {
        category: "Doğrulama Ayarları",
        type: { summary: "string" },
      },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, doğrulama mesajı mevcutsa ilgili bileşene otomatik olarak kaydırma yapılır.",
      table: {
        category: "Doğrulama Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    label: "Kullanıcı Sözleşmesini Okudum ve Onaylıyorum",
    color: "blue",
    borderRadius: "sm",
    upperCase: false,
    disabled: false,
    validationText: "",
    validationScrollTo: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ borderRadius, validationText, validationScrollTo, ...args }) => {
    const [isChecked, setIsChecked] = useState(false);

    // Düzleştirilmiş validation propları nesneye dönüştürülüyor
    const validationObj = validationText ? { validation: { text: validationText, scrollTo: validationScrollTo } } : {};

    return (
      <Checkbox
        {...args}
        checked={isChecked}
        border={{ radius: borderRadius as any }}
        {...validationObj}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          if (args.onChange) args.onChange(e);
        }}
      />
    );
  },
};
