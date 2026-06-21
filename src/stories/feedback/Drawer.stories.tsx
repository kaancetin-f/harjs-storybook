import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, Drawer } from "ar-design"; // Projedeki export yolunuza göre güncelleyebilirsiniz
import React, { useState } from "react";

// Storybook kontrollerini kolaylaştırmak için ara bir tip oluşturuyoruz
type StoryProps = React.ComponentProps<typeof Drawer> & {
  isOpenInitial: boolean;
  tabCount: 1 | 2 | 3;
};

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Drawer",
  component: Drawer as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    title: {
      name: "Title",
      control: { type: "text" },
      description: "Drawer bileşeninin başlık alanında görüntülenecek metni belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Drawer Başlığı" },
      },
    },

    activeTab: {
      name: "Active Tab",
      control: { type: "number" },
      description: "İlk açılışta veya aktif olarak gösterilecek sekme (tab) indeksini belirler.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },

    isOpenInitial: {
      name: "Is Open (Initial)",
      control: { type: "boolean" },
      description: "Drawer'ın ilk render anında açık veya kapalı olma durumunu simüle eder.",
      table: {
        category: "State Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },

    tabCount: {
      name: "Tab Count",
      control: {
        type: "select",
        labels: {
          1: "Tek Sekme (No Header Navigation)",
          2: "2 Sekmeli Yapı",
          3: "3 Sekmeli Yapı",
        },
      },
      options: [1, 2, 3],
      description: "Drawer içerisindeki sekme yapısını ve örnek içerik sayısını belirler.",
      table: {
        category: "İçerik Ayarları",
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },

    // Karmaşık veya fonksiyonel nesneleri dökümantasyon tablosunda gizliyoruz
    tabs: { table: { disable: true } },
    open: { table: { disable: true } },
    validation: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    title: "Örnek Drawer Başlığı",
    activeTab: 0,
    isOpenInitial: true,
    tabCount: 2,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ isOpenInitial, tabCount, title, activeTab, ...args }) => {
    // Drawer bileşeninin açık/kapalı state'ini yönetmek için hook kullanıyoruz
    const [open, setOpen] = useState(isOpenInitial);

    // Seçilen tabCount değerine göre mock sekmeler oluşturuluyor
    const mockTabs = [
      {
        title: "Genel Bilgiler",
        content: <div>Sekme 1 İçeriği: Form alanları veya genel açıklamalar buraya gelebilir.</div>,
      },
      { title: "Gelişmiş Ayarlar", content: <div>Sekme 2 İçeriği: Detaylı yapılandırma ve opsiyonel ayarlar.</div> },
      { title: "Geçmiş / Loglar", content: <div>Sekme 3 İçeriği: Yapılan değişikliklerin listesi.</div> },
    ].slice(0, tabCount);

    return (
      <div style={{ minHeight: "400px", padding: "1rem", position: "relative" }}>
        <Button variant="surface" color="blue" onClick={() => setOpen(true)}>
          Drawer'ı Aç
        </Button>

        <Drawer
          {...args}
          title={title}
          activeTab={activeTab}
          tabs={mockTabs}
          open={{
            get: open,
            set: setOpen,
          }}
          onChange={(index) => console.log(`Sekme değiştirildi: ${index}`)}
        />
      </div>
    );
  },
};
