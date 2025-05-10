'use client';

import {
  useEditor,
  EditorContent,
  Editor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';


import { useState } from 'react';

type Props = {
  content: string;
  setContent: (html: string) => void;
};

export default function RichEditor({ content, setContent }: Props) {
  const [preview, setPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      Highlight,
      HorizontalRule,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none font-serif min-h-[600px]',
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const active = (format: string, options: any = {}) => {
    if (!editor) return '';
    if (format === 'heading') {
      return editor.isActive('heading', options)
        ? 'bg-blue-100 text-blue-600'
        : '';
    }
    return editor.isActive(format) ? 'bg-blue-100 text-blue-600' : '';
  };

  const buttonClass =
    'px-2 py-1 text-sm rounded hover:bg-gray-200 transition';

  const addImage = () => {
    const url = prompt('Nhập URL hình ảnh');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt('Nhập URL liên kết');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="space-y-4">
      {/* Thanh công cụ */}
      {!preview && (
        <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-3">
          <button onClick={() => editor.chain().focus().undo().run()} className={buttonClass}>↩️</button>
          <button onClick={() => editor.chain().focus().redo().run()} className={buttonClass}>↪️</button>

          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${buttonClass} ${active('bold')}`}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${buttonClass} ${active('italic')}`}>I</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${buttonClass} ${active('underline')}`}>U</button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${buttonClass} ${active('strike')}`}>S</button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`${buttonClass} ${active('highlight')}`}>🖍️</button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${buttonClass} ${active('heading', { level: 1 })}`}>H1</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${buttonClass} ${active('heading', { level: 2 })}`}>H2</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${buttonClass} ${active('heading', { level: 3 })}`}>H3</button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${buttonClass} ${active('bulletList')}`}>• List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${buttonClass} ${active('orderedList')}`}>1. List</button>

          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${buttonClass} ${active('blockquote')}`}>❝ Quote</button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`${buttonClass} ${active('codeBlock')}`}>Code</button>

          <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonClass}>―</button>

          <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={buttonClass}>📊 Table</button>

          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={buttonClass}>⬅️</button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={buttonClass}>↔️</button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={buttonClass}>➡️</button>

          <button onClick={addImage} className={buttonClass}>🖼️</button>
          <button onClick={addLink} className={buttonClass}>🔗</button>
        </div>
      )}

      {/* Nút Preview */}
      <button
        onClick={() => setPreview(!preview)}
        className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm"
      >
        {preview ? '✏️ Quay lại chỉnh sửa' : '👁️ Xem trước bài viết'}
      </button>

      {/* Vùng soạn thảo hoặc xem trước */}
      <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-md min-h-[600px]">
        {preview ? (
          <div
            className="prose prose-lg max-w-none font-serif"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
