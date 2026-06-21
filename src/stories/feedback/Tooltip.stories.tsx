import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "ar-design"; // Projedeki gerçek export yolunuza göre güncelleyebilirsiniz
import React from "react";

type StoryProps = React.ComponentProps<typeof Tooltip> & {
  triggerText: string;
  useTextArray: boolean;
  singleText: string;
  arrayText: string[];
};

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Tooltip",
  component: Tooltip as any,
  tags: ["autodocs"],
  parameters: {
    // 💡 createPortal ve getBoundingClientRect mimarisinin Storybook dökümantasyon sayfasında
    // sorunsuz çalışması için hikayeyi izole bir iframe dökümanı içinde render ediyoruz.
    docs: {
      inlineStories: false,
      iframeHeight: 250,
    },
    controls: { disable: true },
  },
  argTypes: {
    direction: {
      name: "Direction",
      control: {
        type: "select",
        labels: {
          top: "Üst (Top)",
          right: "Sağ (Right)",
          bottom: "Alt (Bottom)",
          left: "Sol (Left)",
        },
      },
      options: ["top", "right", "left", "bottom"],
      description: "Tooltip penceresinin tetikleyici elemente göre konumlanacağı varsayılan ana yönü belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Üst (Top)" },
      },
    },

    // #region Simülasyon Kontrolleri
    triggerText: {
      name: "Trigger Element Text",
      control: { type: "text" },
      description: "Tooltip'i tetiklemek için farenin (hover) üzerine getirileceği butonun metnini ayarlar.",
      table: {
        category: "Simülasyon Kontrolleri",
        type: { summary: "string" },
        defaultValue: { summary: "Hover Me" },
      },
    },

    useTextArray: {
      name: "Use Multi-line (Array) Text",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, tooltip içeriğine tek bir metin yerine listelenmiş bir metin dizisi (string[]) besler.",
      table: {
        category: "Simülasyon Kontrolleri",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    singleText: {
      name: "Text Content (Single)",
      control: { type: "text" },
      description: "Tek satırlı düz metin modundayken gösterilecek tooltip içeriği.",
      table: {
        category: "Simülasyon Kontrolleri",
        type: { summary: "string" },
      },
    },

    arrayText: {
      name: "Text Content (Array)",
      control: { type: "object" },
      description: "Çok satırlı listeleme modundayken maddeler halinde gösterilecek metin dizisi.",
      table: {
        category: "Simülasyon Kontrolleri",
        type: { summary: "string[]" },
      },
    },
    // #endregion

    // Orijinal arayüzden gelen karmaşık nesneleri dökümantasyon tablosunda gizliyoruz
    text: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    direction: "top",
    triggerText: "İpucu İçin Fareyi Yaklaştır",
    useTextArray: false,
    singleText: "Bu alan benzersiz bir sistem kimliği (UUID) içermektedir.",
    arrayText: [
      "Şifreniz en az 8 karakter olmalıdır.",
      "En az bir büyük harf içermelidir.",
      "En az bir adet özel karakter içermelidir.",
    ],
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ direction, triggerText, useTextArray, singleText, arrayText, ...args }) => {
    // Arayüzdeki text: string | string[] seçeneğini simülasyon anahtarına göre biçimlendiriyoruz
    const finalTooltipText = useTextArray ? arrayText : singleText;

    return (
      // 💡 Tooltip'in her yöne (top, right, bottom, left) taşmadan esnekçe açılabilmesi ve
      // doğru koordinat hesaplayabilmesi için parent alanını ortalayıp geniş tutuyoruz.
      <div
        style={{
          width: "100%",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Tooltip {...args} direction={direction} text={finalTooltipText}>
          {/* Tetikleyici element olarak konumlandırılan children */}
          <button
            type="button"
            style={{
              padding: "10px 20px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {triggerText}
          </button>
        </Tooltip>
      </div>
    );
  },
};
