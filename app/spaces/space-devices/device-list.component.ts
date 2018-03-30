import { Component, Input } from '@angular/core'
import { IDevice, DeviceType } from '../index';
import { OnChanges } from '@angular/core';

@Component({
    selector: 'device-list',
    templateUrl: 'app/spaces/space-devices/device-list.component.html',
    styles: ['collapsible-well h6 {margin-top:-5px; margin-bottom:10px }']
})
export class DeviceListComponent implements OnChanges {
    @Input() devices: IDevice[]
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleDevices: IDevice[] = [];

    ngOnChanges(): void {
        if (this.devices) {
            this.filterDevices(this.filterBy);
            this.sortBy === 'label' ? this.visibleDevices.sort(sortByLabelAsc)
                : this.visibleDevices.sort(sortByPopularityDesc)
        }
    }

    filterDevices(filter) {
        if (filter === 'all') {
            this.visibleDevices = this.devices.slice(0);
        } else {
            let filteredDeviceTypes: DeviceType[] = [];
            if (filter === 'sensor') {
                filteredDeviceTypes.push(DeviceType.Sensor)
            } else if (filter === 'switch') {
                filteredDeviceTypes.push(DeviceType.Switch)
                filteredDeviceTypes.push(DeviceType.AdjustableSwitch)
            } else if (filter === 'alarm') {
                filteredDeviceTypes.push(DeviceType.SignalingElement)
            }

            this.visibleDevices = this.devices.filter(device => {
                return filteredDeviceTypes.indexOf(device.type) !== -1
            })
        }
    }

}

function sortByLabelAsc(d1: IDevice, d2: IDevice) {
    if (d1.label > d2.label) return 1
    else if (d1.label === d2.label) return 0
    else return -1
}

function sortByPopularityDesc(d1: IDevice, d2: IDevice) {
    return d2.popularity - d1.popularity
}
