# RL Swarm

RL Swarm is an open-source system for peer-to-peer reinforcement learning over the internet. This platform enables you to train your personal model against swarm intelligence through collaborative learning. The system uses a gossiping protocol (Hivemind) for model improvement and connects to the Gensyn Testnet for on-chain identity and progress tracking.

## 📋 Table of Contents
- [System Requirements](#-system-requirements)
- [Quick Start Guide](#-quick-start-guide)
- [Detailed Setup Instructions](#-detailed-setup-instructions)
- [Common Issues & Solutions](#-common-issues--solutions)
- [Architecture Overview](#-architecture-overview)
- [Monitoring & Metrics](#-monitoring--metrics)
- [Advanced Configuration](#-advanced-configuration)

## 💻 System Requirements

### Hardware Requirements
| Component | Minimum Specs | Recommended Specs |
|-----------|---------------|-------------------|
| CPU | arm64/x86 | Modern multi-core processor |
| RAM | 16GB | 32GB+ |
| Storage | 20GB free | 50GB+ free |
| Network | Stable internet | High-speed connection |

### Supported GPUs
| GPU Model | Status | Notes |
|-----------|---------|-------|
| RTX 3090 | ✅ Fully Supported | Recommended for optimal performance |
| RTX 4090 | ✅ Fully Supported | Best performance |
| A100 | ✅ Fully Supported | Enterprise grade |
| H100 | ✅ Fully Supported | Enterprise grade |

### Software Prerequisites
- Windows 10/11 with WSL2 OR MacOS/Linux
- Python >=3.10
- Docker Desktop
- Node.js >=18.0.0
- Git

## 🚀 Quick Start Guide

### 1. Environment Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/rl-swarm.git
cd rl-swarm

# Create and activate virtual environment
python3 -m venv .venv
# For Windows (in PowerShell):
.\.venv\Scripts\Activate
# For Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Docker Setup & Running
```bash
# Ensure Docker Desktop is running
docker --version
docker-compose --version

# Start all services
docker-compose up --build

# To run in background (detached mode)
docker-compose up --build -d

# To stop services
docker-compose down
```

### 3. Accessing the System
- Login Interface: http://localhost:3000
- Training Interface: http://localhost:8080
- Metrics Dashboard: http://localhost:55679

Note: The system will continue running in Docker even if you close your terminal, as long as Docker Desktop is running.

## 📚 Detailed Setup Instructions

### Windows-Specific Setup
1. Install WSL2 following [Microsoft's guide](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Install Ubuntu 22.04 LTS from Microsoft Store
3. Install Docker Desktop with WSL2 backend
4. Enable WSL integration in Docker Desktop settings

### Login System (ports 3000-3002)
1. Navigate to http://localhost:3000 (or 3001/3002 if ports are in use)
2. Click "Login" and choose your preferred method
3. Wait for authentication to complete
4. System will generate a `userData.json` file

### Training Interface (port 8080)
1. Access http://localhost:8080
2. Monitor:
   - Current round and stage
   - Training rewards
   - Connected nodes
   - Leaderboard position

## 🔧 Common Issues & Solutions

### Port Conflicts
```bash
# Check ports in use
netstat -ano | findstr "3000 3001 3002 8080"

# Kill processes if needed
taskkill /F /PID <process_id>

# Alternative: Use different ports in docker-compose.yml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

### Docker Management
```bash
# View running containers
docker ps

# View container logs
docker logs rl-swarm-main-fastapi-1
docker logs rl-swarm-main-modal-login-1

# Stop all containers
docker-compose down

# Clean up system
docker system prune -f  # Removes unused containers/images

# Restart specific service
docker-compose restart fastapi
```

### System Persistence
- Docker containers will continue running in background even if terminal is closed
- To stop all services: Use Docker Desktop or run `docker-compose down`
- Data persists in Docker volumes between restarts
- Login state is maintained in browser session

### Login Issues
| Issue | Solution |
|-------|----------|
| "Cannot read properties of null" | Clear browser cache and disable wallet extensions |
| 500 Internal Server Error | Restart modal-login server |
| Port already in use | Use alternative ports (3001/3002) |

### Training Issues
| Issue | Solution |
|-------|----------|
| Training not starting | Check Docker containers status |
| Slow training | Normal for CPU training, wait 20+ minutes |
| Node disconnection | Check network connection and Docker status |

### Docker Issues
```bash
# Common fixes
docker-compose down
docker system prune -a
docker-compose up --build

# Check logs
docker logs rl-swarm-main-fastapi-1
docker logs rl-swarm-main-otel-collector-1
```

## 🏗 Architecture Overview

### Component Structure
```
RL Swarm
├── modal-login/        # Authentication system
├── web/               # UI components
└── hivemind_exp/      # Training system
```

### Key Processes
1. **Authentication Flow**
   - Modal login (port 3000)
   - API key generation
   - Gensyn testnet connection

2. **Training Flow**
   - Model initialization
   - Peer discovery
   - Training rounds
   - Metrics collection

## 📊 Monitoring & Metrics

### Available Endpoints
- Training Interface: http://localhost:8080
- Login System: http://localhost:3000
- Metrics Dashboard: http://localhost:55679
- Health Check: http://localhost:8080/health

### Docker Container Status
```bash
# View container status
docker ps

# View container logs
docker logs -f <container_name>

# Monitor resource usage
docker stats
```

## ⚙ Advanced Configuration

### Custom Model Configuration
Location: `./hivemind_exp/configs/<device_directory>/grpo-qwen-2.5-0.5b-deepseek-r1.yaml`

### Performance Tuning
```bash
# Memory optimization for MacOS
export PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0

# GPU isolation for multi-GPU setups
export CUDA_VISIBLE_DEVICES=0  # Use GPU 0
```

### Data Persistence
- Backup `swarm.pem` for node identity
- Store `userData.json` for authentication
- Keep Docker volumes for training data

## 🔄 Maintenance

### Regular Tasks
1. Update dependencies
2. Clear Docker cache
3. Monitor disk space
4. Check for system updates

### Shutdown Procedure
1. Save training state
2. Stop Docker containers
3. Backup important files
4. Deactivate virtual environment

## 🚨 Known Issues & Solutions

### OpenTelemetry Collector Issues
```bash
# Common Error: "logging exporter has been deprecated"
# Solution: Update otel-collector-config.yaml to use debug exporter:
exporters:
  debug:
    verbosity: detailed
  prometheus:
    endpoint: "0.0.0.0:8889"

# Verify collector is running
docker logs rl-swarm-main-otel-collector-1
```

### FastAPI UI Assets Error
```bash
# Error: "Directory '/app/ui/dist/assets' does not exist"
# Solutions:
1. Rebuild the UI assets:
cd web/ui
npm install
npm run build:testnet

2. Verify in Dockerfile.webserver:
COPY --from=ui-builder /ui/dist ./ui/dist

3. Clean and rebuild:
docker-compose down
docker system prune -f
docker-compose up --build
```

### Protobuf Version Warnings
```bash
# Warning: "Protobuf gencode version mismatch"
# Solution: Update protobuf in requirements.txt:
protobuf>=6.30.2

# Then rebuild:
docker-compose build fastapi
```

### Port Conflict Resolution Guide
1. **Check Port Usage**
```bash
# Windows
netstat -ano | findstr "3000 3001 3002 8080"
taskkill /F /PID <PID>

# Linux/Mac
lsof -i :3000,3001,3002,8080
kill -9 <PID>
```

2. **Alternative Port Configuration**
```yaml
# In docker-compose.yml
services:
  modal-login:
    ports:
      - "3001:3000"  # Use 3001 if 3000 is taken
  fastapi:
    ports:
      - "8081:8080"  # Use 8081 if 8080 is taken
```

## 🔄 Service Management

### Starting Services
```bash
# Option 1: Interactive mode (see logs in terminal)
docker-compose up --build

# Option 2: Detached mode (runs in background)
docker-compose up --build -d

# Option 3: Start specific services
docker-compose up -d fastapi
docker-compose up -d modal-login
```

### Monitoring Services
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f fastapi
docker-compose logs -f modal-login

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Troubleshooting Steps
1. **Clean Start**
```bash
# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Clean Docker system
docker system prune -f

# Rebuild from scratch
docker-compose up --build
```

2. **Service-Specific Issues**
```bash
# Restart individual service
docker-compose restart fastapi

# Rebuild single service
docker-compose build fastapi
docker-compose up -d fastapi

# Check service logs
docker logs -f rl-swarm-main-fastapi-1
```

## 📝 Development Tips

### Local Development
1. **UI Development**
```bash
cd web/ui
npm install
npm run dev  # Hot-reload development
npm run build:testnet  # Production build
```

2. **API Development**
```bash
cd web
pip install -r requirements.txt
uvicorn api.server:app --reload --port 8080
```

### Testing
```bash
# Run UI tests
cd web/ui
npm test

# Run API tests
cd web
pytest
```

### Common Development Tasks
1. **Update Dependencies**
```bash
# UI dependencies
cd web/ui
npm update

# Python dependencies
pip install --upgrade -r requirements.txt
```

2. **Debug Mode**
```bash
# Enable debug logging
export DEBUG=1
export LOG_LEVEL=debug

# Run with debug options
docker-compose -f docker-compose.debug.yml up
```

## 🔐 Security Notes

### API Keys & Secrets
- Store Hugging Face token in `.env` file (optional)
- Never commit `.env` files
- Use environment variables in Docker Compose

### Data Persistence
- Important files to backup:
  - `swarm.pem` (node identity)
  - `userData.json` (auth data)
  - Docker volumes (training data)

## 📊 Performance Optimization

### Resource Usage
```bash
# Monitor resource usage
docker stats

# Limit container resources
services:
  fastapi:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
```

### Network Configuration
- Default ports: 3000 (login), 8080 (API), 55679 (metrics)
- Configure firewall rules if needed
- Use reverse proxy for production deployment
