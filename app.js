(function() {
  var mydata = data;
  var cv = {
    init: function() {
      this.cacheDOM();
      this.bindEvent();
      cv.translateTo("spanish");
      this.theater();
    },
    cacheDOM: function() {
      this.$cv = $('#cv-container');
      this.$esButton = this.$cv.find('#es-button');
      this.$enButton = this.$cv.find('#en-button');

      // =============MAIN=============
      this.$mainSubtitle = this.$cv.find('#main-subtitle');
      this.$downloadLink = this.$cv.find('#download-link');
      this.$mainBenefits = this.$cv.find('#main-benefits');
      this.$mainBenefitsText = this.$cv.find('#main-benefits-text');
      this.$mainGoals = this.$cv.find('#main-goals');
      this.$mainGoalsText = this.$cv.find('#main-goals-text');
      this.$downloadLink = this.$cv.find('#download-link');

      // =============EXPERIENCE=============
      this.$experience = this.$cv.find('#experience');
      this.$experienceTitle = this.$cv.find('#experience-title');

      // =============EDUCATION=============
      this.$educationTitle = this.$cv.find('#education-title');
      this.$uniTitle = this.$cv.find('#uni-title');
      this.$uniLocation = this.$cv.find('#uni-location');
      this.$uniDate = this.$cv.find('#uni-date');

      // =============LANGUAGES=============
      this.$languagesTitle = this.$cv.find('#languages-title');
      this.$languagesUl = this.$cv.find('#languages').find("ul");

      // =============SKILLS=============
      this.$skills = this.$cv.find('#skills');
      this.$skillsTitle = this.$cv.find('#skills-title');
      this.$skillsPro = this.$cv.find('#skills-pro');
      this.$skillsCompl = this.$cv.find('#skills-compl');
    },
    bindEvent: function() {
      this.$esButton.on('click', this.translate.bind(this));
      this.$enButton.on('click', this.translate.bind(this));
    },
    translate: function(e) {
      this.translateTo(e.target.value);
    },
    translateTo: function(language) {
      var translatedStrings = data[language];
      // =============MAIN=============
      this.$mainSubtitle.text(translatedStrings.subtitle);
      this.$mainBenefits.text(translatedStrings.benefits);
      this.$mainBenefitsText.html(translatedStrings.benefitsText);
      this.$mainGoals.text(translatedStrings.goals);
      this.$mainGoalsText.text(translatedStrings.goalsText);
      this.$downloadLink.html(translatedStrings.linkDownload);

      // =============EXPERIENCE=============
      this.$experienceTitle.text(translatedStrings.experiences.title);
      this.$experience.children().not("h2").remove();
      translatedStrings.experiences.list.forEach(this.insertExperiences.bind(this));

      // =============EDUCATION=============
      this.$educationTitle.text(translatedStrings.education.title);
      this.$uniTitle.text(translatedStrings.education.degree);
      this.$uniLocation.text(translatedStrings.education.location);
      this.$uniDate.text(translatedStrings.education.date);

      // =============LANGUAGES=============
      this.$languagesTitle.text(translatedStrings.languages.title);
      this.$languagesUl.children().remove();
      translatedStrings.languages.list.forEach(this.insertLanguages.bind(this));

      // =============SKILLS=============
      this.$skillsTitle.text(translatedStrings.skills.title);
      this.$skillsPro.text(translatedStrings.skills.pro.title);
      this.$skillsCompl.text(translatedStrings.skills.complementary.title);
      this.$skills.find('ul').children().remove();
      translatedStrings.skills.pro.list.forEach(this.insertSkillsPro.bind(this));
      translatedStrings.skills.complementary.list.forEach(this.insertSkillsCompl.bind(this));
    },
    insertSkillsCompl: function(complItem) {
      //Images to be implemented
    },
    insertSkillsPro: function(proItem) {
      var li = "<li>" + proItem.item + " <progress max=\"100\" value=\"" + proItem.level + "\"><\/progress> <\/li>";
      this.$skills.find('ul').append(li);
    },
    insertExperiences: function(experienceItem) {
      var article = "<article class=\"work\"></article>";
      var h3 = "<h3 class=\"work-title\">" + experienceItem.title + "</h3><i class=\"work-date\">" + experienceItem.date + ":</i>";
      var p = "<p class=\"work-text\">" + experienceItem.text + "</p>"
      this.$experience.append(article);
      this.$experience.children().last().append(h3).append(p);
    },
    insertLanguages: function(languageItem) {
      var li = "<li><strong>" + languageItem.item + " - </strong> " + languageItem.level + "</li>";
      this.$languagesUl.append(li);
    },
    theater: function() {
      var theater = theaterJS({
        "minSpeed": 80,
        "maxSpeed": 250
      });
      theater.addActor('main-title');
      theater.addScene('main-title:Vicente Ortiz García-Cervigón');
    }
  }
  cv.init();
})()
