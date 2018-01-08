import Component from '@ember/component';

export default Component.extend({

	tabindex: 0,

	tagName: undefined,

	didInsertElement() {
		this._super(...arguments);
		this.sendAction('register', this);
	},

	willDestroyElement() {
		this.sendAction('unregister', this);
		this._super(...arguments);
	},

	didUpdateAttrs() {
		this._super(...arguments);
		this.sendAction('reregister', this);
	},

});
