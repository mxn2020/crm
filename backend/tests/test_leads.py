import unittest
from app import create_app, db
from app.models.lead import Lead
from flask import json

class LeadTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()
        
        # Add a test lead
        lead = Lead(name="Test Lead", email="test@example.com")
        db.session.add(lead)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_leads(self):
        response = self.client.get('/api/leads')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('Test Lead' in response.get_data(as_text=True))

    def test_create_lead(self):
        response = self.client.post('/api/leads', json={'name': 'New Lead', 'email': 'new@example.com'})
        self.assertEqual(response.status_code, 201)
        self.assertTrue('Lead created successfully' in response.get_data(as_text=True))

    def test_update_lead(self):
        lead = Lead.query.first()
        response = self.client.put(f'/api/leads/{lead.id}', json={'name': 'Updated Name'})
        self.assertEqual(response.status_code, 200)
        self.assertTrue('Lead updated successfully' in response.get_data(as_text=True))

    def test_delete_lead(self):
        lead = Lead.query.first()
        response = self.client.delete(f'/api/leads/{lead.id}')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('Lead deleted successfully' in response.get_data(as_text=True))

if __name__ == '__main__':
    unittest.main()
