import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

export interface CardModel {
  x;
  y;
  width: number;
  height: number;
  color: string;
  label: string;
  data;
  tooltipText: string;
}

@Component({
  selector: 'g[cardSeries]',
  template: `
    <svg:g card *ngFor="let c of cards"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [data]="c.data"
      (clickHandler)="click($event)"

      swui-tooltip
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="c.tooltipText"
    />
  `
})
export class CardSeries implements OnChanges {
  cards: CardModel[];

  @Input() data;
  @Input() dims;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }

  update() {
    this.cards = this.getCards();
  }

  getCards() {
    return this.data
      .map((d, index) => {
        let label = d.data.name;

        let value = d.data.value;
        return {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          color: this.colors(label),
          label: d.data.label,
          data: d.data,
          tooltipText: `${label}: ${value}`
        };
      });
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
