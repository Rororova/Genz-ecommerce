const Footer = () => {
  return (
    <footer className="bg-yellow-400 border-black border-t-2 pt-16 pr-6 pb-8 pl-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mr-auto mb-16 ml-auto gap-x-12 gap-y-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-syne text-2xl font-bold mb-6">CUCK.</h3>
          <p className="text-sm font-medium leading-relaxed">
            Furniture designed for the modern voyeur. Established 2024. Based in Ohio (obviously).
          </p>
        </div>
        
        <div>
          <h4 className="font-bold border-b-2 border-black inline-block mb-4 pb-1">SHOP</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><a href="/products" className="hover:underline">Chairs</a></li>
            <li><a href="/products" className="hover:underline">Binoculars</a></li>
            <li><a href="/products" className="hover:underline">Tissues</a></li>
            <li><a href="/products" className="hover:underline">Merch</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold border-b-2 border-black inline-block mb-4 pb-1">LEGAL</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Refund Policy (No Refunds)</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold border-b-2 border-black inline-block mb-4 pb-1">SOCIALS</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-white hover:text-black transition-colors">
              <iconify-icon icon="lucide:instagram" width="20"></iconify-icon>
            </a>
            <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-white hover:text-black transition-colors">
              <iconify-icon icon="lucide:twitter" width="20"></iconify-icon>
            </a>
            <a href="#" className="w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-white hover:text-black transition-colors">
              <iconify-icon icon="lucide:youtube" width="20"></iconify-icon>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
        <p>© 2024 CUCK CHAIRS INC.</p>
        <p>DESIGNED BY BRAINROT</p>
      </div>
      
      <div className="mt-12 overflow-hidden select-none opacity-10">
        <h1 className="text-[15vw] leading-none font-syne font-extrabold text-center tracking-tighter text-black">CUCK.</h1>
      </div>
    </footer>
  )
}

export default Footer

