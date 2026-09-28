import React, { useState } from 'react';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Activity,
  Maximize2,
  Minus,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  FolderPlus
} from 'lucide-react';

export default function ControlsSidebar({
  activeNavTab,
  setActiveNavTab,
  resumeData,
  setResumeData,
  styleSettings,
  setStyleSettings,
  onResetData,
  onAutoFitPage,
  pageOverflowStatus
}) {
  const [activeSideCategory, setActiveSideCategory] = useState('fontSize');
  const [activeContentCategory, setActiveContentCategory] = useState('all');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState('text'); // 'text' or 'bullets'
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const handleStyleChange = (key, value) => {
    setStyleSettings(prev => ({ ...prev, [key]: value }));
  };

  const adjustNumericValue = (key, delta, min = 0, max = 100, step = 1) => {
    setStyleSettings(prev => {
      const current = prev[key] !== undefined ? prev[key] : 0;
      const nextVal = Math.max(min, Math.min(max, parseFloat((current + delta).toFixed(2))));
      return { ...prev, [key]: nextVal };
    });
  };

  // Helper for segmented bar level steps
  const renderSegmentedControl = (currentVal, options, onChangeKey, unit = 'px') => {
    return (
      <div className="segmented-bar">
        {options.map((opt, idx) => {
          const isActive = Math.abs(currentVal - opt.val) < 0.1;
          return (
            <button
              key={idx}
              className={`segmented-step ${isActive ? 'active' : ''}`}
              onClick={() => handleStyleChange(onChangeKey, opt.val)}
              title={`${opt.label || opt.val}${unit}`}
            />
          );
        })}
      </div>
    );
  };

  // ----------------------------------------------------
  // CONTENT FORM STATE HANDLERS
  // ----------------------------------------------------
  const handlePersonalChange = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const handleSummaryChange = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      summary: { ...prev.summary, [key]: value }
    }));
  };

  const handleItemChange = (sectionKey, itemIdx, fieldKey, value) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[sectionKey].items[itemIdx][fieldKey] = value;
      return next;
    });
  };

  // Experience Handlers
  const addExperienceItem = () => {
    setResumeData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        items: [
          ...prev.experience.items,
          {
            id: `exp-${Date.now()}`,
            role: "Role / Position",
            company: "Company Name",
            duration: "Duration / Dates",
            bullets: ["Description of achievements and responsibilities."]
          }
        ]
      }
    }));
  };

  const removeExperienceItem = (idx) => {
    setResumeData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        items: prev.experience.items.filter((_, i) => i !== idx)
      }
    }));
  };

  const addExperienceBullet = (itemIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.experience.items[itemIdx].bullets.push("New detailed responsibility or achievement...");
      return next;
    });
  };

  const removeExperienceBullet = (itemIdx, bulletIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.experience.items[itemIdx].bullets.splice(bulletIdx, 1);
      return next;
    });
  };

  // Education Handlers
  const addEducationItem = () => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        items: [
          ...prev.education.items,
          {
            id: `edu-${Date.now()}`,
            degree: "Degree / Course Name",
            institution: "College / University",
            location: "Location",
            details: "CGPA / Grades"
          }
        ]
      }
    }));
  };

  const removeEducationItem = (idx) => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        items: prev.education.items.filter((_, i) => i !== idx)
      }
    }));
  };

  // Skill Handlers
  const handleCategoryChange = (catIdx, fieldKey, value) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.skills.categories[catIdx][fieldKey] = value;
      return next;
    });
  };

  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: [
          ...prev.skills.categories,
          {
            id: `skill-${Date.now()}`,
            label: "Category Name",
            items: "Skill 1, Skill 2, Skill 3"
          }
        ]
      }
    }));
  };

  const removeSkillCategory = (idx) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.filter((_, i) => i !== idx)
      }
    }));
  };

  // Project Handlers
  const addProjectItem = () => {
    setResumeData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: [
          ...prev.projects.items,
          {
            id: `proj-${Date.now()}`,
            title: "Project Title",
            tech: "Technologies Used",
            bullets: ["Implemented feature and achieved specific result."]
          }
        ]
      }
    }));
  };

  const removeProjectItem = (idx) => {
    setResumeData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.filter((_, i) => i !== idx)
      }
    }));
  };

  const addProjectBullet = (itemIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.projects.items[itemIdx].bullets.push("New project feature or outcome details...");
      return next;
    });
  };

  const removeProjectBullet = (itemIdx, bulletIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.projects.items[itemIdx].bullets.splice(bulletIdx, 1);
      return next;
    });
  };

  // Certification Handlers
  const addCertItem = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        items: [
          ...prev.certifications.items,
          {
            id: `cert-${Date.now()}`,
            title: "Certification Name",
            issuer: "Issuing Organization"
          }
        ]
      }
    }));
  };

  const removeCertItem = (idx) => {
    setResumeData(prev => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        items: prev.certifications.items.filter((_, i) => i !== idx)
      }
    }));
  };

  // ----------------------------------------------------
  // DYNAMIC CUSTOM SECTION HANDLERS (Requested Feature)
  // ----------------------------------------------------
  const handleCreateCustomSection = (presetTitle = null) => {
    const titleToUse = presetTitle || newSectionTitle.trim() || 'NEW SECTION';
    const newSec = {
      id: `custom-${Date.now()}`,
      title: titleToUse.toUpperCase(),
      type: newSectionType,
      content: newSectionType === 'text' ? 'Enter details for this new section here...' : '',
      bullets: newSectionType === 'bullets' ? ['Bullet point item 1', 'Bullet point item 2'] : []
    };

    setResumeData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSec]
    }));

    setNewSectionTitle('');
    setShowAddSectionModal(false);
    setActiveContentCategory(newSec.id);
  };

  const handleUpdateCustomSection = (idx, field, value) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.customSections[idx][field] = value;
      return next;
    });
  };

  const removeCustomSection = (idx) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== idx)
    }));
    setActiveContentCategory('all');
  };

  const addCustomBullet = (secIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.customSections[secIdx].bullets.push("New bullet item detail...");
      return next;
    });
  };

  const removeCustomBullet = (secIdx, bulletIdx) => {
    setResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next.customSections[secIdx].bullets.splice(bulletIdx, 1);
      return next;
    });
  };

  return (
    <div className="no-print" style={{
      display: 'flex',
      height: 'calc(100vh - 56px)',
      backgroundColor: '#eae8e3',
      borderRight: '1px solid #d6d3dc',
      zIndex: 20
    }}>
      {/* 1. FAR-LEFT VERTICAL NAVIGATION RAIL */}
      <nav style={{
        width: '125px',
        backgroundColor: '#eae8e3',
        borderRight: '1px solid #e2ded7',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        overflowY: 'auto'
      }}>
        {activeNavTab === 'customize' ? (
          <>
            {[
              { id: 'fontSize', label: 'Font Size' },
              { id: 'indent', label: 'Indentation' },
              { id: 'spacing', label: 'Spacing' },
              { id: 'font', label: 'Font' },
              { id: 'colors', label: 'Colors' },
              { id: 'layout', label: 'Layout' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveSideCategory(cat.id)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: activeSideCategory === cat.id ? '#ffffff' : 'transparent',
                  color: activeSideCategory === cat.id ? '#7c3aed' : '#57534e',
                  border: 'none',
                  borderLeft: activeSideCategory === cat.id ? '4px solid #7c3aed' : '4px solid transparent',
                  fontSize: '12px',
                  fontWeight: activeSideCategory === cat.id ? '700' : '500',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </>
        ) : (
          <>
            {[
              { id: 'all', label: 'All Sections', icon: FileText },
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'summary', label: 'Summary', icon: FileText },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Wrench },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'certifications', label: 'Certifications', icon: Award },
              { id: 'activities', label: 'Activities', icon: Activity },
              ...(resumeData.customSections || []).map(cs => ({
                id: cs.id,
                label: cs.title,
                icon: FolderPlus
              }))
            ].map(cat => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveContentCategory(cat.id)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: activeContentCategory === cat.id ? '#ffffff' : 'transparent',
                    color: activeContentCategory === cat.id ? '#7c3aed' : '#57534e',
                    border: 'none',
                    borderLeft: activeContentCategory === cat.id ? '4px solid #7c3aed' : '4px solid transparent',
                    fontSize: '11px',
                    fontWeight: activeContentCategory === cat.id ? '700' : '500',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <IconComp size={13} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</span>
                </button>
              );
            })}

            {/* Quick Add Section Button in Rail */}
            <button
              onClick={() => setShowAddSectionModal(true)}
              style={{
                marginTop: '12px',
                marginHorizontal: '8px',
                padding: '8px 10px',
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'center'
              }}
            >
              <PlusCircle size={13} /> Add Section
            </button>
          </>
        )}
      </nav>

      {/* 2. SUB-PANEL EDITING CARDS */}
      <div style={{
        width: '330px',
        backgroundColor: '#f6f5f2',
        padding: '20px 16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* 1-Page Optimization Indicator Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #e7e5e4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1c1917', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {pageOverflowStatus.isOverflow ? (
                <AlertTriangle size={15} color="#dc2626" />
              ) : (
                <CheckCircle2 size={15} color="#16a34a" />
              )}
              {pageOverflowStatus.isOverflow ? 'Overflows 1 Page' : 'Fits 1 Page Cleanly'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#78716c' }}>
              {pageOverflowStatus.heightPercent}% height
            </span>
          </div>

          <button
            onClick={onAutoFitPage}
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '8px 12px',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(124, 58, 237, 0.25)'
            }}
          >
            <Maximize2 size={14} /> Auto-Fit to 1 Page
          </button>
        </div>

        {/* CUSTOMIZE MODE CARDS */}
        {activeNavTab === 'customize' && activeSideCategory === 'fontSize' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '16px' }}>Font Size</h2>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Base Font Size</span>
                <span style={{ fontSize: '12px', color: '#78716c', fontWeight: '600' }}>{styleSettings.bodyFontSizePx}pt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderSegmentedControl(styleSettings.bodyFontSizePx, [{ val: 10 }, { val: 11 }, { val: 12 }, { val: 13 }, { val: 14 }, { val: 15 }], 'bodyFontSizePx', 'pt')}
                <button className="stepper-btn" onClick={() => adjustNumericValue('bodyFontSizePx', -1, 9, 20)}><Minus size={14} /></button>
                <button className="stepper-btn" onClick={() => adjustNumericValue('bodyFontSizePx', 1, 9, 20)}><Plus size={14} /></button>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Full Name</span>
                <span style={{ fontSize: '12px', color: '#78716c', fontWeight: '600' }}>{styleSettings.headerNameSizePx}pt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderSegmentedControl(styleSettings.headerNameSizePx, [{ val: 20 }, { val: 24 }, { val: 26 }, { val: 28 }, { val: 32 }], 'headerNameSizePx', 'pt')}
                <button className="stepper-btn" onClick={() => adjustNumericValue('headerNameSizePx', -1, 16, 40)}><Minus size={14} /></button>
                <button className="stepper-btn" onClick={() => adjustNumericValue('headerNameSizePx', 1, 16, 40)}><Plus size={14} /></button>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Section Headings</span>
                <span style={{ fontSize: '12px', color: '#78716c', fontWeight: '600' }}>{styleSettings.sectionTitleSizePx}pt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderSegmentedControl(styleSettings.sectionTitleSizePx, [{ val: 13 }, { val: 14 }, { val: 16 }, { val: 18 }, { val: 20 }], 'sectionTitleSizePx', 'pt')}
                <button className="stepper-btn" onClick={() => adjustNumericValue('sectionTitleSizePx', -1, 11, 26)}><Minus size={14} /></button>
                <button className="stepper-btn" onClick={() => adjustNumericValue('sectionTitleSizePx', 1, 11, 26)}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMIZE MODE: INDENTATION CARD */}
        {activeNavTab === 'customize' && activeSideCategory === 'indent' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '16px' }}>Indentation Controls</h2>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Left Indentation</span>
                <span style={{ fontSize: '12px', color: '#78716c', fontWeight: '600' }}>{styleSettings.leftIndentPx}px</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderSegmentedControl(styleSettings.leftIndentPx, [{ val: 0 }, { val: 8 }, { val: 16 }, { val: 24 }, { val: 32 }], 'leftIndentPx', 'px')}
                <button className="stepper-btn" onClick={() => adjustNumericValue('leftIndentPx', -2, 0, 60)}><Minus size={14} /></button>
                <button className="stepper-btn" onClick={() => adjustNumericValue('leftIndentPx', 2, 0, 60)}><Plus size={14} /></button>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Right Indentation</span>
                <span style={{ fontSize: '12px', color: '#78716c', fontWeight: '600' }}>{styleSettings.rightIndentPx}px</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderSegmentedControl(styleSettings.rightIndentPx, [{ val: 0 }, { val: 8 }, { val: 16 }, { val: 24 }, { val: 32 }], 'rightIndentPx', 'px')}
                <button className="stepper-btn" onClick={() => adjustNumericValue('rightIndentPx', -2, 0, 60)}><Minus size={14} /></button>
                <button className="stepper-btn" onClick={() => adjustNumericValue('rightIndentPx', 2, 0, 60)}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* CONTENT FORM MODE CARDS - ALL RESUME HEADERS INCLUDED */}
        {/* ==================================================== */}
        {activeNavTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* 1. PERSONAL INFO CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'personal') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} color="#7c3aed" /> Personal Info
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.fullName}
                      onChange={e => handlePersonalChange('fullName', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Headline / Subtitle</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.headline}
                      onChange={e => handlePersonalChange('headline', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Email</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.email}
                      onChange={e => handlePersonalChange('email', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Phone</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone}
                      onChange={e => handlePersonalChange('phone', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={e => handlePersonalChange('location', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedin}
                      onChange={e => handlePersonalChange('linkedin', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUMMARY CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'summary') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} color="#7c3aed" /> Summary
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Section Heading Title</label>
                    <input
                      type="text"
                      value={resumeData.summary.title}
                      onChange={e => handleSummaryChange('title', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Summary Description</label>
                    <textarea
                      rows={4}
                      value={resumeData.summary.content}
                      onChange={e => handleSummaryChange('content', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. EXPERIENCE CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'experience') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={16} color="#7c3aed" /> Experience ({resumeData.experience.items.length})
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {resumeData.experience.items.map((exp, idx) => (
                    <div key={exp.id || idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>Experience #{idx + 1}</span>
                        <button onClick={() => removeExperienceItem(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="Role / Title"
                          value={exp.role}
                          onChange={e => handleItemChange('experience', idx, 'role', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => handleItemChange('experience', idx, 'company', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          placeholder="Duration / Dates"
                          value={exp.duration}
                          onChange={e => handleItemChange('experience', idx, 'duration', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                        />

                        {/* Bullets */}
                        <div style={{ marginTop: '4px' }}>
                          <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Bullet Points</label>
                          {exp.bullets.map((b, bulletIdx) => (
                            <div key={bulletIdx} style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                              <input
                                type="text"
                                value={b}
                                onChange={e => {
                                  const newB = [...exp.bullets];
                                  newB[bulletIdx] = e.target.value;
                                  handleItemChange('experience', idx, 'bullets', newB);
                                }}
                                style={{ flex: 1, padding: '5px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }}
                              />
                              <button onClick={() => removeExperienceBullet(idx, bulletIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                            </div>
                          ))}
                          <button
                            onClick={() => addExperienceBullet(idx)}
                            style={{ marginTop: '6px', padding: '4px 8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Plus size={12} /> Add Bullet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addExperienceItem}
                    style={{
                      padding: '8px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} /> Add Experience Item
                  </button>
                </div>
              </div>
            )}

            {/* 4. EDUCATION CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'education') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={16} color="#7c3aed" /> Education ({resumeData.education.items.length})
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {resumeData.education.items.map((edu, idx) => (
                    <div key={edu.id || idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>Education #{idx + 1}</span>
                        <button onClick={() => removeEducationItem(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="Degree / Branch"
                          value={edu.degree}
                          onChange={e => handleItemChange('education', idx, 'degree', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}
                        />
                        <input
                          type="text"
                          placeholder="Institution / College"
                          value={edu.institution}
                          onChange={e => handleItemChange('education', idx, 'institution', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          <input
                            type="text"
                            placeholder="Location"
                            value={edu.location}
                            onChange={e => handleItemChange('education', idx, 'location', e.target.value)}
                            style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                          />
                          <input
                            type="text"
                            placeholder="CGPA / Details"
                            value={edu.details}
                            onChange={e => handleItemChange('education', idx, 'details', e.target.value)}
                            style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addEducationItem}
                    style={{
                      padding: '8px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} /> Add Education Item
                  </button>
                </div>
              </div>
            )}

            {/* 5. TECHNICAL SKILLS CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'skills') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wrench size={16} color="#7c3aed" /> Technical Skills ({resumeData.skills.categories.length})
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {resumeData.skills.categories.map((cat, idx) => (
                    <div key={cat.id || idx} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <input
                          type="text"
                          placeholder="Category (e.g., Programming)"
                          value={cat.label}
                          onChange={e => handleCategoryChange(idx, 'label', e.target.value)}
                          style={{ padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: '700', flex: 1, marginRight: '6px' }}
                        />
                        <button onClick={() => removeSkillCategory(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                      </div>
                      <input
                        type="text"
                        placeholder="Skills list (e.g. Python, C++)"
                        value={cat.items}
                        onChange={e => handleCategoryChange(idx, 'items', e.target.value)}
                        style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }}
                      />
                    </div>
                  ))}

                  <button
                    onClick={addSkillCategory}
                    style={{
                      padding: '8px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} /> Add Skill Category
                  </button>
                </div>
              </div>
            )}

            {/* 6. PROJECTS CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'projects') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FolderGit2 size={16} color="#7c3aed" /> Projects ({resumeData.projects.items.length})
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {resumeData.projects.items.map((proj, idx) => (
                    <div key={proj.id || idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>Project #{idx + 1}</span>
                        <button onClick={() => removeProjectItem(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={e => handleItemChange('projects', idx, 'title', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}
                        />
                        <input
                          type="text"
                          placeholder="Technologies Used"
                          value={proj.tech}
                          onChange={e => handleItemChange('projects', idx, 'tech', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                        />

                        {/* Bullets */}
                        <div style={{ marginTop: '4px' }}>
                          <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Bullet Points</label>
                          {proj.bullets && proj.bullets.map((b, bulletIdx) => (
                            <div key={bulletIdx} style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                              <input
                                type="text"
                                value={b}
                                onChange={e => {
                                  const newB = [...proj.bullets];
                                  newB[bulletIdx] = e.target.value;
                                  handleItemChange('projects', idx, 'bullets', newB);
                                }}
                                style={{ flex: 1, padding: '5px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }}
                              />
                              <button onClick={() => removeProjectBullet(idx, bulletIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                            </div>
                          ))}
                          <button
                            onClick={() => addProjectBullet(idx)}
                            style={{ marginTop: '6px', padding: '4px 8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Plus size={12} /> Add Bullet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addProjectItem}
                    style={{
                      padding: '8px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} /> Add Project Item
                  </button>
                </div>
              </div>
            )}

            {/* 7. CERTIFICATIONS CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'certifications') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} color="#7c3aed" /> Certifications ({resumeData.certifications.items.length})
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {resumeData.certifications.items.map((cert, idx) => (
                    <div key={cert.id || idx} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed' }}>Cert #{idx + 1}</span>
                        <button onClick={() => removeCertItem(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <input
                          type="text"
                          placeholder="Certification Title"
                          value={cert.title}
                          onChange={e => handleItemChange('certifications', idx, 'title', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}
                        />
                        <input
                          type="text"
                          placeholder="Issuer / Organization"
                          value={cert.issuer}
                          onChange={e => handleItemChange('certifications', idx, 'issuer', e.target.value)}
                          style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addCertItem}
                    style={{
                      padding: '8px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} /> Add Certification Item
                  </button>
                </div>
              </div>
            )}

            {/* 8. ACTIVITIES CARD */}
            {(activeContentCategory === 'all' || activeContentCategory === 'activities') && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="#7c3aed" /> Activities
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Activities Content</label>
                    <textarea
                      rows={3}
                      value={resumeData.activities.content}
                      onChange={e => setResumeData(prev => ({ ...prev, activities: { ...prev.activities, content: e.target.value } }))}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 9. DYNAMIC CUSTOM SECTIONS CARDS (User Requested Feature) */}
            {(resumeData.customSections || []).map((sec, secIdx) => {
              if (activeContentCategory !== 'all' && activeContentCategory !== sec.id) return null;
              return (
                <div key={sec.id || secIdx} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #e7e5e4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1c1917', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FolderPlus size={16} color="#7c3aed" /> Custom Section #{secIdx + 1}
                    </h2>
                    <button onClick={() => removeCustomSection(secIdx)} title="Delete Section" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={15} /></button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Section Title</label>
                      <input
                        type="text"
                        value={sec.title}
                        onChange={e => handleUpdateCustomSection(secIdx, 'title', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Display Format</label>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button
                          onClick={() => handleUpdateCustomSection(secIdx, 'type', 'text')}
                          style={{
                            flex: 1,
                            padding: '6px',
                            borderRadius: '6px',
                            border: sec.type === 'text' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: sec.type === 'text' ? '#f3e8ff' : '#ffffff',
                            color: sec.type === 'text' ? '#7c3aed' : '#475569',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Paragraph Text
                        </button>
                        <button
                          onClick={() => handleUpdateCustomSection(secIdx, 'type', 'bullets')}
                          style={{
                            flex: 1,
                            padding: '6px',
                            borderRadius: '6px',
                            border: sec.type === 'bullets' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                            background: sec.type === 'bullets' ? '#f3e8ff' : '#ffffff',
                            color: sec.type === 'bullets' ? '#7c3aed' : '#475569',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Bulleted List
                        </button>
                      </div>
                    </div>

                    {sec.type === 'bullets' ? (
                      <div>
                        <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Bullet Items</label>
                        {sec.bullets && sec.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                            <input
                              type="text"
                              value={bullet}
                              onChange={e => {
                                const newB = [...sec.bullets];
                                newB[bulletIdx] = e.target.value;
                                handleUpdateCustomSection(secIdx, 'bullets', newB);
                              }}
                              style={{ flex: 1, padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }}
                            />
                            <button onClick={() => removeCustomBullet(secIdx, bulletIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                          </div>
                        ))}
                        <button
                          onClick={() => addCustomBullet(secIdx)}
                          style={{ marginTop: '6px', padding: '4px 8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Plus size={12} /> Add Bullet
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label style={{ fontSize: '11px', color: '#78716c', fontWeight: '600' }}>Section Content Text</label>
                        <textarea
                          rows={3}
                          value={sec.content}
                          onChange={e => handleUpdateCustomSection(secIdx, 'content', e.target.value)}
                          style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', resize: 'vertical' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ADD NEW SECTION BUTTON & PRESETS CARD */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', border: '2px dashed #c084fc', background: '#faf5ff' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PlusCircle size={16} /> Add New Section
              </h3>
              <p style={{ fontSize: '11px', color: '#78716c', marginBottom: '12px' }}>
                Click a preset below or enter a custom section title (e.g. Languages, Strengths, Declaration, Publications):
              </p>

              {/* Quick Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {['LANGUAGES', 'STRENGTHS', 'DECLARATION', 'PUBLICATIONS', 'VOLUNTEER WORK', 'HONORS & AWARDS'].map(preset => (
                  <button
                    key={preset}
                    onClick={() => handleCreateCustomSection(preset)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #d8b4fe',
                      background: '#ffffff',
                      color: '#7c3aed',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="e.g. KEY PROJECTS / AWARDS"
                  value={newSectionTitle}
                  onChange={e => setNewSectionTitle(e.target.value)}
                  style={{ flex: 1, padding: '7px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }}
                />
                <button
                  onClick={() => handleCreateCustomSection()}
                  style={{
                    padding: '7px 14px',
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Create
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
