import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "ar-design";
import { BorderRadiuses, Status } from "ar-design/@types";
import React from "react";

// Kontrol panelindeki (Controls) karmaşık ve nested array yapılarını düzleştirmek için StoryProps tanımı
type StoryProps = React.ComponentProps<typeof Alert> & {
  // Senaryo Seçimi (Metin formatını ve derinliğini değiştirmek için)
  messageScenario: "simple" | "list" | "nestedList";
  // Vurgulanacak Örnek Kelimeler (Düz metin girişi ile kontrol etmek için)
  emphasizeWords: string;
  // Border Radius Kontrolü (Düzleştirilmiş)
  borderRadius: BorderRadiuses;
};

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Alert",
  component: Alert as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    children: {
      name: "Children Content",
      control: { type: "text" },
      description:
        "Eğer 'message' prop'u tanımlanmadıysa, Alert içerisine özel React elementleri yerleştirmek için kullanılır.",
      table: {
        category: "Genel Ayarlar",
        type: { summary: "ReactNode" },
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
          transparent: "Şeffaf (Transparent)",
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless", "transparent"],
      description: "Alert bileşeninin arka plan ve çerçeve görsel stil varyasyonunu belirler.",
      table: {
        category: "Görsel Stil Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Zemin (Surface)" },
      },
    },

    status: {
      name: "Status Theme",
      control: {
        type: "select",
        labels: {
          primary: "Birincil (Primary)",
          secondary: "İkincil (Secondary)",
          success: "Başarılı (Success)",
          error: "Hata (Error)",
          warning: "Uyarı (Warning)",
          info: "Bilgi (Info)",
        },
      },
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "Alert bileşenine durum tabanlı (Renk teması) stil kuralları atar.",
      table: {
        category: "Görsel Stil Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Başarılı (Success)" },
      },
    },

    borderRadius: {
      name: "Border Radius",
      control: {
        type: "select",
        labels: {
          sm: "Küçük (SM)",
          lg: "Büyük (LG)",
          xl: "Çok Büyük (XL)",
          xxl: "Daha Büyük (XXL)",
          pill: "Kapsül (PILL)",
          none: "Köşe Yuvarlama Yok (NONE)",
        },
      },
      options: ["sm", "lg", "xl", "xxl", "pill", "none"],
      description: "Bileşenin dış çerçeve köşe yuvarlatma (border-radius) değerini yapılandırır.",
      table: {
        category: "Görsel Stil Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Küçük (SM)" },
      },
    },

    // Orijinal arayüzdeki karmaşık propları dökümantasyon tablosunda gizliyoruz
    border: { table: { disable: true } },
    message: { table: { disable: true } },
    emphasize: { table: { disable: true } },

    // #region Dinamik Senaryo Ayarları
    messageScenario: {
      name: "Message Data Structure",
      control: {
        type: "select",
        labels: {
          simple: "Düz Metin (String)",
          list: "Tek Seviyeli Liste (Array)",
          nestedList: "İç İçe Çoklu Liste (Nested Array)",
        },
      },
      options: ["simple", "list", "nestedList"],
      description:
        "Bileşenin string veya iç içe geçmiş dizi (nested list) yapısını test etmek için veri setleri sunar.",
      table: {
        category: "İçerik ve Vurgu Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "Düz Metin (String)" },
      },
    },

    emphasizeWords: {
      name: "Emphasize Words",
      control: { type: "text" },
      description: "Vurgulanmasını istediğiniz kelimeleri virgülle ayırarak giriniz (Örn: hata, önemli, dikkat).",
      table: {
        category: "İçerik ve Vurgu Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "___, ___, ___" },
      },
    },
    // #endregion
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "650px", background: "#ffffff" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    variant: "surface",
    status: "success",
    borderRadius: "sm",
    messageScenario: "simple",
    children: "",
  },
  parameters: {
    controls: { disable: false }, // Sadece editörde kontrol paneli açık
  },
  render: ({ messageScenario, emphasizeWords, borderRadius, children, ...args }) => {
    // 1. Adım: Senaryoya göre message verisinin oluşturulması
    let finalMessage: any = undefined;

    if (messageScenario === "simple") {
      finalMessage = "Önemli güncelleme: Sisteminiz bu gece 02:00'da bakıma girecektir. Lütfen dikkat edin.";
    } else if (messageScenario === "list") {
      finalMessage = [
        "Birinci önemli madde: Şifrenizi kimseyle paylaşmayın.",
        "İkinci önemli madde: Beklenmedik bir hata durumunda destek ekibine başvurun.",
        "Üçüncü madde: Güncelleme tamamlandı.",
      ];
    } else if (messageScenario === "nestedList") {
      finalMessage = [
        "Form Kontrol Listesi:",
        [
          "Ad soyad alanı doldurulmalıdır.",
          "E-posta kuralları:",
          ["@ işareti içermelidir.", "Geçersiz bir hata verilmemelidir."],
        ],
        "Lütfen dikkatlice formu inceleyip tekrar gönderin.",
      ];
    }

    // 2. Adım: Virgülle ayrılmış vurgulanacak kelimelerin array'e dönüştürülmesi
    const finalEmphasize = emphasizeWords
      ? emphasizeWords
          .split(",")
          .map((word) => word.trim())
          .filter(Boolean)
      : undefined;

    // 3. Adım: Border nesnesinin paketlenmesi
    const borderObj = { border: { radius: borderRadius } };

    return (
      <Alert {...args} {...borderObj} message={finalMessage} emphasize={finalEmphasize}>
        {children || undefined}
      </Alert>
    );
  },
};
