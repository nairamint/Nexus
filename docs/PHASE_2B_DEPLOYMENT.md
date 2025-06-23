# SFDR Navigator Agent Phase 2B - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the SFDR Navigator Agent Phase 2B in production environments. Phase 2B introduces advanced AI capabilities, multi-language support, federated learning, and enterprise-grade governance features.

## Prerequisites

### System Requirements

**Minimum Requirements:**
- Node.js 18.x or higher
- RAM: 8GB minimum, 16GB recommended
- CPU: 4 cores minimum, 8 cores recommended
- Storage: 50GB available space
- Network: Stable internet connection for federated learning

**Recommended Production Requirements:**
- Node.js 20.x LTS
- RAM: 32GB or higher
- CPU: 16 cores or higher
- Storage: 200GB SSD
- Network: High-bandwidth, low-latency connection
- Load balancer for high availability

### Dependencies

```bash
# Core dependencies
npm install @tensorflow/tfjs-node@^4.15.0
npm install redis@^4.6.12
npm install winston@^3.11.0

# Security dependencies
npm install helmet@^7.1.0
npm install jsonwebtoken@^9.0.2
npm install bcryptjs@^2.4.3

# Performance dependencies
npm install node-cache@^5.1.2
npm install rate-limiter-flexible@^4.0.1
```

## Installation

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd sfdr-navigator-agent

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Phase 2B Configuration
PHASE_2B_ENABLED=true
PHASE_2B_VERSION=2.0.0

# Database Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# Security Configuration
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key
API_KEY_SALT=your_api_key_salt

# ML Model Configuration
ML_MODEL_PATH=/path/to/models
TENSORFLOW_BACKEND=cpu
# Set to 'gpu' if CUDA is available

# Federated Learning Configuration
FEDERATED_LEARNING_ENABLED=true
FEDERATED_COORDINATOR_URL=https://your-coordinator.com
FEDERATED_PARTICIPANT_ID=your_participant_id

# Multi-Language Configuration
TRANSLATION_SERVICE_URL=https://your-translation-service.com
TRANSLATION_API_KEY=your_translation_api_key

# Analytics Configuration
ANALYTICS_ENABLED=true
ANALYTICS_RETENTION_DAYS=90

# Performance Configuration
CACHE_TTL=3600
MAX_CONCURRENT_REQUESTS=100
REQUEST_TIMEOUT=30000

# Governance Configuration
AUDIT_LOG_ENABLED=true
COMPLIANCE_REPORTING_ENABLED=true
DATA_RETENTION_DAYS=2555  # 7 years for regulatory compliance

# Monitoring Configuration
MONITORING_ENABLED=true
METRICS_PORT=9090
HEALTH_CHECK_PORT=8080

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=json
LOG_FILE_PATH=/var/log/sfdr-navigator
```

### 3. Database Setup

#### Redis Configuration

```bash
# Install Redis (Ubuntu/Debian)
sudo apt update
sudo apt install redis-server

# Configure Redis for production
sudo nano /etc/redis/redis.conf

# Key settings:
# maxmemory 4gb
# maxmemory-policy allkeys-lru
# save 900 1
# save 300 10
# save 60 10000

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

## Deployment Options

### Option 1: Docker Deployment

#### Dockerfile

```dockerfile
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S sfdr -u 1001

# Change ownership
RUN chown -R sfdr:nodejs /app
USER sfdr

# Expose ports
EXPOSE 3000 8080 9090

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start the application
CMD ["npm", "start"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  sfdr-navigator:
    build: .
    ports:
      - "3000:3000"
      - "8080:8080"
      - "9090:9090"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    volumes:
      - ./logs:/var/log/sfdr-navigator
      - ./models:/app/models
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2'
        reservations:
          memory: 2G
          cpus: '1'

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - sfdr-navigator
    restart: unless-stopped

volumes:
  redis_data:
```

### Option 2: Kubernetes Deployment

#### Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sfdr-navigator-phase2b
  labels:
    app: sfdr-navigator
    version: phase2b
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sfdr-navigator
  template:
    metadata:
      labels:
        app: sfdr-navigator
        version: phase2b
    spec:
      containers:
      - name: sfdr-navigator
        image: sfdr-navigator:phase2b
        ports:
        - containerPort: 3000
        - containerPort: 8080
        - containerPort: 9090
        env:
        - name: NODE_ENV
          value: "production"
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: sfdr-secrets
              key: redis-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: sfdr-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "2Gi"
            cpu: "1"
          limits:
            memory: "4Gi"
            cpu: "2"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: model-storage
          mountPath: /app/models
        - name: log-storage
          mountPath: /var/log/sfdr-navigator
      volumes:
      - name: model-storage
        persistentVolumeClaim:
          claimName: model-pvc
      - name: log-storage
        persistentVolumeClaim:
          claimName: log-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: sfdr-navigator-service
