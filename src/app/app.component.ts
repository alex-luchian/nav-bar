import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMore = false;

  @ViewChild('container',
    {static: true})
  container: any;
  @ViewChild('items', {static: true})
  items: any;
  @ViewChild('moreItems', {static: true})
  moreItems: any;

  ngOnInit() {
    this.onResizeEvent();
    window.addEventListener('resize', () => {
      this.onResizeEvent();
    });
  }

  onResizeEvent() {
    // console.log('container ', this.container);
    // console.log('ul list ', this.items);

    const containerWidth = this.container.nativeElement.offsetWidth;
    const itemsWidth = this.calculateItemsWidth(
      this.items.nativeElement.children
    );
    const moreItemsLength = this.moreItems.nativeElement.children.length;

    this.showMoreButton();
    // this.moveLastItemToMore(containerWidth, itemsWidth);
    // this.moveFirstItemToItems(containerWidth, itemsWidth);
    if (containerWidth < itemsWidth + 100) {
      this.moveLastItemToMore();
    } else if (containerWidth > itemsWidth + 160 && moreItemsLength) {
      this.moveFirstItemToItems();
    }

    console.log('container width', containerWidth);
    console.log('items size', itemsWidth);
  }

  calculateItemsWidth(items: any): number {
    let itemsWidth: number = 0;
    // console.log('items (li) ', items);
    for (let i = 0; i < items.length; i++) {
      const size: number = items[i].offsetWidth;
      itemsWidth += size;
    }
    return itemsWidth;
  }

  showMoreButton() {
    this.showMore = this.moreItems.nativeElement.children.length > 0;
    console.log('show more button ', this.showMore);
  }

  moveLastItemToMore(containerWidth?: any, itemsWidth?: any) {
    // if (containerWidth < itemsWidth + 100) {
      console.log('add item to more item');
      const length = this.items.nativeElement.children.length;
      this.moreItems.nativeElement.appendChild(this.items.nativeElement.children[length - 1]);
    // }
  }

  moveFirstItemToItems(containerWidth?: any, itemsWidth?: any) {
    const moreItemsLength = this.moreItems.nativeElement.children.length;
    // if (containerWidth > itemsWidth + 100 && moreItemsLength) {
      console.log('remove item from more item');
      this.items.nativeElement.appendChild(this.moreItems.nativeElement.children[moreItemsLength - 1]);
    // }
  }
}
