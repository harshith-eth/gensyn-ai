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

# Install Node.js (if not installed)
npm install -g node@latest
```

### 2. Docker Setup
```bash
# Start Docker Desktop
# Verify Docker is running
docker --version
docker-compose --version
```

### 3. Launch the System
```bash
# Start the training system
./run_rl_swarm.sh

# In a separate terminal, start the UI
docker-compose up --build
```

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
```

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

### Available Metrics
- Training rewards
- Round/Stage progress
- Node connectivity
- Peer count
- Training speed

### Health Checks
```bash
# Check system health
curl http://localhost:8080/health
curl http://localhost:3000/health

# Monitor Docker containers
docker ps
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
