import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Diagram } from "ar-design";
import { EdgeData, NodeData } from "ar-design/@types";

// Kontrol panelinden düğüm içeriklerini manipüle edebilmek için genişletilmiş tip tanımı
type StoryProps = React.ComponentProps<typeof Diagram> & {
  node1Text?: string;
  node2Text?: string;
  node3Text?: string;
};

const CustomNode = ({
  title,
  subtitle,
  borderColor,
  badgeBg,
  badgeColor,
}: {
  title: string;
  subtitle: string;
  borderColor: string;
  badgeBg: string;
  badgeColor: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "12px 14px",
      background: "#ffffff",
      border: `2px solid ${borderColor}`,
      borderRadius: "10px",
      minWidth: "180px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: "left",
    }}
  >
    <span
      style={{
        fontSize: "9px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        padding: "2px 6px",
        borderRadius: "4px",
        backgroundColor: badgeBg,
        color: badgeColor,
        marginBottom: "6px",
      }}
    >
      {title}
    </span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", lineHeight: "1.2" }}>{subtitle}</span>
  </div>
);

const generateMockData = (n1: string, n2: string, n3: string): { nodes: NodeData[]; edges: EdgeData[] } => {
  const nodes: NodeData[] = [
    {
      id: 1,
      position: { x: 60, y: 150 },
      // İzole edilmiş alt bileşen çağrıları yapıyı dondurmaz
      data: (
        <CustomNode title="Tetikleyici" subtitle={n1} borderColor="#6366f1" badgeBg="#e0e7ff" badgeColor="#4f46e5" />
      ) as any,
    },
    {
      id: 2,
      position: { x: 360, y: 40 },
      data: (
        <CustomNode title="Başarılı Akış" subtitle={n2} borderColor="#22c55e" badgeBg="#dcfce7" badgeColor="#16a34a" />
      ) as any,
    },
    {
      id: 3,
      position: { x: 360, y: 260 },
      data: (
        <CustomNode title="Hata Durumu" subtitle={n3} borderColor="#ef4444" badgeBg="#fee2e2" badgeColor="#dc2626" />
      ) as any,
    },
  ];

  const edges: EdgeData[] = [
    {
      id: "edge-1",
      from: { id: 1, port: "right" },
      to: { id: 2, port: "left" },
    },
    {
      id: "edge-2",
      from: { id: 1, port: "right" },
      to: { id: 3, port: "left" },
    },
  ];

  return { nodes, edges };
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Diagram",
  component: Diagram,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    node1Text: {
      name: "Düğüm 1 İçerik (Node 1)",
      control: { type: "text" },
      description: "Başlangıç tetikleyici düğümünün içerisinde görüntülenecek metindir.",
      table: { category: "Dinamik Düğüm İçerikleri" },
    },
    node2Text: {
      name: "Düğüm 2 İçerik (Node 2)",
      control: { type: "text" },
      description: "Başarılı senaryo akış düğümünün içerisinde görüntülenecek metindir.",
      table: { category: "Dinamik Düğüm İçerikleri" },
    },
    node3Text: {
      name: "Düğüm 3 İçerik (Node 3)",
      control: { type: "text" },
      description: "Hata senaryosu akış düğümünün içerisinde görüntülenecek metindir.",
      table: { category: "Dinamik Düğüm İçerikleri" },
    },
    nodes: { table: { disable: true } },
    edges: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    node1Text: "Webhook İstere Göre Tetiklendi",
    node2Text: "Kuyruğa Güvenle Ekle",
    node3Text: "Log Sistemine Hata Bildir",
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { node1Text = "", node2Text = "", node3Text = "" } = context;

    // useMemo veriyi tamamen cache'ler ve render yükünü azaltır
    const diagramData = React.useMemo(
      () => generateMockData(node1Text, node2Text, node3Text),
      [node1Text, node2Text, node3Text],
    );

    return (
      <div
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <Diagram nodes={diagramData.nodes} edges={diagramData.edges} />
      </div>
    );
  },
};
