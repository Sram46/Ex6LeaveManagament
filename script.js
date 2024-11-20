document.getElementById('leaveForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from the form
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;
    const yourName = document.getElementById('yourName').value;
    const managerName = document.getElementById('managerName').value;

    // Validate leave balance (simplified for demo)
    let leaveDays = 1; // Assume 1 day leave for simplicity
    const currentBalance = parseInt(document.getElementById(leaveType.toLowerCase().replace(' ', '')).innerText);
    
    if (currentBalance >= leaveDays) {
        // Create leave letter for confirmation
        const leaveLetter = `
            <p><strong>From:</strong> ${yourName}</p>
            <p><strong>To:</strong> ${managerName}</p>
            <p><strong>Subject:</strong> Leave Request for ${leaveType}</p>
            <p>Dear ${managerName},</p>
            <p>I am writing to formally request ${leaveType} from ${startDate} to ${endDate}. Reason: ${reason}.</p>
            <p>Thank you for considering my request.</p>
            <p>Sincerely,<br>${yourName}</p>
        `;
        
        // Show confirmation
        document.getElementById('leaveLetter').innerHTML = leaveLetter;
        document.getElementById('confirmation').style.display = 'block';
        document.getElementById('leaveForm').reset();
    } else {
        alert(`Insufficient leave balance for ${leaveType}.`);
    }
});

// Handle confirmation
document.getElementById('confirmButton').addEventListener('click', function() {
    const leaveType = document.getElementById('leaveType').value;
    const leaveDays = 1; // Assume 1 day leave for simplicity

    // Update leave balance
    const currentBalance = parseInt(document.getElementById(leaveType.toLowerCase().replace(' ', '')).innerText);
    document.getElementById(leaveType.toLowerCase().replace(' ', '')).innerText = currentBalance - leaveDays;

    // Add leave request to the list
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;
    
    const requestItem = document.createElement('li');
    requestItem.textContent = `${leaveType} from ${startDate} to ${endDate} (Reason: ${reason})`;
    document.getElementById('requestsList').appendChild(requestItem);

    // Hide confirmation
    document.getElementById('confirmation').style.display = 'none';
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('confirmation').style.display = 'none';
});
