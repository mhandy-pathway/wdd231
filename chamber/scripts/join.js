// Set Submitted On Date
const submittedOnInput = document.querySelector('#submitted-on');
submittedOnInput.value = Date.now();

// Add Events to Membership Level Buttons
document.querySelector('#np-button').addEventListener('click', event => displayMembershipLevelInformation('np'));
document.querySelector('#bronze-button').addEventListener('click', event => displayMembershipLevelInformation('bronze'));
document.querySelector('#silver-button').addEventListener('click', event => displayMembershipLevelInformation('silver'));
document.querySelector('#gold-button').addEventListener('click', event => displayMembershipLevelInformation('gold'));

// Add Events to Membership Level Sections for Showing Post Animation
document.querySelectorAll('section.membership-level').forEach(section => {
    section.addEventListener('animationend', () => {
        section.classList.add('show');
    });
})

// MemberShip Level Dialog
const membershipLevelDetails = {
    np: {
        name: "Non-Profit",
        description: "This membership level is for non-profit organizations and provides all of the benefits of bronze and silver membership plus some of the benefits of gold membership, all for free.",
        monthly_price: 0,
        annual_price: 0,
        benefits: [ 'Listing in the Business Directory', 'Search Engine Placement', 'Featured Posting on the Chamber\'s Home Page', 'Monthly Consultation with Business Advisors'],
    },
    bronze: {
        name: "Bronze",
        description: "The bronze membership level is our free level for all businesses and provides listing in the business directory without any featured postings.",
        monthly_price: 0,
        annual_price: 0,
        benefits: [  'Listing in the Business Directory', 'Search Engine Placement' ],
    },
    silver: {
        name: "Silver",
        description: "The silver membership level provides the bronze benefits plus gives you a featured posting on the chamber's home page.",
        monthly_price: 10,
        annual_price: 99,
        benefits: [  'Listing in the Business Directory', 'Search Engine Placement', 'Featured Posting on the Chamber\'s Home Page' ],
    },
    gold: {
        name: "Gold",
        description: "The gold membership level is for businesses that want to invest in their own growth. Members receive access to bronze and silver benefits plus access to professional business advisors and AI tools that will help their business to grow.",
        monthly_price: 20,
        annual_price: 175,
        benefits: [  'Listing in the Business Directory', 'Search Engine Placement', 'Featured Posting on the Chamber\'s Home Page', 'Monthly Consultation with Business Advisors', 'AI Tools to Improve your Website and Business'],
    },
}
const membershipLevelDialog = document.querySelector('#membership-level-dialog');
const membershipLevelDialogH2 = document.querySelector('#membership-level-dialog>h2');
const membershipLevelDialogBody = document.querySelector('#membership-level-dialog>div');
const membershipLevelDialogButton = document.querySelector('#membership-level-dialog-button');
membershipLevelDialogButton.addEventListener('click', event => {
    membershipLevelDialog.close();
});

function displayMembershipLevelInformation(membership_level) {
    const data = membershipLevelDetails[membership_level];
    membershipLevelDialogH2.innerHTML = `${data.name} Membership Level`;
    membershipLevelDialogBody.innerHTML = `
        <p>${data.description}</p>
        <p class="price">${(data.annual_price === 0 ? '<strong>FREE</strong>' : `<strong>Monthly Price:</strong> $${data.monthly_price}.00 | <strong>Annual Price:</strong> $${data.annual_price}.00`)}</p>
        <p><strong>Benefits:</strong></p>
        <ul>
            ${data.benefits.map(e => `<li>✓ ${e}</li>`).join('\n')}
        </ul>
    `;
    membershipLevelDialog.showModal();
}
