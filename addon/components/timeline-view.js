import Component from '@ember/component';
import StylesMixin from '../mixins/styles';
import { computed } from '@ember/object';
import layout from '../templates/components/timeline-view';
import vis from 'vis.js';

export default Component.extend(StylesMixin, {

	layout,

	width: '100%',

	height: '100%',

	styleBindings: ['width', 'height'],

	items: computed(function() {
		return new vis.DataSet([]);
	}),

	options: computed(function() {
		return {};
	}),

	didInsertElement() {

		this._super(...arguments);

		this.timeline = new vis.Timeline(this.element, this.get('items'), this.get('options'));

		this.timeline.on('timechange', (properties) => {
			this.sendAction('on-timechange', properties);
		});

		this.timeline.on('timechanged', (properties) => {
			this.sendAction('on-timechanged', properties);
		});

		this.timeline.on('rangechange', (properties) => {
			this.sendAction('on-rangechange', properties);
		});

		this.timeline.on('rangechanged', (properties) => {
			this.sendAction('on-rangechanged', properties);
		});

		this.timeline.on('click', (properties) => {
			this.sendAction('on-click', properties);
			let item = this.get('items').get(properties.item);
			if (item && item['on-click']) item['on-click'](properties.event);
		});

		this.timeline.on('doubleClick', (properties) => {
			this.sendAction('on-dblclick', properties);
			let item = this.get('items').get(properties.item);
			if (item && item['on-dblclick']) item['on-dblclick'](properties.event);
		});

		this.timeline.on('contextmenu', (properties) => {
			this.sendAction('on-contextmenu', properties);
			let item = this.get('items').get(properties.item);
			if (item && item['on-contextmenu']) item['on-contextmenu'](properties.event);
		});

		this.timeline.on('itemout', (properties) => {
			let item = this.get('items').get(properties.item)
			if (item['on-mouseout']) item['on-mouseout'](properties.event);
		});

		this.timeline.on('itemover', (properties) => {
			let item = this.get('items').get(properties.item)
			if (item['on-mouseover']) item['on-mouseover'](properties.event);
		});

		this.timeline.on('select', (properties) => {
			this.get('items').get(properties.items).forEach(item => {
				if (item['on-select']) item['on-select'](properties.event);
			});
		});

	},

	willDestroyElement() {

		this.get('timeline').destroy();

		this._super(...arguments);

	},

	didUpdateAttrs() {

		this._super(...arguments);

		this.get('timeline').setOptions( this.get('options') );

	},

	actions: {

		register(item) {
			this.get('items').add(item);
		},

		unregister(item) {
			this.get('items').remove(item);
		},

		reregister(item) {
			this.get('items').update(item);
		},

	},

});
