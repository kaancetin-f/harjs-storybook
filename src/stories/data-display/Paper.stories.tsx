import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, Paper } from "ar-design";

// Storybook kontrol panelinde action prop'unun JSX kilitlenmesine sebep olmaması için genişletilmiş tip tanımı
type StoryProps = React.ComponentProps<typeof Paper> & {
  showAction?: boolean;
};

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

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Paper",
  component: Paper,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      // Sayfanın en üstünde geliştiriciye gösterilecek kurumsal rehber alanı
      description: {
        component: `
### 🚀 Kurumsal Kullanım Rehberi

Bu bileşen, içerik bloklarını veya modülleri sarmallayarak kurumsal bir panel/kart görünümü kazandırmak için kullanılır.

#### 1. Gerekli Modülleri Import Edin
\`\`\`typescript
import { Paper } from "ar-design";
import { Button } from "ar-design"; // Aksiyon alanında kullanmak için opsiyonel
\`\`\`

#### 2. Standart Kullanım Örneği
\`\`\`tsx
<Paper 
  title="Kullanıcı Yönetimi" 
  action={<Button variant="primary">Yeni Kullanıcı Ekle</Button>}
>
  <p>Panel içerik alanı veya veri tabloları buraya gelecektir.</p>
</Paper>
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          return code.replace(/<PaperComponent/g, "<Paper").replace(/<\/PaperComponent/g, "</Paper");
        },
      },
    },
  },
  argTypes: {
    title: {
      name: "Title (Başlık)",
      control: { type: "text" },
      description: "Panelin sol üst köşesinde kurumsal h3 başlık formatında görüntülenecek metindir.",
      table: { category: "İçerik Ayarları" },
    },
    showAction: {
      name: "Aksiyon Alanını Göster",
      control: { type: "boolean" },
      description: "Panelin sağ üst köşesindeki buton/ikon alanını test etmek için aktifleştirebilirsiniz.",
      table: { category: "Simülasyon Ayarları" },
    },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const PaperComponent = Paper;

export const Editor: Story = {
  args: {
    title: "Sistem Performans Raporu",
    showAction: true,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { showAction, ...args } = context;

    // Kontrol panelinden gelen boolean değere göre şık bir buton aksiyonu simüle ediyoruz
    const sampleAction = showAction ? MockActionButton : undefined;

    return (
      <div style={{ padding: "24px", background: "#f8fafc", width: "100%" }}>
        <PaperComponent {...args} action={sampleAction}>
          <div
            style={{
              padding: "16px",
              background: "#ffffff",
              border: "1px dashed #cbd5e1",
              borderRadius: "6px",
              color: "#475569",
              fontSize: "14px",
              lineHeight: "1.6",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Bu alan <code>children</code> prop'una gönderilen içerik alanıdır. İçerisine form elemanları, tablolar,
            grafikler veya metin blokları güvenle yerleştirilebilir. Bileşenin dış sarmalı kurumsal tasarım çizgilerine
            sadık kalacak şekilde gölgelendirme ve iç boşluk sağlar.
          </div>
        </PaperComponent>
      </div>
    );
  },
};
