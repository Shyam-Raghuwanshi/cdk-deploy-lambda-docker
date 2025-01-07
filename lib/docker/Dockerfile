FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory
WORKDIR /var/task

RUN microdnf install -y \
    nss \
    nss-util \
    nspr \
    atk \
    at-spi2-atk \
    cups-libs \
    libdrm \
    dbus-libs \
    expat \
    libxcb \
    libX11 \
    libXcomposite \
    libXdamage \
    libXext \
    libXfixes \
    libXrandr \
    mesa-libgbm \
    pango \
    cairo \
    alsa-lib \
    at-spi2-core \
    libxshmfence && \
    microdnf clean all

# Copy package files and install Node.js dependencies
COPY package*.json ./
COPY .fastembed_cache ./fastembed_cache
# COPY ms-playwright ../../root/.cache/ms-playwright
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Define the Lambda handler
CMD ["dist/app.handler"]
