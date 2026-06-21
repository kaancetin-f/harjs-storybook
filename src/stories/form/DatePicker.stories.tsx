import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DatePicker } from "ar-design";
import React, { useState } from "react";

type StoryProps = React.ComponentProps<typeof DatePicker> & {
  configIsClock?: boolean;
  configIsFooterButton?: boolean;
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Date Picker",
  component: DatePicker as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    placeholder: {
      name: "Placeholder",
      control: { type: "text" },
      description: "Bileşenin üst alanında yer alan ve giriş alanını tanımlayan açıklama/yer tutucu metnini belirler.",
      table: {
        type: { summary: "string" },
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
      description: "DatePicker bileşeninin alt katmanında kullanılan girdi alanının görsel stil varyasyonunu belirler.",
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
      description:
        "Bileşen aktif duruma geçtiğinde odaklanma (focus) ve takvim seçim elemanlarının renk temasını belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Gri (Gray)" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak takvimin açılmasını ve değer girilmesini engeller.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    // Orijinal arayüzden gelen karmaşık veya harici nesneleri dökümantasyon tablosunda gizliyoruz.
    config: { table: { disable: true } },
    border: { table: { disable: true } },
    status: { table: { disable: true } },
    validation: { table: { disable: true } },

    // #region Konfigürasyon Ayarları
    configIsClock: {
      name: "Toggle Clock",
      control: { type: "boolean" },
      description: "Takvim panelinin yanına saat ve dakika seçim listesini (saat entegrasyonu) ekler.",
      table: {
        category: "Konfigürasyon",
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    configIsFooterButton: {
      name: "Show Footer Buttons",
      control: { type: "boolean" },
      description: "Takvim panelinin alt alanında yer alan 'Şimdi' ve 'Tamam' aksiyon butonlarını görünür kılar.",
      table: {
        category: "Konfigürasyon",
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },
    // #endregion

    // #region Doğrulama
    validationText: {
      name: "Validation Text",
      control: { type: "text" },
      description: "Bileşen için gösterilecek hata veya uyarı mesajı metnini tanımlar.",
      table: {
        category: "Doğrulama",
        type: { summary: "string" },
      },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, doğrulama mesajı mevcutsa ilgili bileşene otomatik olarak kaydırma yapılır.",
      table: {
        category: "Doğrulama",
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
    placeholder: "Tarih Seçiniz",
    variant: "outlined",
    color: "gray",
    disabled: false,
    configIsClock: true,
    configIsFooterButton: true,
    validationText: "",
    validationScrollTo: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ configIsClock, configIsFooterButton, validationText, validationScrollTo, ...args }) => {
    const [dateValue, setDateValue] = useState<string>("");

    // Düzleştirilmiş validation propları nesneye dönüştürülüyor
    const validationObj = validationText ? { validation: { text: validationText, scrollTo: validationScrollTo } } : {};

    return (
      <DatePicker
        {...args}
        value={dateValue}
        config={{
          isClock: configIsClock,
          isFooterButton: configIsFooterButton,
        }}
        {...validationObj}
        onChange={(value) => {
          setDateValue(value);
        }}
      />
    );
  },
};
