import { createContext } from 'react';

export interface IImageContext {
  vaxImage: string | undefined | null;
  idImage: string | undefined | null;
  pickVaxImage: () => void;
  pickIdImage: () => void;
  clearAllImages: () => void;
}

const ImageContext = createContext<IImageContext | null>(null);

ImageContext.displayName = 'ImageContext';
export const ImageProvider = ImageContext.Provider;
export const ImageConsumer = ImageContext.Consumer;

export default ImageContext;
