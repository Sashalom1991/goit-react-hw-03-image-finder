export default function ImageGalleryItem({ item }) {
  return (
    <li className="ImageGalleryItem">
      <img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" />
    </li>
  );
}
