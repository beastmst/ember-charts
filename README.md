# ember-charts

An addon for working with charts, timelines, and networks in an Ember.js app.

[![](https://img.shields.io/circleci/project/abcum/ember-charts/master.svg?style=flat-square)](https://circleci.com/gh/abcum/ember-charts) [![](https://img.shields.io/npm/v/@abcum/ember-charts.svg?stylchartse=flat-square)](https://www.npmjs.com/package/@abcum/ember-charts) [![](https://img.shields.io/badge/ember-2.16.2+-orange.svg?style=flat-square)](https://github.com/abcum/ember-charts) [![](https://david-dm.org/abcum/ember-charts/status.svg?style=flat-square)](https://david-dm.org/abcum/ember-charts) [![](https://david-dm.org/abcum/ember-charts/dev-status.svg?style=flat-square)](https://david-dm.org/abcum/ember-charts?type=dev) [![](https://img.shields.io/badge/license-MIT-00bfff.svg?style=flat-square)](https://github.com/abcum/ember-charts) 

## Usage

### Installation

`ember install @abcum/ember-charts`

### Introduction

The ember-charts addon adds functionality for working with chart.js charts, and vis.js timeline and networks, enabling complex and advanced visualisation of analytical data, time-series data, event-data, and networked graph data.

### Examples

#### Charts

Create a basic chart. The chart type can be one of: [pie](http://www.chartjs.org/docs/latest/charts/pie.html), [bar](http://www.chartjs.org/docs/latest/charts/bar.html), [line](http://www.chartjs.org/docs/latest/charts/line.html), [radar](http://www.chartjs.org/docs/latest/charts/radar.html), [bubble](http://www.chartjs.org/docs/latest/charts/bubble.html), [doughnut](http://www.chartjs.org/docs/latest/charts/doughnut.html), [polarArea](http://www.chartjs.org/docs/latest/charts/polar.html).

```hbs
{{chart-view type='bar' data=data}}
```

```js
export default Ember.Controller.extend({
	data: {
	    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	    datasets: [{
	        label: '# of Votes',
	        data: [12, 19, 3, 5, 2, 3],
	    }]
	}
})
```

And specify custom options a basic line chart.

```hbs
{{chart-view type='line' data=data options=options}}
```

```js
export default Ember.Controller.extend({
	options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
	}
})
```

For detailed information on configuration options, look at the [Chart.js documentation](http://www.chartjs.org/docs/latest/) pages.

#### Timelines

Create a basic event timeline.

```hbs
{{#timeline-view as |t|}}
	{{t.item type='point' start=start content="Visited 'Home' page"}}
	{{t.item type='point' start=start content="Visited 'About Us' page"}}
{{/timeline-view}}
```

And specify actions on timeline events.

```hbs
{{#timeline-view on-timechange=(action 'timechange') as |t|}}
	{{t.item type='point' start=start content="Visited 'Home' page" on-select=(action 'select')}}
	{{t.item type='point' start=start content="Visited 'About Us' page" on-select=(action 'select')}}
{{/timeline-view}}
```

And specify custom options for the timeline. View the [Vis.js documentation](http://visjs.org/docs/timeline/#options) for detailed configuration options.

```hbs
{{#timeline-view options=options as |t|}}
	...
{{/timeline-view}}
```

```js
import vis from 'vis.js';

export default Ember.Controller.extend({
	options: {
		start: vis.moment().subtract(6, 'months').format(),
        end: vis.moment().add(6, 'week').format(),
        width: '100%',
        height: '100%',
        align: 'left',
        orientation: 'top',
        showCurrentTime: true,
        autoResize: true,
        selectable: false,
        editable: false,
        zoomMin: 3600000,
        zoomMax: 31560000000,
	}
})
```

##### Timeline events

These action attributes are able to be set on a timeline.

Attribute           | Description
:-------------------|:---------------------------------------------------------------------------
`on-click`          | Called when the user clicks on the timeline.
`on-dblclick`       | Called when the user double-clicks on the timeline.
`on-contextmenu`    | Called when the user right-clicks on the timeline.
`on-timechange`     | Called when the user is moving the timeline range.
`on-timechanged`    | Called once when the user has finished moving the timeline range.
`on-rangechange`    | Called when the user is dragging the custom time bar.
`on-rangechanged`   | Called once when the user has finished dragging the custom time bar.

##### Timeline item events

These action attributes are able to be set on a timeline item.

Attribute           | Description
:-------------------|:---------------------------------------------------------------------------
`on-click`          | Called when the user clicks on an item.
`on-dblclick`       | Called when the user double-clicks on an item.
`on-contextmenu`    | Called when the user right-clicks on an item.
`on-mouseover`      | Called when the user moves the mouse over an item.
`on-mouseout`       | Called when the user moves the mouse away from an item.
`on-select`         | Called when the user selects an item.

#### Networks

Create a basic graph network.

```hbs
{{#network-view as |n|}}
	{{n.node id='a' label="Alexander"}}
	{{n.node id='m' label="Marcus"}}
	{{n.node id='j' label="Jonathan"}}
	{{n.edge from='a' to='j' label="likes"}}
{{/network-view}}
```

And specify actions on network nodes / edges.

```hbs
{{#network-view on-zoom=(action 'zoom') as |n|}}
	{{n.node id='a' label="Alexander" on-select=(action 'select')}}
	{{n.node id='m' label="Marcus" on-select=(action 'select')}}
	{{n.node id='j' label="Jonathan" on-select=(action 'select')}}
	{{n.edge from='a' to='j' label="likes" on-select=(action 'select')}}
{{/network-view}}
```

And specify custom options for the network. View the [Vis.js documentation](http://visjs.org/docs/network/#options) for detailed configuration options.

```hbs
{{#network-view options=options as |n|}}
	...
{{/network-view}}
```

```js
import vis from 'vis.js';

export default Ember.Controller.extend({
	options: {
		autoResize: true,
        width: '100%',
        height: '100%',
        interaction: {
        	zoomView: false,
        },
        nodes: {
            shape: 'box',
            scaling: {
                min: 10,
                max: 30
            },
            font: {
                size: 12,
                face: 'Helvetica'
            },
        },
        edges: {
            scaling: {
                min: 5,
                max: 15,
            },
            font: {
                size: 10,
                face: 'Helvetica',
            },
        },
        physics: {
            stabilization: true,
            solver: 'repulsion',
            barnesHut: {
                damping: 0.5,
                avoidOverlap: 1,
            }
        },
	}
})
```

##### Network events

These action attributes are able to be set on a network.

Attribute           | Description
:-------------------|:---------------------------------------------------------------------------
`on-zoom`           | Called when the user changes the zoom level of the network
`on-click`          | Called when the user clicks on the network.
`on-dblclick`       | Called when the user double-clicks on the network.
`on-contextmenu`    | Called when the user right-clicks on the network.

##### Network node/edge events

These action attributes are able to be set on a network node, or network edge.

Attribute           | Description
:-------------------|:---------------------------------------------------------------------------
`on-click`          | Called when the user clicks on an node or edge.
`on-dblclick`       | Called when the user double-clicks on an node or edge.
`on-contextmenu`    | Called when the user right-clicks on an node or edge.
`on-select`         | Called when the user selects an node or edge.


## Development

- `make install` (install bower and ember-cli dependencies)
- `make upgrade` (upgrade ember-cli to the specified version)
- `make tests` (run all tests defined in the package)
