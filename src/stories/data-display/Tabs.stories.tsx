import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "ar-design";
import { TabProps } from "ar-design/@types";
import React from "react";

// Mock İçerikler - Sekme değişimini görsel olarak doğrulamak için tanımlanmıştır.
const SampleContent = ({ text, color }: { text: string; color: string }) => (
  <div
    style={{
      padding: "24px",
      backgroundColor: color,
      borderRadius: "0 0 8px 8px",
      minHeight: "150px",
      color: "#fff",
      fontFamily: "sans-serif",
    }}
  >
    <h3>{text} İçeriği</h3>
    <p>Bu alan {text} sekmesine ait dinamik render edilen alt içeriktir.</p>
  </div>
);

// Storybook kontrollerinden (Controls) gelen düz propları Tabs bileşeninin beklediği yapıya dönüştürmek için tip tanımı
type StoryProps = React.ComponentProps<typeof Tabs> & {
  // Config/Kapatma Ayarları Grubu için Düzleştirilmiş Proplar
  showCloseButtonOnTab1: boolean;
  showCloseButtonOnTab2: boolean;
  showCloseButtonOnTab3: boolean;
  // Test Senaryoları için Hazır Veri Seti Seçimi
  scenario: "default" | "manyTabs";
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Tabs",
  component: Tabs as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true }, // Editor dışındaki hikayelerde kontrolleri varsayılan olarak kapatıyoruz
  },
  argTypes: {
    name: {
      name: "Unique Name",
      control: { type: "text" },
      description: "sessionStorage üzerinde benzersiz bir hafıza anahtarı oluşturmak için kullanılan bileşen ismi.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "tabs-component" },
      },
    },

    activeTab: {
      name: "Active Tab Index",
      control: { type: "number", min: 0 },
      description: "Dışarıdan veya başlangıçta kontrol edilmek istenen aktif sekmenin indeks numarası.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },

    onChange: {
      action: "tab-changed",
      description: "Sekme değiştiğinde tetiklenen ve güncel indeks değerini dönen fonksiyon.",
    },

    onClose: {
      action: "tab-closed",
      description: "Sekme kapatma butonuna (✖) basıldığında tetiklenen ve kapatılan indeks değerini dönen fonksiyon.",
    },

    // Orijinal arayüzden gelen karmaşık nesne dizisini dökümantasyon tablosunda gizliyoruz, render içinde çözeceğiz
    tabs: { table: { disable: true } },

    // #region Senaryo Ayarları
    scenario: {
      name: "Tab Data Scenario",
      control: {
        type: "select",
        labels: {
          default: "Standart (3 Sekme)",
          manyTabs: "Yatay Scroll Tetikleyici (12 Sekme)",
        },
      },
      options: ["default", "manyTabs"],
      description:
        "Bileşenin taşma (scroll) davranışını test etmek için hazır sekme veri setleri arasında geçiş yapar.",
      table: {
        category: "Senaryo Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Standart (3 Sekme)" },
      },
    },
    // #endregion

    // #region Kapatılabilirlik Ayarları (Config Paketleme)
    showCloseButtonOnTab1: {
      name: "Tab 1 Closeable",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, birinci sekmenin yanına kapatma butonu (✖) yerleştirir.",
      table: {
        category: "Kapatılabilirlik Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    showCloseButtonOnTab2: {
      name: "Tab 2 Closeable",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, ikinci sekmenin yanına kapatma butonu (✖) yerleştirir.",
      table: {
        category: "Kapatılabilirlik Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    showCloseButtonOnTab3: {
      name: "Tab 3 Closeable",
      control: { type: "boolean" },
      description: "Aktif edildiğinde, üçüncü sekmenin yanına kapatma butonu (✖) yerleştirir.",
      table: {
        category: "Kapatılabilirlik Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    // #endregion
  },
  decorators: [
    (Story) => {
      // Hikayeler arasında geçiş yaparken sessionStorage geçmişinin birbirini ezmesini engeller
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
      return (
        <div style={{ padding: "24px", maxWidth: "700px", background: "#f9fafb", borderRadius: "8px" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    name: "interactive-tabs",
    activeTab: 0,
    scenario: "default",
    showCloseButtonOnTab1: false,
    showCloseButtonOnTab2: true,
    showCloseButtonOnTab3: false,
  },
  parameters: {
    controls: { disable: false }, // Yalnızca Editor hikayesinde kontrol paneli açılır
  },
  render: ({ scenario, showCloseButtonOnTab1, showCloseButtonOnTab2, showCloseButtonOnTab3, ...args }) => {
    // 1. Adım: Senaryoya göre ham veri seti belirleniyor
    let rawTabs: TabProps[] = [];

    if (scenario === "manyTabs") {
      // Sürükleme ve Scroll oklarının (ArrowLeft/Right) test edilebilmesi için 12 adet sekme üretiliyor
      rawTabs = Array.from({ length: 12 }).map((_, i) => ({
        title: `Sekme ${i + 1}`,
        content: <SampleContent text={`Sekme ${i + 1}`} color={`hsl(${i * 30}, 70%, 45%)`} />,
      }));
    } else {
      // Standart 3 sekmeli yapı
      rawTabs = [
        { title: "Anasayfa", content: <SampleContent text="Anasayfa" color="#3b82f6" /> },
        { title: "Profil Dokümanı", content: <SampleContent text="Profil Dokümanı" color="#10b981" /> },
        { title: "Sistem Ayarları", content: <SampleContent text="Sistem Ayarları" color="#f59e0b" /> },
      ];
    }

    // 2. Adım: Kontrol panelinden (Controls) gelen düz boolean değerleri, ilgili sekmelerin tab.config nesnesine paketleniyor
    const processedTabs = rawTabs.map((tab, index) => {
      let canBeClosed = false;
      if (index === 0 && showCloseButtonOnTab1) canBeClosed = true;
      if (index === 1 && showCloseButtonOnTab2) canBeClosed = true;
      if (index === 2 && showCloseButtonOnTab3) canBeClosed = true;

      return {
        ...tab,
        ...(canBeClosed ? { config: { canBeClosed: true } } : {}),
      };
    });

    return (
      <div style={{ width: scenario === "manyTabs" ? "400px" : "100%", overflow: "hidden" }}>
        {scenario === "manyTabs" && (
          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "12px" }}>
            * Yatay taşmayı ve kaydırma oklarını simüle etmek için kapsayıcı genişliği daraltılmıştır.
          </p>
        )}
        <Tabs {...args} tabs={processedTabs} />
      </div>
    );
  },
};
