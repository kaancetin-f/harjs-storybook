import { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { Input } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";

// Karmaşık ve iç içe geçmiş nesne mimarilerini kontrol panelinde düzleştirip yönetmek için tip tanımı
type StoryProps = React.ComponentProps<typeof Input.Phone> & {
  borderRadius?: BorderRadiuses;
  valuesOption?: string;
  valuesValue?: string;
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Inputs/Phone",
  component: Input.Phone,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replace(/<Phone/g, "<Input.Phone").replace(/<\/Phone/g, "</Input.Phone");
        },
      },
    },
  },
  argTypes: {
    placeholder: {
      name: "Placeholder",
      control: { type: "text" },
      description: "Telefon girdisi alanının amacını belirten yer tutucu metindir.",
      table: { type: { summary: "string" } },
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
      description: "Telefon girdi alanının görsel çerçeve ve arka plan tasarım stil varyasyonunu belirler.",
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
      description: "Bileşen odaklandığında (focus) veya aktifleştiğinde uygulanacak renk temasını seçer.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Light" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak ülke kodu seçimini ve telefon numarası girişini engeller.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    // Orijinal arayüzden gelen karmaşık iç yapıları dökümantasyon tablosunda gizliyoruz
    border: { table: { disable: true } },
    validation: { table: { disable: true } },
    values: { table: { disable: true } },

    // #region Ülke Kodu ve Veri Ayarları
    options: {
      name: "Country Options",
      control: { type: "object" },
      description:
        "Select bileşeni içerisinde listelenecek ülke kodları ve maske şablonu değerlerini içeren dizi tanımıdır.",
      table: {
        category: "Veri Yapılandırma Ayarları",
        type: { summary: "Option[]" },
      },
    },

    valuesOption: {
      name: "Selected Country Value (Option)",
      control: { type: "text" },
      description: "Aktif olarak seçili olan ülkenin kodunu veya değer eşleşmesini belirler (Örn: TR).",
      table: {
        category: "Veri Yapılandırma Ayarları",
        type: { summary: "string" },
      },
    },

    valuesValue: {
      name: "Input Value",
      control: { type: "text" },
      description: "Girdi alanına yazılan ham veya formatlanmış telefon numarası değerini temsil eder.",
      table: {
        category: "Veri Yapılandırma Ayarları",
        type: { summary: "string" },
      },
    },
    // #endregion

    // #region Border Ayarları
    borderRadius: {
      name: "Radius",
      control: { type: "select" },
      options: ["sm", "lg", "xl", "xxl", "pill", "none"],
      labels: {
        sm: "Küçük (SM)",
        lg: "Büyük (LG)",
        xl: "Çok Büyük (XL)",
        xxl: "Daha Büyük (XXL)",
        pill: "Kapsül (PILL)",
        none: "Kenarlık Yok (NONE)",
      },
      description: "Telefon girdi bileşeninin köşe yuvarlatma (radius) değerini yapılandırır.",
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
      description:
        "Bileşen için gösterilecek aktif hata mesajını tanımlar. Dolu olduğunda bağlı select ve input alanları kırmızıya döner.",
      table: {
        category: "Doğrulama Ayarları",
        type: { summary: "string" },
      },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, hata mesajı tetiklendiği an sayfayı otomatik olarak ilgili bileşenin hizasına kaydırır.",
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
    placeholder: "Telefon Numaranız",
    variant: "outlined",
    color: "light",
    borderRadius: "sm",
    disabled: false,
    valuesOption: "TR",
    valuesValue: "5551234567",
    validationText: "",
    validationScrollTo: false,
    options: [
      { value: "TR", text: "Türkiye (+90)" },
      { value: "US", text: "USA (+1)" },
      { value: "DE", text: "Almanya (+49)" },
    ],
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ borderRadius, valuesOption, valuesValue, validationText, validationScrollTo, ...args }) => {
    // Storybook üzerinde giriş ve seçimlerin dinamik çalışabilmesi için state kancaları
    const [currentOption, setCurrentOption] = useState<string | undefined>(valuesOption);
    const [currentValue, setCurrentValue] = useState<string | number | undefined>(valuesValue);

    // Düzleştirilmiş validation nesnesini yapılandırma
    const validationObj = validationText
      ? { validation: { text: validationText, scrollTo: validationScrollTo } }
      : { validation: undefined };

    return (
      <div style={{ width: "300px" }}>
        <Input.Phone
          {...args}
          border={{ radius: borderRadius as any }}
          values={{
            option: currentOption,
            value: currentValue,
          }}
          {...validationObj}
          onSelected={(option) => {
            setCurrentOption(option?.value as string);
            args.onSelected?.(option);
          }}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
        />
      </div>
    );
  },
};
