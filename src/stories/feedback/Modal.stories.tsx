import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, Grid, Modal } from "ar-design";
import React, { useState } from "react";

type StoryProps = React.ComponentProps<typeof Modal> & {
  isOpenInitial: boolean;
  showCustomFooter: boolean;
};

const { Box } = Grid;

const meta: Meta<StoryProps> = {
  title: "FEEDBACK/Modal",
  component: Modal as any,
  tags: ["autodocs"],
  parameters: {
    // Storybook dökümantasyon sayfasındaki event çakışmalarını izole iframe oluşturarak engelliyoruz.
    docs: {
      inlineStories: false,
      iframeHeight: 400,
    },
    controls: { disable: true },
  },
  argTypes: {
    title: {
      name: "Title",
      control: { type: "text" },
      description: "Modal bileşeninin üst (header) alanında görüntülenecek başlık metnini belirler.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Modal Başlığı" },
      },
    },

    size: {
      name: "Size",
      control: {
        type: "select",
        options: ["small", "normal", "large"],
      },
      description: "Modal pencerisinin genişlik ölçeğini ayarlar.",
    },

    children: {
      name: "Content",
      control: { type: "text" },
      description: "Modal gövdesinde (body) render edilecek içeriği belirler.",
    },

    // #region Kapatma Onay Popover Ayarları
    closePopover: {
      name: "Close Popover (Confirm)",
      control: { type: "object" },
      description:
        "Kapatma butonuna tıklandığında açılacak onay penceresinin (Confirm) içerik ve buton konfigürasyonudur.",
      table: {
        category: "Kapatma Onay Popover Ayarları",
        type: { summary: "IProps (ConfirmPopover)" },
      },
    },
    // #endregion

    // #region Davranış Ayarları
    disableCloseOnBackdrop: {
      name: "Disable Backdrop Close",
      control: { type: "boolean" },
      table: { category: "Davranış Ayarları" },
    },
    disableCloseOnEsc: {
      name: "Disable ESC Close",
      control: { type: "boolean" },
      table: { category: "Davranış Ayarları" },
    },
    // #endregion

    // #region Simülasyon Kontrolleri
    isOpenInitial: {
      name: "Is Open (Initial)",
      control: { type: "boolean" },
      table: { category: "Simülasyon Kontrolleri" },
    },
    showCustomFooter: {
      name: "Show Footer",
      control: { type: "boolean" },
      table: { category: "Simülasyon Kontrolleri" },
    },
    // #endregion

    open: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    title: "Veri Giriş Formu",
    size: "normal",
    children: "Form verileri üzerinde değişiklik yaptınız. Modalı kapatırsanız verileriniz kaybolabilir.",
    disableCloseOnBackdrop: false,
    disableCloseOnEsc: false,
    isOpenInitial: true, // Kolay test edebilmek için varsayılanı true yapabilirsiniz
    showCustomFooter: true,

    // 💡 2. ÇÖZÜM: Storybook yan paneline tıklandığında odak kaybından dolayı
    // Popover'ın anında kapanmasını engellemek için windowBlur değerini true yapıyoruz.
    closePopover: {
      title: "Emin misiniz?",
      message: "Kapatırsanız değişiklikleriniz silinecektir.",
      windowBlur: true,
      fullWidth: false,
      config: {
        buttons: {
          okay: "Evet, Kapat",
          cancel: "Vazgeç",
        },
      },
    } as any,
  },
  parameters: {
    controls: { disable: false },
  },
  render: ({ isOpenInitial, showCustomFooter, closePopover, children, title, ...args }) => {
    const [open, setOpen] = useState(isOpenInitial);

    // closePopover içerisindeki onConfirm fonksiyonunu yakalayıp modalı kapatacak şekilde sarmalıyoruz
    const finalClosePopover = closePopover
      ? {
          ...closePopover,
          onConfirm: (confirm: boolean) => {
            if (confirm) {
              setOpen(false); // Kullanıcı "Evet" derse modalı kapat
            }

            if (closePopover.onConfirm) closePopover.onConfirm(confirm);
          },
        }
      : undefined;

    const sampleFooter = showCustomFooter ? (
      <Box>
        <Button onClick={() => setOpen(false)}>İptal</Button>
        <Button variant="filled" color="green" onClick={() => alert("Form Kaydedildi")}>
          Kaydet
        </Button>
      </Box>
    ) : undefined;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button variant="surface" color="blue" onClick={() => setOpen(true)}>
          Modal'ı Aç
        </Button>

        <Modal
          {...args}
          title={title}
          footer={sampleFooter}
          closePopover={finalClosePopover}
          open={{
            get: open,
            set: setOpen,
          }}
        >
          {children}
        </Modal>
      </div>
    );
  },
};
