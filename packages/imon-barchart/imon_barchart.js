Settings = {
  chart: {
    padding: { right: 40, bottom: 80 },
    margins: { top: 30, bottom: 0, right: 35 },
    dots: {
      size: 5,
      color: '#378E00',
      opacity: 0.7
    }
  },
  defaultData: {
    title: 'Bar Chart',
    mode: 'single', // other mode: 'multi', refers to the number of indicators.
    x: {
      single: {
        indicator: ['egy', 'kor'] // temp
      },
      multi: {
        indicator: [16, 5] // Average download speed, % of people using the internet. temp.
      }
    },
    y: {
      single: {
        indicator: 16 // Average download speed (kbps)
      },
      multi: {
        indicator: 'kor' // temp
      }
    }
  }
};

IMonBarchartWidget = function(doc) {
  Widget.call(this, doc);
  _.defaults(this.data, Settings.defaultData);
};

IMonBarchartWidget.prototype = Object.create(Widget.prototype);
IMonBarchartWidget.prototype.constructor = IMonBarchartWidget;

IMonBarchart = {
  widget: {
    name: 'Bar Chart',
    description: 'Shows a bar chart comparing an indicator across several countries.',
    url: 'https://thenetmonitor.org/sources',
    dimensions: { width: 3, height: 2 },
    resize: { mode: 'cover' },
    constructor: IMonBarchartWidget,
    typeIcon: 'bar-chart'
  },
  org: {
    name: 'Internet Monitor',
    shortName: 'IM',
    url: 'http://thenetmonitor.org'
  }
};
