# Dockerfile for React frontend
FROM node:lts

WORKDIR /app

# Configura el proxy para apt
#RUN echo 'Acquire::http::Proxy "http://10.30.28.143:80";' > /etc/apt/apt.conf.d/01proxy

# Instala jq (herramienta para manipular JSON)
RUN apt-get update && apt-get install -y jq

# Crea un package.json predeterminado
# RUN npm cache clean --force
RUN npm init -y

# Configuración del proxy
#ENV HTTP_PROXY=http://10.30.28.143:80
#ENV HTTPS_PROXY=http://10.30.28.143:80

# Configura el proxy para npm
RUN npm config set proxy ${HTTP_PROXY}
RUN npm config set https-proxy ${HTTPS_PROXY}

# Añadir el script "start" al package.json usando jq            # Las primeras lineas funcionan, pero arregle algo y tambien funciona el install
RUN jq '.scripts.start = "react-scripts start"' package.json > temp.json && mv temp.json package.json
RUN jq '.devDependencies["@babel/plugin-proposal-private-property-in-object"] = "^7.16.0"' package.json > temp.json && mv temp.json package.json
RUN jq '.dependencies["styled-components"] = "^5.3.5"' package.json > temp.json && mv temp.json package.json
RUN jq '.dependencies["react-router-dom"] = "^6.0.0"' package.json > temp.json && mv temp.json package.json

RUN export NODE_OPTIONS=--openssl-legacy-provider
# RUN npm uninstall webpack -g
# RUN npm update some-library
# RUN npm upgrade some-library
RUN npm config set strict-ssl false
RUN npm install 
RUN npm install webpack       
RUN npm install react-scripts
RUN npm install react-bootstrap
RUN npm install react-router-dom
RUN npm install semantic-ui-react semantic-ui-css
RUN npm install --save-dev @babel/core @babel/preset-react babel-loader
#RUN npm install styled-components
#RUN npm update webpack       
#RUN npm update react-scripts


# Aquí no usamos `npm install`, ya que copias las dependencias previamente instaladas
# Copia el archivo package.json y node_modules desde el host (si ya están instalados)
COPY ./empty-react-project/package.json /app/package.json
COPY ./empty-react-project/node_modules /app/node_modules  

# Copia todo el proyecto al contenedor
COPY . .

# Copia el archivo index.html al contenedor
COPY /empty-react-project/index.html /app/public/index.html
COPY ./empty-react-project/src /app/src
# COPY ./empty-react-project/src/index.js /app/src/index.js

# Exponer el puerto 3000 y arranca la aplicación
EXPOSE 3000
CMD ["npm", "start"]
