const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, default: 'Website' },
    // This is the new field for the Clinic Website
    service: { type: String, default: 'General Consultation' }, 
    status: { type: String, enum: ['New', 'Contacted', 'Converted'], default: 'New' },
    notes: { type: [String], default: [] }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);