import { COLOR_OPTIONS, RADIUS_OPTIONS, SIZE_OPTIONS, VARIANT_OPTIONS } from "@/infrustructure/shared/Array";
import { Grid, Switch } from "@harjs/react-ui";
import { type BorderRadiuses, type Color, type Variants } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const { Flex } = Grid;

type StoryProps = {
  label?: string;
  color?: Color;
  borderRadius?: BorderRadiuses;
  checked?: boolean;
  disabled?: boolean;
  // Diğer ortak form prop'larından miras alınmıştır; Switch bileşeni tarafından
  // görsel/işlevsel olarak kullanılmaz (aşağıdaki argTypes açıklamalarına bakınız).
  variant?: Variants;
  icon?: any;
  size?: (typeof SIZE_OPTIONS)[number];
  upperCase?: boolean;
  validation?: { text?: string; scrollTo?: string };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const meta = {
  title: "FORM/Switch",
  component: Switch,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<StoryProps>;

/**
 * `Switch`, hem controlled hem de uncontrolled kullanıma izin veren hibrit bir bileşendir:
 * `checked` prop'u değiştikçe iç state buna senkronize olur, ancak dışarıdan hiç
 * güncellenmezse bileşen kendi tıklama state'ini korur. Bu yardımcı sarmalayıcı, örnekler
 * içerisinde controlled kullanımı göstermek ve `borderRadius` alias'ını gerçek `border`
 * prop'una çevirmek için kullanılmıştır.
 */
const ControlledSwitch = ({
  borderRadius,
  checked: initialChecked,
  ...attributes
}: StoryProps & { initialValue?: never }) => {
  const [checked, setChecked] = useState<boolean>(initialChecked ?? false);

  return (
    <Switch
      {...(attributes as any)}
      border={{ radius: borderRadius as any }}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};

export const Editor: Story = {
  args: {
    label: "Enable notifications",
    color: "blue",
    borderRadius: "full",
    disabled: false,
    checked: false,
  },
  argTypes: {
    label: {
      description:
        "Optional text rendered next to the switch. Both the switch and the label live inside the same `<label>` element, so clicking the text also toggles the switch.",
      control: "text",
      table: { category: "Content", type: { summary: "string" } },
    },
    color: {
      description:
        "The color applied to the switch track. Only takes effect while the switch is checked — the unchecked track always renders in gray regardless of this value.",
      control: "select",
      options: COLOR_OPTIONS,
      table: { category: "Style", type: { summary: "Color" }, defaultValue: { summary: '"gray"' } },
    },
    borderRadius: {
      name: "Border Radius",
      description:
        "The corner radius of the switch track, passed through as `border.radius`. Defaults to a fully rounded ('full') pill shape, which is the conventional look for toggle switches.",
      control: "select",
      options: RADIUS_OPTIONS,
      table: { category: "Style", type: { summary: "BorderRadiuses" }, defaultValue: { summary: '"full"' } },
    },
    checked: {
      description:
        "Whether the switch is on. Works as a hybrid controlled/uncontrolled value: pass it together with `onChange` for a fully controlled switch, or omit both and rely on the component's internal state for an uncontrolled toggle.",
      control: "boolean",
      table: { category: "State", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "When true, the switch cannot be toggled by click or keyboard and is rendered in a dimmed state.",
      control: "boolean",
      table: { category: "State", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    onChange: {
      name: "On Change",
      description:
        "Called with the native change event whenever the switch is toggled, after the component's internal checked state has already been updated.",
      control: false,
      table: { category: "Events", type: { summary: "ChangeEventHandler<HTMLInputElement>" } },
    },
    border: { table: { disable: true } },
    variant: {
      name: "Variant",
      description:
        "Inherited from the shared `IVariantProps` interface for type consistency with other form inputs (`Input`, `Select`, etc.). The current `Switch` implementation ignores this value and does not use it to affect rendering.",
      control: false,
      options: VARIANT_OPTIONS,
      table: { category: "Inherited (Unused)", type: { summary: "Variants" } },
    },
    icon: {
      name: "Icon",
      description:
        "Inherited from the shared `IIconProps` interface. `Switch` has no icon slot in its markup and does not render this value.",
      control: false,
      table: { category: "Inherited (Unused)", type: { summary: "unknown" } },
    },
    size: {
      name: "Size",
      description:
        "Inherited from the shared `ISizeProps` interface. Internally, the underlying checkbox's native `size` attribute is always hard-coded to `0`, so this prop has no visible effect.",
      control: false,
      options: SIZE_OPTIONS,
      table: { category: "Inherited (Unused)", type: { summary: "Sizes" } },
    },
    upperCase: {
      name: "Upper Case",
      description:
        "Inherited from the shared `IUpperCaseProps` interface for consistency with text-based inputs. `Switch` has no text content to transform, so this prop has no effect.",
      control: false,
      table: { category: "Inherited (Unused)", type: { summary: "boolean" } },
    },
    validation: {
      description:
        "Inherited from the shared `IValidationProps` interface for type consistency with other form components. `Switch` does not currently render a validation message or apply a validation color based on this value.",
      control: false,
      table: { category: "Inherited (Unused)", type: { summary: "{ text?: string; scrollTo?: string }" } },
    },
  },
  render: (args) => <ControlledSwitch {...args} />,
};

export const Color: Story = {
  parameters: { controls: { disable: true } },
  args: { borderRadius: "full" },
  render: (args) => (
    <Flex flexDirection="row" gap="15px" flexWrap="wrap" alignItems="center">
      {COLOR_OPTIONS.map((color) => (
        <ControlledSwitch key={color} {...args} color={color} checked={true} label={color} />
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "blue" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      <ControlledSwitch {...args} disabled label="Disabled - Off" checked={false} />
      <ControlledSwitch {...args} disabled label="Disabled - On" checked={true} />
    </Flex>
  ),
};

export const BorderRadius: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "blue", checked: true },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      {RADIUS_OPTIONS.map((radius) => (
        <ControlledSwitch key={radius} {...args} borderRadius={radius} label={`Radius ${radius}`} />
      ))}
    </Flex>
  ),
};

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "blue" },
  render: (args) => <ControlledSwitch {...args} label="Click the label to toggle" checked={false} />,
};

export const Uncontrolled: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "green", label: "Uncontrolled Switch" },
  render: (args) => (
    <Switch
      {...args}
      onChange={(event) => {
        // Dışarıdan `checked` beslenmediği için bileşen kendi iç state'ini yönetir;
        // burada yalnızca değişimi gözlemliyoruz.
        // eslint-disable-next-line no-console
        console.log(event.target.checked);
      }}
    />
  ),
};
