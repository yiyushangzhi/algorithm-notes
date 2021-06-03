module.exports = {
  title: "Daily Notes",
  description: "My daily task notes",
  plugins: ["@vuepress/plugin-search"],
  themeConfig: {
    lastUpdated: "最近一次修改时间",
    tip: "提示",
    warning: "注意",
    danger: "警告",

    navbar: [
      {
        text: "算法练习",
        children: [
          {
            text: "单调栈",
            link: "/algorithm/monotonic-stack.md",
          },
          {
            text: "回溯算法",
            link: "/algorithm/backtrack.md",
          },
          {
            text: "动态规划",
            link: "/algorithm/dynamic-programming.md",
          },
        ],
      },
    ],
  },
};
