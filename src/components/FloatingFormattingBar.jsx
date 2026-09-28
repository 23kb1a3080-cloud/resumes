import React, { useState, useEffect } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignRight, Type, Plus, Minus } from 'lucide-react';

export default function FloatingFormattingBar({ styleSettings, setStyleSettings }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setIsVisible(false);
        return;
      }

      // Check if selection is within #resume-paper
      const paperEl = document.getElementById('resume-paper');
      if (!paperEl) return;

      const anchorNode = selection.anchorNode;
      if (anchorNode && paperEl.contains(anchorNode)) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPosition({
          top: Math.max(10, rect.top - 48 + window.scrollY),
          left: Math.max(10, rect.left + rect.width / 2 - 120 + window.scrollX)
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  if (!isVisible) return null;

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const adjustLeftIndent = (delta) => {
    setStyleSettings(prev => ({
      ...prev,
      leftIndentPx: Math.max(0, Math.min(100, prev.leftIndentPx + delta))
    }));
  };

  const adjustRightIndent = (delta) => {
    setStyleSettings(prev => ({
      ...prev,
      rightIndentPx: Math.max(0, Math.min(100, prev.rightIndentPx + delta))
    }));
  };

  const adjustFontSize = (delta) => {
    setStyleSettings(prev => ({
      ...prev,
      baseFontSizePx: Math.max(9, Math.min(22, prev.baseFontSizePx + delta)),
      bodyFontSizePx: Math.max(9, Math.min(22, prev.bodyFontSizePx + delta))
    }));
  };

  return (
    <div
      className="no-print"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        background: '#1e293b',
        border: '1px solid #475569',
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
        title="Bold"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#f8fafc',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
        className="hover:bg-slate-700"
      >
        <Bold size={15} />
      </button>

      <button
        onMouseDown={e => { e.preventDefault(); applyFormat('italic'); }}
        title="Italic"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#f8fafc',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        <Italic size={15} />
      </button>

      <button
        onMouseDown={e => { e.preventDefault(); applyFormat('underline'); }}
        title="Underline"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#f8fafc',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        <Underline size={15} />
      </button>

      <div style={{ width: '1px', height: '18px', background: '#475569', margin: '0 2px' }} />

      {/* Font Size Adjusters */}
      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '2px' }}>
        <Type size={13} />
        <button
          onClick={() => adjustFontSize(-1)}
          title="Decrease Font Size"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ minWidth: '18px', textAlign: 'center', fontWeight: 'bold' }}>{styleSettings.baseFontSizePx}</span>
        <button
          onClick={() => adjustFontSize(1)}
          title="Increase Font Size"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          +
        </button>
      </span>

      <div style={{ width: '1px', height: '18px', background: '#475569', margin: '0 2px' }} />

      {/* Indentation Adjusters */}
      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlignLeft size={13} title="Left Indent" />
        <button
          onClick={() => adjustLeftIndent(-2)}
          title="Decrease Left Indent"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ minWidth: '16px', textAlign: 'center' }}>L:{styleSettings.leftIndentPx}</span>
        <button
          onClick={() => adjustLeftIndent(2)}
          title="Increase Left Indent"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          +
        </button>
      </span>

      <span style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlignRight size={13} title="Right Indent" />
        <button
          onClick={() => adjustRightIndent(-2)}
          title="Decrease Right Indent"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ minWidth: '16px', textAlign: 'center' }}>R:{styleSettings.rightIndentPx}</span>
        <button
          onClick={() => adjustRightIndent(2)}
          title="Increase Right Indent"
          style={{ background: '#334155', border: 'none', color: 'white', borderRadius: '3px', width: '20px', height: '20px', cursor: 'pointer' }}
        >
          +
        </button>
      </span>
    </div>
  );
}
