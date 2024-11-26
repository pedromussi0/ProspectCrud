from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Lead
from .serializers import LeadSerializer

class LeadModelTest(TestCase):
    def setUp(self):
        self.lead_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '1234567890',
            'whatsapp': '9876543210',
            'facebook': 'johndoe'
        }
        self.lead = Lead.objects.create(**self.lead_data)

    def test_lead_creation(self):
        self.assertTrue(isinstance(self.lead, Lead))
        self.assertEqual(self.lead.__str__(), self.lead.name)

class LeadSerializerTest(TestCase):
    def setUp(self):
        self.lead_data = {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'phone': '9876543210',
            'whatsapp': '1234567890',
            'facebook': 'janedoe'
        }
        self.serializer = LeadSerializer(data=self.lead_data)

    def test_serializer_with_valid_data(self):
        self.assertTrue(self.serializer.is_valid())

    def test_serializer_with_invalid_data(self):
        invalid_data = self.lead_data.copy()
        invalid_data['email'] = 'invalid-email'
        serializer = LeadSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

class LeadViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.lead_data = {
            'name': 'Alice Smith',
            'email': 'alice@example.com',
            'phone': '1122334455',
            'whatsapp': '5544332211',
            'facebook': 'alicesmith'
        }
        self.lead = Lead.objects.create(**self.lead_data)
        self.list_url = reverse('lead-list-create')
        self.detail_url = reverse('lead-detail', kwargs={'pk': self.lead.pk})

    def test_get_all_leads(self):
        response = self.client.get(self.list_url)
        leads = Lead.objects.all()
        serializer = LeadSerializer(leads, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_lead(self):
        new_lead_data = {
            'name': 'Bob Johnson',
            'email': 'bob@example.com',
            'phone': '9988776655',
            'whatsapp': '5566778899',
            'facebook': 'bobjohnson'
        }
        response = self.client.post(self.list_url, new_lead_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Lead.objects.count(), 2)

    def test_get_single_lead(self):
        response = self.client.get(self.detail_url)
        lead = Lead.objects.get(pk=self.lead.pk)
        serializer = LeadSerializer(lead)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_lead(self):
        updated_data = {
            'name': 'Alice Johnson',
            'email': 'alice.johnson@example.com',
            'phone': '9988776655',
            'whatsapp': '5566778899',
            'facebook': 'alicejohnson'
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.lead.refresh_from_db()
        self.assertEqual(self.lead.name, 'Alice Johnson')

    def test_delete_lead(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Lead.objects.count(), 0)
