import Options from "@/infrustructure/shared/Options";
import { Button, Radio, RadioGroup, Grid } from "@harjs/react-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

type StoryProps = React.ComponentProps<typeof Radio> & {
  borderRadius?: string;
  iconElement?: any;
  iconPosition?: any;
  validationText?: string;
  validationScrollTo?: boolean;
};

const { Row, Column, Box } = Grid;

const meta = {
  title: "FORM/Radio",
  component: Radio,
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;

export const Editor: StoryObj<StoryProps> = {
  argTypes: {
    borderRadius: { table: { disable: true } },
    iconElement: { table: { disable: true } },
    iconPosition: { table: { disable: true } },
    label: { name: "Label" },
  },
  args: {
    label: "I have read and agree to the User Agreement.",
    variant: "filled",
    color: "green",
    size: "sm",
    upperCase: false,
    disabled: false,
    validationText: "",
    validationScrollTo: false,
  },

  render: ({ ...args }) => {
    return <Radio {...args} validation={{ text: args.validationText, scrollTo: args.validationScrollTo }} />;
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
        <Radio
          label="Radio"
          variant="filled"
          color="blue"
          checked={c}
          {...args}
          onChange={(event) => setC(event.target.checked)}
        />
        <Radio label="Radio" variant="surface" checked={c} {...args} />
        <Radio label="Radio" variant="surface-borderless" checked={c} {...args} />
        <Radio label="Radio" variant="outlined" checked={c} {...args} />
        <Radio label="Radio" variant="dashed" checked={c} {...args} />
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
                <Radio {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." />
                <Radio {...args} key={`${variant}-${color}`} variant={variant} color={color} label="..." checked />
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
          <Radio label="Radio" variant="filled" size={size} {...args} />
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
        <Radio {...args} />
        <Radio {...args} checked />
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
          <RadioGroup
            title="Select your framework:"
            name="v1"
            orientation="vertical"
            validation={{ text: valid && Object.keys(data).length === 0 ? "Value is required" : "" }}
          >
            <Radio
              label="React"
              variant="filled"
              {...args}
              checked={data?.["v1"] === "React"}
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
            <Radio
              label="Angular"
              variant="filled"
              {...args}
              checked={data?.["v1"] === "Angular"}
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
            <Radio
              label="Vue"
              variant="filled"
              {...args}
              checked={data?.["v1"] === "Vue"}
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
          </RadioGroup>
        </Column>

        <Column size={12}>
          <Radio
            label="Single Radio Validation"
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
