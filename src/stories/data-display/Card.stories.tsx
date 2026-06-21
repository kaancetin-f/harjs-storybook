import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, Button } from "ar-design";

// Storybook kontrol panelinde propları düzgün yönetebilmek için genişletilmiş tip tanımı
type StoryProps = React.ComponentProps<typeof Card> & {
  cardContentText?: string;
  showActions?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replace(/<CardComponent/g, "<Card").replace(/<\/CardComponent/g, "</Card");
        },
      },
    },
  },
  argTypes: {
    title: {
      name: "Title",
      control: { type: "text" },
      description:
        "Kartın üst kısmında kalın punto ile gösterilecek başlık metnidir. Boş bırakılırsa başlık alanı tamamen gizlenir.",
      table: { type: { summary: "string" } },
    },

    variant: {
      name: "Variant",
      control: {
        type: "select",
        labels: {
          filled: "Dolu İçerik (Filled)",
          surface: "Zemin Rengi (Surface)",
          outlined: "Çerçeveli (Outlined)",
          dashed: "Kesik Çizgili (Dashed)",
          borderless: "Çerçevesiz (Borderless)",
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      description: "Kart bileşeninin arka plan ve kenarlık tasarım stilini belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "filled" } },
    },

    status: {
      name: "Status",
      control: {
        type: "select",
        labels: {
          success: "Başarılı (Success)",
          info: "Bilgilendirme (Info)",
          warning: "Uyarı (Warning)",
          error: "Hata (Error)",
        },
      },
      options: ["success", "info", "warning", "error"],
      description: "Karta kurumsal durum renk şeması (kenarlık veya sol şerit vurgusu vb.) uygular.",
      table: { type: { summary: "string" } },
    },

    cardContentText: {
      name: "Children",
      control: { type: "text" },
      description: "Kart gövdesinin (content) içinde render edilecek metin veya bileşen kümesidir.",
      table: { category: "İçerik Yönetimi", type: { summary: "ReactNode" } },
    },

    showActions: {
      name: "Show Actions",
      control: { type: "boolean" },
      description: "Aktif edildiğinde başlığın sağ tarafına etkileşimli kontrol butonları (`actions`) yerleştirir.",
      table: { category: "İçerik Yönetimi", type: { summary: "boolean" } },
    },

    actions: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const MockActionButton = (
  <Button
    variant="borderless"
    shape="circle"
    icon={{
      element: (
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
    }}
  />
);

export const Editor: Story = {
  args: {
    title: "Kurumsal Performans Raporu",
    variant: "filled",
    status: undefined,
    cardContentText:
      "Bu alana projenizin gereksinimlerine göre grafikler, tablolar veya form elemanları gibi dilediğiniz her türlü çocuk bileşeni (children) yerleştirebilirsiniz.",
    showActions: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { cardContentText, showActions, ...args } = context;

    return (
      <Card {...args} actions={MockActionButton}>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "var(--text-color, #333)" }}>
          {cardContentText}
        </p>
      </Card>
    );
  },
};
