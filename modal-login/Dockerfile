# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY next.config.* ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Install dependencies with clean npm cache
RUN npm cache clean --force && \
    npm install

# Copy application code
COPY app ./app
COPY .env* ./

# Development stage
FROM node:18-alpine AS development

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/tailwind.config.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/.env* ./

# Install additional dev dependencies
RUN npm install -D @types/node @types/react

# Expose port
EXPOSE 3000

# Use nodemon for development
RUN npm install -g nodemon

# Start in development mode with nodemon
CMD ["npm", "run", "dev"] 