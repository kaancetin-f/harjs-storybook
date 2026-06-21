import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonAction } from "ar-design";
import React from "react";

type StoryProps = React.ComponentProps<typeof ButtonAction> & {};

const meta: Meta<StoryProps> = {
  title: "FORM/Buttons/Action Buttons",
  component: ButtonAction as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    // #region Buttons Ayarları
    buttons: {
      name: "Buttons",
      control: { type: "object" },
      description:
        "Aksiyon menüsü tetiklendiğinde portal üzerinde listelenecek buton nesnelerinin yapılandırma dizisidir.",
      table: {
        type: { summary: "array" },
      },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    // Kontrol panelinde temizce düzenlenebilecek kurumsal mock veri seti
    buttons: [
      {
        text: "Düzenle",
        color: "orange",
        icon: {
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
          position: "start",
        },
        onClick: () => alert("Düzenle aksiyonu tetiklendi."),
      },
      {
        text: "Klonla",
        color: "purple",
        icon: {
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          ),
          position: "start",
        },
        onClick: () => alert("Klonla aksiyonu tetiklendi."),
      },
      {
        text: "Sil",
        color: "red",
        icon: {
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
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          ),
          position: "start",
        },
        onClick: () => alert("Sil aksiyonu tetiklendi."),
      },
    ],
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ buttons, ...args }) => {
    // JSON editöründen gelebilecek ham verileri güvenli bir şekilde işliyoruz
    const safeButtons = Array.isArray(buttons)
      ? buttons.map((btn) => ({
          ...btn,
          // Eğer kontrol panelinden ikon objesi string kalırsa patlamaması için yedek koruma mekanizması
          icon: btn.icon?.element ? btn.icon : undefined,
          onClick: btn.onClick || (() => alert(`${btn.text} tıklandı.`)),
        }))
      : [];

    return (
      <div style={{ display: "flex" }}>
        <ButtonAction {...args} buttons={safeButtons} />
      </div>
    );
  },
};
