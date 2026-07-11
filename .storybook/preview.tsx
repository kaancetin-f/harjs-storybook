import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
  parameters: {
    docs: {
      defaultName: "Documentation",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  argTypes: {
    variant: {
      name: "Variant",
      control: {
        type: "select",
        labels: {
          filled: "Filled",
          surface: "Surface",
          outlined: "Outlined",
          dashed: "Dashed",
          borderless: "Borderless",
        },
      },
      options: ["filled", "surface", "outlined", "dashed", "borderless"],
      description: "It determines the visual style variation and background design of the component.",
      table: {
        category: "Base Properties",
        type: { summary: "string" },
        defaultValue: { summary: "Surface" },
      },
    },
    color: {
      name: "Color",
      control: {
        type: "select",
        labels: {
          blue: "Blue",
          purple: "Purple",
          pink: "Pink",
          red: "Red",
          orange: "Orange",
          yellow: "Yellow",
          green: "Green",
          teal: "Teal",
          cyan: "Cyan",
          gray: "Gray",
        },
      },
      options: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray"],
      description: "The design system applies one of the defined color palette themes to the button.",
      table: { category: "Base Properties", type: { summary: "string" }, defaultValue: { summary: "Blue" } },
    },
    size: {
      name: "Size",
      control: {
        type: "select",
        labels: {
          xs: "XS",
          sm: "SM",
          md: "MD",
          lg: "LG",
          xl: "XL",
          xxl: "XXL",
        },
      },
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      description: "Scaling the button's padding and font size.",
      table: { category: "Base Properties", type: { summary: "string" }, defaultValue: { summary: "SM" } },
    },
    upperCase: {
      name: "Upper Case",
      control: { type: "boolean" },
      description: "When enabled, automatically transforms all characters within the button text to `uppercase`.",
      table: { category: "Base Properties", type: { summary: "boolean" }, defaultValue: { summary: "False" } },
    },
    disabled: {
      name: "Disabled",
      control: { type: "boolean" },
      description: "When true, prevents user interaction and applies an inactive visual state to the entire component.",
      table: { category: "Base Properties", type: { summary: "boolean" }, defaultValue: { summary: "False" } },
    },

    // #region Icon Settings
    iconElement: {
      name: "Icon",
      control: {
        type: "select",
      },
      options: ["a", "b"],
      description: "Selects the sample `icon component` to be placed inside the button.",
      table: {
        category: "Icon",
        type: { summary: "React.JSX.Element" },
        defaultValue: { summary: "None" },
      },
    },
    iconPosition: {
      name: "Position",
      control: {
        type: "inline-radio",
        labels: {
          start: "Start",
          end: "End",
        },
      },
      options: ["start", "end"],
      description: "Determines the alignment direction `start / end` of the selected icon relative to the button text.",
      table: {
        category: "Icon",
        type: { summary: "string" },
        defaultValue: { summary: "Start" },
      },
    },
    // #endregion
    // Icon Settings

    // #region Border Settings
    borderRadius: {
      name: "Radius",
      control: {
        type: "select",
        labels: {
          0: "0",
          2: "2",
          4: "4",
          6: "6",
          8: "8",
          12: "12",
          16: "16",
          20: "20",
          40: "40",
          full: "full",
        },
      },
      options: ["0", "2", "4", "6", "8", "12", "16", "20", "40", "full"],
      description: "Configures the radius (corner rounding) value within the border object.",
      table: {
        category: "Border",
        type: { summary: "string" },
        defaultValue: { summary: "4" },
      },
    },
    // #endregion

    // #region Validation
    validationText: {
      name: "Validation Text",
      control: { type: "text" },
      description:
        "The helper or error message displayed below the component to provide feedback about the validation status.",
      table: {
        category: "Validation",
        type: { summary: "strign" },
        defaultValue: { summary: "" },
      },
    },
    validationScrollTo: {
      name: "Validation ScrollTo",
      control: { type: "boolean" },
      description: "When true, automatically scrolls the viewport to the component if a validation error occurs.",
      table: {
        category: "Validation",
        type: { summary: "boolean" },
        defaultValue: { summary: "False" },
      },
    },
    // #endregion
    // Validation
  },
};

export default preview;
