export default function HomeAddress({ address }) {
  return (
    <>
      <p className="text-xl text-gray-800 font-medium">Home Address</p>
      <p className="text-black/75 text-md text-justify">{address}</p>
    </>
  );
}
