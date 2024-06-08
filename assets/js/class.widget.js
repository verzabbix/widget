class WMHostIterator extends CWidget {

	onStart() {
		this._body.innerHTML += '<div>onStart</div>';
	}

	onActivate() {
		this._body.innerHTML += '<div>onActivate</div>';
	}

	onDeactivate() {
		this._body.innerHTML += '<div>onDeactivate</div>';
	}

	onDestroy() {
		this._body.innerHTML += '<div>onDestroy</div>';
	}

	promiseUpdate() {
		this._body.innerHTML += '<div>promiseUpdate</div>';

		return Promise.resolve();
	}
}
