import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { useI18n } from "../../i18n";

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: Props) {
  const { t } = useI18n();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? t("editor.placeholder") }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-200 rounded-xl bg-white min-h-[150px] max-h-[400px] overflow-y-auto focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
      <EditorContent editor={editor} className="tiptap p-3 prose max-w-none" />
    </div>
  );
}
