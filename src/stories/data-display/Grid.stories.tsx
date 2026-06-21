import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "ar-design";

type StoryProps = {
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  align?: "left" | "center" | "right";
  columnCount: number;
};

const { Row, Column } = Grid;

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Grid System",
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
### 🚀 Kullanım Rehberi

Bu bileşeni projenize dahil etmek için aşağıdaki adımları takip ediniz.

\`\`\`typescript
import { Grid } from "ar-design";

const { Row, Column } = Grid;
\`\`\`
`,
      },
    },
  },
  argTypes: {
    columnCount: {
      name: "Kolon Sayısı (Simülasyon)",
      control: { type: "number", min: 1, max: 4, step: 1 },
      description: "Test amaçlı yan yana kaç adet senkronize kolon render edileceğini belirler.",
      table: { category: "Playground Ayarları" },
    },
    align: {
      name: "Align (Hizalama)",
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "Kolon içerisindeki metinlerin veya alt bileşenlerin yatay hizasını belirler.",
      table: { category: "Column Propları" },
    },
    xl: {
      name: "size.xl (Geniş Ekranlar)",
      control: { type: "number", min: 1, max: 12 },
      table: { category: "Responsive Boyutlar (Size)" },
    },
    lg: {
      name: "size.lg (Masaüstü)",
      control: { type: "number", min: 1, max: 12 },
      table: { category: "Responsive Boyutlar (Size)" },
    },
    md: {
      name: "size.md (Tablet)",
      control: { type: "number", min: 1, max: 12 },
      table: { category: "Responsive Boyutlar (Size)" },
    },
    sm: {
      name: "size.sm (Mobil Geniş)",
      control: { type: "number", min: 1, max: 12 },
      table: { category: "Responsive Boyutlar (Size)" },
    },
    xs: {
      name: "size.xs (Mobil Dar)",
      control: { type: "number", min: 1, max: 12 },
      table: { category: "Responsive Boyutlar (Size)" },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    columnCount: 3,
    xl: 4,
    lg: 4,
    md: 6,
    sm: 12,
    xs: 12,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ columnCount, align, xl, lg, md, sm, xs }: StoryProps) => {
    // Düzleştirilmiş responsive propları bileşenin beklediği nesne yapısına geri topluyoruz
    const sizeConfig = { xl, lg, md, sm, xs };

    // Ortak kolon iç tasarımı (Görsel olarak grid yapısını görebilmek için)
    const columnInnerStyle: React.CSSProperties = {
      padding: "16px",
      background: "#3b82f6",
      color: "#ffffff",
      borderRadius: "6px",
      fontWeight: 600,
      fontSize: "14px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid #1d4ed8",
    };

    return (
      <Row>
        {Array.from({ length: columnCount }).map((_, index) => (
          <Column key={index} size={sizeConfig} align={align}>
            <div style={columnInnerStyle}>
              Kolon {index + 1}
              <div>{`xl:${xl} lg:${lg} md:${md} sm:${sm}`}</div>
            </div>
          </Column>
        ))}
      </Row>
    );
  },
};
