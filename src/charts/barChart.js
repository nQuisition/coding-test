import * as canvasUtils from "./canvasUtils";

const defaultConfig = {
  axes: true,
  grid: true,
  labels: true,
  primaryAxisFieldName: null,
  primaryAxisFieldComparator: null,
  primaryAxisFieldLabelify: x => x,
  // primaryAxisFieldOrdering: null,
  dataSets: [],
  groupBy: null,
  groupColors: {},
  secondaryAxisFieldName: null,
  spacing: 0.1,
  paddingHorizontal: 0.1,
  paddingVertical: 0.1
};

const processDataSet = (dataset, options) => {
  const {
    primaryAxisFieldName,
    primaryAxisFieldComparator,
    primaryAxisFieldLabelify,
    // primaryAxisFieldOrdering,
    secondaryAxisFieldName,
    groupBy
  } = options;

  const orderedDataset = dataset.sort((a, b) =>
    primaryAxisFieldComparator(a[primaryAxisFieldName], b[primaryAxisFieldName])
  );

  // ordered
  const primaryAxisLabels = Array.from(
    orderedDataset.reduce((res, dataPoint) => {
      const label = primaryAxisFieldLabelify(dataPoint[primaryAxisFieldName]);
      res.add(label);
      return res;
    }, new Set())
  );

  let grouped;
  if (groupBy) {
    grouped = orderedDataset.reduce((res, dataPoint) => {
      const label = dataPoint[groupBy];
      if (!res[label]) {
        res[label] = [];
      }
      res[label].push(dataPoint);
      return res;
    }, {});
  } else {
    grouped = { all: orderedDataset };
  }

  const pointsGroups = Object.keys(grouped).reduce(
    (res, groupLabel) => {
      const dataGroup = grouped[groupLabel];
      let { min, max } = res;
      const groupedGroup = dataGroup.reduce((gg, dataPoint) => {
        const label = primaryAxisFieldLabelify(dataPoint[primaryAxisFieldName]);
        if (!gg[label]) {
          gg[label] = 0;
        }
        gg[label] += dataPoint[secondaryAxisFieldName];
        return gg;
      }, {});
      const pointsArray = primaryAxisLabels.map(label => {
        const value = groupedGroup[label];
        if (!value) {
          return 0;
        }
        if (value > max) {
          max = value;
        }
        if (value < min) {
          min = value;
        }
        return value;
      });
      res.groups[groupLabel] = pointsArray;
      res.min = min;
      res.max = max;
      return res;
    },
    {
      groups: {},
      min: 0,
      max: 0
    }
  );
  return { ...pointsGroups, primaryAxisLabels };
};

export default class BarChart {
  constructor(context, options) {
    this.context = context;
    this.options = { ...defaultConfig, ...options };
    this.computeDimensions();
  }

  computeDimensions() {
    const { paddingHorizontal, paddingVertical } = this.options;
    this.context.canvas.width = this.context.canvas.clientWidth;
    this.context.canvas.height = this.context.canvas.clientHeight;

    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;

    this.workingWidth = this.width * (1 - paddingHorizontal * 2);
    this.workingHeight = this.height * (1 - paddingVertical * 2);
    this.horizontalOffset = paddingHorizontal * this.width;
    this.verticalOffset = paddingVertical * this.height;
  }

  render() {
    const dataSet = this.options.dataSets[0].data;
    const processed = processDataSet(dataSet, this.options);
    const { context } = this;
    const { spacing, groupColors } = this.options;
    const { primaryAxisLabels, min, max } = processed;
    const { width, height } = this;
    const {
      workingWidth,
      workingHeight,
      horizontalOffset,
      verticalOffset
    } = this;
    const numBars = primaryAxisLabels.length;
    const barWidth = workingWidth / (numBars + (numBars + 1) * spacing);
    const verticalScale = workingHeight / (max - min);
    context.clearRect(0, 0, width, height);
    const { groups } = processed;
    const groupsCount = Object.keys(groups).length;
    const subBarWidth = barWidth / groupsCount;
    Object.keys(groups).forEach((groupName, j) => {
      groups[groupName].forEach((yValue, i) => {
        const x = (i + (i + 1) * spacing) * barWidth + j * subBarWidth;
        const y = verticalScale * (yValue - min);
        canvasUtils.drawFillRect(
          context,
          horizontalOffset + x,
          workingHeight - y + verticalOffset,
          subBarWidth,
          y,
          groupColors[groupName] || "#ee7676",
          "#000000"
        );
      });
    });
    context.strokeStyle = "#999";
    context.strokeRect(
      horizontalOffset,
      verticalOffset,
      workingWidth,
      workingHeight
    );
    console.log(processed);
  }
}
