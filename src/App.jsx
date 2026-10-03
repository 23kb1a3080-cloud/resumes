import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { Edit3, Eye, Download } from 'lucide-react';
import { initialResumeData, defaultStyleSettings } from './data/initialResumeData';
import ResumePaper from './components/ResumePaper';
import ControlsSidebar from './components/ControlsSidebar';
import TopNavbar from './components/TopNavbar';
import FloatingFormattingBar from './components/FloatingFormattingBar';
import './App.css';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState('customize'); // 'overview', 'content', 'customize', 'ai'
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [styleSettings, setStyleSettings] = useState(defaultStyleSettings);
  const [zoomScale, setZoomScale] = useState(0.95);
  const [pageOverflowStatus, setPageOverflowStatus] = useState({ heightPercent: 100, isOverflow: false });

  // Mobile Responsiveness States
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [mobileViewMode, setMobileViewMode] = useState('editor'); // 'editor' or 'preview'

  const paperRef = useRef(null);

  // Resize listener for mobile viewport & zoom scaling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        // Auto scale standard A4 width (794px) to fit mobile screen width
        const autoScale = Math.min(0.95, Math.max(0.35, (window.innerWidth - 24) / 794));
        setZoomScale(parseFloat(autoScale.toFixed(2)));
      } else {
        setZoomScale(0.95);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor Paper Height vs Standard A4 Page (1122.5px height at 96 DPI)
  useEffect(() => {
    const checkHeight = () => {
      if (paperRef.current) {
        const currentHeightPx = paperRef.current.offsetHeight;
        const a4HeightPx = 1122.5;
        const percent = Math.round((currentHeightPx / a4HeightPx) * 100);
        setPageOverflowStatus({
          heightPercent: percent,
          isOverflow: currentHeightPx > 1125
        });
      }
    };

    checkHeight();
    const timer = setTimeout(checkHeight, 300);
    window.addEventListener('resize', checkHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkHeight);
    };
  }, [resumeData, styleSettings]);

  // Auto-fit to 1 Page optimizer algorithm
  const handleAutoFitPage = () => {
    setStyleSettings(prev => {
      let newBodySize = prev.bodyFontSizePx;
      let newLineHeight = prev.lineHeight;
      let newItemSpacing = prev.itemSpacingPx;
      let newSectionMargin = prev.sectionBottomMarginPx;
      let newTopPadding = prev.paddingTopMm;

      if (pageOverflowStatus.isOverflow) {
        newBodySize = Math.max(10, prev.bodyFontSizePx - 0.5);
        newLineHeight = Math.max(1.15, prev.lineHeight - 0.05);
        newItemSpacing = Math.max(3, prev.itemSpacingPx - 1);
        newSectionMargin = Math.max(8, prev.sectionBottomMarginPx - 2);
        newTopPadding = Math.max(10, prev.paddingTopMm - 2);
      }

      return {
        ...prev,
        bodyFontSizePx: newBodySize,
        baseFontSizePx: newBodySize,
        lineHeight: newLineHeight,
        itemSpacingPx: newItemSpacing,
        sectionBottomMarginPx: newSectionMargin,
        paddingTopMm: newTopPadding,
        paddingBottomMm: newTopPadding
      };
    });
  };

  // Export PDF with html2pdf (crisp resolution & exact dimension preservation)
  const handleExportPdf = () => {
    const element = paperRef.current;
    if (!element) return;

    const currentScale = zoomScale;
    setZoomScale(1.0);

    setTimeout(() => {
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: 794
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          setZoomScale(currentScale);
        });
    }, 100);
  };

  // Native Print PDF
  const handlePrintPdf = () => {
    window.print();
  };

  const handleResetData = () => {
    if (window.confirm("Reset all resume data and formatting to default?")) {
      setResumeData(initialResumeData);
      setStyleSettings(defaultStyleSettings);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Top Header Navbar */}
      <TopNavbar
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        onExportPdf={handleExportPdf}
        onPrintPdf={handlePrintPdf}
        onAutoFitPage={handleAutoFitPage}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
        mobileViewMode={mobileViewMode}
        setMobileViewMode={setMobileViewMode}
      />

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Desktop Dual Rail / Mobile Fullscreen Sidebar Editor */}
        {(!isMobile || mobileViewMode === 'editor') && (
          <ControlsSidebar
            activeNavTab={activeNavTab}
            setActiveNavTab={setActiveNavTab}
            resumeData={resumeData}
            setResumeData={setResumeData}
            styleSettings={styleSettings}
            setStyleSettings={setStyleSettings}
            onResetData={handleResetData}
            onAutoFitPage={handleAutoFitPage}
            pageOverflowStatus={pageOverflowStatus}
          />
        )}

        {/* Center Live Document Preview Container */}
        {(!isMobile || mobileViewMode === 'preview') && (
          <main
            className="print-area-wrapper"
            style={{
              flex: 1,
              backgroundColor: '#eae8e3',
              overflow: 'auto',
              padding: isMobile ? '16px 8px 100px 8px' : '30px 20px 80px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              width: '100%'
            }}
          >
            {/* Floating formatting bubble for direct inline edits */}
            <FloatingFormattingBar
              styleSettings={styleSettings}
              setStyleSettings={setStyleSettings}
            />

            {/* Scalable Container */}
            <div style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
              position: 'relative'
            }}>
              <ResumePaper
                paperRef={paperRef}
                resumeData={resumeData}
                styleSettings={styleSettings}
                updateResumeData={setResumeData}
                isEditing={true}
              />

              {/* A4 Printable Page Boundary Line indicator */}
              <div className="no-print page-break-line">
                <span className="page-break-label">
                  A4 Standard Page 1 Cutoff Line (297mm)
                </span>
              </div>
            </div>
          </main>
        )}

        {/* Floating Mobile Bottom Action Bar */}
        {isMobile && (
          <div className="no-print" style={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99,
            backgroundColor: '#18181b',
            color: '#ffffff',
            borderRadius: '30px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            {mobileViewMode === 'editor' ? (
              <button
                onClick={() => setMobileViewMode('preview')}
                style={{
                  background: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={15} /> Preview Resume
              </button>
            ) : (
              <button
                onClick={() => setMobileViewMode('editor')}
                style={{
                  background: '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit3 size={15} /> Edit Content & Theme
              </button>
            )}

            <button
              onClick={handleExportPdf}
              style={{
                background: '#ffffff',
                color: '#18181b',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Download size={14} /> PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
