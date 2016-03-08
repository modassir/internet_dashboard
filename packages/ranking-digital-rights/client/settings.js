
Template.RDRSettings.onCreated(function() {
  var template = this;
  template.autorun(function() {
    template.subscribe('ranking_digital_rights_companies');
  });
});

Template.RDRSettings.onRendered(function() {
  console.log("RDR: onRendered");
  var template = this;
  template.autorun(function() {
    if (!template.subscriptionsReady()) { return; }
    setRightDropDowns(template);
  });
});

Template.RDRSettings.helpers({
  granularities: function()    { return Settings.granularities; },
  companies:     function()    { return RDRCompanyData.find({}) },
  categories:    function()    { return Settings.categories; },
  metrics:       function()    { return Settings.metrics; },
  isSelected:    function(a,b) { return a === b ? 'selected' : ''; }
});


var setRightDropDowns = function setRightDropDowns(template){
  //console.log("setRightDropDowns");
  //console.log("granularity: " + template.find('#granularity-select').value);
  //console.log("category: " + template.find('#category-select').value);
  //console.log("company: " + template.find('#company-select').value);
  if (template.find('#granularity-select').value === Settings.SERVICES_BY_COMPANY){
    $(template.find('#category-form-group')).fadeOut();
    $(template.find('#company-form-group')).fadeIn();
  } else {
    $(template.find('#company-form-group')).fadeOut();
    $(template.find('#category-form-group')).fadeIn();
  }
};

Template.RDRSettings.events({
  'mousemove #settings-section' : function(ev,template){
    console.log('TODO: this is goofy.');
    setRightDropDowns(template);
  },
  'change #granularity-select' : function(ev,template) {
    setRightDropDowns(template);
  },
  
  'click .save-settings': function(ev, template) {
    var newData = {
      granularity: template.find('#granularity-select').value,
      category: template.find('#category-select').value,
      sortMetric: template.find('#sort-metric').value,
      company: template.find('#company-select').value
    };
    console.log("Reinhard: what is this?");
    console.log(this);
    this.set(newData);
    template.closeSettings();
  }
  
});
