const Marquee = ({ text }) => {
  return (
    <div className="w-full bg-black text-white overflow-hidden border-b-2 border-black py-2 whitespace-nowrap relative z-50">
      <div className="animate-marquee inline-block text-sm font-medium tracking-widest uppercase">
        {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text} • 
      </div>
    </div>
  )
}

export default Marquee

