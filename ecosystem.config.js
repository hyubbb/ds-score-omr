module.exports = {
  apps: [
    {
      name: "mocktest-dsdo",
      exec_mode: "cluster",
      instances: 1,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3003",
    },
  ],
};
