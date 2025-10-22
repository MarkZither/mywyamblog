import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (function() {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  // Netlify Identity redirect handling
  if ((window as any).netlifyIdentity) {
    (window as any).netlifyIdentity.on("init", (user: any) => {
      if (!user) {
        (window as any).netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  return null;
})();
