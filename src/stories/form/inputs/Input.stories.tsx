import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "ar-design";
import React, { useState } from "react";

// Karmaşık ve iç içe geçmiş nesne mimarilerini kontrol panelinde düzleştirmek için tip tanımı
type StoryProps = React.ComponentProps<typeof Input> & {
  borderRadius?: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  iconElement?: "none" | "search" | "mail" | "lock";
  iconPosition?: "start" | "end";
  addonVariant?: "filled" | "surface" | "outlined" | "dashed" | "borderless";
  addonBefore?: string;
  addonAfter?: string;
  hasButton?: boolean;
  buttonText?: string;
  buttonColor?: "blue" | "purple" | "pink" | "red" | "orange" | "yellow" | "green" | "teal" | "cyan" | "gray" | "light";
  buttonVariant?: "filled" | "surface" | "outlined" | "dashed" | "borderless";
  validationText?: string;
  validationScrollTo?: boolean;
};

// Çizgisel ve minimal SVG ikon eşleştirmeleri (currentColor uyumlu)
const ICON_MAP = {
  none: null,
  search: (
    <svg
      width="16"
      height="16"
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
  mail: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  lock: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
};

const meta: Meta<StoryProps> = {
  title: "FORM/Inputs/Input",
  component: Input as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    placeholder: {
      name: "Placeholder",
      control: { type: "text" },
      description: "Girdi alanının amacını belirten yer tutucu ve hareketli etiket (floating label) metnidir.",
      table: { type: { summary: "string" } },
    },

    type: {
      name: "Type",
      control: { type: "select" },
      options: ["text", "number", "password", "email", "tel"],
      description: "Veri giriş türünü belirler. 'number' seçildiğinde yukarı/aşağı butonları otomatik aktifleşir.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
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
      description: "Input bileşeninin görsel çerçeve ve arka plan tasarım stil varyasyonunu belirler.",
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
        defaultValue: { summary: "Açık Renk (Light)" },
      },
    },

    upperCase: {
      name: "Upper Case",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, girilen metindeki tüm harfleri (Türkçe karakter duyarlı) anlık olarak büyük harfe dönüştürür.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Input alanını ve bağlı aksiyon elemanlarını (button, number handles) etkileşime kapatır.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    // Orijinal arayüzden gelen karmaşık iç yapıları dökümantasyon tablosunda gizliyoruz
    border: { table: { disable: true } },
    icon: { table: { disable: true } },
    addon: { table: { disable: true } },
    button: { table: { disable: true } },
    validation: { table: { disable: true } },

    // #region Border
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
      description: "Input ve bağlı olan eklentilerin (addon) köşe yuvarlatma (radius) değerini belirler.",
      table: {
        category: "Border",
        type: { summary: "string" },
        defaultValue: { summary: "Küçük (SM)" },
      },
    },
    // #endregion

    // #region İkon
    iconElement: {
      name: "Icon Element",
      control: {
        type: "select",
        labels: {
          none: "İkon Yok (None)",
          search: "Arama İkonu (Search)",
          mail: "E-posta İkonu (Mail)",
          lock: "Kilit İkonu (Lock)",
        },
      },
      options: ["none", "search", "mail", "lock"],
      description: "Input içerisine yerleştirilecek minimal çizgi ikon modelini belirler.",
      table: {
        category: "Ikon",
        type: { summary: "string" },
        defaultValue: { summary: "İkon Yok (None)" },
      },
    },

    iconPosition: {
      name: "Icon Position",
      control: {
        type: "inline-radio",
        labels: {
          start: "Başta (Start)",
          end: "Sonda (End)",
        },
      },
      options: ["start", "end"],
      description: "İkonun girdi alanı içerisindeki hizalama yönünü yapılandırır.",
      table: {
        category: "Ikon",
        type: { summary: "string" },
        defaultValue: { summary: "Başta (Start)" },
      },
    },
    // #endregion

    // #region Addon
    addonVariant: {
      name: "Addon Variant",
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
      description: "Input başına veya sonuna bağlanan eklentinin (addon) görsel stil yapısını belirler.",
      table: {
        category: "Addon",
        type: { summary: "string" },
        defaultValue: { summary: "Dolu (Filled)" },
      },
    },

    addonBefore: {
      name: "Addon Before",
      control: { type: "text" },
      description: "Girdi alanının sol (başlangıç) tarafına yapışık eklenti metni yerleştirir (Örn: https://).",
      table: {
        category: "Addon",
        type: { summary: "string" },
      },
    },

    addonAfter: {
      name: "Addon After",
      control: { type: "text" },
      description: "Girdi alanının sağ (bitiş) tarafına yapışık eklenti metni yerleştirir (Örn: .com).",
      table: {
        category: "Addon",
        type: { summary: "string" },
      },
    },
    // #endregion

    // #region Entegre Buton
    hasButton: {
      name: "Enable Button",
      control: { type: "boolean" },
      description: "Bileşenin sağ bitiş alanına entegre bir aksiyon butonu ekler.",
      table: {
        category: "Entegre Buton",
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    buttonText: {
      name: "Button Text",
      control: { type: "text" },
      description: "Entegre butonun içerisinde gösterilecek olan metni tanımlar.",
      table: {
        category: "Entegre Buton",
        type: { summary: "string" },
      },
    },

    buttonColor: {
      name: "Button Color",
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
      description: "Entegre aksiyon butonunun renk temasını belirler.",
      table: {
        category: "Entegre Buton",
        type: { summary: "string" },
        defaultValue: { summary: "Mavi (Blue)" },
      },
    },

    buttonVariant: {
      name: "Button Variant",
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
      description: "Entegre aksiyon butonunun görsel tasarım stilini belirler.",
      table: {
        category: "Entegre Buton",
        type: { summary: "string" },
        defaultValue: { summary: "Dolu (Filled)" },
      },
    },
    // #endregion

    // #region Doğrulama
    validationText: {
      name: "Validation Text",
      control: { type: "text" },
      description:
        "Bileşen için gösterilecek aktif hata mesajını tanımlar. Dolu olduğunda Input çerçevesi kırmızıya döner.",
      table: {
        category: "Doğrulama",
        type: { summary: "string" },
      },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, hata mesajı tetiklendiği an sayfayı otomatik olarak ilgili input alanına kaydırır.",
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
    placeholder: "E-posta Adresiniz",
    type: "text",
    variant: "outlined",
    color: "light",
    borderRadius: "sm",
    upperCase: false,
    disabled: false,
    iconElement: "none",
    iconPosition: "start",
    addonVariant: "filled",
    addonBefore: "",
    addonAfter: "",
    hasButton: false,
    buttonText: "Gönder",
    buttonColor: "blue",
    buttonVariant: "filled",
    validationText: "",
    validationScrollTo: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({
    borderRadius,
    iconElement,
    iconPosition,
    addonVariant,
    addonBefore,
    addonAfter,
    hasButton,
    buttonText,
    buttonColor,
    buttonVariant,
    validationText,
    validationScrollTo,
    ...args
  }) => {
    // Storybook üzerinde metin girişlerinin interaktif güncellenebilmesi için state kancası
    const [inputValue, setInputValue] = useState<string>("");

    // Düzleştirilmiş ikon proplarını nesneye dönüştürme
    const selectedIcon = iconElement ? ICON_MAP[iconElement] : null;
    const iconObj = selectedIcon ? { icon: { element: selectedIcon, position: iconPosition } } : {};

    // Düzleştirilmiş addon proplarını nesneye dönüştürme
    const hasAddon = addonBefore || addonAfter;
    const addonObj = hasAddon
      ? { addon: { variant: addonVariant as any, before: addonBefore, after: addonAfter } }
      : {};

    // Düzleştirilmiş entegre buton proplarını nesneye dönüştürme
    const buttonObj = hasButton
      ? { button: { children: buttonText, color: buttonColor, variant: buttonVariant as any } }
      : {};

    // Düzleştirilmiş validation nesnesini yapılandırma
    const validationObj = validationText
      ? { validation: { text: validationText, scrollTo: validationScrollTo } }
      : { validation: undefined };

    return (
      <Input
        {...args}
        value={inputValue}
        border={{ radius: borderRadius as any }}
        {...iconObj}
        {...addonObj}
        {...buttonObj}
        {...validationObj}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    );
  },
};
