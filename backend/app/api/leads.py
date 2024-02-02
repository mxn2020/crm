from flask import Blueprint, request, jsonify
from app import db
from app.models.lead import Lead

leads = Blueprint('leads', __name__)

@leads.route('/leads', methods=['POST'])
def create_lead():
    data = request.get_json()
    new_lead = Lead(name=data['name'], email=data['email'], status=data.get('status', 'new lead'))
    db.session.add(new_lead)
    db.session.commit()
    return jsonify({'message': 'Lead created successfully'}), 201

@leads.route('/leads', methods=['GET'])
def get_leads():
    leads_list = Lead.query.all()
    return jsonify([{'id': lead.id, 'name': lead.name, 'email': lead.email, 'status': lead.status} for lead in leads_list])

@leads.route('/leads/<int:lead_id>', methods=['PUT'])
def update_lead(lead_id):
    data = request.get_json()
    lead = Lead.query.get_or_404(lead_id)
    lead.name = data.get('name', lead.name)
    lead.email = data.get('email', lead.email)
    lead.status = data.get('status', lead.status)
    db.session.commit()
    return jsonify({'message': 'Lead updated successfully'})

@leads.route('/leads/<int:lead_id>', methods=['DELETE'])
def delete_lead(lead_id):
    lead = Lead.query.get_or_404(lead_id)
    db.session.delete(lead)
    db.session.commit()
    return jsonify({'message': 'Lead deleted successfully'})
