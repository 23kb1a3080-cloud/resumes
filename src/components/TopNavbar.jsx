import React from 'react';
import {
  LayoutGrid,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Download,
  Printer,
  ChevronDown,
  MoreVertical,
  Maximize2
} from 'lucide-react';

export default function TopNavbar({
  activeNavTab,
  setActiveNavTab,
  onExportPdf,
  onPrintPdf,
  onAutoFitPage,
  zoomScale,
  setZoomScale
}) {
  return (
    <header className="no-print" style={{
      height: '56px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e7e5e4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      color: '#1c1917',
      zIndex: 30
    }}>
      {/* Top Left Main Navigation Tabs matching user reference image */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => setActiveNavTab('overview')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: activeNavTab === 'overview' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'overview' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'overview' ? '#0f172a' : '#64748b',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <LayoutGrid size={16} /> Overview
        </button>

        <button
          onClick={() => setActiveNavTab('content')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: activeNavTab === 'content' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'content' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'content' ? '#0f172a' : '#64748b',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileText size={16} /> Content
        </button>

        <button
          onClick={() => setActiveNavTab('customize')}
          style={{
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            background: activeNavTab === 'customize' ? '#fce7f3' : 'transparent',
            color: activeNavTab === 'customize' ? '#ec4899' : '#64748b',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <SlidersHorizontal size={16} color={activeNavTab === 'customize' ? '#ec4899' : '#64748b'} /> Customize
        </button>

        <button
          onClick={() => setActiveNavTab('ai')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: activeNavTab === 'ai' ? '1px solid #e2e8f0' : 'none',
            background: activeNavTab === 'ai' ? '#f1f5f9' : 'transparent',
            color: activeNavTab === 'ai' ? '#0f172a' : '#64748b',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} /> AI Tools
        </button>
      </div>

      {/* Top Right Action Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Preset Selector Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '500',
          color: '#334155'
        }}>
          <span>Resume 1</span>
          <ChevronDown size={14} />
        </div>

        {/* Print Button */}
        <button
          onClick={onPrintPdf}
          title="Print or Save PDF directly"
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            color: '#334155',
            padding: '7px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Printer size={15} /> Print
        </button>

        {/* Sleek Dark Download PDF Button */}
        <button
          onClick={onExportPdf}
          style={{
            background: '#18181b',
            border: 'none',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          Download <Download size={15} />
        </button>

        <button
          style={{
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '6px',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </header>
  );
}
