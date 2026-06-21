import React, { useState } from "react";
import { Input } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

type StoryProps = React.ComponentProps<typeof Input.Decimal> & {
  borderRadius?: BorderRadiuses;
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Inputs/Decimal",
  component: Input.Decimal,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replace(/<InputComponent\.Decimal/g, "<Input.Decimal")
            .replace(/<\/InputComponent\.Decimal/g, "</Input.Decimal")
            .replace(/<Decimal/g, "<Input.Decimal")
            .replace(/<\/Decimal/g, "</Input.Decimal");
        },
      },
    },
  },
  argTypes: {
    name: {
      name: "Element Name",
      control: { type: "text" },
      description: "Form elementinin backend mimarisindeki benzersiz ismini (name özniteliğini) tanımlar.",
      table: { type: { summary: "string" } },
    },

    placeholder: {
      name: "Placeholder (Yer Tutucu)",
      control: { type: "text" },
      description: "Girdi alanı boşken ve odaklanılmamışken arka planda gösterilecek yer tutucu metindir.",
      table: { type: { summary: "string" } },
    },

    locale: {
      name: "Locale",
      control: {
        type: "select",
        // labels alanı tam olarak buraya, control nesnesinin içine taşındı
        labels: {
          "tr-TR": "Türkçe (tr-TR -> Virgül ',')",
          "en-US": "İngilizce (en-US -> Nokta '.')",
          "de-DE": "Almanca (de-DE -> Virgül ',')",
          "fr-FR": "Fransızca (fr-FR -> Virgül ',')",
        },
      },
      options: ["tr-TR", "en-US", "de-DE", "fr-FR"],
      description: "Hangi ülkenin ondalık ayraç standartlarına göre girdi denetimi yapılacağını belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "tr-TR" },
      },
    },

    variant: {
      name: "Variant",
      control: {
        type: "select",
        labels: {
          filled: "Dolu (Filled)",
          surface: "Zemin (Surface)",
          outlined: "Çerçeveli (Outlined)",
          dashed: "Kesik Çizgili (Dashed)",
          borderless: "Çerçevesiz (Borderless)",
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      description: "Girdi alanının görsel çerçeve ve arka plan tasarım stil varyasyonunu belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Outlined" },
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
      description: "Bileşen odaklandığında (focus) vai aktifleştiğinde uygulanacak renk temasını seçer.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Light" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak veri girişini ve sayı manipülasyonunu engeller.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    value: { table: { disable: true } },
    border: { table: { disable: true } },
    validation: { table: { disable: true } },

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
      description: "Girdi alanının köşe yuvarlatma (radius) değerini yapılandırır.",
      table: {
        category: "Border Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Küçük (SM)" },
      },
    },
    // #endregion

    // #region Doğrulama Ayarları
    validationText: {
      name: "Validation Message",
      control: { type: "text" },
      description: "Bileşen için gösterilecek aktif hata mesajını tanımlar. Dolu olduğunda çerçeve kırmızıya döner.",
      table: {
        category: "Doğrulama Ayarları",
        type: { summary: "string" },
      },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, hata mesajı tetiklendiği an sayfayı otomatik olarak bileşen hizasına kaydırır.",
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
    name: "decimal",
    placeholder: "Ondalık Sayı Giriniz",
    variant: "outlined",
    color: "light",
    locale: "tr-TR",
    borderRadius: "sm",
    disabled: false,
    validationText: "",
    validationScrollTo: false,
    value: "",
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ borderRadius, validationText, validationScrollTo, ...args }) => {
    const [rawValue, setRawValue] = useState<string | number | undefined>(args.value as number);

    const validationObj = validationText
      ? { validation: { text: validationText, scrollTo: validationScrollTo } }
      : { validation: undefined };

    return (
      <Input.Decimal
        {...args}
        value={rawValue}
        border={{ radius: borderRadius as any }}
        {...validationObj}
        onChange={(e) => {
          setRawValue(e.target.value);
          if (args.onChange) args.onChange(e);
        }}
      />
    );
  },
};
