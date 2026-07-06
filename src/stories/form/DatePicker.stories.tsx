import { COLOR_OPTIONS, RADIUS_OPTIONS, SIZE_OPTIONS, VARIANT_OPTIONS } from "@/infrustructure/shared/Array";
import { DatePicker, Grid } from "@harjs/react-ui";
import { type BorderRadiuses } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const { Row, Column, Flex } = Grid;

// Renk/varyant matrisinde ve diğer örneklerde kullanılan sabit bir tarih değeridir.
const SAMPLE_DATE = "2026-07-06T09:30:00.000Z";

type DatePickerProps = React.ComponentProps<typeof DatePicker>;

type StoryProps = Omit<DatePickerProps, "onChange" | "config"> & {
  borderRadius?: BorderRadiuses;
  locale?: "tr" | "en";
  isClock?: boolean;
  isFooterButton?: boolean;
  validationText?: string;
  validationScrollTo?: string;
};

const meta = {
  title: "FORM/DatePicker",
  component: DatePicker,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<StoryProps>;

/**
 * `DatePicker`, `value` / `onChange` çifti ile her zaman dışarıdan kontrol edilen (controlled)
 * bir bileşendir. Bu yardımcı sarmalayıcı, örnekler içerisinde tekrar eden state yönetimini
 * sadeleştirmek ve `config` nesnesini düz (flat) story prop'larından yeniden oluşturmak için
 * kullanılmıştır.
 */
const ControlledDatePicker = ({
  initialValue = "",
  borderRadius,
  locale,
  isClock,
  isFooterButton,
  validationText,
  validationScrollTo,
  ...attributes
}: StoryProps & { initialValue?: string }) => {
  const [value, setValue] = useState<string>(initialValue);

  return (
    <DatePicker
      {...(attributes as any)}
      border={{ radius: borderRadius as any }}
      config={{ locale, isClock, isFooterButton }}
      validation={
        validationText || validationScrollTo ? { text: validationText, scrollTo: validationScrollTo } : undefined
      }
      value={value}
      onChange={setValue}
    />
  );
};

export const Editor: Story = {
  args: {
    variant: "outlined",
    color: "gray",
    size: "md",
    borderRadius: "4",
    placeholder: "Bir tarih seçin",
    disabled: false,
    locale: "tr",
    isClock: false,
    isFooterButton: true,
  },
  argTypes: {
    border: { table: { disable: true } },
    type: { table: { disable: true } },
    validationText: { table: { disable: true } },
    validationScrollTo: { table: { disable: true } },
    locale: {
      name: "Locale",
      description:
        "Locale used to translate the calendar and clock panels: month and weekday names as well as action button labels ('Now', 'Okay') are resolved through this value.",
      control: "select",
      options: ["tr", "en"],
      table: {
        category: "Config",
        type: { summary: '"tr" | "en"' },
        defaultValue: { summary: '"tr"' },
      },
    },
    isClock: {
      name: "Is Clock",
      description:
        "When set to true, a clock panel is rendered next to the calendar so an hour/minute can also be selected, and the underlying input switches from `date` to `datetime-local`. When false, only a date can be selected.",
      control: "boolean",
      table: {
        category: "Config",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isFooterButton: {
      name: "Is Footer Button",
      description:
        "When set to true, a footer containing 'Now' and 'Okay' action buttons is rendered beneath the calendar (and the clock, when `isClock` is also enabled).",
      control: "boolean",
      table: {
        category: "Config",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  render: (args) => <ControlledDatePicker {...args} />,
};

export const Variant: Story = {
  parameters: { controls: { disable: true } },
  args: {
    color: "gray",
    borderRadius: "4",
  },
  render: (args) => (
    <Flex flexDirection="row" gap="15px" flexWrap="wrap">
      <ControlledDatePicker {...args} variant="filled" placeholder="Filled" />
      <ControlledDatePicker {...args} variant="outlined" placeholder="Outlined" />
      <ControlledDatePicker {...args} variant="dashed" placeholder="Dashed" />
      <ControlledDatePicker {...args} variant="surface-borderless" placeholder="Surface Borderless" />
      <ControlledDatePicker {...args} variant="borderless" placeholder="Borderless" />
    </Flex>
  ),
};

export const Color: Story = {
  parameters: { controls: { disable: true } },
  args: { borderRadius: "4" },
  render: (args) => (
    <Flex flexDirection="column" gap="16px">
      {VARIANT_OPTIONS.map((variant) => (
        <Flex key={variant} flexDirection="row" alignItems="center" gap="12px" flexWrap="wrap">
          {COLOR_OPTIONS.map((color) => (
            <Flex key={`${variant}-${color}`} flexDirection="column" gap="4px">
              <ControlledDatePicker {...args} variant={variant} color={color} placeholder="..." />
              <ControlledDatePicker {...args} variant={variant} color={color} placeholder="..." initialValue={SAMPLE_DATE} />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      <ControlledDatePicker {...args} />
      <ControlledDatePicker {...args} initialValue={SAMPLE_DATE} />
    </Flex>
  ),
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {RADIUS_OPTIONS.map((radius) => (
        <ControlledDatePicker key={radius} {...args} borderRadius={radius} placeholder={`Radius ${radius}`} />
      ))}
    </Flex>
  ),
};

export const Size: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {SIZE_OPTIONS.map((size) => (
        <ControlledDatePicker key={size} {...args} size={size} placeholder={`Size ${size}`} />
      ))}
    </Flex>
  ),
};

export const Validation: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", validationText: "Value is required." },
  render: (args) => <ControlledDatePicker {...args} placeholder="Validation DatePicker" />,
};

export const WithClock: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", isClock: true, isFooterButton: true },
  render: (args) => <ControlledDatePicker {...args} placeholder="Select Date & Time" />,
};

export const FooterButton: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Row>
      <Column size={6}>
        <ControlledDatePicker {...args} isFooterButton={false} placeholder="Without Footer" />
      </Column>

      <Column size={6}>
        <ControlledDatePicker {...args} isFooterButton={true} placeholder="With Footer" />
      </Column>
    </Row>
  ),
};

export const Locale: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", isFooterButton: true },
  render: (args) => (
    <Row>
      <Column size={6}>
        <ControlledDatePicker {...args} locale="tr" placeholder="Türkçe" />
      </Column>

      <Column size={6}>
        <ControlledDatePicker {...args} locale="en" placeholder="English" />
      </Column>
    </Row>
  ),
};
