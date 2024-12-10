FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y rpm xdg-utils wget nspr 

# Import the Google Linux signing key
RUN rpm --import https://dl.google.com/linux/linux_signing_key.pub

# Download and install Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm && \
    rpm -ivh ./google-chrome-stable_current_x86_64.rpm && \
    rm google-chrome-stable_current_x86_64.rpm

# Verify installation
RUN ls /usr/bin/google-chrome

# Install dependencies
# WORKDIR /var/task
# ENV RUST_BACKTRACE=1 
# ENV RUST_LOG=headless_chrome=trace

# COPY package*.json ./
# RUN npm ci

# # Copy source files
# COPY . .

# # Compile TypeScript
# RUN npm run build

# # Lambda handler
# CMD ["dist/app.handler"]