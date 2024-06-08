<?php

namespace Modules\WMHostIterator\Includes;

use Zabbix\Widgets\CWidgetForm;

use Zabbix\Widgets\Fields\{
	CWidgetFieldMultiSelectGroup,
	CWidgetFieldRadioButtonList
};

class WidgetForm extends CWidgetForm {

	public function addFields(): self {
		return $this
			->addField(
				new CWidgetFieldMultiSelectGroup('hostgroupids', 'Host groups')
			)
			->addField(
				(new CWidgetFieldRadioButtonList('speed', 'Speed', [
					0 => 'Slow',
					1 => 'Normal',
					2 => 'Fast'
				]))->setDefault(1)
			);
	}
}
