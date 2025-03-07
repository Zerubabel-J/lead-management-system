const Footer = () => {
  return (
    <footer className="bg-[#1F2937] p-4 text-white p-10 w-full">
      <div className="flex justify-around">
        <aside>
          <p>
            Managing Leads
            <br />
            Providing Solutions
          </p>
        </aside>
        <nav>
          <h6 className="text-lg font-bold mb-2">Social Media</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="#">🔗</a>
            <a href="#">🔗</a>
            <a href="#">🔗</a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
