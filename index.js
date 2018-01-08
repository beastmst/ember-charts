/* eslint-env node */
'use strict';

module.exports = {
  name: '@abcum/ember-charts',
  included(app) {

		this._super.included(app);

		app.import('node_modules/chart.js/dist/Chart.js');
		app.import('vendor/chart.js', {
			exports: {
				Chart: ['default']
			}
		});

		app.import('node_modules/vis/dist/vis.js');
		app.import('node_modules/vis/dist/vis.css');
		app.import('vendor/vis.js', {
			exports: {
				vis: ['default']
			}
		});

	},
};
