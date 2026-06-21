import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonGroup } from "ar-design";
import React from "react";

type StoryProps = React.ComponentProps<typeof ButtonGroup> & {};

const meta: Meta<StoryProps> = {
  title: "FORM/Buttons/Group Buttons",
  component: ButtonGroup as any,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    children: {
      name: "Children",
      control: false,
      description:
        "Yalnızca 'Button' bileşenlerinden oluşması gereken, yan yana listelenecek alt çocuk elemanlar dizisidir.",
      table: {
        type: { summary: "ReactElement<typeof Button> | ReactElement<typeof Button>[]" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Editor: Story = {
  args: {},
  parameters: {
    controls: { disable: false },
  },
  render: (args) => {
    return (
      <ButtonGroup {...args}>
        <Button variant="surface" color="blue">
          Sol Aksiyon
        </Button>
        <Button variant="surface" color="green">
          Orta Aksiyon
        </Button>
        <Button variant="surface" color="purple">
          Sağ Aksiyon
        </Button>
      </ButtonGroup>
    );
  },
};

export const ValidationErrorScenario: Story = {
  name: "Validation Error Scenario",
  args: {},
  render: (args) => {
    return (
      <ButtonGroup {...args}>
        <Button variant="surface" color="blue">
          Geçerli Buton
        </Button>
        <div>Hata Tetikleyici Yabancı Eleman (div)</div>
        <Button variant="filled" color="green">
          Geçerli Buton
        </Button>
      </ButtonGroup>
    );
  },
};
