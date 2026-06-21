import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "ar-design";
import { ParagraphColors, Status } from "ar-design/@types";
import React from "react";

const { Title, Paragraph } = Typography;

type StoryProps = {
  // Genel Ayarlar
  componentType: "title" | "paragraph";
  children: string;
  align: "left" | "center" | "right";
  upperCase: boolean;

  // Title Ayarları
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  titleSize:
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large"
    | "smaller"
    | "larger"
    | "none";

  // Paragraph Ayarları
  paragraphSize: "small" | "normal" | "large" | "none"; // ISize'dan geldiğini varsaydığımız örnek değerler
  color: ParagraphColors | Status | "none";
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Typography",
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true }, // Editor dışındaki hazır varyasyonlarda kontrol panelini kapatıyoruz
  },
  argTypes: {
    // #region Genel Ayarlar
    componentType: {
      name: "Component Type",
      control: { type: "inline-radio" },
      options: ["title", "paragraph"],
      description: "Hangi tip tipografi bileşeninin canlı olarak test edileceğini belirler.",
      table: {
        category: "Genel Ayarlar",
        type: { summary: "string" },
        defaultValue: { summary: "title" },
      },
    },

    children: {
      name: "Content Text",
      control: { type: "text" },
      description: "Tipografi bileşeni içerisinde görüntülenecek metin içeriği.",
      table: {
        category: "Genel Ayarlar",
        type: { summary: "string" },
        defaultValue: { summary: "Metin içeriği" },
      },
    },

    align: {
      name: "Alignment",
      control: {
        type: "select",
        labels: {
          left: "Sola Yasla (Left)",
          center: "Ortala (Center)",
          right: "Sağa Yasla (Right)",
        },
      },
      options: ["left", "center", "right"],
      description: "Metnin yatay eksendeki hizalama yönünü (CSS text-align) belirler.",
      table: {
        category: "Genel Ayarlar",
        type: { summary: "string" },
        defaultValue: { summary: "Sola Yasla (Left)" },
      },
    },

    upperCase: {
      name: "Upper Case",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, metindeki tüm harfleri otomatik olarak büyük harfe dönüştürür.",
      table: {
        category: "Genel Ayarlar",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    // #endregion

    // #region Title (Başlık) Ayarları
    level: {
      name: "Heading Level",
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Başlığın semantik HTML etiket seviyesini (Tag name) tanımlar.",
      table: {
        category: "Title (Başlık) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "h1" },
      },
    },

    titleSize: {
      name: "Title Size",
      control: { type: "select" },
      options: [
        "none",
        "xx-small",
        "x-small",
        "small",
        "medium",
        "large",
        "x-large",
        "xx-large",
        "xxx-large",
        "smaller",
        "larger",
      ],
      description: "Başlık bileşeni için özel yazı boyutu (font-size) ölçeklendirmesi uygular.",
      table: {
        category: "Title (Başlık) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "none" },
      },
    },
    // #endregion

    // #region Paragraph (Paragraf) Ayarları
    paragraphSize: {
      name: "Paragraph Size",
      control: { type: "select" },
      options: ["none", "small", "normal", "large"],
      description: "Paragraf bileşeni için tanımlı olan yazı boyutu ölçeklendirmesini uygular.",
      table: {
        category: "Paragraph (Paragraf) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "none" },
      },
    },

    color: {
      name: "Text Color / Status",
      control: { type: "select" },
      options: [
        "none",
        "blue",
        "red",
        "green",
        "orange",
        "gray",
        "dark",
        "light",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "Tasarım sisteminde veya durum yönetimlerinde tanımlı olan renk temasını paragrafa giydirir.",
      table: {
        category: "Paragraph (Paragraf) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "none" },
      },
    },
    // #endregion
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px", background: "#ffffff", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<StoryProps>;

// 1. Canlı Kontrol ve Düzenleme Alanı (Editor)
export const Editor: Story = {
  args: {
    componentType: "title",
    children: "Örnek Tipografi Metni",
    align: "left",
    upperCase: false,
    level: "h1",
    titleSize: "none",
    paragraphSize: "none",
    color: "none",
  },
  parameters: {
    controls: { disable: false }, // Editor modunda tüm kontrol paneli açılır
  },
  render: ({ componentType, children, align, upperCase, level, titleSize, paragraphSize, color }) => {
    // "none" seçildiğinde prop'u undefined geçerek bileşenin varsayılan davranışına sadık kalıyoruz
    const finalTitleSize = titleSize === "none" ? undefined : titleSize;
    const finalParagraphSize = paragraphSize === "none" ? undefined : (paragraphSize as any);
    const finalColor = color === "none" ? undefined : (color as any);

    if (componentType === "paragraph") {
      return (
        <Paragraph align={align} upperCase={upperCase} size={finalParagraphSize} color={finalColor}>
          {children}
        </Paragraph>
      );
    }

    return (
      <Title Level={level} align={align} size={finalTitleSize} upperCase={upperCase}>
        {children}
      </Title>
    );
  },
};

// 2. Dokümantasyon için Hazır Varyasyon Senaryoları
export const HeadingAllLevels: Story = {
  render: () => (
    <div>
      <Title Level="h1">H1 - Ana Başlık Örneği</Title>
      <Title Level="h2">H2 - Alt Başlık Örneği</Title>
      <Title Level="h3">H3 - Bölüm Başlığı</Title>
      <Title Level="h4">H4 - Kart Başlığı</Title>
      <Title Level="h5">H5 - Küçük Başlık</Title>
      <Title Level="h6">H6 - En Küçük Başlık</Title>
    </div>
  ),
};

export const ParagraphColorsAndStatus: Story = {
  render: () => (
    <div>
      <Paragraph color="dark">Dark - Varsayılan Koyu Paragraf Metni</Paragraph>
      <Paragraph color="primary">Blue - Bilgilendirme Metni Rengi</Paragraph>
      <Paragraph color="success">Green - Başarılı İşlem Rengi</Paragraph>
      <Paragraph color="danger">Red - Hata / Tehlike Durumu Metni</Paragraph>
      <Paragraph color="warning">Orange - Uyarı Metni Rengi</Paragraph>
    </div>
  ),
};
