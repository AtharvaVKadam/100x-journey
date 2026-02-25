module.exports = {
  apps: [{
    name: "meetai-backend-production",
    script: "npm",
    args: "run start",
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 8080,
    }
  }]
};