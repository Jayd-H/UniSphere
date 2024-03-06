import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen glowing-background font-montserrat">
      <div className="text-center">
        <ExclamationCircleIcon className="w-14 h-14 mx-auto text-luni-black mb-2" />
        <h1 className="text-6xl font-bold text-luni-black mb-2">404</h1>
        <p className="text-3xl text-luni-black p-1">Page Not Found</p>
        <p className="text-lg mb-4">
          The page you're looking for doesn't seem to exist.
        </p>
        <h1 className="text-1xl font-bold text-luni-black">
          U N I S P H E R E
        </h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
