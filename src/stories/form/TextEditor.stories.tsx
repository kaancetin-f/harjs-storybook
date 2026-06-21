import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextEditor } from "ar-design";

// Etiketleme (Alias/Mention) özelliğini simüle etmek için mock veri tipi
interface AliasUser {
  id: number;
  fullName: string;
  role: string;
}

type StoryProps = React.ComponentProps<typeof TextEditor<AliasUser>> & {
  validationText?: string;
  // dynamicList alanının düzleştirilmiş propları
  aliasDisplayKey?: keyof AliasUser;
  aliasTriggerKey?: string;
  showAliasPanel?: boolean;
};

// Mock Kullanıcı Veri Havuzu (@ yazıldığında çıkacak liste)
const mockUsers: AliasUser[] = [
  { id: 1, fullName: "Ahmet Yılmaz", role: "Frontend Developer" },
  { id: 2, fullName: "Ayşe Demir", role: "UI/UX Designer" },
  { id: 3, fullName: "Mehmet Kaya", role: "Backend Developer" },
  { id: 4, fullName: "Canan Öz", role: "Product Manager" },
];

const meta: Meta<StoryProps> = {
  title: "FORM/TextEditor",
  component: TextEditor as any, // Generic tip uyuşmazlığını Storybook seviyesinde esnetiyoruz
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    placeholder: {
      name: "Placeholder (Etiket)",
      control: { type: "text" },
      description: "Zengin metin editörü boşken üst alanda ve girdi alanında görüntülenecek açıklama metnidir.",
      table: { type: { summary: "string" } },
    },

    height: {
      name: "Height (Yükseklik)",
      control: { type: "number" },
      description:
        "Editörün piksel cinsinden başlangıç yüksekliğini belirler. Sağ alt köşeden manuel olarak da büyütülebilir.",
      table: { type: { summary: "number" }, defaultValue: { summary: "200" } },
    },

    color: {
      name: "Color (Tema Rengi)",
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
      description: "Bileşen odaklandığında (focus) çerçeveye uygulanacak kurumsal renk temasını seçer.",
      table: { type: { summary: "string" }, defaultValue: { summary: "light" } },
    },

    disabled: {
      name: "Disabled (Devre Dışı)",
      control: { type: "boolean" },
      description: "Bileşenin tasarım modunu (designMode) kapatarak metin girişini ve toolbar butonlarını engeller.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },

    name: { table: { disable: true } },

    // #region Dinamik Liste / Alias Ayarları
    showAliasPanel: {
      name: "Enable Mention (@Alias)",
      control: { type: "boolean" },
      description:
        "Editör içerisinde tetikleyici karakter yazıldığında dinamik bir açılır liste (Mention) çıkmasını aktif eder.",
      table: { category: "Dinamik Liste (Alias) Ayarları", type: { summary: "boolean" } },
    },

    aliasTriggerKey: {
      name: "Trigger Key (Tetikleyici Karakter)",
      control: { type: "text" },
      description: "Dinamik listeyi ayağa kaldıracak özel karakteri belirler.",
      table: {
        category: "Dinamik Liste (Alias) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "@" },
      },
    },

    aliasDisplayKey: {
      name: "Display Key (Gösterilecek Alan)",
      control: { type: "select" },
      options: ["fullName", "role"],
      description:
        "Açılır listede kullanıcı nesnesinin hangi alanının metin olarak listeleneceğini ve etikete basılacağını belirler.",
      table: {
        category: "Dinamik Liste (Alias) Ayarları",
        type: { summary: "string" },
        defaultValue: { summary: "fullName" },
      },
    },
    // #endregion

    // #region Doğrulama Ayarları
    validationText: {
      name: "Validation Message",
      control: { type: "text" },
      description: "Editör için aktif hata mesajını tanımlar. Dolu olduğunda editör çerçevesi kırmızıya bürünür.",
      table: { category: "Doğrulama Ayarları", type: { summary: "string" } },
    },
    // #endregion
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    placeholder: "E-posta içeriğinizi yazın veya birini etiketlemek için @ karakterini kullanın...",
    height: 250,
    color: "light",
    disabled: false,
    showAliasPanel: true,
    aliasTriggerKey: "@",
    aliasDisplayKey: "fullName",
    validationText: "",
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({
    validationText = "",
    showAliasPanel = true,
    aliasTriggerKey = "@",
    aliasDisplayKey = "fullName",
    ...args
  }: StoryProps) => {
    // Editörün içindeki HTML metnini takip eden ana state
    const [editorValue, setEditorValue] = useState<string | undefined>(
      "<p>Merhaba, bu bir <b>Zengin Metin Editörü</b> (Rich Text Editor) simülasyonudur.</p>",
    );
    // Editörde etiketlenen nesnelerin listesi
    const [taggedItems, setTaggedItems] = useState<AliasUser[]>([]);

    // Düzleştirilmiş validation nesnesini geri inşa etme
    const validationObj = validationText ? { validation: { text: validationText } } : { validation: undefined };

    // Düzleştirilmiş dynamicList konfigürasyonunu geri inşa etme
    const dynamicListObj = showAliasPanel
      ? {
          dynamicList: {
            triggerKey: aliasTriggerKey,
            render: {
              display: aliasDisplayKey,
              items: mockUsers,
            },
            onTagged: (items: any[]) => {
              setTaggedItems(items);
            },
          },
        }
      : { dynamicList: undefined };

    return (
      <div>
        <TextEditor
          {...args}
          value={editorValue}
          onChange={(val) => setEditorValue(val)}
          {...dynamicListObj}
          {...validationObj}
        />

        {/* Geliştirici ve test süreçleri için anlık state izleme çıktıları */}
        {showAliasPanel && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              background: "#f9f9f9",
              borderRadius: "6px",
              border: "1px dashed #ddd",
              fontSize: "13px",
            }}
          >
            <strong style={{ color: "#720f67" }}>Etiketlenen Kullanıcılar (onTagged):</strong>
            {taggedItems.length === 0 ? (
              <span style={{ color: "#999", marginLeft: "10px" }}>Henüz kimse etiketlenmedi.</span>
            ) : (
              <ul style={{ margin: "5px 0 0 0", paddingLeft: "20px" }}>
                {taggedItems.map((user) => (
                  <li key={user.id}>
                    {user.fullName} - <small style={{ color: "#666" }}>{user.role}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            background: "#f4f4f4",
            borderRadius: "6px",
            fontSize: "11px",
            fontFamily: "monospace",
            overflowX: "auto",
          }}
        >
          <strong style={{ color: "#333" }}>Anlık HTML Çıktısı (onChange):</strong>
          <div style={{ marginTop: "5px", whiteSpace: "pre-wrap" }}>{editorValue || "undefined (Boş)"}</div>
        </div>
      </div>
    );
  },
};
