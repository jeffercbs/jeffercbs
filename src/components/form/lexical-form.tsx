import isHotkey from "is-hotkey";
import {
  useCallback,
  useMemo,
  type JSX,
  type KeyboardEvent,
  type ReactNode,
} from "preact/compat";
import {
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
  type BaseEditor,
  type Descendant,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, useSlate, withReact } from "slate-react";
import { Button, Toolbar } from "./slate-components";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Quote,
  ListOrdered,
  List,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
} from "lucide-preact";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

type CustomElement = {
  type: string;
  align?: string;
  children: CustomText[];
  [key: string]: any;
};
type CustomText = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const EditorRender = () => {
  const renderElement = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any;
        children: ReactNode;
        element: CustomElement;
      }
    ) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any;
        children: ReactNode;
        leaf: CustomText;
      }
    ) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Editor.insertBreak(editor);
    }

    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
        toggleMark(editor, mark);
      }
    }
  };

  function savedata() {
    console.log(editor.onChange());
  }

  return (
    <div className="flex flex-col bg-white/80 overflow-hidden rounded-lg border border-gray-200">
      <Slate editor={editor} initialValue={initialValue}>
        <div className="flex w-full justify-between items-center px-5 bg-white">
          <Toolbar
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "auto 0",
            }}
          >
            <MarkButton format="bold" icon="bold" />
            <MarkButton format="italic" icon="italic" />
            <MarkButton format="underline" icon="underline" />
            <MarkButton format="code" icon="code" />
            <BlockButton format="heading-one" icon="heading-1" />
            <BlockButton format="heading-two" icon="heading-2" />
            <BlockButton format="block-quote" icon="quote" />
            <BlockButton format="numbered-list" icon="list-ordered" />
            <BlockButton format="bulleted-list" icon="list" />
            <BlockButton format="left" icon="align-left" />
            <BlockButton format="center" icon="align-center" />
            <BlockButton format="right" icon="align-right" />
            <BlockButton format="justify" icon="align-justify" />
          </Toolbar>
          <button>Guardar cambios</button>
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          name="content"
          style={{
            minHeight: "500px",
            padding: "10px",
            outline: "none",
            borderRadius: "15px",
          }}
          spellCheck
          autoFocus
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (
  editor: BaseEditor & ReactEditor,
  format: string | undefined
) => {
  if (!format) return;

  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: BaseEditor & ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: BaseEditor & ReactEditor,
  format: any,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (
  editor: BaseEditor & ReactEditor,
  format: string | number
) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null;
  return marks ? marks[format] === true : false;
};

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any;
  children: ReactNode;
  element: CustomElement;
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={style}
          className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} className="list-disc pl-5" {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} className="text-3xl font-bold" {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} className="text-2xl font-semibold" {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} className="pl-2" {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} className="list-decimal pl-5" {...attributes}>
          {children}
        </ol>
      );
    case "code":
      return (
        <pre
          style={style}
          className="bg-gray-300 text-red-400 p-2 rounded-md overflow-x-auto"
          {...attributes}
        >
          <code>{children}</code>
        </pre>
      );
    default:
      return (
        <p style={style} className="mb-2" {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: ReactNode;
  leaf: CustomText;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <code
        className="language-js"
        style={{
          color: "#a9b7c6",
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          direction: "ltr",
          textAlign: "left",
          whiteSpace: "pre",
          wordSpacing: "normal",
          wordBreak: "normal",
          lineHeight: 1.5,
          MozTabSize: 4,
          OTabSize: 4,
          tabSize: 4,
          WebkitHyphens: "none",
          MozHyphens: "none",
          msHyphens: "none",
          hyphens: "none",
        }}
      >
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <Button
      label={format}
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {format === "left" ? (
        <AlignLeft />
      ) : format === "center" ? (
        <AlignCenter />
      ) : format === "right" ? (
        <AlignRight />
      ) : format === "justify" ? (
        <AlignJustify />
      ) : format === "numbered-list" ? (
        <ListOrdered />
      ) : format === "bulleted-list" ? (
        <List />
      ) : format === "heading-one" ? (
        <Heading1 />
      ) : format === "heading-two" ? (
        <Heading2 />
      ) : format === "block-quote" ? (
        <Quote />
      ) : null}
    </Button>
  );
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {format === "bold" ? (
        <Bold />
      ) : format === "italic" ? (
        <Italic />
      ) : format === "underline" ? (
        <Underline />
      ) : format === "code" ? (
        <Code />
      ) : null}
    </Button>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default EditorRender;
