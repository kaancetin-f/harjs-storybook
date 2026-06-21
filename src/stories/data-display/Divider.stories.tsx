import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "ar-design";

// Storybook kontrol panelinde içi içe geçmiş config nesnesini düzleştirmek için genişletilmiş tip tanımı
type StoryProps = React.ComponentProps<typeof Divider> & {
  marginValue?: string | number;
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    marginValue: {
      name: "Margin (Boşluk Değeri)",
      control: { type: "text" },
      description:
        "Ayraç çizgisinin alt ve üst (veya dört bir yanından) bırakacağı boşluk miktarıdır. `24`, `16px`, `2rem` veya `20px 0` gibi değerler alabilir.",
      table: {
        category: "Konfigürasyon",
        type: { summary: "string | number" },
        defaultValue: { summary: "undefined" },
      },
    },
    config: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    marginValue: "24px",
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { marginValue, ...args } = context;

    // Düzleştirilmiş kontrol paneli propunu orijinal config yapısına bağlıyoruz
    const configObj = {
      margin: marginValue as number,
    };

    return (
      <div
        style={{
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", color: "#1e293b", fontSize: "16px" }}>Üst İçerik</h3>
        <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>
          Bu alan ayraç çizgisinin üstünde kalan kurumsal bir metni, tabloyu veya veri kümesini simüle etmektedir.
        </p>

        <Divider {...args} config={configObj} />

        <h3 style={{ margin: "0 0 8px 0", color: "#1e293b", fontSize: "16px" }}>Alt İçerik</h3>
        <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>
          Bu alan ise ayraç çizgisinin altında kalan içerik kümesidir. Kontrol panelinden "Margin" değerini değiştirerek
          aradaki boşluğun canlı reaksiyonunu test edebilirsiniz.
        </p>
      </div>
    );
  },
};
