document.addEventListener("DOMContentLoaded", function () {
  const container = document.body;
  const buttons = document.querySelectorAll(".language-toggle button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      container.classList.remove("lang-show-zh", "lang-show-en", "lang-show-both");
      container.classList.add(`lang-show-${lang}`);

      // 保存用户选择的语言到 localStorage
      localStorage.setItem("preferred-language", lang);

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 检查是否有之前保存的语言偏好
  const savedLang = localStorage.getItem("preferred-language") || "both";
  container.classList.add(`lang-show-${savedLang}`);

  // 根据保存的偏好设置激活按钮
  const activeButton = document.querySelector(`.language-toggle button[data-lang="${savedLang}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  } else {
    // 如果没有找到匹配的按钮，默认激活双语按钮
    const bothButton = document.querySelector('.language-toggle button[data-lang="both"]');
    if (bothButton) {
      bothButton.classList.add("active");
    }
  }
});

// 创建语言切换按钮
function createLanguageToggle() {
  // 检查是否已经存在语言切换按钮
  if (document.querySelector('.language-toggle')) {
    return;
  }

  const articleContent = document.querySelector('.post-body');
  if (!articleContent) return;

  // 检查页面是否有双语内容
  const hasBilingualContent = document.querySelector('.bilingual-section');
  if (!hasBilingualContent) return;

  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'language-toggle';
  toggleDiv.innerHTML = `
    <button data-lang="zh">中文</button>
    <button data-lang="en">English</button>
    <button data-lang="both">雙語</button>
  `;

  // 插入到文章内容前面
  articleContent.insertBefore(toggleDiv, articleContent.firstChild);

  // 初始化按钮事件
  const buttons = toggleDiv.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.body.classList.remove("lang-show-zh", "lang-show-en", "lang-show-both");
      document.body.classList.add(`lang-show-${lang}`);

      localStorage.setItem("preferred-language", lang);

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 根据保存的偏好设置激活按钮
  const savedLang = localStorage.getItem("preferred-language") || "both";
  const activeButton = toggleDiv.querySelector(`button[data-lang="${savedLang}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  } else {
    // 默认激活双语按钮
    toggleDiv.querySelector('button[data-lang="both"]').classList.add("active");
  }
}

// 页面加载完成后自动创建语言切换按钮
window.addEventListener('load', createLanguageToggle);
