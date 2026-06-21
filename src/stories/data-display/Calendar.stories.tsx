import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "ar-design";
import { CalendarEvent } from "../../../../ar-design/dist/components/data-display/calendar/IProps";

// Hikayede listelenecek kurumsal toplantı/etkinlik veri tipi
interface CustomMeeting extends CalendarEvent {
  id: string;
  title: string;
  room: string;
  organizer: string;
}

type StoryProps = React.ComponentProps<typeof Calendar<CustomMeeting>> & {
  locale?: "tr-TR" | "en-US" | "de-DE";
  weekStartsOn?: 0 | 1 | 6; // 0: Pazar, 1: Pazartesi, 6: Cumartesi
};

// Dinamik Haftalık Mock Veri Seti (Mevcut haftaya göre otomatik yerleşir)
const getMockEvents = (): CustomMeeting[] => {
  const today = new Date();

  const createDate = (dayOffset: number, hours: number, minutes: number) => {
    const d = new Date(today);
    // Mevcut haftanın günlerine dağıtmak için
    const currentDay = d.getDay();
    const distance = dayOffset - (currentDay === 0 ? 7 : currentDay); // Pazartesi bazlı kaydırma
    d.setDate(d.getDate() + distance);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  return [
    {
      id: "evt-1",
      title: "Daily Standup Toplantısı",
      room: "Açık Ofis - Blok A",
      organizer: "Ahmet Yılmaz",
      start: createDate(1, 9, 30), // Pazartesi 09:30
      end: createDate(1, 10, 15), // Pazartesi 10:15
    },
    {
      id: "evt-2",
      title: "UI/UX Tasarım Değerlendirmesi",
      room: "Toplantı Odası 3",
      organizer: "Ayşe Demir",
      start: createDate(1, 10, 0), // ÇAKIŞMA SİMÜLASYONU: Pazartesi 10:00
      end: createDate(1, 11, 30), // Pazartesi 11:30
    },
    {
      id: "evt-3",
      title: "Sprint Planlama (Planning)",
      room: "Ana Konferans Salonu",
      organizer: "Canan Öz",
      start: createDate(1, 11, 0), // ÇAKIŞMA SİMÜLASYONU 2: Pazartesi 11:00
      end: createDate(1, 13, 0), // Pazartesi 13:00
    },
    {
      id: "evt-4",
      title: "Backend Core Mimari Revizyonu",
      room: "Zoom Online",
      organizer: "Mehmet Kaya",
      start: createDate(3, 14, 0), // Çarşamba 14:00
      end: createDate(3, 16, 0), // Çarşamba 16:00
    },
    {
      id: "evt-5",
      title: "HR Monthly Keynote",
      room: "Etkinlik Alanı",
      organizer: "Pelin Avcı",
      start: createDate(5, 15, 0), // Cuma 15:00
      end: createDate(5, 16, 30), // Cuma 16:30
    },
  ];
};

const meta: Meta<StoryProps> = {
  title: "DATA DISPLAY/Calendar",
  component: Calendar as any, // Generic esneklik için
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replace(/<CalendarComponent/g, "<Calendar").replace(/<\/CalendarComponent/g, "</Calendar");
        },
      },
    },
  },
  argTypes: {
    trackedBy: {
      name: "Tracked By",
      control: { type: "text" },
      description:
        "Etkinlikleri birbirinden ayırmak ve tutarlı renk atamaları (`getColor`) yapabilmek için kullanılacak benzersiz alan adıdır.",
      table: { type: { summary: "string" } },
    },

    locale: {
      name: "Locale",
      control: { type: "select" },
      options: ["tr-TR", "en-US", "de-DE"],
      description: "Takvim başlıklarının, ay ve gün isimlerinin yerelleştirme (Localization) ayarını belirler.",
      table: { category: "Global Konfigürasyon", type: { summary: "string" }, defaultValue: { summary: "tr-TR" } },
    },

    weekStartsOn: {
      name: "Week Starts On",
      control: {
        type: "select",
        labels: {
          0: "Pazar (Sunday)",
          1: "Pazartesi (Monday)",
          6: "Cumartesi (Saturday)",
        },
      },
      options: [0, 1, 6],
      description: "Haftalık görünüm çizelgesinin hangi günden itibaren başlayacağını konfigüre eder.",
      table: { category: "Global Konfigürasyon", type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    trackedBy: "id",
    locale: "tr-TR",
    weekStartsOn: 1,
  },
  parameters: {
    controls: { disable: false },
  },
  render: (context: StoryProps) => {
    const { locale = "tr-TR", weekStartsOn = 1, ...args } = context;

    // Düzleştirilmiş kontrol panel proplarını orijinal config nesnesine bağlama
    const configObj = {
      locale,
      weekStartsOn,
    };

    // Her bir takvim kutusunun (event-box) içinde basılacak şablon tasarımı
    const customRenderItem = (item: CustomMeeting, index: number) => {
      return (
        <div style={{ padding: "4px 6px", color: "#fff", fontSize: "11px", lineHeight: "1.3", overflow: "hidden" }}>
          <div style={{ fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
            {item.title}
          </div>
          <div style={{ opacity: 0.85, fontSize: "10px", marginTop: "2px" }}>📍 {item.room}</div>
          <div style={{ opacity: 0.8, fontSize: "9px" }}>👤 {item.organizer}</div>
        </div>
      );
    };

    return <Calendar {...args} data={getMockEvents()} renderItem={customRenderItem} config={configObj} />;
  },
};
