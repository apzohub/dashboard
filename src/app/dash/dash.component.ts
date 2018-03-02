import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {CompactType, DisplayGrid, GridsterComponentInterface, GridsterConfig, 
  GridsterItem, GridsterItemComponentInterface, GridType }  from 'angular-gridster2';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashComponent implements OnInit {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  remove: boolean;

  constructor() { }

  ngOnInit() {
    this.options = {
      // gridType: GridType.scrollVertical,
      compactType: CompactType.None,
      initCallback: DashComponent.gridInit,
      destroyCallback: DashComponent.gridDestroy,
      itemChangeCallback: DashComponent.itemChange,
      itemResizeCallback: DashComponent.itemResize,
      itemInitCallback: DashComponent.itemInit,
      itemRemovedCallback: DashComponent.itemRemoved,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 10,
      minRows: 1,
      maxRows: 1000,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: DashComponent.eventStop
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        stop: DashComponent.eventStop,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2, hasContent: true},
      {cols: 1, rows: 1, y: 0, x: 4},
      {cols: 1, rows: 1, y: 2, x: 5},
      {cols: undefined, rows: undefined, y: 1, x: 0},
      {cols: 1, rows: 1, y: undefined, x: undefined},
      {cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
      {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
      {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
      // {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
      {cols: 1, rows: 1, y: 2, x: 6, initCallback: DashComponent.itemInit}
    ];
  }

  static eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    console.info('eventStop', item, itemComponent, event);
  }

  static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemResized', item, itemComponent);
  }

  static itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemInitialized', item, itemComponent);
  }

  static itemRemoved(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.info('itemRemoved', item, itemComponent);
  }

  static gridInit(grid: GridsterComponentInterface) {
    console.info('gridInit', grid);
  }

  static gridDestroy(grid: GridsterComponentInterface) {
    console.info('gridDestroy', grid);
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem) {
    console.info('empty cell click', event, item);
    this.dashboard.push(item);
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({});
  }

}


