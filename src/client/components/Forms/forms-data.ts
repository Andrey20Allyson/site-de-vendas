export type FormsStoreType = string | FileList;

export interface ReadFileEncodingTypes {
  'utf-8': string;
  'data-url': string;
  'array-buffer': ArrayBuffer;
}

export interface IndexGetterOption {
  index?: number;
}

export interface EncodingOption<E extends keyof ReadFileEncodingTypes = keyof ReadFileEncodingTypes> {
  encoding?: E;
}

export interface ReadFileOptions extends IndexGetterOption, EncodingOption { }

export interface FormsGetter {
  readFile(key: string): Promise<ArrayBuffer>;
  readFile<Options extends ReadFileOptions>(key: string, options?: Options): Promise<ReadFileReturn<Options>>;
  readFiles(key: string): Promise<ArrayBuffer[]>;
  readFiles<Options extends EncodingOption>(key: string, options?: Options): Promise<ReadFileReturn<Options>[]>;
  getFile(key: string, index?: number): File;
  getFiles(key: string): FileList;
  getText(key: string): string;
}

export type ExtendsDefault<V, E, D extends E> = V extends E ? V : D;
export type ReadFileReturn<Options extends EncodingOption> = ReadFileEncodingTypes[ExtendsDefault<Options['encoding'], keyof ReadFileEncodingTypes, 'array-buffer'>];

export interface FormsSetter {
  set(key: string, value: FormsStoreType): void;
}


export class FormsStore extends Map<string, FormsStoreType> implements FormsGetter, FormsSetter {
  constructor() {
    super();
  }

  getExistentItem(key: string): FormsStoreType {
    const value = super.get(key);

    if (!value) throw new Error(`Can't find value in key: "${key}"!`);

    return value;
  }

  getFile(key: string, index: number = 0): File {
    const files = this.getFiles(key);

    const file = files.item(index);

    if (!file) throw new Error(`Can't find file indexed with ${index} inside "${key}" value!`);

    return file;
  }

  getFiles(key: string): FileList {
    const value = this.getExistentItem(key);

    if (!(value instanceof FileList)) throw new Error(`Value in key "${key}" don't is a FileList!`);

    return value;
  }

  readFile<Options extends ReadFileOptions>(key: string, options = {} as Options): Promise<ReadFileReturn<Options>> {
    const { encoding = 'array-buffer', index } = options;

    const file = this.getFile(key, index);

    return this._readFile(file, encoding) as Promise<ReadFileReturn<Options>>;
  }

  private _readFile<E extends keyof ReadFileEncodingTypes>(file: File, encoding: E): Promise<ReadFileEncodingTypes[E]> {
    const reader = new FileReader();

    switch (encoding) {
      case 'array-buffer': {
        reader.readAsArrayBuffer(file);

        return new Promise((res, rej) => {
          reader.onload = ev => {
            if (reader.result instanceof ArrayBuffer) res(reader.result as ReadFileEncodingTypes[E]);

            rej('Invalid')
          }

          reader.onerror = rej;
        });
      }
      case 'data-url': {
        reader.readAsDataURL(file);

        return new Promise((resolve, reject) => {
          reader.onload = ev => {
            if (typeof reader.result === 'string') return resolve(reader.result as ReadFileEncodingTypes[E]);

            reject(new Error('Invalid result type!'));
          }

          reader.onerror = reject;
        });
      }
      case 'utf-8': {
        reader.readAsText(file, encoding)
      }
    }

    throw new TypeError(`Invalid format "${encoding}"!`);
  }

  readFiles<Options extends ReadFileOptions>(key: string, options = {} as Options): Promise<ReadFileReturn<Options>[]> {
    const { encoding = 'array-buffer' } = options;

    const files = this.getFiles(key);

    const readPromises = Array.from(files, file => this._readFile(file, encoding));

    return Promise.all(readPromises) as Promise<ReadFileReturn<Options>[]>;
  }

  getText(key: string): string {
    const text = this.getExistentItem(key);

    if (typeof text !== 'string') throw new Error(`Value in key "${key}" don't is a string!`)

    return text;
  }
}