import { UUID } from 'angular2-uuid';

// NOTE: If you change anything in this enum, check image-error-modal.component.html for tests and file-uploader.component.ts:
export enum CommonImageError {
    WrongType,
    TooSmall,
    TooBig,
    AlreadyExists,
    Unknown,
    CannotOpen,
    PDFnotSupported,
    CannotOpenPDF,
}

export class CommonImageProcessingError {
    commonImage?: CommonImage;
    rawImageFile?: File;
    maxSizeAllowed?: number;
    // added errorDescription.PDF.JS gives proper error messages as invalid pdf structure or password protected pdf.Good for splunk tracking
    constructor(public errorCode: CommonImageError, public errorDescription?: string) {

    }
}
/**
 * Image as uploaded by user
 */
export class CommonImage {

    uuid: string;

    constructor() {
        this.uuid = UUID.UUID();
    }

    fileContent: string;
    contentType: string;
    // number of bytes.
    size: number;
    sizeUnit: string;
    sizeTxt: string;
    naturalHeight: number;
    naturalWidth: number;
    name: string;

    // file uniqness checksum
    id: string;

    error?: CommonImageError;
    attachmentOrder: number = 0;
}

export interface CommonImageScaleFactors {
    widthFactor: number;
    heightFactor: number;

    scaleDown(scale: number): CommonImageScaleFactors;
}

export class CommonImageScaleFactorsImpl implements CommonImageScaleFactors {
    widthFactor: number;
    heightFactor: number;

    constructor(wFactor: number, hFactor: number) {
        this.widthFactor = wFactor;
        this.heightFactor = hFactor;
    }

    scaleDown(scale: number): CommonImageScaleFactors {
        return new CommonImageScaleFactorsImpl(
            this.widthFactor * scale,
            this.heightFactor * scale);
    }
}
