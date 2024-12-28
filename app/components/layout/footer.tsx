export const Footer = () => {
  return (
    <div>
      <footer className="footer p-4 bg-neutral text-neutral-content aling-center ">
        <div className="container mx-auto flex justify-center items-center text-center py-4">
          <p>© {new Date().getFullYear()} Task Manager</p>
        </div>
      </footer>
    </div>
  );
};
