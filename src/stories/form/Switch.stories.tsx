import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";

type StoryProps = React.ComponentProps<typeof Switch> & {
  borderRadius?: BorderRadiuses;
  validationText?: string;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    label: {
      name: "Label (Etiket)",
      control: { type: "text" },
      description: "Switch butonunun yanında gösterilecek açıklayıcı metindir.",
      table: { type: { summary: "string" } },
    },

    checked: {
      name: "Checked",
      control: { type: "boolean" },
      description: "Bileşenin anlık olarak aktif (on) veya pasif (off) olma durumunu belirler.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
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
      description: "Switch aktif (checked) duruma getirildiğinde uygulanacak kurumsal renk temasını seçer.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Mavi (Blue)" } },
    },

    size: {
      name: "Size",
      control: {
        type: "select",
        labels: {
          small: "Küçük (Small)",
          normal: "Normal (Normal)",
          large: "Büyük (Large)",
        },
      },
      options: ["small", "normal", "large"],
      description: "Switch bileşeninin genel ölçek büyüklüğünü belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Normal (Normal)" } },
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
      description: "Bileşenin arka plan ve çerçeve görsel varyasyon stilini belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Dolu (Filled)" } },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime ve tıklamaya kapatır.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    upperCase: {
      name: "UpperCase",
      control: { type: "boolean" },
      description: "Aktif edildiğinde yanındaki etiket (label) metnini tamamen büyük harfe dönüştürür.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    // Orijinal arayüzdeki karmaşık nesneleri dökümantasyon tablosunda gizliyoruz
    border: { table: { disable: true } },
    validation: { table: { disable: true } },

    // #region Kenarlık Ayarları (border nesnesinden düzleştirildi)
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
      description: "Switch gövdesinin köşe yuvarlatma (radius) yapısını belirler.",
      table: { category: "Border Ayarları", type: { summary: "string" }, defaultValue: { summary: "Kapsül (PILL)" } },
    },
    // #endregion

    // #region Doğrulama Ayarları (validation nesnesinden düzleştirildi)
    validationText: {
      name: "Validation Message",
      control: { type: "text" },
      description: "Bileşen için hata veya doğrulama mesajı tanımlar.",
      table: { category: "Doğrulama Ayarları", type: { summary: "string" } },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    label: "Beni Hatırla",
    checked: false,
    color: "blue",
    size: "normal",
    disabled: false,
    upperCase: false,
    borderRadius: "pill",
    validationText: "",
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { borderRadius = "pill", validationText = "", checked: controlledChecked, ...args } = context;

    // Switch butonunun tıklama aksiyonunu simüle etmek ve anlık durumu kontrol etmek için state yönetimi
    const [isChecked, setIsChecked] = useState<boolean>(controlledChecked ?? false);

    // Storybook panelinden gelen checked prop'u değiştikçe state'i güncelle
    React.useEffect(() => {
      setIsChecked(controlledChecked ?? false);
    }, [controlledChecked]);

    // Düzleştirilmiş validation nesnesini geri inşa etme
    const validationObj = validationText ? { validation: { text: validationText } } : { validation: undefined };

    return (
      <Switch
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        border={{ radius: borderRadius as BorderRadiuses }}
        {...validationObj}
      />
    );
  },
};
