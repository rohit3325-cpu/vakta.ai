import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-transparent">
      <div className="w-full px-6 lg:px-12 py-14">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-title">
              Vakta AI
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered mock interviews to help you practice,
              improve, and land your dream job faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              Product
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/interview" className="hover:text-white">Mock Interview</Link></li>
              <li><Link href="/resume" className="hover:text-white">Resume Builder</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              Company
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white">About</Link></li>
              <li><Link href="/" className="hover:text-white">Contact</Link></li>
              <li><Link href="/" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              Legal
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vakta AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/" className="hover:text-white">Twitter</Link>
            <Link href="/" className="hover:text-white">LinkedIn</Link>
            <Link href="/" className="hover:text-white">GitHub</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;