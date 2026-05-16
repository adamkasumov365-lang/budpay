const translations = {
  ru: { common: { title: "Личный кабинет" } },
  en: { common: { title: "Dashboard" } }
};

const I18N = {
  lang: "ru",

  init() {
    this.lang = localStorage.getItem("lang") || "ru";
    this.apply();

    const select = document.getElementById("langSwitch");
    select.value = this.lang;

    select.addEventListener("change", (e) => {
      this.setLang(e.target.value);
    });
  },

  t(key) {
    return translations[this.lang].common[key] || key;
  },

  apply() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n.split(".")[1];
      el.textContent = this.t(key);
    });

    localStorage.setItem("lang", this.lang);
  },

  setLang(lang) {
    this.lang = lang;
    this.apply();
  }
};

I18N.init();
