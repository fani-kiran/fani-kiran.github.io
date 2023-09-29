if ('contacts' in navigator) {
    // Contacts API is supported
    document.querySelector('.add-contact-button').style.display = 'block';
    document.getElementById('addToContacts').addEventListener('click', function () {
        // Add to Contacts button functionality
        const contactData = {
            name: 'Your Name',
            mobile: 'Your Mobile Number',
            email: 'Your Email Address'
        };

        navigator.contacts.select(['name', 'phoneNumbers', 'emails'], function (contacts) {
            var contact = contacts.create();
            contact.name = new ContactName({ formatted: contactData.name });
            contact.phoneNumbers = [new ContactField('mobile', contactData.mobile)];
            contact.emails = [new ContactField('email', contactData.email)];

            contact.save(function () {
                alert('Contact saved successfully!');
            });
        }, function (error) {
            console.error('Error adding contact: ' + error);
        });
    });
} else {
    // Contacts API is not supported
    document.querySelector('.download-vcard-button').style.display = 'block';
    document.getElementById('downloadVCard').addEventListener('click', function () {
        // Download VCard button functionality
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Your Name
ORG:Your Organization
TEL:Your Mobile Number
EMAIL:Your Email Address
END:VCARD
        `;

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'your-contact.vcf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
}
