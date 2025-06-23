# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Copy .env file explicitly (if not included via .dockerignore)
COPY .env .env

# Build the app (Vite will pick up .env automatically)
RUN npm run build

# Stage 2: Serve built app
FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app

# Copy build output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
