// Package Sent JS
const formInfo = new URLSearchParams(window.location.search);
document.querySelector('#submission_details').innerHTML = `
    <strong>Submitted On:</strong> ${new Date(parseInt(formInfo.get('formSubmittedOn'))).toLocaleString()}</p>
    <strong>Contact Name:</strong> ${formInfo.get('firstName')} ${formInfo.get('lastName')}<br>
    <strong>Email Address:</strong> ${formInfo.get('emailAddress')}<br>
    <strong>Phone #:</strong> ${formInfo.get('mobileNumber')}<br>
    <strong>Missionary Name:</strong> ${formInfo.get('missionaryName')}<br>
    <strong>Mission:</strong> ${formInfo.get('mission')}<br>
    <strong>Tracking #:</strong> ${formInfo.get('trackingNumber')}<br>
`;