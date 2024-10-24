import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl md:text-2xl mt-8 font-semibold text-center">
        Not all those who wander are lost, but you are.
      </p>
      <button className="py-1.5 px-3 border mt-4 text-base border-primary bg-secondary ml-2 hover:bg-tertiary rounded">
        <Link href="/">Go back to home</Link>
      </button>
    </div>
  );
};

export default NotFound;
