import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
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

  const paperRef = useRef(null);

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
      {/* Top Header Navbar matching user screenshot */}
      <TopNavbar
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        onExportPdf={handleExportPdf}
        onPrintPdf={handlePrintPdf}
        onAutoFitPage={handleAutoFitPage}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
      />

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Dual Rail Left Sidebar Editor */}
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

        {/* Center Live Document Preview Container */}
        <main
          className="print-area-wrapper"
          style={{
            flex: 1,
            backgroundColor: '#eae8e3',
            overflow: 'auto',
            padding: '30px 20px 80px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
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
      </div>
    </div>
  );
}
