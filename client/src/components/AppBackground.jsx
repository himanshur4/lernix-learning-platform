export default function AppBackground({ children }) {
    return (
        <div className="min-h-screen w-full bg-[#faf9f6] relative">
  {/* Paper Texture */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
      `,
      backgroundSize: "8px 8px, 32px 32px, 32px 32px",
    }}
  />

        {/* Your content goes here, layered on top */}
        <div className="relative z-10">
          {children}
        </div>
       </div>
    );
  }


 


 
