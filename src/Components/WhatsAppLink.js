import React from 'react';

function WhatsAppLink() {
    return (
        <div className="d-flex justify-content-center" style={{ minHeight: '100vh', alignItems: 'flex-start', paddingTop: '20vh' }}>
            <a
                href="https://wa.me/972532246612?text=שלום%20אני%20מעוניין%20לשאול%20שאלה%20על%20המוצר"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
                style={{ fontSize: '16px', padding: '12px 30px' }}
            >
                Click here to chat on WhatsApp
            </a>
        </div>
    );
}

export default WhatsAppLink;
