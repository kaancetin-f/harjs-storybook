import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "ar-design";
import { BorderRadiuses, Variants, Option, Color, Status } from "ar-design/@types";

type StoryProps = React.ComponentProps<typeof Select> & {
  borderRadius?: BorderRadiuses;
  validationText?: string;
  validationTextVisibility?: "visible" | "hidden";
  configClear?: boolean;
  multiple: boolean;
  statusColor?: string;
  selectedChipVariant?: Variants;
  selectedChipColor?: string;
};

// Mock Veri Havuzu
const mockOptions: Option[] = [
  { value: "tr", text: "Türkiye" },
  { value: "en", text: "United States" },
  { value: "de", text: "Germany" },
  { value: "fr", text: "France" },
  { value: "it", text: "Italy" },
];

const meta: Meta<StoryProps> = {
  title: "FORM/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    placeholder: {
      name: "Placeholder",
      control: { type: "text" },
      description: "Seçim alanı boşken girdi kutusunda arka planda gösterilecek metindir.",
      table: { type: { summary: "string" } },
    },

    multiple: {
      name: "Multiple",
      control: { type: "boolean" },
      description: "Aktif edildiğinde birden fazla seçeneğin Chip (etiket) şeklinde seçilmesine izin verir.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
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
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      description: "Bileşenin dış çerçeve ve arka plan tasarım stil varyasyonunu belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "outlined" } },
    },

    color: {
      name: "Color",
      control: {
        type: "select",
        labels: {
          blue: "Mavi (Blue)",
          purple: "Mor (Purple)",
          pink: "Pembe (Pink)",
          red: "Kırmızı (Red)",
          orange: "Turuncu (Orange)",
          yellow: "Sarı (Yellow)",
          green: "Yeşil (Green)",
          teal: "Camgöbeği (Teal)",
          cyan: "Açık Mavi (Cyan)",
          gray: "Gri (Gray)",
          light: "Açık Renk (Light)",
        },
      },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description: "Bileşen odaklandığında (focus) veya aktifleştiğinde uygulanacak renk temasını seçer.",
      table: { type: { summary: "string" } },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak açılır menüyü ve seçim işlemlerini engeller.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    upperCase: {
      name: "UpperCase",
      control: { type: "boolean" },
      description: "Arama kutusuna girilen karakterleri otomatik olarak Türkçe duyarlı büyük harfe dönüştürür.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    options: { table: { disable: true } },
    border: { table: { disable: true } },
    validation: { table: { disable: true } },
    config: { table: { disable: true } },
    status: { table: { disable: true } },

    // #region Konfigürasyon Ayarları (config)
    configClear: {
      name: "Show Clear Button",
      control: { type: "boolean" },
      description: "Seçim yapıldığında sağ tarafta tek tıkla temizleme sağlayan çarpı (X) butonunu gösterir.",
      table: {
        category: "Gelişmiş Yapılandırma (Config)",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },

    validationTextVisibility: {
      name: "Error Message Visibility",
      control: {
        type: "select",
        labels: {
          visible: "Görünür (Visible)",
          hidden: "Gizli (Hidden)",
        },
      },
      options: ["visible", "hidden"],
      description: "Doğrulama hatası metninin alt alanda grafik olarak listelenip listelenmeyeceğini kontrol eder.",
      table: {
        category: "Gelişmiş Yapılandırma (Config)",
        type: { summary: "string" },
        defaultValue: { summary: "visible" },
      },
    },
    // #endregion

    // #region Durum ve Etiket Renk Ayarları (status)
    statusColor: {
      name: "Status Color",
      control: { type: "select" },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description: "Çoklu seçim modunda bileşenin genel durum bildirim renk temasını belirler.",
      table: { category: "Durum & Etiket Ayarları (Status)", type: { summary: "string" } },
    },

    selectedChipVariant: {
      name: "Selected Chip Variant",
      control: {
        type: "select",
        labels: {
          filled: "Dolu (Filled)",
          surface: "Zemin (Surface)",
          outlined: "Çerçeveli (Outlined)",
          dashed: "Kesik Çizgili (Dashed)",
          borderless: "Çerçevesiz (Borderless)",
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      description:
        "Çoklu seçim yapıldığında kutu içine basılan Chip (etiket) bileşenlerinin tasarım varyasyonunu belirler.",
      table: {
        category: "Durum & Etiket Ayarları (Status)",
        type: { summary: "string" },
        defaultValue: { summary: "filled" },
      },
    },

    selectedChipColor: {
      name: "Selected Chip Color",
      control: { type: "select" },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"],
      description: "Çoklu seçim modunda seçilen Chip etiketlerinin kurumsal arka plan/odak rengini ayarlar.",
      table: { category: "Durum & Etiket Ayarları (Status)", type: { summary: "string" } },
    },
    // #endregion

    // #region Kenarlık Ayarları
    borderRadius: {
      name: "Radius",
      control: {
        type: "select",
        labels: {
          sm: "Küçük (SM)",
          lg: "Büyük (LG)",
          xl: "Çok Büyük (XL)",
          xxl: "Daha Büyük (XXL)",
          pill: "Kapsül (PILL)",
          none: "Kenarlık Yok (NONE)",
        },
      },
      options: ["sm", "lg", "xl", "xxl", "pill", "none"],
      description: "Seçim alanının ve açılır menü çerçevesinin köşe yuvarlatma (radius) yapısını belirler.",
      table: { category: "Border Ayarları", type: { summary: "string" }, defaultValue: { summary: "sm" } },
    },
    // #endregion

    // #region Doğrulama Ayarları
    validationText: {
      name: "Validation Message",
      control: { type: "text" },
      description: "Bileşen için aktif hata mesajını tanımlar. Dolu olduğunda seçim alanı kırmızı çerçeveye bürünür.",
      table: { category: "Doğrulama Ayarları", type: { summary: "string" } },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const SelectComponent = Select;

export const Editor: Story = {
  args: {
    placeholder: "Ülke Seçiniz...",
    multiple: false,
    variant: "outlined",
    color: "blue",
    borderRadius: "sm",
    disabled: false,
    upperCase: false,
    configClear: true,
    validationTextVisibility: "visible",
    validationText: "",
    statusColor: "blue",
    selectedChipVariant: "filled",
    selectedChipColor: "blue",
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const {
      multiple = false,
      borderRadius = "sm",
      validationText = "",
      validationTextVisibility = "visible",
      configClear = true,
      statusColor = "blue",
      selectedChipVariant = "filled",
      selectedChipColor = "blue",
      ...args
    } = context;

    const [singleValue, setSingleValue] = useState<Option | undefined>(undefined);
    const [multipleValue, setMultipleValue] = useState<Option[]>([]);
    const [dynamicOptions, setDynamicOptions] = useState<Option[]>(mockOptions);

    // Düzleştirilmiş config nesnesini yapılandırma
    const configObj = {
      clear: configClear,
      validation: {
        text: validationTextVisibility as "visible" | "hidden",
      },
    };

    // Düzleştirilmiş validation nesnesini yapılandırma
    const validationObj = validationText ? { validation: { text: validationText } } : { validation: undefined };

    const handleCreate = (newOption: Option) => {
      const createdOption = { value: newOption.text.toLowerCase().replace(/\s/g, "-"), text: newOption.text };
      setDynamicOptions((prev) => [...prev, createdOption]);

      if (multiple) {
        setMultipleValue((prev) => [...prev, createdOption]);
      } else {
        setSingleValue(createdOption);
      }
    };

    if (multiple) {
      return (
        <Select
          {...args}
          key="multiple-select"
          multiple={true}
          options={dynamicOptions}
          value={multipleValue}
          onChange={(val) => setMultipleValue(val)}
          onCreate={handleCreate}
          border={{ radius: borderRadius as any }}
          config={configObj}
          status={{
            color: statusColor as Color,
            selected: {
              variant: selectedChipVariant as Variants,
              color: selectedChipColor as Color,
            },
          }}
          {...validationObj}
        />
      );
    } else {
      return (
        <Select
          {...args}
          key="single-select"
          multiple={false}
          options={dynamicOptions}
          value={singleValue}
          onChange={(val) => setSingleValue(val)}
          onCreate={handleCreate}
          border={{ radius: borderRadius as any }}
          config={configObj}
          status={statusColor as Status}
          {...validationObj}
        />
      );
    }
  },
};
