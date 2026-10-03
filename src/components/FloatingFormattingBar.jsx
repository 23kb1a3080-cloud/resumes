import React, { useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Type,
  Palette
} from 'lucide-react';

export default function FloatingFormattingBar({ styleSettings, setStyleSettings }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Keyboard Shortcuts Handler (Ctrl+J, Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+L, Ctrl+E, Ctrl+R)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd) return;

      const paperEl = document.getElementById('resume-paper');
      const activeEl = document.activeElement;
      
      // Check if user is typing or focused inside resume paper or contentEditable
      const isInsidePaper = paperEl && (paperEl.contains(activeEl) || activeEl.isContentEditable);
      
      if (!isInsidePaper) return;

      const key = e.key.toLowerCase();

      switch (key) {
        case 'j':
          e.preventDefault();
          document.execCommand('justifyFull', false, null);
          break;
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false, null);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false, null);
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false, null);
          break;
        case 'l':
          e.preventDefault();
          document.execCommand('justifyLeft', false, null);
          break;
        case 'e':
          e.preventDefault();
          document.execCommand('justifyCenter', false, null);
          break;
        case 'r':
          e.preventDefault();
          document.execCommand('justifyRight', false, null);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Selection change positioning for floating bar
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setIsVisible(false);
        return;
      }

      const paperEl = document.getElementById('resume-paper');
      if (!paperEl) return;

      const anchorNode = selection.anchorNode;
      if (anchorNode && paperEl.contains(anchorNode)) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          setPosition({
            top: Math.max(10, rect.top - 52 + window.scrollY),
            left: Math.max(10, rect.left + rect.width / 2 - 160 + window.scrollX)
          });
          setIsVisible(true);
        } catch {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const adjustFontSize = (delta) => {
    setStyleSettings(prev => ({
      ...prev,
      baseFontSizePx: Math.max(9, Math.min(22, prev.baseFontSizePx + delta)),
      bodyFontSizePx: Math.max(9, Math.min(22, prev.bodyFontSizePx + delta))
    }));
  };

  return (
    <>
      {/* 1. PERSISTENT TOP FORMATTING TOOLBAR (PINS ABOVE RESUME CANVAS) */}
      <div
        className="no-print"
        style={{
          width: '100%',
          maxWidth: '794px',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '6px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          zIndex: 25
        }}
      >
        {/* LIST OPTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('insertUnorderedList'); }}
            title="Bulleted List"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <List size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('insertOrderedList'); }}
            title="Numbered List (1 2 3)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <ListOrdered size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('indent'); }}
            title="Indent / Sub-level List (1 a i)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Indent size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('outdent'); }}
            title="Outdent List Level"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Outdent size={15} />
          </button>
        </div>

        <div style={{ width: '1px', height: '20px', background: '#cbd5e1' }} />

        {/* ALIGNMENT OPTIONS MATCHING USER SCREENSHOT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyLeft'); }}
            title="Align Left (Ctrl+L)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <AlignLeft size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyCenter'); }}
            title="Align Center (Ctrl+E)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <AlignCenter size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyRight'); }}
            title="Align Right (Ctrl+R)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <AlignRight size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyFull'); }}
            title="Fit Text Alignment / Justify (Ctrl+J)"
            style={{
              background: '#e2e8f0',
              border: '1px solid #94a3b8',
              padding: '5px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: '700',
              fontSize: '11px'
            }}
          >
            <AlignJustify size={15} color="#0f2b5c" />
            <span>Fit (Ctrl+J)</span>
          </button>
        </div>

        <div style={{ width: '1px', height: '20px', background: '#cbd5e1' }} />

        {/* TEXT STYLE FORMATTING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('bold'); }}
            title="Bold (Ctrl+B)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Bold size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('italic'); }}
            title="Italic (Ctrl+I)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Italic size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('underline'); }}
            title="Underline (Ctrl+U)"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Underline size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('strikethrough'); }}
            title="Strikethrough"
            style={{ background: 'transparent', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer', color: '#334155' }}
          >
            <Strikethrough size={15} />
          </button>
        </div>

        <div style={{ width: '1px', height: '20px', background: '#cbd5e1' }} />

        {/* FONT SIZE & COLOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: '600' }}>
            <Type size={14} color="#64748b" />
            <button
              onClick={() => adjustFontSize(-1)}
              style={{ padding: '2px 6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
            >
              -
            </button>
            <span style={{ minWidth: '18px', textAlign: 'center' }}>{styleSettings.bodyFontSizePx}pt</span>
            <button
              onClick={() => adjustFontSize(1)}
              style={{ padding: '2px 6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
            >
              +
            </button>
          </div>

          <label title="Text Color" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Palette size={15} color="#475569" />
            <input
              type="color"
              onChange={e => applyFormat('foreColor', e.target.value)}
              style={{ width: '22px', height: '22px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            />
          </label>
        </div>
      </div>

      {/* 2. FLOATING FORMATTING BAR ON SELECTION */}
      {isVisible && (
        <div
          className="no-print"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 9999,
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            color: '#f8fafc',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('bold'); }}
            title="Bold (Ctrl+B)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <Bold size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('italic'); }}
            title="Italic (Ctrl+I)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <Italic size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('underline'); }}
            title="Underline (Ctrl+U)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <Underline size={15} />
          </button>

          <div style={{ width: '1px', height: '18px', background: '#334155', margin: '0 2px' }} />

          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyLeft'); }}
            title="Left (Ctrl+L)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <AlignLeft size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyCenter'); }}
            title="Center (Ctrl+E)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <AlignCenter size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('justifyFull'); }}
            title="Fit / Justify (Ctrl+J)"
            style={{ background: '#3b82f6', border: 'none', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <AlignJustify size={14} /> Fit
          </button>

          <div style={{ width: '1px', height: '18px', background: '#334155', margin: '0 2px' }} />

          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('insertUnorderedList'); }}
            title="Bullets"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <List size={15} />
          </button>
          <button
            onMouseDown={e => { e.preventDefault(); applyFormat('insertOrderedList'); }}
            title="Numbered (1 2 3)"
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <ListOrdered size={15} />
          </button>
        </div>
      )}
    </>
  );
}
