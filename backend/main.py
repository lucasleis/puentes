import os
import jwt
import datetime
from flask import Flask, request, jsonify
from dotenv import load_dotenv

import logging
FORMAT = '%(asctime)s | %(levelname)s | %(filename)s | %(funcName)s | %(lineno)d | %(message)s'
logging.basicConfig(format=FORMAT)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


load_dotenv()

app = Flask(__name__)

SECRET_KEY = os.getenv('SECRET_KEY')

# Simulación de base de datos en memoria
calendarios_vinculados = {}
eventos = {}

def validar_jwt(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        
        # Validar que 'iat' esté presente y no esté expirado
        iat = decoded_token.get('iat')
        if not iat:
            return False, "Falta el campo 'iat' en el JWT"
        
        if datetime.datetime.fromtimestamp(iat) < datetime.datetime.utcnow() - datetime.timedelta(days=1):
            return False, "El JWT tiene un 'iat' expirado"
        
        return True, decoded_token

    except jwt.ExpiredSignatureError:
        return False, "El token ha expirado"
    except jwt.InvalidTokenError:
        return False, "Token inválido"


def validate_and_get_data(request):
    token = request.headers.get('Authorization')
    if not token:
        logger.error("Falta el token de autorización")
        return False

    try:
        token = token.split(" ")[1]  # Extraemos el token (después de "Bearer")
    except IndexError:
        logger.error("El formato del token no es válido. Debe ser 'Bearer <token>'")
        return False
    
    es_valido, resultado = validar_jwt(token)
    if es_valido:
        logger.debug(f"Token válido: {resultado}")
        return True, resultado
    else:
        logger.error(f"Token inválido: {resultado}")
        return False, ""


@app.route('/link', methods=['POST'])
def vincular_calendario():
    status, resultado = validate_and_get_data(request)
    if status:
        phone_number = resultado.get('phone_number')
        secure_key = resultado.get('secure_key')
        #logger.debug(f"phone_number: {phone_number}")
        #logger.debug(f"secure_key: {secure_key}")

        if not phone_number or not secure_key:
            return jsonify({"error": "Faltan parámetros"}), 400

        # Vincular el teléfono con el calendario
        calendarios_vinculados[phone_number] = {"secure_key": secure_key}

        return jsonify({"mensaje": f"Calendario vinculado al número {phone_number} exitosamente"}), 200
    else:
        return jsonify({"error": "Token de autorización inválido"}), 401


@app.route('/link', methods=['DELETE'])
def desvincular_calendario():
    status, resultado = validate_and_get_data(request)
    if status:
        #print(f"resultado: {resultado} \n")
        phone_number = resultado.get('phone_number')
        secure_key = resultado.get('secure_key')
        
        if not phone_number or not secure_key:
            return jsonify({"error": "Faltan parámetros"}), 400

        # Validación de existencia
        if phone_number not in calendarios_vinculados or calendarios_vinculados[phone_number]['secure_key'] != secure_key:
            return jsonify({"error": "El número de teléfono o la clave de seguridad no coinciden"}), 400

        # Desvincular el teléfono
        del calendarios_vinculados[phone_number]

        return jsonify({"mensaje": f"Calendario desvinculado del número {phone_number} exitosamente"}), 200
    else:
        return jsonify({"error": "Token de autorización inválido"}), 401


@app.route('/events', methods=['POST'])
def crear_evento():
    status, resultado = validate_and_get_data(request)
    if status:
        phone_number = resultado.get('phone_number')
        secure_key = resultado.get('secure_key')
        event_data = resultado.get('event_data')

        if not phone_number or not secure_key or not event_data:
            return jsonify({"error": "Faltan parámetros"}), 400

        # Validar que el teléfono esté vinculado
        if phone_number not in calendarios_vinculados or calendarios_vinculados[phone_number]['secure_key'] != secure_key:
            return jsonify({"error": "El número de teléfono o la clave de seguridad no coinciden"}), 400

        # Crear un ID único para el evento
        event_id = str(len(eventos) + 1)
        eventos[event_id] = {"phone_number": phone_number, "event_data": event_data}

        return jsonify({"mensaje": "Evento creado exitosamente", "event_id": event_id}), 201
    
    else:
        return jsonify({"error": "Token de autorización inválido"}), 401

@app.route('/events/<event_id>', methods=['PUT'])
def modificar_evento(event_id):
    status, resultado = validate_and_get_data(request)
    if status:
        phone_number = resultado.get('phone_number')
        secure_key = resultado.get('secure_key')
        event_data = resultado.get('event_data')
    
        if not phone_number or not secure_key or not event_data:
            return jsonify({"error": "Faltan parámetros"}), 400

        # Validar que el teléfono esté vinculado
        if phone_number not in calendarios_vinculados or calendarios_vinculados[phone_number]['secure_key'] != secure_key:
            return jsonify({"error": "El número de teléfono o la clave de seguridad no coinciden"}), 400

        # Validar que el evento exista
        if event_id not in eventos or eventos[event_id]["phone_number"] != phone_number:
            return jsonify({"error": "El evento no existe o no pertenece a este usuario"}), 404

        # Modificar el evento
        eventos[event_id]["event_data"] = event_data

        return jsonify({"mensaje": "Evento modificado exitosamente"}), 200
    else:
        return jsonify({"error": "Token de autorización inválido"}), 401

@app.route('/events/<event_id>', methods=['DELETE'])
def eliminar_evento(event_id):
    status, resultado = validate_and_get_data(request)
    if status:
        phone_number = resultado.get('phone_number')
        secure_key = resultado.get('secure_key')
        event_data = resultado.get('event_data')

        if not phone_number or not secure_key:
            return jsonify({"error": "Faltan parámetros"}), 400

        # Validar que el teléfono esté vinculado
        if phone_number not in calendarios_vinculados or calendarios_vinculados[phone_number]['secure_key'] != secure_key:
            return jsonify({"error": "El número de teléfono o la clave de seguridad no coinciden"}), 400

        # Validar que el evento exista
        if event_id not in eventos or eventos[event_id]["phone_number"] != phone_number:
            return jsonify({"error": "El evento no existe o no pertenece a este usuario"}), 404

        # Eliminar el evento
        del eventos[event_id]

        return jsonify({"mensaje": "Evento eliminado exitosamente"}), 200
    else:
        return jsonify({"error": "Token de autorización inválido"}), 401


@app.route('/resync', methods=['POST'])
def resincronizar():
    phone_number = request.json.get('phone_number')
    secure_key = request.json.get('secure_key')

    if not phone_number or not secure_key:
        return jsonify({"error": "Faltan parámetros"}), 400

    # Validar que el teléfono esté vinculado
    if phone_number not in calendarios_vinculados or calendarios_vinculados[phone_number]['secure_key'] != secure_key:
        return jsonify({"error": "El número de teléfono o la clave de seguridad no coinciden"}), 400

    # Aquí podrías agregar la lógica de revalidación y sincronización de eventos
    # En este ejemplo simplemente regresamos un mensaje de éxito.
    
    return jsonify({"mensaje": "Eventos sincronizados exitosamente"}), 200


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)