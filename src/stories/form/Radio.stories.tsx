import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BorderRadiuses } from "ar-design/@types";
import { Radio } from "ar-design";

type StoryProps = React.ComponentProps<typeof Radio> & {
  borderRadius?: BorderRadiuses;
  traceColor?: string;
  pastTraceColor?: string;
  validationText?: string;
  validationScrollTo?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    label: {
      name: "Label",
      control: { type: "text" },
      description: "Radio butonunun yanında gösterilecek açıklayıcı metindir.",
      table: { type: { summary: "string" } },
    },

    checked: {
      name: "Checked",
      control: { type: "boolean" },
      description: "Radio butonunun başlangıçta veya anlık olarak seçili olup olmadığını belirler.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak seçim yapılmasını engeller.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
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
      description: "Radio butonunun ve etiket metninin genel ölçek boyutunu ayarlar.",
      table: { type: { summary: "string" }, defaultValue: { summary: "normal" } },
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
      description: "Radio butonu seçili (checked) durumdayken uygulanacak kurumsal renk temasını belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "blue" } },
    },

    upperCase: {
      name: "UpperCase",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, label metnindeki tüm karakterleri otomatik olarak büyük harfe dönüştürür.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    border: { table: { disable: true } },
    validation: { table: { disable: true } },
    trace: { table: { disable: true } },
    pastTrace: { table: { disable: true } },

    // #region İz Çizgisi Ayarları
    traceColor: {
      name: "Trace Color",
      control: {
        type: "select",
        labels: {
          none: "Yok (None)",
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
      options: ["none", "blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description:
        "Bileşenin ardıl adımlarını veya tasarım akış çizgisini temsil eden 'trace' katmanının rengini seçer.",
      table: { category: "Akış ve İz Ayarları", type: { summary: "string" } },
    },

    pastTraceColor: {
      name: "Past Trace Color",
      control: {
        type: "select",
        labels: {
          none: "Yok (None)",
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
      options: ["none", "blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description: "Bileşenin tamamlanmış geçmiş adımlarını temsil eden 'pastTrace' katmanının rengini seçer.",
      table: { category: "Akış ve İz Ayarları", type: { summary: "string" } },
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
      description: "Radio seçim alanının köşe yuvarlatma (radius) yapısını belirler.",
      table: { category: "Border Ayarları", type: { summary: "string" }, defaultValue: { summary: "pill" } },
    },
    // #endregion

    // #region Doğrulama Ayarları
    validationText: {
      name: "Validation Message",
      control: { type: "text" },
      description: "Radio bileşeninin altında gösterilecek aktif doğrulama veya hata mesajı metnidir.",
      table: { category: "Doğrulama Ayarları", type: { summary: "string" } },
    },

    validationScrollTo: {
      name: "Scroll To Element",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, hata tetiklendiği an sayfayı otomatik olarak bileşenin hizasına kaydırır.",
      table: { category: "Doğrulama Ayarları", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    label: "Seçenek Metni",
    checked: false,
    disabled: false,
    size: "normal",
    color: "blue",
    borderRadius: "pill",
    upperCase: false,
    traceColor: "none",
    pastTraceColor: "none",
    validationText: "",
    validationScrollTo: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ borderRadius, traceColor, pastTraceColor, validationText, validationScrollTo, ...args }) => {
    // Düzleştirilmiş trace nesnelerini geri inşa etme
    const traceObj = traceColor && traceColor !== "none" ? { color: traceColor as any } : undefined;
    const pastTraceObj = pastTraceColor && pastTraceColor !== "none" ? { color: pastTraceColor as any } : undefined;

    // Düzleştirilmiş validation nesnesini inşa etme
    const validationObj = validationText
      ? { validation: { text: validationText, scrollTo: validationScrollTo } }
      : { validation: undefined };

    return (
      <Radio
        {...args}
        border={{ radius: borderRadius as any }}
        trace={traceObj}
        pastTrace={pastTraceObj}
        {...validationObj}
      />
    );
  },
};
