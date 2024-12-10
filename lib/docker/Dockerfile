FROM browserless/chrome AS chrome-base

# Use Node.js Lambda base image
FROM public.ecr.aws/lambda/nodejs:20

# Copy Browserless Chrome from the previous stage if needed
# COPY --from=chrome-base /app /app

WORKDIR /var/task

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Environment variable to point to Browserless Chrome
ENV BROWSERLESS_WS_ENDPOINT=ws://localhost:3000

# Expose the port Browserless Chrome uses (if running in same container)
EXPOSE 3000

# Command to run the application
CMD ["dist/app.handler"]