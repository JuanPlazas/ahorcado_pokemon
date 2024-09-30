import React from 'react'

function Confetti() {
  const qtyConfetti = 1000;
  const totalheight = 95; // total screen in makeItRain

  const renderConfetties = () => {
    const confettiPieces = []
    const interval = totalheight / qtyConfetti
    for(let i=0; i<qtyConfetti; i++) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      confettiPieces.push(
      <div 
        key={"confetti_"+i}
        className="absolute bg-black top-0 opacity-0 confetti-piece z-10"
        style={{
          width: (Math.floor(Math.random() * (10 - (5) + 1)) + (5))+"px",
          height: (Math.floor(Math.random() * (25 - (10) + 1)) + (10))+"px",
          left: ((i)*interval)+"%",
          transform: "rotate("+(Math.floor(Math.random() * (72 - (-72) + 1)) + (-72))+"deg)",
          backgroundColor: randomColor,
          animationDelay: i % 3 == 0 ? 
            (Math.floor(Math.random() * (3000 - (600) + 1)) + (600))+"ms"
            :
            (Math.floor(Math.random() * (500 - (200) + 1)) + (200))+"ms",
          animationDuration: 
            i % 4 == 0  || i % 5 == 0 ? 
            (Math.floor(Math.random() * (6000 - (3500) + 1)) + (3500))+"ms"
            : 
            (Math.floor(Math.random() * (5000 - (3000) + 1)) + (3000))+"ms"
        }}
      />
      )
    }
    return confettiPieces
  }

  return (
    <div>
      {renderConfetties()}
    </div>
  )
}

export default Confetti