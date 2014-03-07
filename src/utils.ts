/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export function removeItem<T>(array: T[], item: T): boolean {
        var i = array.indexOf(item);
        if (i !== -1) {
            array.splice(i, 1);
            return true;
        }
        return false;
    }

}
