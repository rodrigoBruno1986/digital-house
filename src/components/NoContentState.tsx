import Link from 'next/link';

interface NoContentStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  errorType?: 'network' | 'auth' | 'validation';
  onRetry?: () => void;
}

export const NoContentState = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonHref,
  errorType,
  onRetry
}: NoContentStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {errorType && onRetry ? (
        <button
          onClick={onRetry}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-medium"
        >
          {buttonText}
        </button>
      ) : (
        <Link
          href={buttonHref}
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-medium"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};
