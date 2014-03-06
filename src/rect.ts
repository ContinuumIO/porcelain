/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Rect implements IRect {

        static fromIRect(rect: IRect): Rect {
            return new Rect(rect.x, rect.y, rect.width, rect.height);
        }

        static fromPointAndSize(point: IPoint, size: ISize): Rect {
            return new Rect(point.x, point.y, size.width, size.height);
        }

        static fromPoints(topLeft: IPoint, bottomRight: IPoint): Rect {
            var x = topLeft.x;
            var y = topLeft.y;
            var width = bottomRight.x - x;
            var height = bottomRight.y - y;
            return new Rect(x, y, width, height);
        }

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        get left(): number {
            return this.x;
        }

        set left(pos: number) {
            this.x = pos;
        }

        get top(): number {
            return this.y;
        }

        set top(pos: number) {
            this.y = pos;
        }

        get right(): number {
            return this.x + this.width;
        }

        set right(pos: number) {
            this.width = pos - this.x;
        }

        get bottom(): number {
            return this.y + this.height;
        }

        set bottom(pos: number) {
            this.height = pos - this.y
        }

        get topLeft(): IPoint { // https://typescript.codeplex.com/workitem/2271
            return new Point(this.x, this.y);
        }

        set topLeft(point: IPoint) {
            this.x = point.x;
            this.y = point.y; 
        }

        get topRight(): IPoint { // https://typescript.codeplex.com/workitem/2271
            return new Point(this.right, this.y);
        }

        set topRight(point: IPoint) {
            this.right = point.x;
            this.y = point.y;
        }

        get bottomLeft(): IPoint { // https://typescript.codeplex.com/workitem/2271
            return new Point(this.x, this.bottom);
        }

        set bottomLeft(point: IPoint) { 
            this.x = point.x;
            this.bottom = point.y;
        }

        get bottomRight(): IPoint { // https://typescript.codeplex.com/workitem/2271
            return new Point(this.right, this.bottom);
        }

        set bottomRight(point: IPoint) {
            this.right = point.x;
            this.bottom = point.y;
        }

        get center(): Point {
            var x = this.x + Math.floor(this.width / 2);
            var y = this.y + Math.floor(this.height / 2);
            return new Point(x, y);
        }

        /*
        moveLeft(pos: number): void {
            this._right += pos - this._left;
            this._left = pos;
        }



        moveTop(pos: number): void {
            this._bottom += pos - this._top;
            this._top = pos;
        }

       
        moveRight(pos: number): void {
            this._left += pos - this._right;
            this._right = pos;
        }


        moveBottom(pos: number): void {
            this._top = pos - this._bottom;
            this._bottom = pos;
        }


        moveTopRight(point: Point): void {
            this.moveRight(point.x());
            this.moveTop(point.y());
        }

        moveTopLeft(point: Point): void {
            this.moveLeft(point.x());
            this.moveTop(point.y());
        }

        moveBottomLeft(point: Point): void {
            this.moveLeft(point.x());
            this.moveBottom(point.y());
        }

        moveBottomRight(point: Point): void {
            this.moveRight(point.x());
            this.moveBottom(point.y());

        size(): Size {
            return new Size(this.width(), this.height());
        }

        setSize(size: Size): void {
            this.setWidth(size.width());
            this.setHeight(size.height());
        }

        
        }



        moveCenter(point: Point): void {
            var width = this.width();
            var height = this.height();
            this._left = point.x() - Math.floor(width / 2);
            this._top = point.y() - Math.floor(height / 2);
            this._right = this._left + width;
            this._bottom = this._top + height;
        }

        normalized(): Rect {
            
            
        }

        private _left: number;
        private _right: number;
        private _top: number;
        private _bottom: number;
        */
    }

}