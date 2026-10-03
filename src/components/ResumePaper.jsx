import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Target,
  GraduationCap,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  User,
  CheckCircle2,
  Laptop,
  FileText,
  Globe,
  Settings
} from 'lucide-react';

const LinkedinIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function ResumePaper({
  resumeData,
  styleSettings,
  updateResumeData,
  isEditing = true,
  paperRef
}) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    achievements,
    softSkills,
    declaration,
    activities,
    customSections
  } = resumeData;

  const templateId = styleSettings.templateId || 'blue_modern';

  // Handle direct contenteditable changes safely
  const handleContentBlur = (path, value) => {
    const keys = path.split('.');
    updateResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const paperStyle = {
    fontFamily: styleSettings.fontFamily,
    fontSize: `${styleSettings.baseFontSizePx}px`,
    lineHeight: styleSettings.lineHeight,
    color: styleSettings.textColor || '#1e293b',
    paddingTop: `${styleSettings.paddingTopMm}mm`,
    paddingBottom: `${styleSettings.paddingBottomMm}mm`,
    paddingLeft: `${styleSettings.paddingLeftMm}mm`,
    paddingRight: `${styleSettings.paddingRightMm}mm`,
    marginLeft: `${styleSettings.leftIndentPx}px`,
    marginRight: `${styleSettings.rightIndentPx}px`,
    backgroundColor: '#ffffff'
  };

  const primaryColor = styleSettings.primaryColor || '#0f2b5c';
  const badgeBgColor = styleSettings.badgeBgColor || '#e8f0fe';

  // Section Header Component for Blue Modern Template
  const RenderModernSectionHeader = ({ icon: Icon, title, titlePath }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginTop: '6px',
      marginBottom: '6px'
    }}>
      <div style={{
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        backgroundColor: primaryColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
        flexShrink: 0
      }}>
        <Icon size={14} strokeWidth={2.2} />
      </div>

      <h2
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={e => titlePath && handleContentBlur(titlePath, e.target.innerText)}
        style={{
          fontSize: `${styleSettings.sectionTitleSizePx}px`,
          fontWeight: '800',
          color: primaryColor,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          margin: 0,
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </h2>

      <div style={{
        flex: 1,
        height: `${styleSettings.dividerThicknessPx}px`,
        backgroundColor: primaryColor,
        marginLeft: '12px'
      }} />
    </div>
  );

  // Classic Section Header Component
  const RenderClassicSectionHeader = ({ title, titlePath }) => (
    <div>
      <div style={{
        fontSize: `${styleSettings.sectionTitleSizePx}px`,
        fontWeight: styleSettings.boldSectionTitles ? '700' : '600',
        color: styleSettings.headingColor || primaryColor,
        letterSpacing: '0.2px'
      }}>
        <span
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={e => titlePath && handleContentBlur(titlePath, e.target.innerText)}
        >
          {title}
        </span>
      </div>
      <div style={{
        borderColor: styleSettings.dividerColor || primaryColor,
        borderBottomWidth: `${styleSettings.dividerThicknessPx}px`,
        borderBottomStyle: styleSettings.dividerStyle || 'solid',
        marginTop: '3px',
        marginBottom: `${styleSettings.itemSpacingPx}px`
      }} />
    </div>
  );

  const sectionContainerStyle = {
    marginBottom: `${styleSettings.sectionBottomMarginPx}px`
  };

  // ----------------------------------------------------
  // TEMPLATE 1: BLUE MODERN (USER REQUESTED TEMPLATE)
  // ----------------------------------------------------
  if (templateId === 'blue_modern') {
    return (
      <div
        ref={paperRef}
        id="resume-paper"
        className={`resume-paper-container ${styleSettings.pageSize.toLowerCase()}`}
        style={paperStyle}
      >
        {/* TOP HEADER SECTION */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingBottom: '12px',
          marginBottom: `${styleSettings.sectionBottomMarginPx}px`,
          borderBottom: `2px solid ${primaryColor}`
        }}>
          {/* Left Block: Name & Subtitles */}
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <h1
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('personalInfo.fullName', e.target.innerText)}
              style={{
                fontSize: `${styleSettings.headerNameSizePx}px`,
                fontWeight: '800',
                color: primaryColor,
                letterSpacing: '1px',
                lineHeight: 1.1,
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}
            >
              {personalInfo.fullName}
            </h1>

            {personalInfo.headline && (
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur('personalInfo.headline', e.target.innerText)}
                style={{
                  fontSize: `${styleSettings.headerSubsizePx}px`,
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '4px'
                }}
              >
                {personalInfo.headline}
              </div>
            )}

            {personalInfo.subHeadline && (
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur('personalInfo.subHeadline', e.target.innerText)}
                style={{
                  fontSize: `${styleSettings.metaFontSizePx}px`,
                  fontWeight: '500',
                  color: '#475569'
                }}
              >
                {personalInfo.subHeadline}
              </div>
            )}
          </div>

          {/* Right Block: Vertical Separator & Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: `${styleSettings.metaFontSizePx}px`,
            borderLeft: `1.5px solid ${primaryColor}`,
            paddingLeft: '16px',
            minWidth: '220px'
          }}>
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <Phone size={13} color={primaryColor} strokeWidth={2.2} />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.phone', e.target.innerText)}
                >
                  {personalInfo.phone}
                </span>
              </div>
            )}

            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <Mail size={13} color={primaryColor} strokeWidth={2.2} />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.email', e.target.innerText)}
                >
                  {personalInfo.email}
                </span>
              </div>
            )}

            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <MapPin size={13} color={primaryColor} strokeWidth={2.2} />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.location', e.target.innerText)}
                >
                  {personalInfo.location}
                </span>
              </div>
            )}

            {personalInfo.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <LinkedinIcon size={13} color={primaryColor} />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.linkedin', e.target.innerText)}
                >
                  {personalInfo.linkedin}
                </span>
              </div>
            )}

            {personalInfo.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                <GithubIcon size={13} color={primaryColor} />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.github', e.target.innerText)}
                >
                  {personalInfo.github}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CAREER OBJECTIVE / SUMMARY */}
        {summary && summary.content && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Target}
              title={summary.title || "CAREER OBJECTIVE"}
              titlePath="summary.title"
            />
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('summary.content', e.target.innerText)}
              style={{
                fontSize: `${styleSettings.bodyFontSizePx}px`,
                lineHeight: styleSettings.lineHeight,
                textAlign: 'justify',
                margin: 0,
                marginTop: '4px'
              }}
            >
              {summary.content}
            </p>
          </div>
        )}

        {/* EDUCATION */}
        {education && education.items && education.items.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={GraduationCap}
              title={education.title || "EDUCATION"}
              titlePath="education.title"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${styleSettings.itemSpacingPx}px`, marginTop: '4px' }}>
              {education.items.map((item, itemIdx) => (
                <div key={item.id || itemIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={e => handleContentBlur(`education.items.${itemIdx}.degree`, e.target.innerText)}
                      style={{ fontWeight: '700', fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#0f172a' }}
                    >
                      {item.degree}
                    </span>
                    {item.location && (
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`education.items.${itemIdx}.location`, e.target.innerText)}
                        style={{ fontSize: `${styleSettings.metaFontSizePx}px`, color: '#334155', fontWeight: '500' }}
                      >
                        {item.location}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#475569' }}>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={e => handleContentBlur(`education.items.${itemIdx}.institution`, e.target.innerText)}
                    >
                      {item.institution}
                    </span>
                    {item.details && (
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`education.items.${itemIdx}.details`, e.target.innerText)}
                        style={{ fontWeight: '600', color: '#0f172a' }}
                      >
                        {item.details}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TECHNICAL SKILLS BADGES GRID */}
        {skills && skills.categories && skills.categories.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Wrench}
              title={skills.title || "TECHNICAL SKILLS"}
              titlePath="skills.title"
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(skills.categories.length, 5)}, 1fr)`,
              gap: '12px',
              marginTop: '6px'
            }}>
              {skills.categories.map((cat, catIdx) => (
                <div key={cat.id || catIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Light Blue Pill Header matching screenshot */}
                  <div style={{
                    backgroundColor: badgeBgColor,
                    color: primaryColor,
                    fontWeight: '700',
                    fontSize: `${styleSettings.metaFontSizePx}px`,
                    padding: '3px 6px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    marginBottom: '6px',
                    lineHeight: 1.2
                  }}>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={e => handleContentBlur(`skills.categories.${catIdx}.label`, e.target.innerText)}
                    >
                      {cat.label}
                    </span>
                  </div>

                  {/* Bullet list of items under each skill badge */}
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                    {typeof cat.items === 'string'
                      ? cat.items.split(',').map((skillItem, sIdx) => (
                        <li key={sIdx} style={{
                          fontSize: `${styleSettings.bodyFontSizePx}px`,
                          marginBottom: '2px',
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '6px',
                          lineHeight: 1.3
                        }}>
                          <span style={{ fontSize: '10px', color: primaryColor }}>•</span>
                          <span>{skillItem.trim()}</span>
                        </li>
                      ))
                      : (
                        <li style={{ fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={e => handleContentBlur(`skills.categories.${catIdx}.items`, e.target.innerText)}
                          >
                            {cat.items}
                          </span>
                        </li>
                      )
                    }
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projects && projects.items && projects.items.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Laptop}
              title={projects.title || "PROJECTS"}
              titlePath="projects.title"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${styleSettings.itemSpacingPx}px`, marginTop: '4px' }}>
              {projects.items.map((proj, projIdx) => (
                <div key={proj.id || projIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`projects.items.${projIdx}.title`, e.target.innerText)}
                        style={{ fontWeight: '700', fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#0f172a' }}
                      >
                        {proj.title}
                      </span>
                      {proj.tech && (
                        <span style={{ fontStyle: 'italic', marginLeft: '6px', fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#475569' }}>
                          ({proj.tech})
                        </span>
                      )}
                    </div>
                    {proj.duration && (
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`projects.items.${projIdx}.duration`, e.target.innerText)}
                        style={{ fontSize: `${styleSettings.metaFontSizePx}px`, color: '#64748b' }}
                      >
                        ({proj.duration})
                      </span>
                    )}
                  </div>

                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '14px', marginTop: '3px', marginBottom: 0, listStyleType: 'none' }}>
                      {proj.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} style={{ position: 'relative', paddingLeft: '12px', fontSize: `${styleSettings.bodyFontSizePx}px`, marginBottom: '2px' }}>
                          <span style={{ position: 'absolute', left: 0, top: 0, color: primaryColor }}>{styleSettings.bulletCharacter}</span>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={e => handleContentBlur(`projects.items.${projIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP / TRAINING / EXPERIENCE */}
        {experience && experience.items && experience.items.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Briefcase}
              title={experience.title || "INTERNSHIP / TRAINING"}
              titlePath="experience.title"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${styleSettings.itemSpacingPx}px`, marginTop: '4px' }}>
              {experience.items.map((item, itemIdx) => (
                <div key={item.id || itemIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`experience.items.${itemIdx}.role`, e.target.innerText)}
                        style={{ fontWeight: '700', fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#0f172a' }}
                      >
                        {item.role}
                      </span>
                      {item.company && (
                        <span style={{ fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#334155' }}>
                          {' – '}
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={e => handleContentBlur(`experience.items.${itemIdx}.company`, e.target.innerText)}
                          >
                            {item.company}
                          </span>
                        </span>
                      )}
                    </div>
                    {item.duration && (
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`experience.items.${itemIdx}.duration`, e.target.innerText)}
                        style={{ fontSize: `${styleSettings.metaFontSizePx}px`, color: '#64748b' }}
                      >
                        ({item.duration})
                      </span>
                    )}
                  </div>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '14px', marginTop: '3px', marginBottom: 0, listStyleType: 'none' }}>
                      {item.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} style={{ position: 'relative', paddingLeft: '12px', fontSize: `${styleSettings.bodyFontSizePx}px`, marginBottom: '2px' }}>
                          <span style={{ position: 'absolute', left: 0, top: 0, color: primaryColor }}>{styleSettings.bulletCharacter}</span>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={e => handleContentBlur(`experience.items.${itemIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.items && certifications.items.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={FileText}
              title={certifications.title || "CERTIFICATIONS"}
              titlePath="certifications.title"
            />
            <ul style={{ paddingLeft: '14px', marginTop: '4px', marginBottom: 0, listStyleType: 'none' }}>
              {certifications.items.map((cert, certIdx) => (
                <li key={cert.id || certIdx} style={{ position: 'relative', paddingLeft: '12px', fontSize: `${styleSettings.bodyFontSizePx}px`, marginBottom: '3px' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, color: primaryColor }}>•</span>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`certifications.items.${certIdx}.title`, e.target.innerText)}
                    style={{ fontWeight: '700' }}
                  >
                    {cert.title}
                  </span>
                  {cert.issuer && (
                    <span>
                      {' – '}
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`certifications.items.${certIdx}.issuer`, e.target.innerText)}
                      >
                        {cert.issuer}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {achievements && achievements.bullets && achievements.bullets.length > 0 && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Trophy}
              title={achievements.title || "ACHIEVEMENTS"}
              titlePath="achievements.title"
            />
            <ul style={{ paddingLeft: '14px', marginTop: '4px', marginBottom: 0, listStyleType: 'none' }}>
              {achievements.bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx} style={{ position: 'relative', paddingLeft: '12px', fontSize: `${styleSettings.bodyFontSizePx}px`, marginBottom: '3px' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, color: primaryColor }}>•</span>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`achievements.bullets.${bulletIdx}`, e.target.innerText)}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SOFT SKILLS */}
        {softSkills && softSkills.items && (
          <div style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={User}
              title={softSkills.title || "SOFT SKILLS"}
              titlePath="softSkills.title"
            />
            <div
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('softSkills.items', e.target.innerText)}
              style={{
                fontSize: `${styleSettings.bodyFontSizePx}px`,
                fontWeight: '500',
                color: '#1e293b',
                marginTop: '4px'
              }}
            >
              {softSkills.items}
            </div>
          </div>
        )}

        {/* DYNAMIC CUSTOM SECTIONS */}
        {customSections && customSections.map((sec, secIdx) => (
          <div key={sec.id || secIdx} style={sectionContainerStyle}>
            <RenderModernSectionHeader
              icon={Award}
              title={sec.title}
              titlePath={`customSections.${secIdx}.title`}
            />
            {sec.type === 'bullets' && sec.bullets && sec.bullets.length > 0 ? (
              <ul style={{ paddingLeft: '14px', marginTop: '4px', marginBottom: 0, listStyleType: 'none' }}>
                {sec.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} style={{ position: 'relative', paddingLeft: '12px', fontSize: `${styleSettings.bodyFontSizePx}px`, marginBottom: '3px' }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: primaryColor }}>•</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={e => handleContentBlur(`customSections.${secIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur(`customSections.${secIdx}.content`, e.target.innerText)}
                style={{ fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#1e293b', marginTop: '4px' }}
              >
                {sec.content}
              </div>
            )}
          </div>
        ))}

        {/* DECLARATION BANNER BOX AT BOTTOM */}
        {declaration && declaration.show !== false && (
          <div style={{
            backgroundColor: badgeBgColor,
            borderRadius: '6px',
            padding: '10px 16px',
            marginTop: '16px',
            textAlign: 'center'
          }}>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('declaration.text', e.target.innerText)}
              style={{
                fontStyle: 'italic',
                fontSize: `${styleSettings.bodyFontSizePx}px`,
                color: primaryColor,
                fontWeight: '500',
                margin: 0
              }}
            >
              {declaration.text || "I hereby declare that the information provided above is true and correct to the best of my knowledge."}
            </p>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // TEMPLATE 2: CLASSIC STANDARD
  // ----------------------------------------------------
  return (
    <div
      ref={paperRef}
      id="resume-paper"
      className={`resume-paper-container ${styleSettings.pageSize.toLowerCase()}`}
      style={paperStyle}
    >
      {/* HEADER SECTION */}
      <div className="header-block text-center" style={{ marginBottom: `${styleSettings.sectionBottomMarginPx}px` }}>
        <h1
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={e => handleContentBlur('personalInfo.fullName', e.target.innerText)}
          style={{
            fontSize: `${styleSettings.headerNameSizePx}px`,
            fontWeight: styleSettings.boldName ? '800' : '600',
            letterSpacing: '1px',
            marginBottom: '4px',
            textTransform: 'uppercase',
            color: styleSettings.headingColor || primaryColor
          }}
        >
          {personalInfo.fullName}
        </h1>

        <div
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={e => handleContentBlur('personalInfo.headline', e.target.innerText)}
          style={{
            fontSize: `${styleSettings.headerSubsizePx}px`,
            fontWeight: '600',
            marginBottom: '6px',
            color: '#222'
          }}
        >
          {personalInfo.headline}
        </div>

        {/* Contact Info Row */}
        <div
          className="contact-row"
          style={{
            fontSize: `${styleSettings.metaFontSizePx}px`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            color: '#333'
          }}
        >
          {personalInfo.email && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {personalInfo.showIcons && <Mail size={13} style={{ strokeWidth: 2 }} />}
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur('personalInfo.email', e.target.innerText)}
              >
                {personalInfo.email}
              </span>
            </span>
          )}

          {personalInfo.phone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {personalInfo.showIcons && <Phone size={13} style={{ strokeWidth: 2 }} />}
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur('personalInfo.phone', e.target.innerText)}
              >
                {personalInfo.phone}
              </span>
            </span>
          )}

          {personalInfo.location && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {personalInfo.showIcons && <MapPin size={13} style={{ strokeWidth: 2 }} />}
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={e => handleContentBlur('personalInfo.location', e.target.innerText)}
              >
                {personalInfo.location}
              </span>
            </span>
          )}
        </div>

        {/* LinkedIn / Github row */}
        {(personalInfo.linkedin || personalInfo.github) && (
          <div
            style={{
              fontSize: `${styleSettings.metaFontSizePx}px`,
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              color: '#333'
            }}
          >
            {personalInfo.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {personalInfo.showIcons && <LinkedinIcon size={13} />}
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.linkedin', e.target.innerText)}
                >
                  {personalInfo.linkedin}
                </span>
              </span>
            )}
            {personalInfo.github && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {personalInfo.showIcons && <GithubIcon size={13} />}
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur('personalInfo.github', e.target.innerText)}
                >
                  {personalInfo.github}
                </span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* SUMMARY SECTION */}
      {summary && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={summary.title} titlePath="summary.title" />
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={e => handleContentBlur('summary.content', e.target.innerText)}
            style={{
              fontSize: `${styleSettings.bodyFontSizePx}px`,
              textAlign: 'justify',
              textJustify: 'inter-word'
            }}
          >
            {summary.content}
          </p>
        </div>
      )}

      {/* EXPERIENCE SECTION */}
      {experience && experience.items && experience.items.length > 0 && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={experience.title} titlePath="experience.title" />
          {experience.items.map((item, itemIdx) => (
            <div key={item.id || itemIdx} style={{ marginBottom: `${styleSettings.itemSpacingPx}px` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`experience.items.${itemIdx}.role`, e.target.innerText)}
                    style={{ fontWeight: styleSettings.boldItemTitles ? '700' : '600', fontSize: `${styleSettings.bodyFontSizePx}px` }}
                  >
                    {item.role}
                  </span>
                  {item.company && (
                    <span style={{ fontSize: `${styleSettings.bodyFontSizePx}px`, fontStyle: 'italic', marginLeft: '6px' }}>
                      , <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`experience.items.${itemIdx}.company`, e.target.innerText)}
                      >
                        {item.company}
                      </span>
                    </span>
                  )}
                </div>
                {item.duration && (
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`experience.items.${itemIdx}.duration`, e.target.innerText)}
                    style={{ fontSize: `${styleSettings.metaFontSizePx}px`, color: '#444' }}
                  >
                    {item.duration}
                  </span>
                )}
              </div>

              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ paddingLeft: `${styleSettings.bulletIndentPx}px`, marginTop: '3px', listStyleType: 'none' }}>
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      style={{
                        position: 'relative',
                        paddingLeft: '12px',
                        fontSize: `${styleSettings.bodyFontSizePx}px`,
                        marginBottom: '2px'
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, top: 0 }}>{styleSettings.bulletCharacter}</span>
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`experience.items.${itemIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION SECTION */}
      {education && education.items && education.items.length > 0 && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={education.title} titlePath="education.title" />
          {education.items.map((item, itemIdx) => (
            <div key={item.id || itemIdx} style={{ marginBottom: `${styleSettings.itemSpacingPx}px` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: styleSettings.boldItemTitles ? '700' : '600', fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`education.items.${itemIdx}.degree`, e.target.innerText)}
                  >
                    {item.degree}
                  </span>
                </div>
                {item.location && (
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`education.items.${itemIdx}.location`, e.target.innerText)}
                    style={{ fontSize: `${styleSettings.metaFontSizePx}px`, color: '#333' }}
                  >
                    {item.location}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontStyle: 'italic', fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`education.items.${itemIdx}.institution`, e.target.innerText)}
                >
                  {item.institution}
                </span>
                {item.details && (
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`education.items.${itemIdx}.details`, e.target.innerText)}
                    style={{ fontStyle: 'normal', fontWeight: '600', fontSize: `${styleSettings.metaFontSizePx}px` }}
                  >
                    {item.details}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TECHNICAL SKILLS SECTION */}
      {skills && skills.categories && skills.categories.length > 0 && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={skills.title} titlePath="skills.title" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {skills.categories.map((cat, catIdx) => (
              <div key={cat.id || catIdx} style={{ fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`skills.categories.${catIdx}.label`, e.target.innerText)}
                  style={{ fontWeight: '700', marginBottom: '1px' }}
                >
                  {cat.label}
                </div>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`skills.categories.${catIdx}.items`, e.target.innerText)}
                  style={{ color: '#222' }}
                >
                  {cat.items}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS SECTION */}
      {projects && projects.items && projects.items.length > 0 && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={projects.title} titlePath="projects.title" />
          {projects.items.map((proj, projIdx) => (
            <div key={proj.id || projIdx} style={{ marginBottom: `${styleSettings.itemSpacingPx}px` }}>
              <div style={{ fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`projects.items.${projIdx}.title`, e.target.innerText)}
                  style={{ fontWeight: styleSettings.boldItemTitles ? '700' : '600' }}
                >
                  {proj.title}
                </span>
                {proj.tech && (
                  <span style={{ fontStyle: 'italic', marginLeft: '6px' }}>
                    , <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={e => handleContentBlur(`projects.items.${projIdx}.tech`, e.target.innerText)}
                    >
                      {proj.tech}
                    </span>
                  </span>
                )}
              </div>

              {proj.bullets && proj.bullets.length > 0 && (
                <ul style={{ paddingLeft: `${styleSettings.bulletIndentPx}px`, marginTop: '3px', listStyleType: 'none' }}>
                  {proj.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      style={{
                        position: 'relative',
                        paddingLeft: '12px',
                        fontSize: `${styleSettings.bodyFontSizePx}px`,
                        marginBottom: '2px'
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, top: 0 }}>{styleSettings.bulletCharacter}</span>
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={e => handleContentBlur(`projects.items.${projIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS SECTION */}
      {certifications && certifications.items && certifications.items.length > 0 && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={certifications.title} titlePath="certifications.title" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {certifications.items.map((cert, certIdx) => (
              <div key={cert.id || certIdx} style={{ fontSize: `${styleSettings.bodyFontSizePx}px` }}>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`certifications.items.${certIdx}.title`, e.target.innerText)}
                  style={{ fontWeight: '700' }}
                >
                  {cert.title}
                </div>
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={e => handleContentBlur(`certifications.items.${certIdx}.issuer`, e.target.innerText)}
                  style={{ color: '#444', fontSize: `${styleSettings.metaFontSizePx}px` }}
                >
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVITIES SECTION */}
      {activities && (
        <div className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={activities.title} titlePath="activities.title" />
          <div
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={e => handleContentBlur('activities.content', e.target.innerText)}
            style={{ fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#222' }}
          >
            {activities.content}
          </div>
        </div>
      )}

      {/* DYNAMIC CUSTOM SECTIONS */}
      {customSections && customSections.map((sec, secIdx) => (
        <div key={sec.id || secIdx} className="section-block" style={sectionContainerStyle}>
          <RenderClassicSectionHeader title={sec.title} titlePath={`customSections.${secIdx}.title`} />
          {sec.type === 'bullets' && sec.bullets && sec.bullets.length > 0 ? (
            <ul style={{ paddingLeft: `${styleSettings.bulletIndentPx}px`, marginTop: '3px', listStyleType: 'none' }}>
              {sec.bullets.map((bullet, bulletIdx) => (
                <li
                  key={bulletIdx}
                  style={{
                    position: 'relative',
                    paddingLeft: '12px',
                    fontSize: `${styleSettings.bodyFontSizePx}px`,
                    marginBottom: '2px'
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, top: 0 }}>{styleSettings.bulletCharacter}</span>
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={e => handleContentBlur(`customSections.${secIdx}.bullets.${bulletIdx}`, e.target.innerText)}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur(`customSections.${secIdx}.content`, e.target.innerText)}
              style={{ fontSize: `${styleSettings.bodyFontSizePx}px`, color: '#222' }}
            >
              {sec.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
