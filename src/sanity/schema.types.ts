import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Handleliste
 *
 *
 */
export interface HandleListe extends SanityDocument {
  _type: "handleListe";

  /**
   * items — `array`
   *
   *
   */
  items?: Array<SanityKeyed<Item>>;
}

/**
 * Godt kjøp
 *
 *
 */
export interface GodtKjop extends SanityDocument {
  _type: "godtKjop";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * rating — `number`
   *
   * 0 - Ok | 1 - Bra | 2 - Veldig bra | 3 - Fantastisk
   */
  rating?: number;

  /**
   * kommentar — `text`
   *
   *
   */
  kommentar?: string;

  /**
   * kategorier — `array`
   *
   *
   */
  kategorier?: Array<SanityKeyedReference<Kategori>>;

  /**
   * butikker — `array`
   *
   *
   */
  butikker?: Array<SanityKeyedReference<Butikk>>;
}

/**
 * Kategori
 *
 *
 */
export interface Kategori extends SanityDocument {
  _type: "kategori";

  /**
   * name — `string`
   *
   *
   */
  name?: string;
}

/**
 * Butikk
 *
 *
 */
export interface Butikk extends SanityDocument {
  _type: "butikk";

  /**
   * name — `string`
   *
   *
   */
  name?: string;
}

/**
 * Autocomplete
 *
 *
 */
export interface Autocomplete extends SanityDocument {
  _type: "autocomplete";

  /**
   * options — `array`
   *
   *
   */
  options?: Array<
    SanityKeyed<{
      _type: "option";
      /**
       * name — `string`
       *
       *
       */
      name?: string;

      /**
       * timesUsed — `number`
       *
       *
       */
      timesUsed?: number;
    }>
  >;
}

export type Item = {
  _type: "item";
  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * listName — `string`
   *
   *
   */
  listName?: string;

  /**
   * checked — `boolean`
   *
   *
   */
  checked?: boolean;

  /**
   * checkedBy — `string`
   *
   *
   */
  checkedBy?: string;

  /**
   * addedBy — `string`
   *
   *
   */
  addedBy?: string;

  /**
   * godtKjop — `reference`
   *
   *
   */
  godtKjop?: SanityReference<GodtKjop>;
};

export type Documents = HandleListe | GodtKjop | Kategori | Butikk | Autocomplete;
