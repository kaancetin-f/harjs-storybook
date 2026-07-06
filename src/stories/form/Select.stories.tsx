import { COLOR_OPTIONS, RADIUS_OPTIONS, SIZE_OPTIONS, VARIANT_OPTIONS } from "@/infrustructure/shared/Array";
import { Grid, Select } from "@harjs/react-ui";
import { type BorderRadiuses, type Color, type Option, type Variants } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const { Row, Column, Flex } = Grid;

// Tüm örneklerde kullanılan sabit örnek veri kümesidir.
const OPTIONS: Option[] = [
  { value: "tr", text: "Türkiye" },
  { value: "de", text: "Almanya" },
  { value: "fr", text: "Fransa" },
  { value: "it", text: "İtalya" },
  { value: "es", text: "İspanya" },
  { value: "nl", text: "Hollanda" },
];

type StoryProps = {
  variant?: (typeof VARIANT_OPTIONS)[number];
  color?: Color;
  size?: (typeof SIZE_OPTIONS)[number];
  borderRadius?: BorderRadiuses;
  upperCase?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  multiple?: boolean;
  clear?: boolean;
  validationText?: string;
  validationTextVisibility?: "visible" | "hidden";
  statusColor?: Color;
  selectedVariant?: Variants;
  selectedColor?: Color;
  onSearch?: (searchText: string) => void;
  onClick?: () => void;
  onCreate?: (option: Option) => void;
};

