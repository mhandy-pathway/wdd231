const formInfo = new URLSearchParams(window.location.search);
document.querySelector('#submission-details').innerHTML = `
    <p><strong>Submitted On:</strong> ${new Date(parseInt(formInfo.get('formSubmittedOn'))).toLocaleString()}</p>
    <p><strong>Name:</strong> ${formInfo.get('firstName')} ${formInfo.get('lastName')}</p>
    <p><strong>Title:</strong> ${formInfo.get('organizationTitle')}</p>
    <p><strong>Email:</strong> ${formInfo.get('emailAddress')}</p>
    <p><strong>Mobile #:</strong> ${formInfo.get('mobileNumber')}</p>
    <p><strong>Organziation Name:</strong> ${formInfo.get('organizationName')}</p>
    <p><strong>Organization Description:</strong> ${formInfo.get('organizationDescription')}</p>
    <p><strong>Membership Level:</strong> ${formInfo.get('membershipLevel')}</p>
`;