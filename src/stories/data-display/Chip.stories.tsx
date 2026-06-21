import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";

// Karmaşık nesne ve global props yapılarını kontrol panelinde düzleştirmek için genişletilmiş tip tanımı
type StoryProps = React.ComponentProps<typeof Chip> & {
  borderRadius?: BorderRadiuses;
  showIcon?: boolean;
};

// SVG render döngüsünün Storybook'u dondurmasını engellemek için ikon bileşenini DIŞARIDA tanımlıyoruz
const MockIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    text: {
      name: "Text",
      control: { type: "text" },
      description: "Chip içerisinde görüntülenecek olan etiket metnidir.",
      table: { type: { summary: "string" } },
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
      table: { type: { summary: "string" }, defaultValue: { summary: "outlined" } },
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
      description: "Chip bileşenine uygulanacak kurumsal renk temasını seçer.",
      table: { type: { summary: "string" }, defaultValue: { summary: "light" } },
    },

    customColor: {
      name: "Custom Color",
      control: { type: "color" },
      description:
        "Kurumsal renkler dışında, inline style olarak arka plana atanacak özel HEX/RGB renk kodudur. Aktif edildiğinde yazı rengini otomatik olarak siyaha çeker.",
      table: { type: { summary: "string" } },
    },

    showIcon: {
      name: "Show Icon",
      control: { type: "boolean" },
      description: "Metnin sol tarafına kurumsal/özel bir ikon yerleştirilmesini simüle eder.",
      table: { category: "Görsel Ayarlar", type: { summary: "boolean" } },
    },

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
          none: "Keskin Köşe (NONE)",
        },
      },
      options: ["sm", "lg", "xl", "xxl", "pill", "none"],
      description: "Chip gövdesinin köşe yuvarlatma yapısını belirler.",
      table: { category: "Görsel Ayarlar", type: { summary: "string" }, defaultValue: { summary: "sm" } },
    },

    // Orijinal nesne proplarını kontrol panelinde gizliyoruz
    border: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const ChipComponent = Chip;

export const Editor: Story = {
  args: {
    text: "Yeni Özellik",
    variant: "outlined",
    color: "light",
    customColor: undefined,
    borderRadius: "sm",
    showIcon: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { borderRadius = "sm", showIcon, ...args } = context;

    // Düzleştirilmiş nesneleri orijinal yapılarına geri dönüştürme
    const borderObj = { radius: borderRadius as BorderRadiuses };
    const iconObj = showIcon ? { element: MockIcon } : undefined;

    return <ChipComponent {...args} border={borderObj} icon={iconObj} />;
  },
};
