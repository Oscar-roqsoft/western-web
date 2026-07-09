export default defineNuxtPlugin(() => {
    if (window.google?.translate) return;
  
    window.googleTranslateElementInit = () => {};
  
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
  
    document.head.appendChild(script);
  });