const meta = {
  title: "FORM/Select",
  component: Select,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<StoryProps>;

/**
 * `Select`, tekil seçim modunda `value` / `onChange` çifti ile kontrol edilen (controlled) bir
 * bileşendir. Bu yardımcı sarmalayıcı, örnekler içerisinde tekrar eden state yönetimini
 * sadeleştirmek ve `config` nesnesini düz (flat) story prop'larından yeniden oluşturmak için
 * kullanılmıştır.
 */
const ControlledSelect = ({
  initialValue,
  borderRadius,
  clear = true,
  validationTextVisibility = "visible",
  validationText,
  ...attributes
}: StoryProps & { initialValue?: Option }) => {
  const [value, setValue] = useState<Option | undefined>(initialValue);

  return (
    <Select
      {...(attributes as any)}
      options={OPTIONS}
      value={value}
      onChange={setValue}
      border={{ radius: borderRadius as any }}
      config={{ clear, validation: { text: validationTextVisibility } }}
      validation={validationText ? { text: validationText } : undefined}
    />
  );
};

/**
 * `Multiple` mod için aynı amaçla kullanılan sarmalayıcıdır; ek olarak seçilmiş öğelerin
 * `Chip` görünümünü belirleyen `status` alanını da düz prop'lardan yeniden kurar.
 */
const ControlledMultipleSelect = ({
  initialValue = [],
  borderRadius,
  clear = true,
  validationTextVisibility = "visible",
  validationText,
  statusColor,
  selectedVariant,
  selectedColor,
  ...attributes
}: StoryProps & { initialValue?: Option[] }) => {
  const [value, setValue] = useState<Option[]>(initialValue);

  return (
    <Select
      {...(attributes as any)}
      multiple
      options={OPTIONS}
      value={value}
      onChange={setValue}
      border={{ radius: borderRadius as any }}
      config={{ clear, validation: { text: validationTextVisibility } }}
      validation={validationText ? { text: validationText } : undefined}
      status={{ color: statusColor, selected: { variant: selectedVariant, color: selectedColor } }}
    />
  );
};

export const Editor: Story = {
  args: {
    variant: "outlined",
    color: "gray",
    size: "md",
    borderRadius: "4",
    placeholder: "Bir ülke seçin",
    disabled: false,
    readOnly: false,
    upperCase: false,
    clear: true,
    validationTextVisibility: "visible",
  },
  argTypes: {
    variant: {
      description:
        "Controls the visual emphasis of the closed field, matching `Input`'s variant options (filled, outlined, dashed, surface-borderless, borderless).",
      control: "select",
      options: VARIANT_OPTIONS,
      table: { category: "Style", type: { summary: "Variants" }, defaultValue: { summary: '"outlined"' } },
    },
    color: {
      description: "The semantic or brand color applied to the field's border, text, and focus state.",
      control: "select",
      options: COLOR_OPTIONS,
      table: { category: "Style", type: { summary: "Color" }, defaultValue: { summary: '"gray"' } },
    },
    size: {
      description: "The height of the field.",
      control: "select",
      options: SIZE_OPTIONS,
      table: { category: "Style", type: { summary: "Sizes" }, defaultValue: { summary: '"md"' } },
    },
    borderRadius: {
      name: "Border Radius",
      description: "The corner radius applied to the field, passed through as `border.radius`.",
      control: "select",
      options: RADIUS_OPTIONS,
      table: { category: "Style", type: { summary: "BorderRadiuses" }, defaultValue: { summary: '"4"' } },
    },
    upperCase: {
      name: "Upper Case",
      description: "When true, characters typed into the field (for search/creation) are automatically capitalized.",
      control: "boolean",
      table: { category: "Style", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "When true, the field cannot be opened, edited, or cleared, and is rendered in a dimmed state.",
      control: "boolean",
      table: { category: "State", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    readOnly: {
      name: "Read Only",
      description: "When true, the field's text cannot be edited directly, but the dropdown can still be opened to change the selection.",
      control: "boolean",
      table: { category: "State", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    placeholder: {
      description: "The placeholder text shown when no option is selected.",
      control: "text",
      table: { category: "Content", type: { summary: "string" } },
    },
    border: { table: { disable: true } },
    options: { table: { disable: true } },
    multiple: { table: { disable: true } },
    status: { table: { disable: true } },
    config: { table: { disable: true } },
    validationText: { table: { disable: true } },
    clear: {
      description:
        "When true (the `config.clear` default), a clear ('x') button is rendered so the current selection can be removed in a single click.",
      control: "boolean",
      table: { category: "Config", type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    validationTextVisibility: {
      name: "Validation Text Visibility",
      description:
        "Maps to `config.validation.text`. Controls whether the validation message is actually rendered under the field ('visible') or only used to color the field red without showing the text ('hidden').",
      control: "select",
      options: ["visible", "hidden"],
      table: { category: "Config", type: { summary: '"visible" | "hidden"' }, defaultValue: { summary: '"visible"' } },
    },
    onSearch: {
      name: "On Search",
      description:
        "Called with the current search text whenever the user types into the field (single mode) or the search box (multiple mode). When provided, filtering is expected to be handled externally (e.g. server-side) instead of the built-in local filter.",
      control: false,
      table: { category: "Events", type: { summary: "(searchText: string) => void" } },
    },
    onClick: {
      name: "On Click",
      description: "Called whenever the closed field is clicked, in addition to the dropdown being toggled open.",
      control: false,
      table: { category: "Events", type: { summary: "() => void" } },
    },
    onCreate: {
      name: "On Create",
      description:
        "When provided, an 'add new option' row is rendered whenever the typed search text doesn't match any existing option, letting the user create and immediately select a new entry.",
      control: false,
      table: { category: "Events", type: { summary: "(option: Option) => void" } },
    },
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Variant: Story = {
  parameters: { controls: { disable: true } },
  args: {
    color: "gray",
    borderRadius: "4",
  },
  render: (args) => (
    <Flex flexDirection="row" gap="15px" flexWrap="wrap">
      <ControlledSelect {...args} variant="filled" placeholder="Filled" />
      <ControlledSelect {...args} variant="outlined" placeholder="Outlined" />
      <ControlledSelect {...args} variant="dashed" placeholder="Dashed" />
      <ControlledSelect {...args} variant="surface-borderless" placeholder="Surface Borderless" />
      <ControlledSelect {...args} variant="borderless" placeholder="Borderless" />
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
              <ControlledSelect {...args} variant={variant} color={color} placeholder="..." />
              <ControlledSelect {...args} variant={variant} color={color} placeholder="..." initialValue={OPTIONS[0]} />
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
      <ControlledSelect {...args} />
      <ControlledSelect {...args} initialValue={OPTIONS[0]} />
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
  render: (args) => <ControlledSelect {...args} initialValue={OPTIONS[1]} />,
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {RADIUS_OPTIONS.map((radius) => (
        <ControlledSelect key={radius} {...args} borderRadius={radius} placeholder={`Radius ${radius}`} />
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
        <ControlledSelect key={size} {...args} size={size} placeholder={`Size ${size}`} />
      ))}
    </Flex>
  ),
};

export const Validation: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", validationText: "Value is required." },
  render: (args) => (
    <Flex flexDirection="row" gap="15px" flexWrap="wrap">
      <ControlledSelect {...args} validationTextVisibility="visible" placeholder="Visible Validation" />
      <ControlledSelect {...args} validationTextVisibility="hidden" placeholder="Hidden Validation" />
    </Flex>
  ),
};

export const ClearButton: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Row>
      <Column size={6}>
        <ControlledSelect {...args} clear={false} placeholder="Without Clear" initialValue={OPTIONS[0]} />
      </Column>

      <Column size={6}>
        <ControlledSelect {...args} clear={true} placeholder="With Clear" initialValue={OPTIONS[0]} />
      </Column>
    </Row>
  ),
};

export const WithSearch: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => {
    const [value, setValue] = useState<Option | undefined>(undefined);
    const [options, setOptions] = useState<Option[]>(OPTIONS);

    return (
      <Select
        {...args}
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Search a country"
        onSearch={(searchText) => {
          setOptions(OPTIONS.filter((option) => option.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())));
        }}
      />
    );
  },
};

export const WithCreate: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => {
    const [options, setOptions] = useState<Option[]>(OPTIONS);
    const [value, setValue] = useState<Option | undefined>(undefined);

    return (
      <Select
        {...args}
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Bir ülke seçin ya da ekleyin"
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
  args: {
    color: "gray",
    borderRadius: "4",
    placeholder: "Ülke seçin",
    clear: true,
    validationTextVisibility: "visible",
    statusColor: "gray",
    selectedVariant: "filled",
    selectedColor: "blue",
  },
  argTypes: {
    statusColor: {
      name: "Status Color",
      description:
        "Maps to `status.color`. The default chip color used for selected options when `status.selected.color` isn't provided.",
      control: "select",
      options: COLOR_OPTIONS,
      table: { category: "Status", type: { summary: "Color" } },
    },
    selectedVariant: {
      name: "Selected Variant",
      description: "Maps to `status.selected.variant`. The `Chip` variant used to render each selected option.",
      control: "select",
      options: VARIANT_OPTIONS,
      table: { category: "Status", type: { summary: "Variants" }, defaultValue: { summary: '"filled"' } },
    },
    selectedColor: {
      name: "Selected Color",
      description: "Maps to `status.selected.color`. The `Chip` color used to render each selected option.",
      control: "select",
      options: COLOR_OPTIONS,
      table: { category: "Status", type: { summary: "Color" } },
    },
    border: { table: { disable: true } },
    options: { table: { disable: true } },
    config: { table: { disable: true } },
  },
  render: (args) => <ControlledMultipleSelect {...args} initialValue={[OPTIONS[0], OPTIONS[2]]} />,
};
