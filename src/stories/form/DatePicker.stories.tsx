import Options from "@/infrustructure/shared/Options";
import { DatePicker, Grid } from "@harjs/react-ui";
import type { BorderRadiuses } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const { Row, Column, Flex } = Grid;

type StoryProps = React.ComponentProps<typeof DatePicker> & {
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

export const Editor: Story = {
  args: {
    variant: "outlined",
    color: "gray",
    size: "md",
    upperCase: false,
    borderRadius: "4",
    disabled: false,
    locale: "tr",
    isClock: false,
    isFooterButton: false,
  },
  argTypes: {
    border: { table: { disable: true } },
    config: { table: { disable: true } },
    validationText: { table: { disable: true } },
    validationScrollTo: { table: { disable: true } },
    locale: {
      name: "Locale",
      description:
        "Determines the locale used for calendar and clock texts (month/day names, buttons). Falls back to Turkish (tr) when not provided.",
      control: "select",
      options: ["tr", "en"],
      table: {
        category: "Config",
        type: { summary: "Intl.LocalesArgument" },
        defaultValue: { summary: "tr" },
      },
    },
    isClock: {
      name: "Is Clock",
      description:
        "When enabled, displays an hour/minute selection panel next to the calendar and switches the underlying input to a datetime value.",
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
        "When enabled, displays a footer below the calendar with 'Now' and 'Okay' actions for quickly confirming or resetting the selection.",
      control: "boolean",
      table: {
        category: "Config",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  render: ({ borderRadius, locale, isClock, isFooterButton, ...args }) => {
    const [value, setValue] = useState<string>("");

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
        border={{ radius: borderRadius as any }}
        config={{ locale, isClock, isFooterButton }}
      />
    );
  },
};

export const Variant: Story = {
  parameters: { controls: { disable: true } },
  args: {
    color: "gray",
    borderRadius: "4",
  },
  render: (args) => (
    <Flex flexDirection="row" gap="15px">
      <DatePicker {...args} variant="filled" placeholder="Filled" value="" onChange={() => {}} />
      <DatePicker {...args} variant="outlined" placeholder="Outlined" value="" onChange={() => {}} />
      <DatePicker {...args} variant="dashed" placeholder="Dashed" value="" onChange={() => {}} />
      <DatePicker
        {...args}
        variant="surface-borderless"
        placeholder="Surface Borderless"
        value=""
        onChange={() => {}}
      />
      <DatePicker {...args} variant="borderless" placeholder="Borderless" value="" onChange={() => {}} />
    </Flex>
  ),
};

export const Color: Story = {
  parameters: { controls: { disable: true } },
  args: { width: 65, placeholder: "..." },
  render: (args) => (
    <Flex flexDirection="column" gap="16px">
      {Options.Variant.map((variant) => (
        <Flex key={variant} flexDirection="row" alignItems="center" gap="12px" flexWrap="wrap">
          {Options.Color.map((color) => (
            <Flex key={`${variant}-${color}`} flexDirection="column" gap="4px">
              <DatePicker {...args} variant={variant} color={color} value="" onChange={() => {}} />
              <DatePicker
                {...args}
                variant={variant}
                color={color}
                value="2026-07-14T00:00:00.000Z"
                onChange={() => {}}
              />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const Size: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {Options.Size.map((size) => (
        <DatePicker key={size} {...args} size={size} placeholder={`Size ${size}`} value="" onChange={() => {}} />
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {Options.Radius.map((radius) => (
        <DatePicker
          key={radius}
          {...args}
          border={{ radius }}
          placeholder={`Radius ${radius}`}
          value=""
          onChange={() => {}}
        />
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
      <DatePicker {...args} value="" onChange={() => {}} />
      <DatePicker {...args} value="2026-07-14T00:00:00.000Z" onChange={() => {}} />
    </Flex>
  ),
};

export const Validation: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", validation: { text: "Please select a date." } },
  render: (args) => (
    <Row>
      <Column size={12}>
        <DatePicker {...args} placeholder="Validation Date" value="" onChange={() => {}} />
      </Column>
      <Column size={12}>
        <DatePicker {...args} placeholder="Validation Date" value="" onChange={() => {}} />
      </Column>
    </Row>
  ),
};

export const Locale: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => {
    const [trValue, setTrValue] = useState<string>("");
    const [enValue, setEnValue] = useState<string>("");

    return (
      <Flex flexDirection="row" gap="15px">
        <DatePicker {...args} placeholder="Türkçe" value={trValue} onChange={setTrValue} config={{ locale: "tr" }} />
        <DatePicker {...args} placeholder="English" value={enValue} onChange={setEnValue} config={{ locale: "en" }} />
      </Flex>
    );
  },
};

export const WithClock: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => {
    const [value, setValue] = useState<string>("");

    return (
      <DatePicker {...args} placeholder="Date & Time" value={value} onChange={setValue} config={{ isClock: true }} />
    );
  },
};

export const WithFooterButton: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => {
    const [value, setValue] = useState<string>("");

    return (
      <DatePicker {...args} placeholder="Date" value={value} onChange={setValue} config={{ isFooterButton: true }} />
    );
  },
};