spec:
  selector:
    app: sfdr-navigator
  ports:
  - name: http
    port: 80
    targetPort: 3000
  - name: health
    port: 8080
    targetPort: 8080
  - name: metrics
    port: 9090
    targetPort: 9090
  type: LoadBalancer
```

### Option 3: Cloud Deployment

#### AWS ECS Deployment

```json
{
  "family": "sfdr-navigator-phase2b",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "2048",
  "memory": "4096",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "sfdr-navigator",
      "image": "your-account.dkr.ecr.region.amazonaws.com/sfdr-navigator:phase2b",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        },
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "REDIS_URL",
          "value": "redis://your-elasticache-cluster.cache.amazonaws.com:6379"
        }
      ],
      "secrets": [
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:sfdr/jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/sfdr-navigator",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:8080/health || exit 1"
        ],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

## Configuration

### Phase 2B Specific Configuration

```typescript
// config/phase2b.config.ts
export const phase2bConfig = {
  // Advanced ML Models
  ml: {
    graphNeuralNetwork: {
      enabled: true,
      hiddenLayers: [256, 128, 64],
      attentionHeads: 8,
      dropoutRate: 0.1
    },
    ensembleModel: {
      enabled: true,
      models: ['gnn', 'transformer', 'lstm'],
      votingStrategy: 'weighted',
      confidenceThreshold: 0.8
    }
  },

  // Continuous Learning
  learning: {
    enabled: true,
    feedbackProcessingInterval: 300000, // 5 minutes
    modelUpdateThreshold: 100, // feedback count
    driftDetectionEnabled: true,
    incrementalLearningEnabled: true
  },

  // Multi-Language Support
  multiLanguage: {
    enabled: true,
    supportedLanguages: ['en', 'fr', 'de', 'es', 'it', 'nl'],
    translationQualityThreshold: 0.8,
    crossLingualClassification: true
  },

  // Advanced Analytics
  analytics: {
    enabled: true,
    realTimeMetrics: true,
    reportGenerationInterval: 3600000, // 1 hour
    retentionPeriod: 7776000000, // 90 days
    predictiveAnalytics: true
  },

  // Governance & Compliance
  governance: {
    enabled: true,
    auditTrailEnabled: true,
    complianceReporting: true,
    dataGovernance: true,
    riskAssessment: true
  },

  // Performance Optimization
  performance: {
    caching: {
      enabled: true,
      strategy: 'intelligent',
      ttl: 3600000, // 1 hour
      maxSize: '1GB'
    },
    loadBalancing: {
      enabled: true,
      strategy: 'adaptive',
      healthCheckInterval: 30000
    },
    autoScaling: {
      enabled: true,
      minInstances: 2,
      maxInstances: 10,
      targetCpuUtilization: 70
    }
  },

  // Federated Learning
  federatedLearning: {
    enabled: true,
    participantType: 'coordinator',
    privacyTechniques: ['differential_privacy', 'secure_aggregation'],
    communicationProtocol: 'https',
    aggregationStrategy: 'federated_averaging'
  }
};
```

## Security Configuration

### SSL/TLS Setup

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    location / {
        proxy_pass http://sfdr-navigator:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://sfdr-navigator:8080/health;
        access_log off;
    }

    location /metrics {
        proxy_pass http://sfdr-navigator:9090/metrics;
        allow 10.0.0.0/8;
        deny all;
    }
}
```

### API Security

```typescript
// security/api-security.ts
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// Rate limiting
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'sfdr_api_limit',
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60 * 10, // Block for 10 minutes
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Monitoring and Observability

### Prometheus Metrics

```typescript
// monitoring/metrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

// Classification metrics
export const classificationCounter = new Counter({
  name: 'sfdr_classifications_total',
  help: 'Total number of SFDR classifications',
  labelNames: ['article', 'language', 'confidence_level']
});

export const classificationDuration = new Histogram({
  name: 'sfdr_classification_duration_seconds',
  help: 'Duration of SFDR classification requests',
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

export const activeConnections = new Gauge({
  name: 'sfdr_active_connections',
  help: 'Number of active connections'
});

// Federated learning metrics
export const federatedRounds = new Counter({
  name: 'sfdr_federated_rounds_total',
  help: 'Total number of federated learning rounds'
});

export const modelAccuracy = new Gauge({
  name: 'sfdr_model_accuracy',
  help: 'Current model accuracy'
});
```

### Health Checks

