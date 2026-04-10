import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://mini-crm-task-production.up.railway.app/api/leads";

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', source: 'Website', status: 'New', service: 'General Consultation' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLead = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Please fill details");
    try {
      await axios.post(API_URL, formData);
      fetchLeads();
      setFormData({ name: '', email: '', source: 'Website', status: 'New', service: 'General Consultation' });
    } catch (error) {
      alert("Error adding lead.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const addNote = async (id) => {
    const noteText = prompt("Enter a follow-up note:");
    if (noteText) {
      try {
        await axios.put(`${API_URL}/${id}`, { $push: { notes: noteText } });
        alert("Note saved!");
        fetchLeads();
      } catch (error) {
        console.error("Error saving note:", error);
      }
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("Delete this lead permanently?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchLeads();
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Client Lead Manager</h1>

      {/* --- FORM SECTION (Now includes Service) --- */}
      <div className="card form-card">
        <h2 className="section-label">Add New Lead</h2>
        <form onSubmit={addLead} className="lead-form">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <select name="service" value={formData.service} onChange={handleInputChange}>
            <option value="General Consultation">General Consultation</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Braces">Braces</option>
            <option value="Root Canal">Root Canal</option>
          </select>
          <select name="source" value={formData.source} onChange={handleInputChange}>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Clinic Website">Clinic Website</option>
          </select>
          <button type="submit" className="btn-add">Add Lead</button>
        </form>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="card table-card">
        <table className="lead-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email & Notes</th>
              <th>Service</th> {/* ADDED THIS */}
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'40px', color:'gray'}}>No leads found.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td style={{fontWeight: 'bold'}}>{lead.name}</td>
                  
                  <td className="p-4">
                    <div style={{color: '#334155'}}>{lead.email}</div>
                    {lead.notes && lead.notes.length > 0 && (
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', fontStyle: 'italic', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                        📝 {lead.notes[lead.notes.length - 1]}
                      </div>
                    )}
                  </td>

                  {/* ADDED THIS TD FOR SERVICE */}
                  <td><span className="source-badge" style={{background: '#e0f2fe', color: '#0369a1'}}>{lead.service || 'N/A'}</span></td>

                  <td><span className="source-badge">{lead.source}</span></td>
                  
                  <td>
                    <select 
                      className={`status-select ${lead.status.toLowerCase()}`}
                      value={lead.status} 
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>

                  <td>
                    <button onClick={() => addNote(lead._id)} className="btn-note">Note</button>
                    <button onClick={() => deleteLead(lead._id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManager;