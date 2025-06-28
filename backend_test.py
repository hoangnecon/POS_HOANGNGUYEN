#!/usr/bin/env python3
import requests
import json
import os
import sys
from dotenv import load_dotenv
import time
from datetime import datetime
import uuid

# Load environment variables from frontend/.env to get the backend URL
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("ERROR: REACT_APP_BACKEND_URL not found in frontend/.env")
    sys.exit(1)

# Ensure the URL ends with /api for all API calls
API_URL = f"{BACKEND_URL}/api"
print(f"Using API URL: {API_URL}")

def test_server_status():
    """Test if the server is running and responding to requests"""
    try:
        response = requests.get(f"{API_URL}/")
        if response.status_code == 200:
            print("✅ Server is running and responding to requests")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Server returned status code {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to server: {e}")
        return False

def test_status_endpoint():
    """Test the status endpoint for creating and retrieving status checks"""
    # Test POST /api/status
    try:
        client_name = f"Test Client {uuid.uuid4()}"
        post_data = {"client_name": client_name}
        response = requests.post(f"{API_URL}/status", json=post_data)
        
        if response.status_code == 200:
            print("✅ Successfully created status check")
            status_check = response.json()
            print(f"Created status check: {json.dumps(status_check, indent=2)}")
            
            # Verify the response contains the expected fields
            if "id" in status_check and "client_name" in status_check and "timestamp" in status_check:
                print("✅ Status check response contains all expected fields")
            else:
                print("❌ Status check response is missing expected fields")
                print(f"Expected fields: id, client_name, timestamp")
                print(f"Actual response: {status_check}")
                return False
                
            # Verify the client_name matches what we sent
            if status_check["client_name"] == client_name:
                print("✅ Client name in response matches what was sent")
            else:
                print("❌ Client name in response does not match what was sent")
                print(f"Expected: {client_name}")
                print(f"Actual: {status_check['client_name']}")
                return False
        else:
            print(f"❌ Failed to create status check: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to server for POST /api/status: {e}")
        return False
    
    # Test GET /api/status
    try:
        response = requests.get(f"{API_URL}/status")
        
        if response.status_code == 200:
            print("✅ Successfully retrieved status checks")
            status_checks = response.json()
            print(f"Retrieved {len(status_checks)} status checks")
            
            # Verify we got a list of status checks
            if isinstance(status_checks, list):
                print("✅ Status checks response is a list")
                
                # Verify at least one status check exists
                if len(status_checks) > 0:
                    print("✅ At least one status check exists")
                    
                    # Verify the first status check has the expected fields
                    first_check = status_checks[0]
                    if "id" in first_check and "client_name" in first_check and "timestamp" in first_check:
                        print("✅ First status check contains all expected fields")
                    else:
                        print("❌ First status check is missing expected fields")
                        print(f"Expected fields: id, client_name, timestamp")
                        print(f"Actual response: {first_check}")
                        return False
                else:
                    print("⚠️ No status checks found, but endpoint works")
            else:
                print("❌ Status checks response is not a list")
                print(f"Expected a list, got: {type(status_checks)}")
                return False
        else:
            print(f"❌ Failed to retrieve status checks: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to server for GET /api/status: {e}")
        return False
    
    return True

def test_cors_configuration():
    """Test if CORS is properly configured"""
    try:
        # Create headers with Origin to trigger CORS
        headers = {
            'Origin': 'http://example.com',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        # Send a GET request with Origin header to check CORS headers
        response = requests.get(f"{API_URL}/", headers=headers)
        
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        
        # Check if the CORS headers are present
        if 'Access-Control-Allow-Origin' in response.headers:
            print("✅ CORS is properly configured")
            print(f"Access-Control-Allow-Origin: {response.headers['Access-Control-Allow-Origin']}")
            return True
        else:
            print("❌ CORS headers not found in response")
            print(f"Response headers: {dict(response.headers)}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to server for CORS test: {e}")
        return False

def run_all_tests():
    """Run all tests and return overall status"""
    print("=" * 50)
    print("TESTING CASHAA POS BACKEND API")
    print("=" * 50)
    print(f"Testing backend at: {API_URL}")
    print("=" * 50)
    
    # Run all tests
    server_status = test_server_status()
    print("\n" + "=" * 50)
    
    if not server_status:
        print("❌ Server is not responding, skipping remaining tests")
        return False
    
    status_endpoint = test_status_endpoint()
    print("\n" + "=" * 50)
    
    cors_config = test_cors_configuration()
    print("\n" + "=" * 50)
    
    # Print overall results
    print("OVERALL TEST RESULTS:")
    print(f"Server Status: {'✅ PASS' if server_status else '❌ FAIL'}")
    print(f"Status Endpoint: {'✅ PASS' if status_endpoint else '❌ FAIL'}")
    print(f"CORS Configuration: {'✅ PASS' if cors_config else '❌ FAIL'}")
    
    # Return overall status
    return server_status and status_endpoint and cors_config

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)