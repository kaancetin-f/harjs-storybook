import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "ar-design"; // Projedeki gerçek export yolunuza göre güncelleyebilirsiniz
import React from "react";

type StoryProps = React.ComponentProps<typeof Progress>;

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Progress",
  component: Progress as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    value: {
      name: "Value",
      control: { type: "number", min: 0, max: 100, step: 1 },
      description: "İlerleme çubuğunun (Progress Bar) yüzde kaçının dolu olacağını belirler (0 - 100 arası).",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },

    // #region Davranış Ayarları
    reverse: {
      name: "Reverse Status",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde, değer aralıklarına göre atanan renk mantığını tersine çevirir. (Örn: Normalde %0-25 arası danger iken, reverse aktifse success olur).",
      table: {
        category: "Davranış Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    isVisibleValue: {
      name: "Hide Percent Text",
      control: { type: "boolean" },
      description: "Aktif edildiğinde (true), ilerleme çubuğu içerisindeki dinamik yüzde metnini gizler.",
      table: {
        category: "Davranış Ayarları",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    value: 50,
    reverse: false,
    isVisibleValue: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ value, ...args }) => {
    const safeValue = Math.min(Math.max(value, 0), 100);

    return <Progress {...args} value={safeValue} />;
  },
};
