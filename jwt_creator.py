import jwt
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')

payload = {
    'iat': datetime.datetime.utcnow(),
    'usuario': 'test_user',
    "phone_number": "1234567890",
    "secure_key": "mi_clave_secreta",
    "event_data": "BEGIN:VEVENT\nSUMMARY:Evento de prueba\nDTSTART:20250127T120000Z\nDTEND:20250127T130000Z\nEND:VEVENT"
}

token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
print(token)
