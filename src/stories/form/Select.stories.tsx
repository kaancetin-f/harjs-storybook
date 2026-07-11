import Options from "@/infrustructure/shared/Options";
import { Grid, Select } from "@harjs/react-ui";
import type { Option, BorderRadiuses } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const Countries: Option[] = [
  { value: "tr", text: "Türkiye" },
  { value: "de", text: "Almanya" },
  { value: "fr", text: "Fransa" },
  { value: "it", text: "İtalya" },
  { value: "es", text: "İspanya" },
  { value: "nl", text: "Hollanda" },
];

const { Row, Column, Flex } = Grid;

type StoryProps = React.ComponentProps<typeof Select> & {
  borderRadius?: BorderRadiuses;
  icon?: any;
  iconElement?: any;
  iconPosition?: "start" | "end";
  readOnly?: boolean;
  validationText?: string;
  validationScrollTo?: string;
  configClear?: boolean;
  configValidationText?: "visible" | "hidden";
};

const meta = {
  title: "FORM/Select",
  component: Select,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {
    variant: "outlined",
    color: "gray",
    size: "md",
    upperCase: false,
    borderRadius: "4",
    iconElement: "None",
    disabled: false,
  },
  argTypes: {
    border: { table: { disable: true } },
    icon: { table: { disable: true } },
    config: { table: { disable: true } },

    options: {
      name: "Options",
      control: {
        type: "object",
      },
      description: "Defines the list of options available for selection in the component.",
      table: {
        type: { summary: "Option[]" },
        defaultValue: { summary: "[]" },
      },
    },

    value: {
      name: "Value",
      control: {
        type: "object",
      },
      description:
        "Specifies the currently selected option or options. Supports both single and multiple selection modes.",
      table: {
        type: { summary: "Option[] | Option | undefined" },
        defaultValue: { summary: "[]" },
      },
    },

    onSearch: {
      name: "OnSearch",
      control: {
        type: "object",
      },
      description: "Callback invoked whenever the search input value changes.",
      table: {
        type: { summary: "(searchText: string) => void" },
      },
    },

    onClick: {
      name: "OnClick",
      control: {
        type: "object",
      },
      description: "Callback invoked when the select component is clicked.",
      table: {
        type: { summary: "() => void" },
      },
    },

    onCreate: {
      name: "OnCreate",
      control: {
        type: "object",
      },
      description: "Callback invoked when a new option is created by the user.",
      table: {
        type: { summary: "(option: Option) => void" },
      },
    },

    readOnly: {
      name: "ReadOnly",
      control: {
        type: "boolean",
      },
      description:
        "Prevents the selected value from being modified while keeping the component interactive for viewing.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },

    // #region Config
    configClear: {
      name: "Clear",
      control: {
        type: "select",
      },
      options: ["0", "2", "4", "6", "8", "12", "16", "20", "40", "full"],
      description: "Controls the spacing between the selected value and the clear button.",
      table: {
        category: "Config",
        type: { summary: "boolean" },
        defaultValue: { summary: "True" },
      },
    },

    configValidationText: {
      name: "Validation Text",
      control: {
        type: "select",
        labels: {
          visible: "Visible",
          hidden: "Hidden",
        },
      },
      options: ["visible", "hidden"],
      description: "Determines whether the validation message is displayed below the select component.",
      table: {
        category: "Config",
        type: { summary: "string" },
        defaultValue: { summary: "Visible" },
      },
    },
    // #endregion
  },
  render: (args: StoryProps) => {
    return <Select {...args} border={{ radius: args.borderRadius as BorderRadiuses }} />;
  },
};

export const Variant: Story = {
  parameters: { controls: { disable: true } },
  args: {
    color: "gray",
    options: Countries,
    borderRadius: "4",
  },
  render: (args: StoryProps) => (
    <Flex flexDirection="row" gap="15px">
      <Select {...args} variant="filled" placeholder="Filled" />
      <Select {...args} variant="outlined" placeholder="Outlined" />
      <Select {...args} variant="dashed" placeholder="Dashed" />
      <Select {...args} variant="surface-borderless" placeholder="Surface Borderless" />
      <Select {...args} variant="borderless" placeholder="Borderless" />
    </Flex>
  ),
};

export const Color: Story = {
  parameters: { controls: { disable: true } },
  args: { width: 65, placeholder: "..." },
  render: () => {
    // states
    const [value, setValue] = useState<Option | undefined>();

    return (
      <Flex flexDirection="column" gap="16px">
        {Options.Variant.map((variant) => (
          <Flex key={variant} flexDirection="row" alignItems="center" gap="12px" flexWrap="wrap">
            {Options.Color.map((color) => (
              <Flex key={`${variant}-${color}`} flexDirection="column" gap="4px">
                <Select variant={variant} color={color} options={Countries} value={value} onChange={setValue} />
                <Select variant={variant} color={color} options={Countries} value={value} onChange={setValue} />
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const Size: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args: StoryProps) => (
    <Flex flexDirection="column" gap="15px">
      {Options.Size.map((size) => (
        <Select key={size} {...args} size={size} placeholder={`Size ${size}`} />
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args: StoryProps) => (
    <Flex flexDirection="column" gap="15px">
      {Options.Radius.map((radius) => (
        <Select key={radius} {...args} border={{ radius }} placeholder={`Radius ${radius}`} />
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
  render: () => (
    <Flex flexDirection="column" gap="15px">
      <Select options={Countries} value={Countries.find((x) => x.value === "tr")} onChange={() => {}} />
      <Select options={Countries} value={undefined} onChange={() => {}} />
    </Flex>
  ),
};

export const ReadOnly: Story = {
  parameters: { controls: { disable: true } },
  args: {
    color: "gray",
    placeholder: "Read Only",
    readOnly: true,
  },
  render: () => (
    <Flex flexDirection="column" gap="15px">
      <Select options={Countries} value={Countries.find((x) => x.value === "tr")} onChange={() => {}} readOnly />
      <Select options={Countries} value={undefined} onChange={() => {}} readOnly />
    </Flex>
  ),
};

export const Validation: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", validation: { text: "Value is required." } },
  render: (args: StoryProps) => <Select {...args} placeholder="Validation Select" />,
};

export const ClearButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    // states
    const [value, setValue] = useState<Option | undefined>();

    return (
      <Row>
        <Column size={6}>
          <Select options={Countries} value={value} onChange={(option) => setValue(option)} config={{ clear: true }} />
        </Column>

        <Column size={6}>
          <Select options={Countries} value={value} onChange={(option) => setValue(option)} config={{ clear: false }} />
        </Column>
      </Row>
    );
  },
};

export const WithSearch: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: () => {
    // states
    const [value, setValue] = useState<Option | undefined>(undefined);
    const [options, setOptions] = useState<Option[]>(Countries);

    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Search a country"
        onSearch={(searchText) => {
          setOptions(
            Countries.filter((option) => option.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())),
          );
        }}
      />
    );
  },
};

export const WithCreate: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    // states
    const [options, setOptions] = useState<Option[]>(Countries);
    const [value, setValue] = useState<Option | undefined>(undefined);

    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Search a country"
        onCreate={(option) => {
          const newOption = { ...option, value: option.text };

          setOptions((prev) => [...prev, newOption]);
          setValue(newOption);
        }}
      />
    );
  },
};

export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    // states
    const [values, setValues] = useState<Option[]>([]);

    return (
      <>
        <Select
          options={Countries}
          value={values}
          onChange={setValues}
          color="green"
          status={{ color: "green", selected: { color: "orange", variant: "surface-borderless" } }}
          placeholder="Multiple Select"
          multiple
        />
      </>
    );
  },
};
