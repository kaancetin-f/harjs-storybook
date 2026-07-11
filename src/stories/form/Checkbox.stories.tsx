import Options from "@/infrustructure/shared/Options";
import { Button, Checkbox, CheckboxGroup, Grid } from "@harjs/react-ui";
import { BorderRadiuses, Variants } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

type StoryProps = React.ComponentProps<typeof Checkbox> & {
  borderRadius?: BorderRadiuses;
  iconElement?: any;
  iconPosition?: any;
  validationText?: string;
  validationScrollTo?: boolean;
};

const { Row, Column, Box } = Grid;

const meta = {
  title: "FORM/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Editor: StoryObj<StoryProps> = {
  argTypes: {
    border: { table: { disable: true } },
    iconElement: { table: { disable: true } },
    iconPosition: { table: { disable: true } },
    label: { name: "Label" },
  },
  args: {
    label: "I have read and agree to the User Agreement.",
    variant: "filled",
    color: "green",
    size: "sm",
    borderRadius: "4",
    upperCase: false,
    disabled: false,
    validationText: "",
    validationScrollTo: false,
  },

  render: ({ ...args }) => {
    return (
      <Checkbox
        {...args}
        border={{ radius: args.borderRadius ?? "4" }}
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
        <Checkbox
          label="Checkbox"
          variant="filled"
          color="blue"
          checked={c}
          {...args}
          onChange={(event) => setC(event.target.checked)}
        />
        <Checkbox label="Checkbox" variant="surface" checked={c} {...args} />
        <Checkbox label="Checkbox" variant="surface-borderless" checked={c} {...args} />
        <Checkbox label="Checkbox" variant="outlined" checked={c} {...args} />
        <Checkbox label="Checkbox" variant="dashed" checked={c} {...args} />
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
                <Checkbox {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." />
                <Checkbox {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." checked />
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
          <Checkbox label="Checkbox" variant="filled" size={size} {...args} />
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
          <Checkbox label="Checkbox" variant="filled" border={{ radius }} {...args} />
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
        <Checkbox {...args} />
        <Checkbox {...args} checked />
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
    const [data, setData] = useState<{ [key: string]: string }>({});
    const [single, setSingle] = useState<boolean>(false);

    return (
      <Row>
        <Column size={12}>
          <i style={{ backgroundColor: "var(--gray-100)", padding: 10, borderRadius: "var(--border-radius-sm)" }}>
            Data: {JSON.stringify(data)}
          </i>
        </Column>

        <Column size={12}>
          <CheckboxGroup
            title="Select your framework:"
            orientation="vertical"
            validation={{ text: valid && Object.keys(data).length === 0 ? "Value is required" : "" }}
          >
            <Checkbox
              label="React"
              variant="filled"
              {...args}
              name="react"
              checked={data?.["react"] === "React"}
              value="React"
              onChange={(e) => {
                const { name, value, checked } = e.target;
                setData((prev) => {
                  const updated = { ...prev };

                  if (checked) {
                    updated[name] = value;
                  } else {
                    delete updated[name];
                  }
                  return updated;
                });
              }}
            />
            <Checkbox
              label="Angular"
              variant="filled"
              {...args}
              name="angular"
              checked={data?.["angular"] === "Angular"}
              value="Angular"
              onChange={(e) => {
                const { name, value, checked } = e.target;
                setData((prev) => {
                  const updated = { ...prev };
                  if (checked) {
                    updated[name] = value;
                  } else {
                    delete updated[name];
                  }
                  return updated;
                });
              }}
            />
            <Checkbox
              label="Vue"
              variant="filled"
              {...args}
              name="vue"
              checked={data?.["vue"] === "Vue"}
              value="Vue"
              onChange={(e) => {
                const { name, value, checked } = e.target;
                setData((prev) => {
                  const updated = { ...prev };
                  if (checked) {
                    updated[name] = value;
                  } else {
                    delete updated[name];
                  }
                  return updated;
                });
              }}
            />
          </CheckboxGroup>
        </Column>

        <Column size={12}>
          <Checkbox
            label="Single Checkbox Validation"
            checked={single}
            onChange={(e) => setSingle(e.target.checked)}
            validation={{ text: valid && !single ? "Value is required." : "" }}
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
                setData({});
                setSingle(false);
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
