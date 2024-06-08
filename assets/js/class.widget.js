class WMHostIterator extends CWidget {

	interval_handle = null;

	onDeactivate() {
		this.stopIteratingHosts();
	}

	stopIteratingHosts() {
		clearInterval(this.interval_handle);
	}

	startIteratingHosts(hosts) {
		this.stopIteratingHosts();

		let selected_index = 0;

		this.displayHosts(hosts, selected_index);
		this.broadcast({
			[CWidgetsData.DATA_TYPE_HOST_ID]: [hosts[selected_index].hostid],
			[CWidgetsData.DATA_TYPE_HOST_IDS]: [hosts[selected_index].hostid]
		});

		this.interval_handle = setInterval(() => {
			selected_index = selected_index + 1;

			if (selected_index === hosts.length) {
				selected_index = 0;
			}

			this.displayHosts(hosts, selected_index);
			this.broadcast({
				[CWidgetsData.DATA_TYPE_HOST_ID]: [hosts[selected_index].hostid],
				[CWidgetsData.DATA_TYPE_HOST_IDS]: [hosts[selected_index].hostid]
			});
		}, 2000);
	}

	displayHosts(hosts, selected_index) {
		const list = document.createElement('ul');

		for (let offset = -3; offset <= 2; offset++) {
			let index = selected_index + offset;

			index = index % hosts.length;

			if (index < 0) {
				index = index + hosts.length;
			}

			const host = hosts[index];
			const item = document.createElement('li');
			item.textContent = host.name;
			list.appendChild(item);
		}

		this.clearContents();

		this._body.appendChild(list);
	}

	promiseUpdate() {
		const {hostgroupids} = this.getFieldsData();

		return ApiCall('host.get', {
			output: ['hostid', 'name'],
			groupids: hostgroupids.length > 0 ? hostgroupids : undefined,
			filter: {
				status: 0
			},
			sortfield: 'name'
		})
			.then(response => {
				const hosts = response.result;

				this.startIteratingHosts(hosts);
			});
	}

	hasPadding() {
		return false;
	}
}
