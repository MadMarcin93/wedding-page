// Google Apps Script for RSVP Form Submission
// Paste this code into Google Apps Script (Extensions → Apps Script in your Google Sheet)

// Replace with your Google Sheet ID (found in the URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

function doPost(e) {
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.guests || '',
      data.attending || '',
      data.dietary || '',
      data.timestamp || new Date().toISOString()
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function test() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    guests: '2',
    attending: 'Yes',
    dietary: 'Vegetarian',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

