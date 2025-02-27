# Dockerfile for Python Flask API

FROM python:3.9-slim AS crea_env

# Establecer el directorio de trabajo
WORKDIR /app

# Instalo Redis
RUN apt update
RUN apt install -y redis-server
RUN service redis-server start
#RUN docker run --name redis -d -p 6379:6379 redis

# Crear venv
RUN python3 -m venv venv

# Copiar los archivos del proyecto
COPY ./requirements.txt /app/requirements.txt

# Instalar las dependencias
RUN /app/venv/bin/pip install --upgrade pip 
RUN /app/venv/bin/pip install -r requirements.txt 
#--trusted-host files.pythonhosted.org --trusted-host pypi.python.org --trusted-host pypi.org

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto donde la API estará corriendo
EXPOSE 5000

RUN ["/app/venv/bin/python3", "jwt_creator.py"]

# Comando para iniciar la API
CMD ["/app/venv/bin/python3", "main.py"]