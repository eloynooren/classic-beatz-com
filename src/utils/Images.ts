import {ReactElement} from "react";

type LocationSpec = {
    section?: string
    location?: string | number
};

type ImageSpec = {
    [location: string]: ReactElement
};

type ImageDataSpec = {
    [section: string]: ImageSpec
};


export class Images {
    private imageData: ImageDataSpec = {}

    constructor(locationSpecs: LocationSpec[], elements: ReactElement[]) {
        locationSpecs.forEach((spec, i) => {
            if (spec.section && spec.location) {
                if (!this.imageData[spec.section]) {
                    this.imageData[spec.section] = {};
                }
                this.imageData[spec.section][spec.location] = elements[i];
            }
        });
    }

    public get(section: string): ImageSpec {
        let rv =  section in this.imageData ? this.imageData[section] : {}
        return rv
    }

}

