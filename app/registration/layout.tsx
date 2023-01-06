export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 pt-32">
        <div className="flex flex-row gap-16">
          <label className="w-32 text-lg text-gray-200" htmlFor="emailInput">
            Email:
          </label>
          <input type="text" name="emailInput" />
        </div>
        <div className="flex flex-row gap-16">
          <label className="w-32 text-lg text-gray-200" htmlFor="passwordInput">
            Password:
          </label>
          <input type="text" name="passwordInput" />
        </div>
      </div>
      {children}
    </>
  );
}
