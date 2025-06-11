# Estágio 1: Build (se necessário, para projetos com build step como React/Vue)
# Para HTML/CSS/JS puros, este estágio pode ser pulado.

# Estágio 2: Produção
FROM nginx:alpine

# Copia os arquivos do seu site para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# AQUI ESTÁ A MUDANÇA:
# Remove a configuração padrão e copia a sua personalizada
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]