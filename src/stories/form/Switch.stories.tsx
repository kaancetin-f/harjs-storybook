import Options from "@/infrustructure/shared/Options";
import { Button, Grid, Switch } from "@harjs/react-ui";
import { BorderRadiuses } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

type StoryProps = React.ComponentProps<typeof Switch> & {
  borderRadius?: BorderRadiuses;
  iconElement?: any;
  iconPosition?: any;
  validationText?: string;
  validationScrollTo?: boolean;
};

const { Row, Column, Box } = Grid;

const meta = {
  title: "FORM/Switch",
  component: Switch,
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;

export const Editor: StoryObj<StoryProps> = {
  argTypes: {
    border: { table: { disable: true } },
    iconElement: { table: { disable: true } },
    iconPosition: { table: { disable: true } },
    label: { name: "Label" },
  },
  args: {
    label: "Enable notifications",
    variant: "filled",
    color: "blue",
    size: "sm",
    borderRadius: "full",
    upperCase: false,
    disabled: false,
    validationText: "",
    validationScrollTo: false,
  },

  render: ({ ...args }) => {
    return (
      <Switch
        {...args}
        border={{ radius: args.borderRadius ?? "full" }}
        validation={{ text: args.validationText, scrollTo: args.validationScrollTo }}
      />
    );
  },
};

export const Variant: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    color: "blue",
  },
  render: ({ ...args }) => {
    const [c, setC] = useState<boolean>(true);

    return (
      <>
        <Switch
          label="Switch"
          variant="filled"
          color="blue"
          checked={c}
          {...args}
          onChange={(event) => setC(event.target.checked)}
        />
        <Switch label="Switch" variant="outlined" checked={c} {...args} />
        <Switch label="Switch" variant="dashed" checked={c} {...args} />
        <Switch label="Switch" variant="surface-borderless" checked={c} {...args} />
        <Switch label="Switch" variant="borderless" checked={c} {...args} />
      </>
    );
  },
};

export const Color: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: ({ ...args }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Options.Variant.map((variant) => (
          <div key={variant} style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {Options.Color.map((color) => (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Switch {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." />
                <Switch {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." checked />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Size: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    variant: "filled",
    color: "gray",
    checked: true,
  },
  render: ({ ...args }) => {
    const sizes = ["xs", "sm", "md"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {sizes.map((size) => (
          <Switch label="Switch" variant="filled" size={size} {...args} />
        ))}
      </div>
    );
  },
};

export const Radius: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    variant: "filled",
    color: "gray",
    checked: true,
  },
  render: ({ ...args }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Options.Radius.map((radius) => (
          <Switch label="Switch" variant="filled" border={{ radius }} {...args} />
        ))}
      </div>
    );
  },
};

export const Disabled: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    label: "Disabled",
    disabled: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <Switch {...args} />
        <Switch {...args} checked />
      </>
    );
  },
};

export const Validation: StoryObj<StoryProps> = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {
    color: "blue",
  },
  render: ({ ...args }) => {
    const [valid, setValid] = useState<boolean>(false);
    const [terms, setTerms] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<boolean>(false);

    return (
      <Row>
        <Column size={12}>
          <Switch
            label="I accept the terms and conditions"
            checked={terms}
            {...args}
            onChange={(e) => setTerms(e.target.checked)}
            validation={{ text: valid && !terms ? "Value is required." : "" }}
          />
        </Column>

        <Column size={12}>
          <Switch
            label="Enable notifications"
            checked={notifications}
            {...args}
            onChange={(e) => setNotifications(e.target.checked)}
            validation={{ text: valid && !notifications ? "Value is required." : "" }}
          />
        </Column>

        <Column size={12}>
          <Box>
            <Button color="green" onClick={() => setValid(true)}>
              Submit
            </Button>
            <Button
              variant="surface-borderless"
              color="gray"
              onClick={() => {
                setValid(false);
                setTerms(false);
                setNotifications(false);
              }}
            >
              Reset
            </Button>
          </Box>
        </Column>
      </Row>
    );
  },
};