```typescript
// health/health-check.ts
export class HealthChecker {
  async checkHealth(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkMLModels(),
      this.checkFederatedLearning(),
      this.checkExternalServices()
    ]);

    const overall = checks.every(check => 
      check.status === 'fulfilled' && check.value.status === 'healthy'
    ) ? 'healthy' : 'unhealthy';

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      checks: {
        database: this.getCheckResult(checks[0]),
        redis: this.getCheckResult(checks[1]),
        mlModels: this.getCheckResult(checks[2]),
        federatedLearning: this.getCheckResult(checks[3]),
        externalServices: this.getCheckResult(checks[4])
      }
    };
  }
}
```

## Backup and Recovery

### Data Backup Strategy

```bash
#!/bin/bash
# backup.sh

# Redis backup
redis-cli --rdb /backup/redis/dump-$(date +%Y%m%d-%H%M%S).rdb

# Model backup
tar -czf /backup/models/models-$(date +%Y%m%d-%H%M%S).tar.gz /app/models/

# Configuration backup
cp -r /app/config /backup/config-$(date +%Y%m%d-%H%M%S)/

# Logs backup
tar -czf /backup/logs/logs-$(date +%Y%m%d-%H%M%S).tar.gz /var/log/sfdr-navigator/

# Clean old backups (keep 30 days)
find /backup -type f -mtime +30 -delete
```

### Disaster Recovery

```bash
#!/bin/bash
# restore.sh

BACKUP_DATE=$1

if [ -z "$BACKUP_DATE" ]; then
  echo "Usage: $0 <backup_date>"
  exit 1
fi

# Stop services
docker-compose down

# Restore Redis
cp /backup/redis/dump-${BACKUP_DATE}.rdb /data/redis/

# Restore models
tar -xzf /backup/models/models-${BACKUP_DATE}.tar.gz -C /

# Restore configuration
cp -r /backup/config-${BACKUP_DATE}/* /app/config/

# Start services
docker-compose up -d

echo "Recovery completed for backup: $BACKUP_DATE"
```

## Performance Tuning

### Node.js Optimization

```bash
# Environment variables for production
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=4096 --optimize-for-size"
export UV_THREADPOOL_SIZE=16
```

### Redis Optimization

```conf
# redis.conf optimizations
maxmemory 4gb
maxmemory-policy allkeys-lru
tcp-keepalive 300
timeout 0
tcp-backlog 511
databases 16
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
```

## Troubleshooting

### Common Issues

1. **High Memory Usage**
   ```bash
   # Check memory usage
   docker stats
   
   # Adjust Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=8192"
   ```

2. **Slow Classification Performance**
   ```bash
   # Check TensorFlow backend
   export TENSORFLOW_BACKEND=gpu  # if CUDA available
   
   # Enable model caching
   export ML_MODEL_CACHE_ENABLED=true
   ```

3. **Federated Learning Connection Issues**
   ```bash
   # Check network connectivity
   curl -I $FEDERATED_COORDINATOR_URL/health
   
   # Verify certificates
   openssl s_client -connect coordinator.example.com:443
   ```

### Log Analysis

```bash
# View application logs
docker logs sfdr-navigator-phase2b

# Search for errors
grep -i error /var/log/sfdr-navigator/app.log

# Monitor real-time logs
tail -f /var/log/sfdr-navigator/app.log | grep -i "classification"
```

## Maintenance

### Regular Maintenance Tasks

```bash
#!/bin/bash
# maintenance.sh

# Update dependencies
npm audit fix

# Clean up old logs
find /var/log/sfdr-navigator -name "*.log" -mtime +7 -delete

# Optimize Redis
redis-cli BGREWRITEAOF

# Update ML models
./scripts/update-models.sh

# Run health checks
curl -f http://localhost:8080/health

# Generate maintenance report
./scripts/generate-maintenance-report.sh
```

### Model Updates

```bash
#!/bin/bash
# update-models.sh

# Download latest models
wget -O /tmp/models.tar.gz $MODEL_REPOSITORY_URL/latest

# Backup current models
cp -r /app/models /backup/models-backup-$(date +%Y%m%d)

# Extract new models
tar -xzf /tmp/models.tar.gz -C /app/models/

# Restart application
docker-compose restart sfdr-navigator

# Verify model loading
curl -f http://localhost:8080/health
```

## Support and Documentation

### Getting Help

- **Documentation**: See `docs/` directory for detailed documentation
- **API Reference**: Available at `/api/docs` when running
- **Health Dashboard**: Available at `/health/dashboard`
- **Metrics**: Available at `/metrics` (Prometheus format)

### Useful Commands

```bash
# Check system status
npm run health:check

# Run diagnostics
npm run diagnostics

# Generate performance report
npm run performance:report

# Export configuration
npm run config:export

# Validate deployment
npm run deployment:validate
```

This deployment guide provides a comprehensive foundation for deploying SFDR Navigator Agent Phase 2B in production environments with enterprise-grade reliability, security, and performance.