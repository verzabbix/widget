class WMHostIterator extends CWidget {

	displayHosts(hosts) {
		const list = document.createElement('ul');

		hosts.forEach(host => {
			const item = document.createElement('li');
			item.textContent = host.name;
			list.appendChild(item);
		});

		this.clearContents();

		this._body.appendChild(list);
	}

	promiseUpdate() {
		const {hostgroupids, hostids} = this.getFieldsData();

		return ApiCall('host.get', {
			output: ['hostid', 'name'],
			groupids: hostgroupids.length > 0 ? hostgroupids : undefined,
			hostids: hostids.length > 0 ? hostids : undefined,
			filter: {
				status: 0
			},
			sortfield: 'name'
		})
			.then(response => {
				const hosts = response.result;

				this.displayHosts(hosts);
			});
	}

	hasPadding() {
		return false;
	}
}
