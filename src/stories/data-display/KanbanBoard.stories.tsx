import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KanbanBoard } from "ar-design";
import { KanbanBoardColumnType } from "ar-design/@types";

// Kanban içinde dönecek mockup görev kartı veri modeli
interface IKabanTask {
  id: string;
  taskTitle: string;
  assignee: string;
  createdAt: string;
  status: "todo" | "in-progress" | "done";
}

type StoryProps = React.ComponentProps<typeof KanbanBoard<IKabanTask, any>> & {
  todoCount?: number;
  inProgressCount?: number;
};

// Başlangıç Mock Veri Fabrikası
const createMockTasks = (todoText: string, progressText: string): KanbanBoardColumnType<IKabanTask, any>[] => [
  {
    key: "todo",
    title: "Yapılacaklar",
    titleColor: "#ef4444",
    description: "Henüz başlanmamış görevler",
    columnProperties: {},
    renderItem: (item) => (
      <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <div style={{ fontWeight: 600, fontSize: "13px", color: "#1e293b" }}>{item.taskTitle}</div>
        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>👤 {item.assignee}</div>
      </div>
    ),
    items: [
      { id: "1", taskTitle: todoText, assignee: "Ahmet Y.", createdAt: "2026-06-20", status: "todo" },
      {
        id: "2",
        taskTitle: "Kod İnceleme (Code Review)",
        assignee: "Elif K.",
        createdAt: "2026-06-19",
        status: "todo",
      },
    ],
  },
  {
    key: "in-progress",
    title: "Geliştirmede",
    titleColor: "#3b82f6",
    description: "Aktif çalışılan işler",
    columnProperties: {},
    renderItem: (item) => (
      <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <div style={{ fontWeight: 600, fontSize: "13px", color: "#1e293b" }}>{item.taskTitle}</div>
        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>👤 {item.assignee}</div>
      </div>
    ),
    items: [{ id: "3", taskTitle: progressText, assignee: "Can M.", createdAt: "2026-06-18", status: "in-progress" }],
  },
  {
    key: "done",
    title: "Tamamlananlar",
    titleColor: "#22c55e",
    description: "Canlıya hazır görevler",
    columnProperties: {},
    renderItem: (item) => (
      <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <div
          style={{ fontWeight: 600, fontSize: "13px", color: "#1e293b", textDecoration: "line-through", opacity: 0.7 }}
        >
          {item.taskTitle}
        </div>
        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>👤 {item.assignee}</div>
      </div>
    ),
    items: [
      { id: "4", taskTitle: "Yol Haritası Planlaması", assignee: "Zeynep A.", createdAt: "2026-06-15", status: "done" },
    ],
  },
];

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Kanban Board",
  component: KanbanBoard as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
### 🚀 Kanban Board Kurumsal Kullanım Rehberi

Sütunlar arası gelişmiş senkronizasyon, otomatik kaydırma ve yerleşik filtreleme katmanına sahip Kanban yapısıdır.

#### 1. Modülleri Projenize Dahil Edin
\`\`\`typescript
import { KanbanBoard } from "ar-design";
import { KanbanBoardColumnType } from "ar-design/@types";
\`\`\`

#### 2. Sütun ve Veri Yapısı Tanımı
\`\`\`tsx
const columns = [
  {
    key: "todo",
    title: "Yapılacaklar",
    titleColor: "#ef4444",
    renderItem: (item) => <div>{item.title}</div>,
    items: [{ id: "1", title: "Görev A" }]
  }
];

<KanbanBoard 
  trackBy={(item) => item.id} 
  columns={columns} 
  onChange={(item, columnKey) => console.log(item, columnKey)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    todoCount: {
      name: "İlk Sütun Kart Metni",
      control: { type: "text" },
      table: { category: "Dinamik Görev Testi" },
    },
    inProgressCount: {
      name: "İkinci Sütun Kart Metni",
      control: { type: "text" },
      table: { category: "Dinamik Görev Testi" },
    },
    config: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    todoCount: 10,
    inProgressCount: 20,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ todoCount, inProgressCount, ...args }: StoryProps) => {
    // Sütun yapısının her klavye vuruşunda sıfırlanıp kilitlenmesini useMemo ile engelliyoruz
    const initialColumns = React.useMemo(
      () => createMockTasks("Storybook Entegrasyonunu Tamamla", "Filtreleme Optimizasyon Raporu"),
      [todoCount, inProgressCount],
    );

    // Kanban board'un sürükle-bırak sonrasındaki güncel halini tutan yerel state yönetimi
    const [boardColumns, setBoardColumns] = useState<KanbanBoardColumnType<IKabanTask, any>[]>(initialColumns);

    // Dışarıdan tetiklenen arg değişikliklerini state'e güvenle besleme
    React.useEffect(() => {
      setBoardColumns(initialColumns);
    }, [initialColumns]);

    // Filtre konfigürasyon simülasyonu
    const mockConfig = {
      perPage: 10,
      filter: {
        keys: (item: IKabanTask) => [
          { key: "assignee" as any, name: "Atanan Kişi", value: item.assignee, type: "select" as const },
          { key: "status" as any, name: "Durum", value: item.status, type: "select" as const },
        ],
      },
    };

    return (
      <div
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          background: "#f1f5f9",
        }}
      >
        <KanbanBoard
          {...args}
          trackBy={(item) => item.id}
          columns={boardColumns}
          config={mockConfig}
          onChange={(item, columnKey, properties, hoverIndex) => {
            console.log("Kart Taşındı:", item, "Yeni Sütun:", columnKey, "İndeks:", hoverIndex);
          }}
          onLazyLoad={(query, perPage, currentPage) => {
            console.log("Lazy Load Tetiklendi -> Sayfa:", currentPage, "Filtreler:", query);
          }}
        />
      </div>
    );
  },
};
