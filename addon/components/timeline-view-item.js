import Component from '@ember/component';

export default Component.extend({

	tabindex: 0,

	tagName: undefined,

	didInsertElement() {
		this._super(...arguments);
		this.get('register')(this);
	},

	willDestroyElement() {
		this._super(...arguments);
		this.get('unregister')(this);
	},

	didUpdateAttrs() {
		this._super(...arguments);
		this.get('reregister')(this);
	},

});
