import Image from "next/image";

const index = () => {
    return (
        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 m-32'>
            <h2 className="text-4xl sm:text-65xl font-bold text-center" style={{
                background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
            }}>Our team is on <span style={{ color: '#FF4500', WebkitTextFillColor: '#FF4500' }}>FIRE</span></h2>
            
            <h3 className="text-2xl font-medium text-center pt-10 text-orange-300">
                Igniting financial success with passion and expertise
            </h3>
            
            <div className='grid grid-cols-1 my-16 relative'>
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 via-red-600/20 to-orange-500/20 rounded-xl"></div>
                <Image 
                    src="/images/team/teamimg.png" 
                    alt="team-image" 
                    height={684} 
                    width={1296} 
                    className="relative z-10"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(255, 69, 0, 0.5))' }}
                />
            </div>
        </div>
    )
}

export default index;
