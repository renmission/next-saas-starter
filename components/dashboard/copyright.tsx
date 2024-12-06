export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto mb-6 text-center text-xs text-gray-500 dark:text-gray-400 md:max-w-md">
      &copy; {currentYear} Trust NV. All rights reserved.
    </div>
  );
}
