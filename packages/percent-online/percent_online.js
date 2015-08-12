Settings = {
  indicatorName: 'Percentage of individuals using the Internet'
};

PercentOnlineWidget = function(doc) {
  Widget.call(this, doc);

  if (this.data.isEmpty() && Meteor.isClient) {
    var self = this;
    Meteor.subscribe('imon_countries', function() {
      self.data.set({
        country: IMonCountries.findOne({ code: 'usa' })
      });
    });
  }
};

PercentOnlineWidget.prototype = Object.create(Widget.prototype);
PercentOnlineWidget.prototype.constructor = PercentOnlineWidget;

_.extend(PercentOnlineWidget.prototype, {
  // FIXME Implement this
  onCountryChange: function(newCountry) { return true; },
  getCountry: function() {
    if (_.isEmpty(this.data.country)) { return; }
    return IMonCountries.findOne({ code: this.data.country.code });
  },
  getIndicator: function() {
    if (_.isEmpty(this.getCountry())) { return; }
    return _.findWhere(this.getCountry().indicators, { name: Settings.indicatorName });
  }
});

PercentOnline = {
  widget: {
    name: 'Percent Online',
    description: 'Shows the percent of a country\'s population using the Internet regularly',
    url: 'https://thenetmonitor.org/sources#itu',
    dimensions: { width: 2, height: 1 },
    constructor: PercentOnlineWidget
  },
  org: {
    name: 'International Telecommunications Union',
    shortName: 'ITU',
    url: 'http://www.itu.int/'
  }
};
