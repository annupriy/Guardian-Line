import hashlib
 

def hash_aadhar(aadhar_number):
    
    aadhar_bytes = aadhar_number.encode('utf-8')
    
   
    hashed_aadhar = hashlib.sha256(aadhar_bytes).hexdigest()
    
    return hashed_aadhar

# Example Aadhar number
aadhar_number = "123456789012"


hashed_aadhar = hash_aadhar(aadhar_number)

print("Hashed Aadhar number:", hashed_aadhar)
