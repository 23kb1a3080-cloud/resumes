import React from 'react';
import {
  LayoutGrid,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Download,
  Printer,
  ChevronDown,
  Eye,
  Edit3
} from 'lucide-react';

export default function TopNavbar({
  activeNavTab,
  setActiveNavTab,
  onExportPdf,
  onPrintPdf,
  mobileViewMode = 'editor',
  setMobileViewMode
}) {
  return (
    <header className="no-print" style={{
      height: '56px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e7e5e4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      color: '#1c1917',
      zIndex: 30,
      gap: '8px',
      overflowX: 'auto'
    }}>
      {/* Top Left Navigation Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <button
          onClick={() => setActiveNavTab('overview')}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: activeNavTab === 'overview' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'overview' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'overview' ? '#0f172a' : '#64748b',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}
        >
          <LayoutGrid size={15} /> Overview
        </button>

        <button
          onClick={() => setActiveNavTab('content')}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: activeNavTab === 'content' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'content' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'content' ? '#0f172a' : '#64748b',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}
        >
          <FileText size={15} /> Content
        </button>

        <button
          onClick={() => setActiveNavTab('customize')}
          style={{
            padding: '6px 14px',
            borderRadius: '16px',
            border: 'none',
            background: activeNavTab === 'customize' ? '#fce7f3' : 'transparent',
            color: activeNavTab === 'customize' ? '#ec4899' : '#64748b',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}
        >
          <SlidersHorizontal size={15} color={activeNavTab === 'customize' ? '#ec4899' : '#64748b'} /> Customize
        </button>

        <button
          onClick={() => setActiveNavTab('ai')}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: activeNavTab === 'ai' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'ai' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'ai' ? '#0f172a' : '#64748b',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={15} /> AI Tools
        </button>
      </div>

      {/* Top Right Action Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Mobile View Mode Switcher (Visible on Mobile) */}
        {setMobileViewMode && (
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '8px',
            gap: '2px'
          }}>
            <button
              onClick={() => setMobileViewMode('editor')}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: mobileViewMode === 'editor' ? '#7c3aed' : 'transparent',
                color: mobileViewMode === 'editor' ? '#ffffff' : '#475569',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Edit3 size={13} /> Edit
            </button>
            <button
              onClick={() => setMobileViewMode('preview')}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: mobileViewMode === 'preview' ? '#7c3aed' : 'transparent',
                color: mobileViewMode === 'preview' ? '#ffffff' : '#475569',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Eye size={13} /> Preview
            </button>
          </div>
        )}

        {/* Download PDF Button */}
        <button
          onClick={onExportPdf}
          style={{
            background: '#18181b',
            border: 'none',
            color: '#ffffff',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            whiteSpace: 'nowrap'
          }}
        >
          Download <Download size={14} />
        </button>
      </div>
    </header>
  );
}
