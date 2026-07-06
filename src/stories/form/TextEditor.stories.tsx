import { COLOR_OPTIONS } from "@/infrustructure/shared/Array";
import { Grid, TextEditor } from "@harjs/react-ui";
import { type Color } from "@harjs/react-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const { Flex } = Grid;

// "WithDynamicList" örneğinde kullanılan örnek (@mention) veri tipi ve listesi.
type MentionUser = { id: string; name: string };

const MENTION_USERS: MentionUser[] = [
  { id: "1", name: "Ayşe Yılmaz" },
  { id: "2", name: "Mehmet Demir" },
  { id: "3", name: "Elif Kaya" },
  { id: "4", name: "Can Öztürk" },
];

type StoryProps = {
  color?: Color;
  disabled?: boolean;
  placeholder?: string;
  height?: number;
  name?: string;
  validationText?: string;
  // IProps üzerinde tanımlı olmasına rağmen bileşenin destructure ettiği yerde yorum
  // satırına alınmıştır; bu yüzden şu anki implementasyonda hiçbir etkisi yoktur.
  multilang?: boolean;
};

const meta = {
  title: "FORM/TextEditor",
  component: TextEditor,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof TextEditor>;

export default meta;

type Story = StoryObj<StoryProps>;

/**
 * `TextEditor`, `value` / `onChange` çifti ile kontrol edilen (controlled) bir bileşendir ve
 * değeri HTML string olarak tutar. Bu yardımcı sarmalayıcı, örnekler içerisinde tekrar eden
 * state yönetimini sadeleştirmek ve `validationText` alias'ını gerçek `validation` prop'una
 * çevirmek için kullanılmıştır.
 */
const ControlledTextEditor = ({
  initialValue,
  validationText,
  ...attributes
}: StoryProps & { initialValue?: string }) => {
  const [value, setValue] = useState<string | undefined>(initialValue);

  return (
    <TextEditor
      {...(attributes as any)}
      value={value}
      onChange={setValue}
      validation={validationText ? { text: validationText } : undefined}
    />
  );
};

export const Editor: Story = {
  args: {
    color: "gray",
    disabled: false,
    placeholder: "Write something...",
    height: 220,
    name: "description",
  },
  argTypes: {
    color: {
      description:
        "The color applied to the editor's border and toolbar. Automatically switches to red whenever `validation.text` is set, regardless of this value.",
      control: "select",
      options: COLOR_OPTIONS,
      table: { category: "Style", type: { summary: "Color" }, defaultValue: { summary: '"gray"' } },
    },
    disabled: {
      description:
        "When true, the underlying iframe's `designMode` is turned off so its content can no longer be edited. It does not otherwise change the field's visual appearance.",
      control: "boolean",
      table: { category: "State", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    placeholder: {
      description:
        "Text shown as a floating label above the editor. Only rendered when provided, and prefixed with `* ` whenever `validation` is set.",
      control: "text",
      table: { category: "Content", type: { summary: "string" } },
    },
    height: {
      description:
        "The initial height of the editor's iframe, in pixels. Users can further resize it at runtime using the resize handle rendered at the bottom-right corner.",
      control: "number",
      table: { category: "Layout", type: { summary: "number" } },
    },
    name: {
      description: "Sets the `name` attribute of the underlying iframe element.",
      control: "text",
      table: { category: "Content", type: { summary: "string" } },
    },
    validationText: { table: { disable: true } },
    multilang: {
      name: "Multilang",
      description:
        "Declared on `IProps` for future multi-language support, but currently commented out where the component destructures its props — it has no effect in the present implementation.",
      control: false,
      table: { category: "Inherited (Unused)", type: { summary: "boolean" } },
    },
    value: { table: { disable: true } },
    onChange: {
      name: "On Change",
      description:
        "Called with the editor's current HTML content (debounced ~500ms after the last change) whenever it changes, or with `undefined` when the editor is emptied.",
      control: false,
      table: { category: "Events", type: { summary: "(value?: string) => void" } },
    },
    dynamicList: {
      name: "Dynamic List",
      description:
        "Enables an '@mention'-style tagging panel. `render.display` names the key of `T` shown in the suggestion list, `render.items` is the list of taggable items, `triggerKey` is the character that opens the panel (defaults to `@`), and `onTagged` is called with the full list of tagged items whenever it changes. See the 'Dynamic List (Mentions)' example below.",
      control: false,
      table: {
        category: "Data",
        type: {
          summary: "{ render: { display: keyof T; items: T[] }; triggerKey?: string; onTagged: (tagged: T[]) => void }",
        },
      },
    },
  },
  render: (args) => <ControlledTextEditor {...args} />,
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  args: { height: 160, disabled: true },
  render: (args) => <ControlledTextEditor {...args} initialValue="<p>This content cannot be edited.</p>" />,
};

export const Validation: Story = {
  parameters: { controls: { disable: true } },
  args: { height: 160, color: "gray", validationText: "Value is required." },
  render: (args) => <ControlledTextEditor {...args} placeholder="Validation TextEditor" />,
};

export const Height: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray" },
  render: (args) => (
    <Flex flexDirection="column" gap="15px">
      <ControlledTextEditor {...args} height={120} placeholder="Height 120" />
      <ControlledTextEditor {...args} height={220} placeholder="Height 220" />
      <ControlledTextEditor {...args} height={320} placeholder="Height 320" />
    </Flex>
  ),
};

export const WithDynamicList: Story = {
  parameters: { controls: { disable: true } },
  args: { color: "gray", height: 200, placeholder: "Type @ to mention someone" },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [tagged, setTagged] = useState<MentionUser[]>([]);

    return (
      <>
        <TextEditor<MentionUser>
          {...args}
          value={value}
          onChange={setValue}
          dynamicList={{
            render: { display: "name", items: MENTION_USERS },
            triggerKey: "@",
            onTagged: (taggedUsers) => setTagged(taggedUsers),
          }}
        />

        {tagged.length > 0 && (
          <p style={{ marginTop: 8, fontSize: 12, color: "var(--gray-500)" }}>
            Tagged: {tagged.map((user) => user.name).join(", ")}
          </p>
        )}
      </>
    );
  },
};
