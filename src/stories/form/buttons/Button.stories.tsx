import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "ar-design";
import { BorderRadiuses } from "ar-design/@types";
import React from "react";

type StoryProps = React.ComponentProps<typeof Button> & {
  borderRadius?: BorderRadiuses;
  shape?: ["circle"] | ["square"] | [];
  positionInset: ("top" | "bottom" | "left" | "right")[];
  positionType: "fixed" | "absolute";
  iconElement: "none" | "search" | "check" | "settings";
  iconPosition: "start" | "end";
};

const ICON_MAP = {
  none: null,
  search: (
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
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  check: (
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
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  settings: (
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
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
};

const meta: Meta<StoryProps> = {
  title: "FORM/Buttons/Button",
  component: Button as any,
  tags: ["autodocs"],
  parameters: {
    // 💡 1. DEĞİŞİKLİK: Sol menüde bağımsız "Docs" sayfa görünümünü zorunlu kılıyoruz
    docs: {
      autodocs: "tag",
    },
  },
  argTypes: {
    children: {
      name: "Text",
      control: { type: "text" },
      description: "Buton bileşeninin metnini veya alt çocuk elementlerini (children) belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Button" },
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
      description: "Butonun görsel stil varyasyonunu ve arka plan tasarımını belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Zemin (Surface)" },
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
      description: "Tasarım sisteminde tanımlı olan renk paleti temalarından birini butona uygular.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Yeşil (Green)" },
      },
    },

    size: {
      name: "Size",
      control: {
        type: "select",
        labels: {
          small: "Küçük (Small)",
          normal: "Orta (Normal)",
          large: "Büyük (Large)",
        },
      },
      options: ["small", "normal", "large"],
      description: "Butonun iç boşluklarını (padding) ve yazı boyutunu ölçeklendirir.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Orta (Normal)" },
      },
    },

    upperCase: {
      name: "Upper Case",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, buton içerisindeki metnin tüm harflerini otomatik olarak büyük harfe dönüştürür.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    fullWidth: {
      name: "Full Width",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, butonun parent (üst) kapsayıcısının tüm genişliğini (%100) kaplamasını sağlar.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    border: { table: { disable: true } },
    position: { table: { disable: true } },
    icon: { table: { disable: true } },

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
      description: "Kenarlık nesnesi (border) içerisindeki radius (köşe yuvarlatma) değerini yapılandırır.",
      table: {
        category: "Border Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "sm" },
      },
    },
    // #endregion

    // #region Ikon Ayarları
    shape: {
      name: "Shape",
      control: {
        type: "inline-check",
        labels: {
          circle: "Daire (Circle)",
          square: "Kare (Square)",
        },
      },
      options: ["circle", "square"],
      description: "Butonun geometrik formunu özelleştirerek daire veya kare biçimine girmesini sağlar.",
      table: {
        category: "Ikon Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "square" },
      },
    },

    iconElement: {
      name: "Icon",
      control: {
        type: "select",
        labels: {
          none: "İkon Yok (None)",
          search: "Arama İkonu (Search)",
          check: "Onay İkonu (Check)",
          settings: "Ayarlar İkonu (Settings)",
        },
      },
      options: ["none", "search", "check", "settings"],
      description: "Buton içerisine yerleştirilecek örnek ikon bileşenini seçer.",
      table: {
        category: "Ikon Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "none" },
      },
    },

    iconPosition: {
      name: "Position",
      control: {
        type: "inline-radio",
        labels: {
          start: "Başta (Start)",
          end: "Sonda (End)",
        },
      },
      options: ["start", "end"],
      description: "Seçilen ikonun buton metnine göre konumlanacağı yönü (sağ/sol) belirler.",
      table: {
        category: "Ikon Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "start" },
      },
    },
    // #endregion

    // #region Position Ayarları
    positionInset: {
      name: "Inset",
      control: {
        type: "inline-check",
        labels: {
          top: "Üst (Top)",
          bottom: "Alt (Bottom)",
          left: "Sol (Left)",
          right: "Sağ (Right)",
        },
      },
      options: ["top", "bottom", "left", "right"],
      description:
        "Konumlandırma nesnesi (position) içerisindeki CSS inset (top, bottom, left, right) yön dizilimini belirler.",
      table: {
        category: "Position Ayarları",
        type: { summary: "array" },
        defaultValue: { summary: "[]" },
      },
    },

    positionType: {
      name: "Type",
      control: {
        type: "select",
        labels: {
          absolute: "Mutlak (Absolute)",
          fixed: "Sabit (Fixed)",
        },
      },
      options: ["absolute", "fixed"],
      description: "Konumlandırma nesnesi (position) içerisindeki CSS position (absolute/fixed) tipini belirler.",
      table: {
        category: "Position Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "absolute" },
      },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    children: "Button",
    variant: "surface",
    color: "green",
    borderRadius: "sm",
    size: "normal",
    fullWidth: false,
    upperCase: false,
    iconElement: "check",
    iconPosition: "start",
    positionInset: [],
    positionType: undefined,
  },
  render: ({ children, borderRadius, shape, positionInset, positionType, iconElement, iconPosition, ...args }) => {
    const finalShape = Array.isArray(shape) && shape.length > 0 ? shape[0] : undefined;

    const hasPosition = (Array.isArray(positionInset) && positionInset.length > 0) || positionType;
    const positionObj = hasPosition ? { position: { inset: positionInset, type: positionType } } : {};

    const selectedIcon = ICON_MAP[iconElement];
    const iconObj = selectedIcon ? { icon: { element: selectedIcon, position: iconPosition } } : {};

    return (
      <Button
        {...args}
        shape={finalShape as any}
        border={{ radius: borderRadius as any }}
        {...positionObj}
        {...iconObj}
      >
        {children}
      </Button>
    );
  },
};
