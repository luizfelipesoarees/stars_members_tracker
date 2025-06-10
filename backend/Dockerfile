FROM node:18-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código para dentro do container
COPY . .

# Expõe a porta em que seu backend roda (troque se for outra)
EXPOSE 8170

# Comando para rodar sua aplicação (ajuste conforme seu start)
CMD ["npm", "start"]
