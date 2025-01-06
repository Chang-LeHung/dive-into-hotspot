import { readdirSync, statSync } from "fs";
import { join, basename } from "path";
import process from "process";

// 用于生成侧边栏的辅助函数
function generateSidebar(dir) {
  const sidebar = [];
  const docsDir = join(process.cwd(), "docs");

  // 读取目录内容
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    // 跳过 .vitepress 目录和以 . 开头的隐藏文件
    if (file.startsWith(".")) continue;

    if (stat.isDirectory()) {
      // 处理目录
      const children = generateSidebar(fullPath);
      if (children.length > 0) {
        sidebar.push({
          text: basename(file),
          items: children,
          collapsible: true,
          collapsed: true,
        });
      }
    } else if (file.endsWith(".md")) {
      // 处理 markdown 文件
      const text = basename(file, ".md");
      const link = fullPath
        .replace(docsDir, "")
        .replace(/\\/g, "/")
        .replace(".md", "");
      if (text.toLowerCase() !== "index") {
        sidebar.push({
          text: text,
          link: link,
        });
      }
    }
  }

  return sidebar;
}

export default {
  title: "Dive into Hotspot",
  description: "Just playing around.",

  // 添加基础路径配置
  base: '/dive-into-hotspot/',

  themeConfig: {
    // 确保使用正确的图标类型
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Chang-LeHung",
      },
      {
        icon: "zhihu",
        link: "https://www.zhihu.com/people/lbj-31-91",
      },
      { icon: "twitter", link: "https://x.com/hchng28935" }, // 将 'x' 改为 'twitter'
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/576236330?spm_id_from=333.1007.0.0",
      },
    ],

    nav: [
      { text: "Home", link: "https://chang-lehung.github.io/#/" },
      { text: "About", link: "https://chang-lehung.github.io/#/" },
      {
        link: "https://github.com/Chang-LeHung",
        icon: "github",
      },
      {
        text: "其他博客",
        items: [
          {
            text: "dive-into-cpython",
            link: "https://chang-lehung.github.io/dive-into-cpython/",
          },
          {
            text: "计算机系统基础",
            link: "https://chang-lehung.github.io/cscore/",
          },
        ],
      },
    ],
    sidebar: generateSidebar(join(process.cwd(), "docs")),
  },

  // 修改 markdown 配置，使用默认主题
  markdown: {
    lineNumbers: true,
  },
};
