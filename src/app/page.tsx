import Image from 'next/image'
import SimulationCdb from './simulation'
import Logo from '@/assets/logo.svg'

export default function Home() {
  return (
    <main>
      <div>
        <Image src={Logo} alt="logo" />
      </div>
      <SimulationCdb />
    </main>
  )
}
