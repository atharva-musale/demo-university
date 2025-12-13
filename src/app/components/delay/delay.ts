import { Component } from '@angular/core';

@Component({
  selector: 'app-delay',
  standalone: true,
  template: `<p>Delay works!</p>`
})
export class DelayComponent {
  public bool = false;

  constructor() {
    setTimeout(() => {
      this.bool = true;
    }, 1000);
  }
}
