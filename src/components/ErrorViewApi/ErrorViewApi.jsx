import errorImage from '../../oops.jpg';
import '../../App.css';

export default function CatchError() {
  return (
    <div className="CatchError">
      <img src={errorImage} alt="oops, error" width="240" />
      <p>Oops!!! Something went wrong.</p>
    </div>
  );
}
