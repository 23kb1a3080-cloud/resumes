import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const LinkedinIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function ResumePaper({
  resumeData,
  styleSettings,
  updateResumeData,
  isEditing = true,
  paperRef
}) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, activities } = resumeData;

  // Handle direct contenteditable changes safely
  const handleContentBlur = (path, value) => {
    const keys = path.split('.');
    updateResumeData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
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
    color: styleSettings.textColor,
    paddingTop: `${styleSettings.paddingTopMm}mm`,
    paddingBottom: `${styleSettings.paddingBottomMm}mm`,
    paddingLeft: `${styleSettings.paddingLeftMm}mm`,
    paddingRight: `${styleSettings.paddingRightMm}mm`,
    marginLeft: `${styleSettings.leftIndentPx}px`,
    marginRight: `${styleSettings.rightIndentPx}px`,
  };

  const dividerStyle = {
    borderColor: styleSettings.dividerColor,
    borderBottomWidth: `${styleSettings.dividerThicknessPx}px`,
    borderBottomStyle: styleSettings.dividerStyle,
    marginTop: '3px',
    marginBottom: `${styleSettings.itemSpacingPx}px`
  };

  const sectionHeadingStyle = {
    fontSize: `${styleSettings.sectionTitleSizePx}px`,
    fontWeight: styleSettings.boldSectionTitles ? '700' : '500',
    color: styleSettings.headingColor,
    textTransform: 'none',
    letterSpacing: '0.2px'
  };

  const sectionContainerStyle = {
    marginBottom: `${styleSettings.sectionBottomMarginPx}px`
  };

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
            color: styleSettings.headingColor
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

        {/* LinkedIn / Website row */}
        {personalInfo.linkedin && (
          <div
            style={{
              fontSize: `${styleSettings.metaFontSizePx}px`,
              marginTop: '3px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              color: '#333'
            }}
          >
            {personalInfo.showIcons && <LinkedinIcon size={13} />}
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('personalInfo.linkedin', e.target.innerText)}
            >
              {personalInfo.linkedin}
            </span>
          </div>
        )}
      </div>

      {/* SUMMARY SECTION */}
      {summary && (
        <div className="section-block" style={sectionContainerStyle}>
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('summary.title', e.target.innerText)}
            >
              {summary.title}
            </span>
          </div>
          <div style={dividerStyle} />
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('experience.title', e.target.innerText)}
            >
              {experience.title}
            </span>
          </div>
          <div style={dividerStyle} />
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

              {/* Bullet points */}
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('education.title', e.target.innerText)}
            >
              {education.title}
            </span>
          </div>
          <div style={dividerStyle} />
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('skills.title', e.target.innerText)}
            >
              {skills.title}
            </span>
          </div>
          <div style={dividerStyle} />

          {/* 2-Column Grid Layout matching screenshot */}
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('projects.title', e.target.innerText)}
            >
              {projects.title}
            </span>
          </div>
          <div style={dividerStyle} />
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

              {/* Project Bullets */}
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('certifications.title', e.target.innerText)}
            >
              {certifications.title}
            </span>
          </div>
          <div style={dividerStyle} />
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
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur('activities.title', e.target.innerText)}
            >
              {activities.title}
            </span>
          </div>
          <div style={dividerStyle} />
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
      {resumeData.customSections && resumeData.customSections.map((sec, secIdx) => (
        <div key={sec.id || secIdx} className="section-block" style={sectionContainerStyle}>
          <div style={sectionHeadingStyle}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={e => handleContentBlur(`customSections.${secIdx}.title`, e.target.innerText)}
            >
              {sec.title}
            </span>
          </div>
          <div style={dividerStyle} />
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
