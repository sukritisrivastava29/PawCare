import { useParams } from "react-router-dom";

export default function ProviderDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Provider Details</h1>
      <p>Provider ID: {id}</p>
    </div>
  );
}