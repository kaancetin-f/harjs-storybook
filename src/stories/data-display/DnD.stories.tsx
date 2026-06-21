import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DnD } from "ar-design";

// Taşınacak kurumsal görev/kart veri tipi tanımı
interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
}

type StoryProps = React.ComponentProps<typeof DnD<TaskItem>> & {
  isMoveIcon?: boolean;
  isInTable?: boolean;
};

// Başlangıç Mock Veri Seti
const initialTasks: TaskItem[] = [
  { id: "task-1", title: "Kurumsal Dashboard Tasarım Revizyonu", category: "UI/UX Tasarım", priority: "High" },
  { id: "task-2", title: "Storybook Entegrasyonu ve Dökümantasyon", category: "Frontend", priority: "Medium" },
  { id: "task-3", title: "API Gateway Performans Optimizasyonu", category: "Backend", priority: "High" },
  { id: "task-4", title: "E2E Test Senaryolarının Yazılması", category: "QA / Test", priority: "Low" },
];

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/DnD (Drag and Drop)",
  component: DnD,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    columnKey: {
      name: "Column Key",
      control: { type: "text" },
      description:
        "Birden fazla DnD listesi kullanıldığında, elemanın hangi kolondan taşındığını doğrulamak için kullanılır.",
      table: { type: { summary: "string" } },
    },
    isMoveIcon: {
      name: "Show Move Icon",
      control: { type: "boolean" },
      description:
        "Aktif edildiğinde elemanların sol tarafına dikey sürükleme/tutma ikonu (`GripVertical`) yerleştirir.",
      table: { category: "Konfigürasyon", type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },

    confing: {
      table: { disable: true },
    },
    isInTable: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    columnKey: "todo-column",
    isMoveIcon: true,
    isInTable: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { isMoveIcon = true, isInTable = false, ...args } = context;

    // Doğrudan prop mutasyonunu engellemek için yerel state yönetimi kuruyoruz
    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

    // Düzleştirilmiş kontrol paneli alanlarını orijinal confing nesnesine eşliyoruz
    const configObj = {
      isMoveIcon,
      isInTable,
    };

    // Sürüklenen her bir kartın şık ve modern tasarımı
    const customRenderItem = (item: TaskItem) => {
      const priorityColors = {
        High: { bg: "#fee2e2", text: "#dc2626" },
        Medium: { bg: "#fef3c7", text: "#d97706" },
        Low: { bg: "#e0f2fe", text: "#0284c7" },
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ display: "flex", justifyContent: "between", alignItems: "center", width: "100%" }}>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{item.category}</span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                padding: "2px 6px",
                borderRadius: "4px",
                backgroundColor: priorityColors[item.priority].bg,
                color: priorityColors[item.priority].text,
                marginLeft: "auto",
              }}
            >
              {item.priority}
            </span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{item.title}</div>
        </div>
      );
    };

    return (
      <div
        style={{
          padding: "20px",
          background: "#f8fafc",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h4
          style={{
            margin: "0 0 12px 0",
            fontSize: "14px",
            color: "#475569",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Task Listesi ({tasks.length})
        </h4>

        <DnD
          {...args}
          data={tasks}
          renderItem={customRenderItem}
          onChange={(newData) => setTasks([...newData])} // Yeni referans vererek React'ı tetikliyoruz
          confing={configObj}
        />
      </div>
    );
  },
};
