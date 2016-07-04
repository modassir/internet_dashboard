Template.IMonScatterWidget.onCreated(function() {
  var template = this;
  template.autorun(function() {
    var indicators = [
      Template.currentData().x.indicator,
      Template.currentData().y.indicator
    ];
    template.subscribe('imon_data_v2', 'all', indicators, false);
    template.subscribe('imon_indicators_v2');
    template.subscribe('imon_countries_v2');
  });
});

Template.IMonScatterWidget.onRendered(function() {
  var template = this;
  var node = template.find('.scatter-chart');
  var widgetNode = template.firstNode.parentNode.parentNode;
  var $widgetBody = $(widgetNode).find('.widget-body');

  var chart = d3.select(node).chart('Compose', function(options) {
    var xs = _.pluck(options.data, 'x'), ys = _.pluck(options.data, 'y');

    var scales = {
      x: { domain: [_.min(xs), _.max(xs)] },
      y: { domain: [_.min(ys), _.max(ys)] },
    };

    var charts = [{
      type: 'Dots',
      id: 'dots',
      data: options.data,
      xScale: scales.x,
      yScale: scales.y,
      xJitter: options.xJitter,
      yJitter: options.yJitter,
      labels: {
        offset: 3
      }
    }];

    var title = d3c.title('Custom Chart');
    var xAxis = d3c.axis('xAxis', {scale: scales.x, ticks: 3});
    var yAxis = d3c.axis('yAxis', {scale: scales.y, ticks: 3});
    var xAxisTitle = d3c.axisTitle(options.xAxisTitle);
    var yAxisTitle = d3c.axisTitle(options.yAxisTitle);

    return [
      [yAxisTitle, yAxis, d3c.layered(charts)],
      xAxis,
      xAxisTitle
    ];
  });

  var setChartDims = function() {
    var width = $widgetBody.outerWidth() - Settings.chart.padding.right;
    var height = $widgetBody.outerHeight() - Settings.chart.padding.bottom;
    chart.width(width);
    chart.height(height);
  };

  $(widgetNode).on('gridster:resizestop', function() {
    setChartDims();
    chart.redraw();
  });

  var redrawn = false;
  template.autorun(function() {
    if (!template.subscriptionsReady()) { return; }
    var xIndicator = Template.currentData().x.indicator;
    var yIndicator = Template.currentData().y.indicator;
    var xTitle = IMonIndicators.findOne({ adminName: xIndicator }).shortName;
    var yTitle = IMonIndicators.findOne({ adminName: yIndicator }).shortName; 
    if (Template.currentData().x.log) {
      xTitle = 'Log ' + xTitle;
    }
    if (Template.currentData().y.log) {
      yTitle = 'Log ' + yTitle;
    }

    var data = [];
    IMonCountries.find().forEach(function(country) {
      var xValue, yValue;
      IMonData.find({ countryCode: country.code, indAdminName: xIndicator }, { sort: { date: -1 }, limit: 1 }).forEach(function(d){
        xValue = d.value;
      });
      var y;
      IMonData.find({ countryCode: country.code, indAdminName: yIndicator }, { sort: { date: -1 }, limit: 1 }).forEach(function(d){
        yValue = d.value;
      });
      if (_.isUndefined(xValue) || _.isUndefined(yValue)) { return; }

      if (Template.currentData().x.log && xValue > 0) {
        xValue = Math.log(xValue);
      }
      if (Template.currentData().y.log && yValue > 0) {
        yValue = Math.log(yValue);
      }

      data.push({
        x: xValue,
        y: yValue,
        code: country.code,
        key: country.code,
        label: country.name
      });
    });

    console.log(data);

    chart.margins(Settings.chart.margins);
    chart.responsive(false);

    chart.draw({
      data: data,
      xAxisTitle: xTitle,
      yAxisTitle: yTitle,
      xJitter: Template.currentData().x.jitter,
      yJitter: Template.currentData().y.jitter
    });

    // This is a hacky way to get the chart to fit the widget on first draw
    // because it wouldn't throw the draw event correctly.
    if (!redrawn) {
      setChartDims();
      chart.redraw();
      redrawn = true;
    }
  });
});
