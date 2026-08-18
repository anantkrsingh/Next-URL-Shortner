module.exports = {
  apps: [
    {
      name: "tinyur",
      script: "node_modules/next/dist/bin/next",
      args: "start --port 3000",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
