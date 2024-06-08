class WMHostIterator extends CWidget {

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
				console.log(response.result);
			});
	}
}
