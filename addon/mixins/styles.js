import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

	style: htmlSafe(''),

	styleBindings: [],

	attributeBindings: ['style'],

	willInsertElement() {

		this._super(...arguments);

		this.get('styleBindings').forEach(function(binding) {
			let part = binding.split(':'), prop = part[0];
			this.addObserver(prop, this, 'didUpdateStyle');
		}, this);

	},

	willDestroyElement() {

		this._super(...arguments);

		this.get('styleBindings').forEach(function(binding) {
			let part = binding.split(':'), prop = part[0];
			this.removeObserver(prop, this, 'didUpdateStyle');
		}, this);

	},

	didUpdateAttrs() {

		this._super(...arguments);

		this.didUpdateStyle();

	},

	didReceiveAttrs() {

		this._super(...arguments);

		this.didUpdateStyle();

	},

	didUpdateStyle() {

		let styles = [], bindings = {};

		this.get('styleBindings').forEach(function(binding) {
			let part = binding.split(':'), prop = part[0], show = part[1] || part[0];
			bindings[show] = this.get(prop);
		}, this);

		Object.keys(bindings).forEach(function(k) {
			var v = bindings[k];
			if ( typeOf(v) === 'string' ) {
				styles.push( k + ':' + v + '' );
			}
			if ( typeOf(v) === 'number' ) {
				styles.push( k + ':' + v + 'px' );
			}
		});

		this.set('style', htmlSafe( styles.join(';') ) );

	},

});
