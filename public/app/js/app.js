var MainController = require("./controllers/main");

// Main method that initializes and runs app.
// Should be the last event listener in the app to register for document load.
$(function() {
  // Configure Knockout templating engine.
  ko.remoteTemplateEngine.defaultPath = "/app/templates";
  ko.remoteTemplateEngine.defaultUseCache = false;

  // Initialize all controllers.
  var mainController = new MainController();
  mainController.initialize();

  // Create the Hasher hook for path changes, and hook it up to Crossroads.
  function parseHash(newHash, oldHash) {
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();
});
