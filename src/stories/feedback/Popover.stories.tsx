import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Popover } from "ar-design"; // Projedeki gerçek export yolunuza göre güncelleyebilirsiniz
import React, { useState } from "react";

type StoryProps = React.ComponentProps<typeof Popover> & {
  triggerText: string;
  showFooter: boolean;
  showCustomContent: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Popover",
  component: Popover as any,
  tags: ["autodocs"],
  parameters: {
    // 💡 1. ÇÖZÜM: Autodocs sayfasındaki click event çakışmalarını tamamen engellemek için
    // bileşenin dökümantasyon sayfasında inline render olmasını kapatıp izole iframe'e alıyoruz.
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
    controls: { disable: true },
  },
  argTypes: {
    title: { name: "Title", control: { type: "text" } },
    message: { name: "Message", control: { type: "text" } },
    fullWidth: { name: "Full Width", control: { type: "boolean" } },
    windowBlur: { name: "Window Blur", control: { type: "boolean" } },
    config: { name: "Button Configuration", control: { type: "object" } },
    triggerText: { name: "Trigger Element Text", control: { type: "text" }, table: { category: "Simülasyon" } },
    showFooter: { name: "Enable Footer (onConfirm)", control: { type: "boolean" }, table: { category: "Simülasyon" } },
    showCustomContent: { name: "Show Custom Content", control: { type: "boolean" }, table: { category: "Simülasyon" } },
    children: { table: { disable: true } },
    content: { table: { disable: true } },
    onConfirm: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    title: "Emin misiniz?",
    message: "Bu işlemi gerçekleştirdiğinizde geri alamayacaksınız. Devam etmek istiyor musunuz?",
    fullWidth: false,
    windowBlur: true, // 💡 2. ÇÖZÜM: Storybook panelindeki kontrollere tıklandığında focus kaybından dolayı popover'ın anında kapanmasını önlemek için varsayılanı true yapıyoruz.
    triggerText: "Popover'ı Tetikle",
    showFooter: true,
    showCustomContent: false,
    config: {
      buttons: {
        okay: "Evet, Devam Et",
        cancel: "Vazgeç",
      },
    },
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ triggerText, showFooter, showCustomContent, config, ...args }) => {
    const handleConfirm = showFooter
      ? (confirm: boolean) => alert(`Kullanıcı Seçimi: ${confirm ? "Onayladı" : "İptal Etti"}`)
      : undefined;

    const sampleContent = showCustomContent ? (
      <div style={{ padding: "8px", border: "1px dashed #ccc", marginTop: "5px", fontSize: "12px", color: "#666" }}>
        ℹ️ Ekstra özel içerik bileşeni.
      </div>
    ) : undefined;

    return (
      // 💡 3. ÇÖZÜM: Bileşenin koordinat hesaplayan getBoundingClientRect fonksiyonuna
      // güvenli ve sabit bir alan (300px yükseklik) ile merkezlenmiş bir alan tanıyoruz.
      // event.stopPropagation yardımıyla dış kabuktaki click olaylarının popover'ı kapatmasını izole ediyoruz.
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
        onClick={(e) => {
          // Storybook'un dış event baloncuğunun popover'ı kapatma tetikleyicisine ulaşmasını engelliyoruz
          e.stopPropagation();
        }}
      >
        <Popover {...args} config={config} content={sampleContent} onConfirm={handleConfirm}>
          <button
            type="button"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {triggerText}
          </button>
        </Popover>
      </div>
    );
  },
};
