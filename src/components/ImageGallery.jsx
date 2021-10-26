import ImageGalleryItem from "./ImageGalleryItem";

export default function ImageGallery({ items }) {
  return (
    <ul className="ImageGallery">
      {items.map(item => {return (<ImageGalleryItem key={item.id}
      item={item}/>)})}
    </ul>
  );
}
