import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <div className="text-center">
        <ExclamationCircleIcon className="w-14 h-14 mx-auto text-luni-black mb-4" />
        <h1 className="text-4xl font-bold text-luni-black mb-2">404</h1>
        <p className="text-2xl text-luni-black">Page Not Found</p>
        <p>The page you're looking for doesn't seem to exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
