// Utility functions for Gmail, Calendar, and PDF actions

/**
 * Open Gmail compose window with pre-filled email content
 * @param {string} subject - Email subject
 * @param {string} body - Email body content
 * @param {string} to - Recipient email (optional)
 */
export const openGmailCompose = (subject, body, to = '') => {
  try {
    // Encode the email content for URL parameters
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const encodedTo = encodeURIComponent(to);
    
    // Construct Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1${
      to ? `&to=${encodedTo}` : ''
    }&su=${encodedSubject}&body=${encodedBody}`;
    
    // Open in new window/tab
    window.open(gmailUrl, '_blank', 'width=800,height=600');
    
    return { success: true };
  } catch (error) {
    console.error('Error opening Gmail:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate calendar invite link and options
 * @param {Object} meetingDetails - Meeting details
 */
export const generateCalendarInvite = (meetingDetails) => {
  try {
    const {
      title = 'Interview Meeting',
      description = '',
      startDate,
      endDate,
      location = 'Video Call'
    } = meetingDetails;
    
    // Format dates for Google Calendar
    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    // Generate Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    
    // Generate Outlook Calendar URL
    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    
    // Generate ICS file content
    const icsContent = generateICSFile(title, description, startDate, endDate, location);
    
    return {
      success: true,
      googleCalendarUrl,
      outlookCalendarUrl,
      icsContent,
      icsBlob: new Blob([icsContent], { type: 'text/calendar' })
    };
  } catch (error) {
    console.error('Error generating calendar invite:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate ICS file content
 */
const generateICSFile = (title, description, startDate, endDate, location) => {
  const formatDateForICS = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const uid = `${Date.now()}@ai-hiring-app.com`;
  const dtstamp = formatDateForICS(new Date());
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AI Hiring App//Calendar Event//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
};

/**
 * Download ICS file
 */
export const downloadICSFile = (icsBlob, filename = 'interview-meeting.ics') => {
  const url = URL.createObjectURL(icsBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Open calendar application based on user preference
 */
export const openCalendarApp = (calendarType, meetingDetails) => {
  const { googleCalendarUrl, outlookCalendarUrl } = generateCalendarInvite(meetingDetails);
  
  if (!googleCalendarUrl.success) {
    throw new Error('Failed to generate calendar invite');
  }
  
  switch (calendarType) {
    case 'google':
      window.open(googleCalendarUrl, '_blank');
      break;
    case 'outlook':
      window.open(outlookCalendarUrl, '_blank');
      break;
    case 'download':
      downloadICSFile(generateCalendarInvite(meetingDetails).icsBlob);
      break;
    default:
      window.open(googleCalendarUrl, '_blank');
  }
};

/**
 * Generate and download PDF from candidate analysis
 * @param {Object} candidateData - Complete candidate analysis data
 * @param {string} filename - PDF filename
 */
export const exportToPDF = async (candidateData, filename = 'candidate-analysis.pdf') => {
  try {
    // Dynamic import to avoid SSR issues
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;
    
    // Create PDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;
    
    // Add title
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.text('Candidate Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Add candidate name and overall score
    pdf.setFontSize(16);
    pdf.text(`Candidate: ${candidateData.name || 'N/A'}`, 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(14);
    pdf.text(`Overall Score: ${candidateData.overallScore || 'N/A'}%`, 20, yPosition);
    yPosition += 15;
    
    // Add analysis sections
    const sections = [
      { title: 'Skills Analysis', content: candidateData.skillsAnalysis },
      { title: 'Experience Summary', content: candidateData.experienceSummary },
      { title: 'Strengths', content: candidateData.strengths },
      { title: 'Areas for Improvement', content: candidateData.improvements },
      { title: 'Recommendations', content: candidateData.recommendations }
    ];
    
    pdf.setFont(undefined, 'normal');
    
    for (const section of sections) {
      if (section.content) {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Add section title
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.text(section.title, 20, yPosition);
        yPosition += 8;
        
        // Add section content
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(10);
        
        // Split text to fit page width
        const lines = pdf.splitTextToSize(section.content, pageWidth - 40);
        
        for (const line of lines) {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(line, 20, yPosition);
          yPosition += 5;
        }
        
        yPosition += 10;
      }
    }
    
    // Add skills scores if available
    if (candidateData.skills && candidateData.skills.length > 0) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('Skills Breakdown', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      
      candidateData.skills.forEach(skill => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(`${skill.name}: ${skill.score}%`, 25, yPosition);
        yPosition += 5;
      });
    }
    
    // Add footer with timestamp
    const timestamp = new Date().toLocaleString();
    pdf.setFontSize(8);
    pdf.text(`Generated on: ${timestamp}`, 20, pageHeight - 10);
    pdf.text('AI Hiring Analysis Platform', pageWidth - 20, pageHeight - 10, { align: 'right' });
    
    // Save the PDF
    pdf.save(filename);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate PDF from HTML element (alternative method)
 * @param {HTMLElement} element - DOM element to convert to PDF
 * @param {string} filename - PDF filename
 */
export const exportElementToPDF = async (element, filename = 'candidate-analysis.pdf') => {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    // Convert HTML element to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);
    return { success: true, filename };
  } catch (error) {
    console.error('Error exporting element to PDF:', error);
    return { success: false, error: error.message };
  }
};
