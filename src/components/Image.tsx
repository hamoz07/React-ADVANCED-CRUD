interface IImageProps {
  src: string;
  alt: string;
  imageclass: string;
}

const Image = ({src,alt,imageclass}: IImageProps) => {
  return <img src={src} alt={alt} className={imageclass} />
};

export default Image;
