export default function initChatbot(d, t) {
    const loginDetails = JSON.parse(atob(localStorage.getItem("user") || ""));
  window.chatwootSettings = {
    position: "right",
    type: "expanded_bubble",
    launcherTitle: "Ask AYP"
  };
  var BASE_URL = "https://chatwoot-dev.infinitisoftware.net";
  var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  g.src = BASE_URL + "/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);

  g.onload = function() {
    window.chatwootSDK.run({
      websiteToken: 'kXiTmUSQQZkLgbMnkKe5pxxK',
      baseUrl: BASE_URL
    });

    setTimeout(function() {
      if (window.$chatwoot) {
        var username = loginDetails?.user?.username;
        var userId = loginDetails?.user?.id;
        var tokenvalue = "3b19dd702ece7b124013a39b16114559649d1283"
        window.$chatwoot.setUser(userId, {
          name: username,
          custom_attributes: {
            token: tokenvalue
          }
        });
      }
    }, 2000);
  };
}