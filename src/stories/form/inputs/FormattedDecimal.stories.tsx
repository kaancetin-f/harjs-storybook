import React, { useState } from "react";
import { Input } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

// Karmaşık nesne ve locale yapılandırmalarını kontrol panelinde düzleştirmek için tip tanımı
type StoryProps = React.ComponentProps<typeof Input.FormattedDecimal> & {
  borderRadius?: BorderRadiuses;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Inputs/Formatted Decimal",
  component: Input.FormattedDecimal,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replace(/<FormattedDecimal/g, "<Input.FormattedDecimal")
            .replace(/<\/FormattedDecimal/g, "</Input.FormattedDecimal");
        },
      },
    },
  },
  argTypes: {
    name: {
      name: "Element Name (name)",
      control: { type: "text" },
      description: "Form elementinin backend mimarisindeki benzersiz ismini (name özniteliğini) tanımlar.",
      table: { type: { summary: "string" } },
    },

    placeholder: {
      name: "Placeholder",
      control: { type: "text" },
      description: "Girdi alanı boşken ve odaklanılmamışken arka planda gösterilecek yer tutucu metindir.",
      table: { type: { summary: "string" } },
    },

    locale: {
      name: "Locale",
      control: { type: "select" },
      options: ["tr-TR", "en-US", "de-DE", "fr-FR"],
      labels: {
        "tr-TR": "Türkçe (tr-TR -> 1.234,56)",
        "en-US": "İngilizce (en-US -> 1,234.56)",
        "de-DE": "Almanca (de-DE -> 1.234,56)",
        "fr-FR": "Fransızca (fr-FR -> 1 234,56)",
      },
      description: "Sayı formatlama işleminin hangi ülkenin ayraç standartlarına göre yapılacağını belirler.",
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
        defaultValue: { summary: "Çerçeveli (Outlined)" },
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

      description: "Bileşen odaklandığında (focus) veya aktifleştiğinde uygulanacak renk temasını seçer.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Light" },
      },
    },

    disabled: {
      name: "Disabled (Devre Dışı)",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak veri girişini ve sayı manipülasyonunu engeller.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    border: { table: { disable: true } },
    validation: { table: { disable: true } },
    digits: { table: { disable: true } },

    // #region Basamak Ayarları
    minimumFractionDigits: {
      name: "Minimum Fraction Digits",
      control: { type: "number", min: 0, max: 5 },
      description: "Virgülden sonra zorunlu olarak gösterilecek minimum ondalık basamak sayısı.",
      table: {
        category: "Basamak Yapılandırma Ayarları",
        type: { summary: "number" },
      },
    },

    maximumFractionDigits: {
      name: "Maximum Fraction Digits",
      control: { type: "number", min: 0, max: 5 },
      description: "Virgülden sonra izin verilen maksimum ondalık basamak sayısı.",
      table: {
        category: "Basamak Yapılandırma Ayarları",
        type: { summary: "number" },
      },
    },
    // #endregion

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
    name: "amount",
    placeholder: "Tutar Giriniz",
    variant: "outlined",
    color: "light",
    locale: "tr-TR",
    borderRadius: "sm",
    disabled: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    validationText: "",
    validationScrollTo: false,
    value: "1500.50",
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({
    borderRadius,
    minimumFractionDigits,
    maximumFractionDigits,
    validationText,
    validationScrollTo,
    ...args
  }) => {
    const [rawValue, setRawValue] = useState<string | number | undefined>(args.value as number);

    const digitsObj = {
      minimum: minimumFractionDigits,
      maximum: maximumFractionDigits,
    };

    const validationObj = validationText
      ? { validation: { text: validationText, scrollTo: validationScrollTo } }
      : { validation: undefined };

    return (
      <Input.FormattedDecimal
        {...args}
        value={rawValue}
        digits={digitsObj}
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
