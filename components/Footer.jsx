import Link from 'next/link';

const Footer = ({ brandName }) => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer class='w-full bg-white rounded-lg m-4 shadow-lg'>
      <div class='flex flex-col w-full mx-auto max-w-screen-xl p-4 md:flex-row md:items-center md:justify-between'>
        <span class=' text-gray-600 text-center md:text-left font-medium'>
          © {currentYear}{' '}
          <Link href={'/'} className='hover:underline'>
            {brandName}
          </Link>
          . All Rights Reserved.
        </span>
        <p className='mt-3 text-center md:text-right text-sm font-normal text-gray-500  md:mt-0'>
          Developed by:{' '}
          <Link
            href={'https://danimarin.dev'}
            className='font-semibold  hover:underline'
          >
            danimarin.dev
          </Link>{' '}
          following a youtube tutorial{' '}
          <Link
            href={'https://youtu.be/wm5gMKuwSYk'}
            className='font-semibold  hover:underline'
          >
            Javascript Mastery
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
