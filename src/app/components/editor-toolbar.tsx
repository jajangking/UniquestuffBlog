"use client";

import { useState } from 'react';

interface EditorToolbarProps {
  content: string;
  setContent: (content: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function EditorToolbar({ content, setContent, textareaRef }: EditorToolbarProps) {
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = content.substring(0, start) + text + content.substring(end);
    
    setContent(newText);
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };
  
  const wrapTextAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const wrappedText = before + selectedText + after;
    const newText = content.substring(0, start) + wrappedText + content.substring(end);
    
    setContent(newText);
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };
  
  const insertBlockAtCursor = (block: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Tambahkan baris baru sebelum dan sesudah jika tidak ada
    let newBlock = block;
    const beforeChar = content[start - 1];
    const afterChar = content[end];
    
    if (start > 0 && beforeChar !== '\n') {
      newBlock = '\n' + newBlock;
    }
    
    if (end < content.length && afterChar !== '\n') {
      newBlock = newBlock + '\n';
    }
    
    const newText = content.substring(0, start) + newBlock + content.substring(end);
    
    setContent(newText);
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newBlock.length, start + newBlock.length);
    }, 0);
  };
  
  const increaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.min(prev + 2, 24);
      // Update textarea style directly
      if (textareaRef.current) {
        textareaRef.current.style.fontSize = `${newSize}px`;
      }
      return newSize;
    });
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.max(prev - 2, 12);
      // Update textarea style directly
      if (textareaRef.current) {
        textareaRef.current.style.fontSize = `${newSize}px`;
      }
      return newSize;
    });
  };
  
  const insertImage = () => {
    const imageUrl = prompt("Masukkan URL gambar:");
    if (imageUrl) {
      insertBlockAtCursor(`\n<img src="${imageUrl}" alt="Deskripsi gambar" class="w-full h-auto my-4 rounded-lg" />\n`);
    }
  };
  
  const insertLink = () => {
    const url = prompt("Masukkan URL:");
    if (url) {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end) || "Teks tautan";
      const linkText = `[${selectedText}](${url})`;
      const newText = content.substring(0, start) + linkText + content.substring(end);
      
      setContent(newText);
      
      // Set focus back to textarea and position cursor
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + linkText.length, start + linkText.length);
      }, 0);
    }
  };
  
  const formatText = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start === end) return; // No text selected
    
    const selectedText = content.substring(start, end);
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
    }
    
    const newText = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newText);
    
    // Set focus back to textarea and position cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);
  };
  
  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    wrapTextAtCursor(prefix, '');
  };
  
  const insertList = (ordered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      const lines = selectedText.split('\n');
      const listItems = lines.map((line, index) => {
        if (ordered) {
          return `${index + 1}. ${line}`;
        } else {
          return `- ${line}`;
        }
      });
      
      const listText = listItems.join('\n');
      const newText = content.substring(0, start) + listText + content.substring(end);
      setContent(newText);
      
      // Set focus back to textarea and position cursor
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + listText.length);
      }, 0);
    } else {
      const listPrefix = ordered ? '1. ' : '- ';
      insertTextAtCursor(listPrefix);
    }
  };
  
  const insertBlockquote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      const lines = selectedText.split('\n');
      const quotedLines = lines.map(line => `> ${line}`);
      const quotedText = quotedLines.join('\n');
      const newText = content.substring(0, start) + quotedText + content.substring(end);
      setContent(newText);
      
      // Set focus back to textarea and position cursor
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + quotedText.length);
      }, 0);
    } else {
      insertTextAtCursor('> ');
    }
  };
  
  const insertCodeBlock = () => {
    wrapTextAtCursor('```\n', '\n```');
 };
  
  const insertHorizontalRule = () => {
    insertBlockAtCursor('\n---\n');
  };
  
  const applyTextColor = () => {
    wrapTextAtCursor(`<span style="color: ${textColor}">`, '</span>');
  };
  
  const applyBackgroundColor = () => {
    wrapTextAtCursor(`<span style="background-color: ${bgColor}">`, '</span>');
  };
  
  const applyAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    wrapTextAtCursor(`<div style="text-align: ${alignment}">`, '</div>');
  };
  
  const undo = () => {
    // Basic undo implementation - in a real app, you'd want a proper undo stack
    document.execCommand('undo', false);
  };
  
  const redo = () => {
    // Basic redo implementation - in a real app, you'd want a proper redo stack
    document.execCommand('redo', false);
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-2 p-3 border border-gray-600 rounded-md bg-gray-700">
      {/* Text Formatting */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm font-bold"
          title="Tebal (Bold)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm italic"
          title="Miring (Italic)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm underline"
          title="Garis Bawah (Underline)"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => formatText('strikethrough')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm line-through"
          title="Coret (Strikethrough)"
        >
          S
        </button>
      </div>
      
      {/* Headings */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={() => insertHeading(1)}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm font-bold"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => insertHeading(2)}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm font-bold"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertHeading(3)}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm font-bold"
          title="Heading 3"
        >
          H3
        </button>
      </div>
      
      {/* Lists */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={() => insertList(false)}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Daftar tidak berurut"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => insertList(true)}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Daftar berurut"
        >
          1.
        </button>
      </div>
      
      {/* Blocks */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={insertBlockquote}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Kutipan"
        >
          ❝
        </button>
        <button
          type="button"
          onClick={insertCodeBlock}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm font-mono"
          title="Blok kode"
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={insertHorizontalRule}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Garis horizontal"
        >
          ―
        </button>
      </div>
      
      {/* Links and Media */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={insertLink}
          className="px-2 py-1 bg-blue-800 text-gray-100 hover:bg-blue-900 rounded text-sm"
          title="Tambahkan Tautan"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="px-2 py-1 bg-green-800 text-gray-100 hover:bg-green-900 rounded text-sm"
          title="Tambahkan Foto"
        >
          📷
        </button>
      </div>
      
      {/* Font Size */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={decreaseFontSize}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Perkecil Teks"
        >
          A-
        </button>
        <span className="px-1 text-sm text-gray-100">{fontSize}px</span>
        <button
          type="button"
          onClick={increaseFontSize}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Perbesar Teks"
        >
          A+
        </button>
      </div>
      
      {/* Text Color */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-8 h-6 cursor-pointer"
          title="Warna Teks"
        />
        <button
          type="button"
          onClick={applyTextColor}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Terapkan Warna Teks"
        >
          T
        </button>
      </div>
      
      {/* Background Color */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-8 h-6 cursor-pointer"
          title="Warna Latar"
        />
        <button
          type="button"
          onClick={applyBackgroundColor}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Terapkan Warna Latar"
        >
          BG
        </button>
      </div>
      
      {/* Alignment */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={() => applyAlignment('left')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Rata Kiri"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => applyAlignment('center')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Rata Tengah"
        >
          ↔
        </button>
        <button
          type="button"
          onClick={() => applyAlignment('right')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Rata Kanan"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => applyAlignment('justify')}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Rata Kanan-Kiri"
        >
          ≡
        </button>
      </div>
      
      {/* Undo/Redo */}
      <div className="flex items-center space-x-1 bg-gray-600 p-1 rounded border border-gray-500">
        <button
          type="button"
          onClick={undo}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={redo}
          className="px-2 py-1 bg-gray-800 text-gray-100 hover:bg-gray-900 rounded text-sm"
          title="Redo"
        >
          ↷
        </button>
      </div>
    </div>
  );
}