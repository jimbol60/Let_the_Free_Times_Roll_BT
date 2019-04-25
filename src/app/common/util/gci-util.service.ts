import { Injectable } from '@angular/core';

@Injectable()
export class GciUtilService {

    getNewUID(): string {
        let list = [];
        let i;
        let r0 = 4294967295 * Math.random() | 0;
        let r1 = 4294967295 * Math.random() | 0;
        let r2 = 4294967295 * Math.random() | 0;
        let r3 = 4294967295 * Math.random() | 0;

        for (i = 0; i < 256; i += 1) list[i] = (i < 16 ? '0': '') + (i).toString(16);

        return list[r0      & 255] +
            list[r0 >> 8    & 255] +
            list[r0 >> 16   & 255] +
            list[r0 >> 24   & 255] +
            list[r1         & 255] +
            list[r1 >> 8    & 255] +
            list[r1 >> 16   & 255] +
            list[r1 >> 24   & 255] +
            list[r2         & 255] +
            list[r2 >> 8    & 255] +
            list[r2 >> 16   & 255] +
            list[r2 >> 24   & 255] +
            list[r3         & 255] +
            list[r3 >> 8    & 255] +
            list[r3 >> 16   & 255] +
            list[r3 >> 24   & 255];
    }


}