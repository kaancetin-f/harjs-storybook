import React, { useState, useMemo } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table } from "ar-design";
import { TableColumnType } from "ar-design/@types";

// 1. Kurumsal mockup veri modeli tanımı
interface IUserRow {
  id: string;
  fullName: string;
  role: string;
  status: "Active" | "Passive";
  email: string;
  subitems?: IUserRow[]; // Subrow yapısını test edebilmek için
}

// 2. Kontrol panelinde iç içe geçmiş config yapılarını düzleştirerek reaktiviteyi koruma tipi
type StoryProps = React.ComponentProps<typeof Table<IUserRow>> & {
  isSearchable?: boolean;
  isProperties?: boolean;
  isServerSide?: boolean;
  maxHeight?: number;
};

// 3. Statik Mockup Veri Seti (Sonsuz döngüyü engellemek için render dışında tanımlanmalıdır)
const initialMockData: IUserRow[] = [
  {
    id: "usr-1",
    fullName: "Ahmet Yılmaz",
    role: "Enterprise Solution Architect",
    status: "Active",
    email: "ahmet.yilmaz@company.com",
    subitems: [
      {
        id: "usr-1-sub1",
        fullName: "Ahmet Yılmaz (Yedek Hesap)",
        role: "Architect Dev",
        status: "Active",
        email: "ahmet.alt@company.com",
      },
    ],
  },
  {
    id: "usr-2",
    fullName: "Elif Kaya",
    role: "Lead Frontend Engineer",
    status: "Active",
    email: "elif.kaya@company.com",
  },
  {
    id: "usr-3",
    fullName: "Can Tekin",
    role: "Senior Backend Developer",
    status: "Passive",
    email: "can.tekin@company.com",
  },
  {
    id: "usr-4",
    fullName: "Zeynep Demir",
    role: "DevOps & Infrastructure Specialist",
    status: "Active",
    email: "zeynep.demir@company.com",
  },
];

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Datatable",
  component: Table as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
### 🚀 Kurumsal Geliştirici Kullanım Rehberi

Gelişmiş veri tablosu bileşeni; yerleşik çoklu filtreleme şemaları, yapışkan (\`sticky\`) sütun mimarisi, \`subrow\` katmanları ve sunucu/istemci taraflı çalışma modlarını destekler.

#### 1. Gerekli Bağımlılıkları Dahil Edin
\`\`\`typescript
import { Table } from "ar-design";
import { TableColumnType } from "ar-design/@types";
\`\`\`

#### 2. Sütun Şemasının Kurumsal Yapılandırılması
\`\`\`tsx
const columns: TableColumnType<IUserRow>[] = [
  {
    key: "fullName",
    text: "Adı Soyadı",
    filterDataType: "string",
    config: { sticky: "left" } // Sola sabitleme
  },
  {
    key: "status",
    text: "Durum",
    filterDataType: "boolean",
    filters: [
      { text: "Aktif", value: "Active" },
      { text: "Pasif", value: "Passive" }
    ]
  }
];

<Table 
  trackBy={(item) => item.id} 
  data={userData} 
  columns={columns} 
  config={{ isSearchable: true, isProperties: true }}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: { name: "Table Title", control: { type: "text" }, table: { category: "Giriş Bilgileri" } },
    description: {
      name: "Table Description",
      control: { type: "text" },
      table: { category: "Giriş Bilgileri" },
    },
    isSearchable: {
      name: "config.isSearchable",
      control: { type: "boolean" },
      table: { category: "Tablo Konfigürasyonu" },
    },
    isProperties: {
      name: "config.isProperties",
      control: { type: "boolean" },
      table: { category: "Tablo Konfigürasyonu" },
    },
    isServerSide: {
      name: "config.isServerSide",
      control: { type: "boolean" },
      table: { category: "Tablo Konfigürasyonu" },
    },
    maxHeight: {
      name: "config.scroll.maxHeight",
      control: { type: "number", min: 10, max: 100 },
      table: { category: "Tablo Konfigürasyonu" },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    title: "Kullanıcı Organizasyon Matrisi",
    description: "Şirket içi yetkilendirilmiş personellerin aktiflik durumları ve rol dağılımları.",
    isSearchable: true,
    isProperties: true,
    isServerSide: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { isSearchable, isProperties, isServerSide, maxHeight, ...args } = context;

    // Sütun tanımlamalarının klavye vuruşlarında re-render olup tablonun odağını (focus) kaybetmesini engelliyoruz
    const sampleColumns: TableColumnType<IUserRow>[] = useMemo(
      () => [
        {
          key: "fullName",
          text: "Personel Adı",
          filterDataType: "string",
          config: { sticky: "left", alignContent: "left" },
        },
        {
          key: "role",
          text: "Kurumsal Rol / Görev",
          filterDataType: "string",
        },
        {
          key: "email",
          text: "E-Posta Adresi",
          filterDataType: "string",
        },
        {
          key: "email",
          text: "E-Posta Adresi",
          filterDataType: "string",
        },
        {
          key: "email",
          text: "E-Posta Adresi",
          filterDataType: "string",
        },
        {
          key: "email",
          text: "E-Posta Adresi",
          filterDataType: "string",
        },
        {
          key: "status",
          text: "Sistem Durumu",
          filterDataType: "boolean",
          filters: [
            { text: "Active", value: "Active" },
            { text: "Passive", value: "Passive" },
          ],
        },
      ],
      [],
    );

    // Config yapısını düzleştirilmiş proplardan güvenli bir nesneye dönüştürüyoruz
    const mergedConfig = useMemo(
      () => ({
        isSearchable,
        isProperties,
        isServerSide,
        locale: "tr",
        scroll: maxHeight ? { maxHeight } : undefined,
        subrow: {
          openAutomatically: false,
          selector: "subitems",
          button: true,
        },
      }),
      [isSearchable, isProperties, isServerSide, maxHeight],
    );

    // Sayfalama yerel state yönetimi
    const [paginationState, setPaginationState] = useState({
      totalRecords: initialMockData.length,
      perPage: 2,
    });

    return (
      <Table
        {...args}
        trackBy={(item: IUserRow) => item.id}
        data={initialMockData}
        columns={sampleColumns}
        config={mergedConfig}
        pagination={{
          totalRecords: paginationState.totalRecords,
          perPage: paginationState.perPage,
          onChange: (currentPage, perPage) => {
            console.log(`Sayfa Değişti -> Sayfa No: ${currentPage}, Sayfa Başına Veri: ${perPage}`);
            setPaginationState((prev) => ({ ...prev, perPage }));
          },
        }}
        selections={(selectedRows) => {
          console.log("Seçilen Satırlar (Checkbox):", selectedRows);
        }}
        sortedParams={(sortParams, queryString) => {
          console.log("Sıralama Değişti (Server Side):", sortParams, "Query:", queryString);
        }}
        searchedParams={(searchParams, queryString, operator) => {
          console.log("Arama Tetiklendi (Server Side):", searchParams, "Operator:", operator, "Query:", queryString);
        }}
      />
    );
  },
};
