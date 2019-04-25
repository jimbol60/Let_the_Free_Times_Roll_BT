import { Component, Input } from '@angular/core';

@Component({
	selector: 'gci-char-counter',
	template: `
      <div class="d-flex">
          <small class="ml-auto text-muted"> {{field.value.length}} / {{max}}</small>
      </div>
  `
})
export class CharCounterComponent {
	
	@Input() field: any;
	@Input() max: number;
	
}