export const GridsterConfigService: GridsterConfig = {
  gridType: 'scrollVertical', // 'fit' will fit the items in the container without scroll;
  // 'scrollVertical' will fit on width and height of the items will be the same as the width
  // 'scrollHorizontal' will fit on height and width of the items will be the same as the height
  // 'fixed' will set the rows and columns dimensions based on fixedColWidth and fixedRowHeight options
  // 'verticalFixed' will set the rows to fixedRowHeight and columns width will fit the space available
  // 'horizontalFixed' will set the columns to fixedColWidth and rows height will fit the space available
  fixedColWidth: 250, // fixed col width for gridType: 'fixed'
  fixedRowHeight: 250, // fixed row height for gridType: 'fixed'
  keepFixedHeightInMobile: false, // keep the height from fixed gridType in mobile layout
  keepFixedWidthInMobile: false, // keep the width from fixed gridType in mobile layout
  compactType: 'none', // compact items: 'none' | 'compactUp' | 'compactLeft' | 'compactUp&Left' | 'compactLeft&Up'
  mobileBreakpoint: 640, // if the screen is not wider that this, remove the grid layout and stack the items
  minCols: 1, // minimum amount of columns in the grid
  maxCols: 100, // maximum amount of columns in the grid
  minRows: 1, // minimum amount of rows in the grid
  maxRows: 100, // maximum amount of rows in the grid
  defaultItemCols: 1, // default width of an item in columns
  defaultItemRows: 1, // default height of an item in rows
  maxItemCols: 50, // max item number of cols
  maxItemRows: 50, // max item number of rows
  minItemCols: 1, // min item number of columns
  minItemRows: 1, // min item number of rows
  minItemArea: 1, // min item area: cols * rows
  maxItemArea: 2500, // max item area: cols * rows
  margin: 10,  // margin between grid items
  outerMargin: true,  // if margins will apply to the sides of the container
  outerMarginTop: null, // override outer margin for grid
  outerMarginRight: null, // override outer margin for grid
  outerMarginBottom: null, // override outer margin for grid
  outerMarginLeft: null, // override outer margin for grid
  scrollSensitivity: 10,  // margin of the dashboard where to start scrolling
  scrollSpeed: 20,  // how much to scroll each mouse move when in the scrollSensitivity zone
  initCallback: undefined, // callback to call after grid has initialized. Arguments: gridsterComponent
  destroyCallback: undefined, // callback to call after grid has destroyed. Arguments: gridsterComponent
  itemChangeCallback: undefined,  // callback to call for each item when is changes x, y, rows, cols.
  // Arguments: gridsterItem, gridsterItemComponent
  itemResizeCallback: undefined,  // callback to call for each item when width/height changes.
  // Arguments: gridsterItem, gridsterItemComponent
  itemInitCallback: undefined,  // callback to call for each item when is initialized and has size > 0.
  // Arguments: gridsterItem, gridsterItemComponent
  itemRemovedCallback: undefined,  // callback to call for each item when is removed.
    // Arguments: gridsterItem, gridsterItemComponent
  enableEmptyCellClick: false, // enable empty cell click events
  enableEmptyCellContextMenu: false, // enable empty cell context menu (right click) events
  enableEmptyCellDrop: false, // enable empty cell drop events
  enableEmptyCellDrag: false, // enable empty cell drag events
  emptyCellClickCallback: undefined, // empty cell click callback
  emptyCellContextMenuCallback: undefined, // empty cell context menu (right click) callback
  emptyCellDropCallback: undefined, // empty cell drag drop callback. HTML5 Drag & Drop
  emptyCellDragCallback: undefined, // empty cell drag and create item like excel cell selection
  // Arguments: event, gridsterItem{x, y, rows: defaultItemRows, cols: defaultItemCols}
  emptyCellDragMaxCols: 50, // limit empty cell drag max cols
  emptyCellDragMaxRows: 50, // limit empty cell drag max rows
  // only for gridType: `fixed` , `verticalFixed`, `horizontalFixed`
  draggable: {
    delayStart: 0, // milliseconds to delay the start of resize, useful for touch interaction
    enabled: false, // enable/disable draggable items
    ignoreContentClass: 'gridster-item-content', // default content class to ignore the drag event from
    ignoreContent: false, // if true drag will start only from elements from `dragHandleClass`
    dragHandleClass: 'drag-handler', // drag event only from this class. If `ignoreContent` is true.
    stop: undefined, // callback when dragging an item stops.  Accepts Promise return to cancel/approve drag.
    start: undefined // callback when dragging an item starts.
    // Arguments: item, gridsterItem, event
  },
  resizable: {
    delayStart: 0, // milliseconds to delay the start of resize, useful for touch interaction
    enabled: false, // enable/disable resizable items
    handles: {
      s: true,
      e: true,
      n: true,
      w: true,
      se: true,
      ne: true,
      sw: true,
      nw: true
    }, // resizable edges of an item
    stop: undefined, // callback when resizing an item stops. Accepts Promise return to cancel/approve resize.
    start: undefined // callback when resizing an item starts.
    // Arguments: item, gridsterItem, event
  },
  swap: true, // allow items to switch position if drop on top of another
  pushItems: false, // push items when resizing and dragging
  disablePushOnDrag: false, // disable push on drag
  disablePushOnResize: false, // disable push on resize
  pushDirections: {north: true, east: true, south: true, west: true}, // control the directions items are pushed
  pushResizeItems: false, // on resize of item will shrink adjacent items
  displayGrid: 'onDrag&Resize', // display background grid of rows and columns. Options: 'always' | 'onDrag&Resize' | 'none'
  disableWindowResize: false, // disable the window on resize listener. This will stop grid to recalculate on window resize.
  disableWarnings: false, // disable console log warnings about misplacement of grid items
  scrollToNewItems: false // scroll to new items placed in a scrollable view
};

export interface GridsterItem {
  x?: number; // x position if missing will auto position
  y?: number; // y position if missing will auto position
  rows?: number; // number of rows if missing will use grid option defaultItemRows
  cols?: number; // number of columns if missing will use grid option defaultItemCols
  initCallback?: Function; // initialization callback and has size > 0. Argument: GridsterItem, GridsterItemComponent
  dragEnabled?: boolean; // override grid option draggable.enabled
  resizeEnabled?: boolean; // override grid option resizable.enabled
  compactEnabled?: boolean; // disable compact
  maxItemRows?: number; // override grid option maxItemRows
  minItemRows?: number; // override grid option minItemRows
  maxItemCols?: number; // override grid option maxItemCols
  minItemCols?: number; // override grid option minItemCols
  minItemArea?: number; //  override grid option minItemArea
  maxItemArea?: number; //  override grid option maxItemArea
}