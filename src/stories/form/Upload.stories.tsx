import React, { useState } from "react";
import { Upload } from "ar-design";
import { MimeTypes, Sizes } from "ar-design/@types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

type StoryProps = React.ComponentProps<typeof Upload> & {
  allowedPng?: boolean;
  allowedJpeg?: boolean;
  allowedPdf?: boolean;
};

const meta: Meta<StoryProps> = {
  title: "FORM/Upload",
  component: Upload,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    text: {
      name: "Text",
      control: { type: "text" },
      description: "Dosya seçilmediğinde veya dropzone alanında alt kısımda gösterilecek açıklama metnidir.",
      table: { type: { summary: "string" } },
    },

    multiple: {
      name: "Multiple",
      control: { type: "boolean" },
      description: "Aktif edildiğinde birden fazla dosyanın aynı anda seçilip yüklenmesine izin verir.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    type: {
      name: "Type",
      control: {
        type: "select",
        labels: {
          list: "Liste Görünümü (List)",
          grid: "Izgara Görünümü (Grid)",
          dropzone: "Sürükle-Bırak Alanı (Dropzone)",
        },
      },
      options: ["list", "grid", "dropzone"],
      description: "Yüklenen dosyaların listelenme şablonunu ve etkileşim türünü belirler.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Sürükle-Bırak Alanı (Dropzone)" } },
    },

    direction: {
      name: "Direction",
      control: {
        type: "inline-radio",
        labels: {
          row: "Yan Yana (Row)",
          column: "Alt Alta (Column)",
        },
      },
      options: ["row", "column"],
      description: "List ve Grid modlarında dosyaların dizilim yönünü ayarlar.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Yan Yana (Row)" } },
    },

    maxSize: {
      name: "Max Size (MB)",
      control: { type: "number" },
      description: "Dosya başına izin verilen maksimum boyuttur (Megabayt cinsinden).",
      table: { type: { summary: "number" } },
    },

    size: {
      name: "Size (Boyut)",
      control: {
        type: "select",
        labels: {
          small: "Küçük (Small)",
          normal: "Normal (Normal)",
          large: "Büyük (Large)",
        },
      },
      options: ["small", "normal", "large"],
      description: "Upload butonunun ölçek boyutunu belirler.",
      table: { type: { summary: "string" } },
    },

    fullWidth: {
      name: "Full Width",
      control: { type: "boolean" },
      description: "Upload butonunun genişliğini kapsayıcısına göre %100 yapar.",
      table: { type: { summary: "boolean" } },
    },

    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "Bileşeni etkileşime kapatarak dosya seçimini engeller.",
      table: { type: { summary: "boolean" } },
    },

    // #region İzin Verilen Türler (allowedTypes dizisinden düzleştirildi)
    allowedPng: {
      name: "Allow PNG",
      control: { type: "boolean" },
      description: "image/png uzantılı dosyalara izin verir.",
      table: { category: "İzin Verilen Dosya Türleri", type: { summary: "boolean" } },
    },
    allowedJpeg: {
      name: "Allow JPEG/JPG",
      control: { type: "boolean" },
      description: "image/jpeg uzantılı dosyalara izin verir.",
      table: { category: "İzin Verilen Dosya Türleri", type: { summary: "boolean" } },
    },
    allowedPdf: {
      name: "Allow PDF",
      control: { type: "boolean" },
      description: "application/pdf uzantılı dosyalara izin verir.",
      table: { category: "İzin Verilen Dosya Türleri", type: { summary: "boolean" } },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    text: "Dosya Yüklemek İçin Tıklayın veya Sürükleyin",
    multiple: false,
    type: "list",
    direction: "column",
    maxSize: 2, // 2MB varsayılan limit
    size: "normal",
    fullWidth: false,
    disabled: false,
    allowedPng: true,
    allowedJpeg: true,
    allowedPdf: false,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { allowedPng, allowedJpeg, allowedPdf, ...args } = context;

    // Bileşenin state takibini simüle etmek için içsel dosya listesi yönetimi
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    // Test amaçlı çıktıları panel altında izleyebilmek için ek dataları tutan stateler
    const [base64Preview, setBase64Preview] = useState<string[]>([]);
    const [isAllValid, setIsAllValid] = useState<boolean>(true);

    // Düzleştirilmiş boolean anahtarları MimeTypes[] dizisine geri dönüştürme
    const computedAllowedTypes: MimeTypes[] = [];
    if (allowedPng) computedAllowedTypes.push("image/png" as MimeTypes);
    if (allowedJpeg) computedAllowedTypes.push("image/jpeg" as MimeTypes);
    if (allowedPdf) computedAllowedTypes.push("application/pdf" as MimeTypes);

    return (
      <div>
        <Upload
          {...args}
          files={uploadedFiles}
          allowedTypes={computedAllowedTypes.length > 0 ? computedAllowedTypes : undefined}
          onChange={(formData, files, base64, isInvalidFileExist) => {
            setUploadedFiles(files);
            setBase64Preview(base64);
            setIsAllValid(isInvalidFileExist);
          }}
        />

        {/* Dosya Durum İzleme Bilgi Paneli */}
        {uploadedFiles.length > 0 && (
          <div
            style={{
              marginTop: "25px",
              padding: "12px",
              background: "#f8f9fa",
              borderRadius: "6px",
              border: "1px solid #e9ecef",
              fontSize: "12px",
            }}
          >
            <div style={{ marginBottom: "5px" }}>
              <strong>Yüklenen Dosya Sayısı (Geçerli):</strong> {uploadedFiles.length}
            </div>
            <div style={{ marginBottom: "5px" }}>
              <strong>Tüm Dosyalar Geçerli mi?:</strong>{" "}
              <span style={{ color: isAllValid ? "green" : "red", fontWeight: "bold" }}>
                {isAllValid ? "Evet (Başarılı)" : "Hayır (Hata Var)"}
              </span>
            </div>
            {base64Preview.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <strong>Son Yüklenen Resim Önizlemesi (Base64 Temsili):</strong>
                <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
                  {base64Preview.slice(0, 3).map((b64, idx) => (
                    <img
                      key={idx}
                      src={b64}
                      alt="preview"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    />
                  ))}
                  {base64Preview.length > 3 && (
                    <span style={{ alignSelf: "center", color: "#666" }}>+{base64Preview.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
};
